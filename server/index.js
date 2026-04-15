import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { getEmailTemplate, populateTemplate } from "./email-service.js";
import connectDB from "./db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";

// Load env from multiple likely locations so startup works from root or /server cwd.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envCandidates = [
  path.resolve(process.cwd(), "server/.env"),
  path.resolve(process.cwd(), "server.env"),
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, "../server.env"),
];

for (const envPath of envCandidates) {
  dotenv.config({ path: envPath });
}

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Failed to connect to database, continuing with limited functionality...");
  }
};

startServer();

// Store orders in memory (in production, use database)
const orders = {};
const emailTemplate = getEmailTemplate();

// Mock email sender (logs to console for now, ready for Nodemailer integration)
async function sendOrderConfirmationEmail(customerEmail, orderData) {
  try {
    // Check if SMTP credentials are configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
      console.log("\n📧 EMAIL TO BE SENT (SMTP not configured - logging only):");
      console.log("To:", customerEmail);
      console.log("Subject: Order Confirmation - Styled by Nazima");
      console.log("✓ Email data logged\n");
      return { success: true, message: "Email logged (SMTP not configured)" };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const html = populateTemplate(emailTemplate, {
      customerName: orderData.customerName || "Valued Customer",
      productName: orderData.productName || "Product",
      price: orderData.price,
      totalAmount: orderData.totalAmount,
      orderId: orderData.orderId,
      paymentId: orderData.paymentId,
      paymentDate: new Date().toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME || "StyledByNazima"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME}>`,
      to: customerEmail,
      subject: "Order Confirmation - Styled by Nazima",
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("\n✅ EMAIL SENT SUCCESSFULLY:");
    console.log("To:", customerEmail);
    console.log("Message ID:", result.messageId);
    console.log("Subject: Order Confirmation - Styled by Nazima\n");

    return { success: true, message: "Email sent successfully", messageId: result.messageId };
  } catch (err) {
    console.error("\n❌ EMAIL SENDING ERROR:");
    console.error("Error:", err.message);
    console.error("To:", customerEmail, "\n");
    return { success: false, error: err.message };
  }
}

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "StyledByNazima backend" });
});

app.get("/public-key", (_req, res) => {
  res.json({ key_id: process.env.RAZORPAY_KEY_ID || null });
});

app.post("/create-order", async (req, res) => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return res.status(500).json({ error: "Missing Razorpay credentials" });
    }
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const { amount, currency = "INR", receipt, notes, customerName, customerEmail, productName } = req.body || {};
    if (!amount || isNaN(Number(amount))) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `sbn_rcpt_${Date.now()}`,
      notes: notes || {},
    };
    const order = await razorpay.orders.create(options);
    
    // Store order details for email sending later
    orders[order.id] = {
      orderId: order.id,
      customerName: customerName || "Valued Customer",
      customerEmail: customerEmail || "",
      productName: productName || "Product",
      price: amount,
      totalAmount: amount,
      currency: order.currency,
      createdAt: new Date(),
    };
    
    return res.json({ order_id: order.id, currency: order.currency, amount: order.amount });
  } catch (err) {
    console.error("create-order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/verify-payment", express.json(), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing fields" });
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ error: "Missing Razorpay credentials" });
    }
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    if (!isValid) {
      return res.status(400).json({ success: false, error: "Signature mismatch" });
    }

    // Payment verification successful - send confirmation email
    const orderData = orders[razorpay_order_id];
    if (orderData && orderData.customerEmail) {
      orderData.paymentId = razorpay_payment_id;
      await sendOrderConfirmationEmail(orderData.customerEmail, orderData);
    }

    return res.json({ success: true, order_id: razorpay_order_id, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error("verify-payment error:", err);
    res.status(500).json({ error: "Verification error" });
  }
});

// ------ Database Routes (MongoDB) ------
// Register new routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "StyledByNazima backend", timestamp: new Date() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ Database: MongoDB${process.env.MONGODB_URI ? " (connected)" : " (disconnected)"}`);
  console.log(`✓ Razorpay: ${process.env.RAZORPAY_KEY_ID ? "Configured" : "Not configured"}`);
});
