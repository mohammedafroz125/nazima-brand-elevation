import fs from "fs";
import path from "path";

export function getEmailTemplate() {
  const templatePath = path.resolve(process.cwd(), "server/email-template.html");
  const fallbackPath = path.resolve(path.dirname(import.meta.url.replace("file://", "")), "email-template.html");
  
  try {
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, "utf-8");
    }
    if (fs.existsSync(fallbackPath)) {
      return fs.readFileSync(fallbackPath, "utf-8");
    }
  } catch (err) {
    console.warn("Could not load email template:", err.message);
  }
  
  // Fallback inline template if file not found
  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #C8A96A 0%, #8B7355 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">✨ STYLED BY NAZIMA ✨</h1>
          </div>
          <div style="padding: 30px; background-color: white;">
            <p>Dear {{customerName}},</p>
            <p>Thank you for your purchase! Your order has been confirmed.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #C8A96A; margin: 20px 0; border-radius: 4px;">
              <h3 style="color: #8B7355; margin-top: 0;">📦 Order Summary</h3>
              <p><strong>Product:</strong> {{productName}}</p>
              <p><strong>Price:</strong> ₹{{price}}</p>
              <p style="border-top: 2px solid #C8A96A; padding-top: 10px; margin-top: 15px;">
                <strong style="font-size: 18px;">Total Amount: ₹{{totalAmount}}</strong>
              </p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #C8A96A; margin: 20px 0; border-radius: 4px;">
              <h3 style="color: #8B7355; margin-top: 0;">💳 Payment Details</h3>
              <p><strong>Order ID:</strong> {{orderId}}</p>
              <p><strong>Payment ID:</strong> {{paymentId}}</p>
              <p><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">✓ Payment Confirmed</span></p>
              <p><strong>Date:</strong> {{paymentDate}}</p>
            </div>
            
            <div style="background-color: #fff9f0; padding: 15px; border-radius: 4px; margin: 20px 0; border: 1px solid #E8D4C4;">
              <p style="color: #8B7355; font-weight: bold; margin-top: 0;">📋 What's Next?</p>
              <ul style="color: #555; margin: 0; padding-left: 20px;">
                <li>Your order has been confirmed and sent to our team.</li>
                <li>You'll receive a shipping confirmation within 24-48 hours.</li>
                <li>Track your order using the tracking link in the shipping email.</li>
              </ul>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #f5f5f5; border-radius: 4px; margin: 20px 0;">
              <p style="font-size: 16px; font-weight: bold; color: #8B7355;">Your Order is Confirmed!</p>
              <p style="font-size: 22px; font-weight: bold; color: #C8A96A;">Thank You for Choosing Us!</p>
            </div>
            
            <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
              If you have any questions, please contact us at support@styledbynazima.com
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 11px; color: #666; border-radius: 0 0 8px 8px;">
            <p style="margin: 5px 0;"><strong>© 2026 Styled by Nazima</strong></p>
            <p style="margin: 5px 0;">Premium Ethnic Wear | WhatsApp: <a href="https://wa.me/919999999999" style="color: #C8A96A; text-decoration: none;">Click Here</a></p>
            <p style="margin: 5px 0; color: #bbb;">This is an automated email. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function populateTemplate(template, data) {
  let html = template;
  html = html.replace(/{{customerName}}/g, data.customerName || "Valued Customer");
  html = html.replace(/{{productName}}/g, data.productName || "Product");
  html = html.replace(/{{price}}/g, data.price || "0");
  html = html.replace(/{{totalAmount}}/g, data.totalAmount || "0");
  html = html.replace(/{{orderId}}/g, data.orderId || "");
  html = html.replace(/{{paymentId}}/g, data.paymentId || "");
  html = html.replace(/{{paymentDate}}/g, data.paymentDate || new Date().toLocaleString("en-IN"));
  return html;
}
