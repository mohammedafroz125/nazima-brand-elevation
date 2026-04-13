# Email System Setup Guide

## Current Implementation

The payment system now sends order confirmation emails to customers after successful payment. Currently, emails are logged to the console for testing purposes.

### Files Created

1. **email-template.html** - Beautiful HTML email template with:
   - Customer name
   - Product name and price
   - Order ID and Payment ID
   - Payment confirmation status
   - Thank you message
   - Support contact information

2. **email-service.js** - Email utilities:
   - Template loading
   - Template population with order data
   - Ready for Nodemailer integration

3. **Updated index.js** - Payment flow integration:
   - Stores customer details when order is created
   - Sends confirmation email when payment is verified
   - Logs email details to console (current setup)

## Testing Email Functionality

Currently, when a payment is verified, you'll see in the server console:

```
📧 EMAIL TO BE SENT:
To: customer@example.com
Subject: Order Confirmation - Styled by Nazima
HTML length: XXXX characters
✓ Email queued for sending
```

## Setting Up Real Email Sending (Production)

To enable actual email sending, follow these steps:

### 1. Install Nodemailer

```bash
cd server
npm install nodemailer
```

### 2. Create an Enhanced Email Service

Replace the mock implementation in `email-service.js` with Nodemailer or update `index.js` sendOrderConfirmationEmail function:

```javascript
import nodemailer from "nodemailer";

async function sendOrderConfirmationEmail(customerEmail, orderData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
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
      paymentDate: new Date().toLocaleString("en-IN"),
    });

    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: customerEmail,
      subject: "Order Confirmation - Styled by Nazima",
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("Email sending error:", err);
    return { success: false, error: err.message };
  }
}
```

### 3. Configure Gmail SMTP (Recommended for Testing)

If using Gmail:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   SMTP_FROM_EMAIL=noreply@styledbynazima.com
   SMTP_FROM_NAME=StyledByNazima
   ```

### 4. Alternative Email Providers

- **SendGrid**: Use SMTP or API
- **AWS SES**: Amazon's email service
- **Mailgun**: Developer-friendly email API
- **Resend**: Modern email API (best for React/Node)

### 5. Restart Backend

```bash
npm --prefix server run dev
```

## Environment Variables Reference

```
# Razorpay
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

# Server
PORT=3001

# Email (for Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=app-password
SMTP_FROM_EMAIL=noreply@styledbynazima.com
SMTP_FROM_NAME=StyledByNazima
```

## Email Template Variables

The email template supports these placeholders:

- `{{customerName}}` - Customer's name
- `{{productName}}` - Product name
- `{{price}}` - Product price
- `{{totalAmount}}` - Total amount paid
- `{{orderId}}` - Razorpay order ID
- `{{paymentId}}` - Razorpay payment ID
- `{{paymentDate}}` - Payment completion date

## Customization

To customize the email template:

1. Edit `server/email-template.html` directly
2. Modify colors, text, and layout as needed
3. Add logo/images (use CDN links or embedded images)
4. Support for additional variables can be added in `email-service.js`

## Troubleshooting

### Emails not sending?
- Check SMTP credentials in `.env`
- Verify firewall/ISP doesn't block port 587
- Check spam folder
- Enable "Less secure app access" if using older Gmail

### Template not loading?
- Ensure `email-template.html` exists in `/server` folder
- Check file permissions
- Fallback inline template will be used if file is missing

## Next Steps

1. ✅ Email template created
2. ✅ Email service scaffolding ready
3. ⏳ Install Nodemailer: `npm install nodemailer`
4. ⏳ Configure SMTP credentials in `.env`
5. ⏳ Update sendOrderConfirmationEmail function with Nodemailer code
