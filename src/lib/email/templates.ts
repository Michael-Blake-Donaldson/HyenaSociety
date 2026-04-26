/**
 * Email Templates
 * Returns HTML content for transactional emails
 */

export function getOrderConfirmationEmailHtml(props: {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: string;
}): string {
  const itemsHtml = props.items
    .map(
      item =>
        `<tr><td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name} (x${item.quantity})</td><td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price / 100).toFixed(2)}</td></tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b0b0d; color: #c8f000; padding: 20px; text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #0b0b0d; font-size: 18px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    .total-row { font-weight: bold; font-size: 18px; }
    .footer { color: #666; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Confirmation</h1>
    </div>

    <div class="section">
      <p>Hi ${props.customerName},</p>
      <p>Thank you for your order! We're excited to ship it to you.</p>
    </div>

    <div class="section">
      <h2>Order #${props.orderNumber}</h2>
      <table>
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 12px; text-align: left;">Item</th>
            <th style="padding: 12px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr style="background: #f9f9f9;">
            <td style="padding: 12px; text-align: right;">Subtotal:</td>
            <td style="padding: 12px; text-align: right;">$${(props.subtotal / 100).toFixed(2)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 12px; text-align: right;">Shipping:</td>
            <td style="padding: 12px; text-align: right;">$${(props.shipping / 100).toFixed(2)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 12px; text-align: right;">Tax:</td>
            <td style="padding: 12px; text-align: right;">$${(props.tax / 100).toFixed(2)}</td>
          </tr>
          <tr style="background: #c8f000; color: #0b0b0d;">
            <td style="padding: 12px; font-weight: bold; text-align: right;">Total:</td>
            <td style="padding: 12px; font-weight: bold; text-align: right;">$${(props.total / 100).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Shipping Address</h2>
      <p>${props.shippingAddress}</p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Hyena Society. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getWelcomeEmailHtml(props: { customerName: string }): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b0b0d; color: #c8f000; padding: 40px 20px; text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 28px; }
    .section { margin-bottom: 30px; }
    .cta-button { display: inline-block; background: #c8f000; color: #0b0b0d; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 6px; }
    .footer { color: #666; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Hyena Society</h1>
    </div>

    <div class="section">
      <p>Hi ${props.customerName},</p>
      <p>Welcome to Hyena Society! We're thrilled to have you as part of our community.</p>
      <p>You can now browse our collection of premium luxury fitness clothing and place orders.</p>
    </div>

    <div class="section" style="text-align: center;">
      <a href="https://${process.env.NEXT_PUBLIC_APP_URL}/collection" class="cta-button">Shop Now</a>
    </div>

    <div class="section">
      <p>If you have any questions, feel free to reach out to our support team.</p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Hyena Society. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getPasswordResetEmailHtml(props: {
  resetLink: string;
  customerName: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b0b0d; color: #c8f000; padding: 20px; text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 30px; }
    .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 6px; color: #856404; margin: 20px 0; }
    .cta-button { display: inline-block; background: #c8f000; color: #0b0b0d; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 6px; }
    .footer { color: #666; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>

    <div class="section">
      <p>Hi ${props.customerName},</p>
      <p>We received a request to reset your password. Click the button below to create a new password.</p>
    </div>

    <div class="section" style="text-align: center;">
      <a href="${props.resetLink}" class="cta-button">Reset Password</a>
    </div>

    <div class="alert">
      <strong>This link expires in 1 hour.</strong> If you didn't request a password reset, you can safely ignore this email.
    </div>

    <div class="section">
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p><code style="background: #f5f5f5; padding: 5px 10px; border-radius: 4px;">${props.resetLink}</code></p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Hyena Society. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getOrderShippedEmailHtml(props: {
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrierName: string;
  trackingUrl: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b0b0d; color: #c8f000; padding: 20px; text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 30px; }
    .tracking-box { background: #f5f5f5; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #c8f000; color: #0b0b0d; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 6px; }
    .footer { color: #666; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Order Has Shipped!</h1>
    </div>

    <div class="section">
      <p>Hi ${props.customerName},</p>
      <p>Great news! Your order #${props.orderNumber} has been shipped and is on its way to you.</p>
    </div>

    <div class="tracking-box">
      <h2 style="margin-top: 0;">Tracking Information</h2>
      <p><strong>Carrier:</strong> ${props.carrierName}</p>
      <p><strong>Tracking Number:</strong> ${props.trackingNumber}</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${props.trackingUrl}" class="cta-button">Track Package</a>
      </div>
    </div>

    <div class="section">
      <p>You'll receive your package within 3-7 business days depending on your location.</p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Hyena Society. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
