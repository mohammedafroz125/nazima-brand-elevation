import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";

// Load env from server/.env first, then fallback to root-level server.env
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });
dotenv.config({ path: path.resolve(process.cwd(), "server.env") });

const app = express();
app.use(cors());
app.use(express.json());

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
    const { amount, currency = "INR", receipt, notes } = req.body || {};
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
    return res.json({ order_id: order.id, currency: order.currency, amount: order.amount });
  } catch (err) {
    console.error("create-order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/verify-payment", express.json(), (req, res) => {
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
    return res.json({ success: true, order_id: razorpay_order_id, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error("verify-payment error:", err);
    res.status(500).json({ error: "Verification error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
