import { resend } from '@/lib/email/resend';
import {
  getOrderConfirmationEmailHtml,
  getWelcomeEmailHtml,
  getPasswordResetEmailHtml,
  getOrderShippedEmailHtml,
} from '@/lib/email/templates';

const SENDER_EMAIL = 'noreply@hyena-society.com';
const SENDER_NAME = 'Hyena Society';

export interface SendOrderConfirmationProps {
  recipientEmail: string;
  customerName: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: string;
}

export interface SendWelcomeEmailProps {
  recipientEmail: string;
  customerName: string;
}

export interface SendPasswordResetProps {
  recipientEmail: string;
  customerName: string;
  resetToken: string;
}

export interface SendOrderShippedProps {
  recipientEmail: string;
  customerName: string;
  orderNumber: string;
  trackingNumber: string;
  carrierName: string;
  trackingUrl: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(props: SendOrderConfirmationProps) {
  try {
    const html = getOrderConfirmationEmailHtml({
      orderNumber: props.orderNumber,
      customerName: props.customerName,
      items: props.items,
      subtotal: props.subtotal,
      shipping: props.shipping,
      tax: props.tax,
      total: props.total,
      shippingAddress: props.shippingAddress,
    });

    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: props.recipientEmail,
      subject: `Order Confirmation: #${props.orderNumber}`,
      html,
    });

    if (result.error) {
      throw new Error(`Failed to send order confirmation: ${result.error.message}`);
    }

    console.log(`[EMAIL] Order confirmation sent to ${props.recipientEmail}`);
    return result;
  } catch (error) {
    console.error('[EMAIL ERROR] Order confirmation:', error);
    throw error;
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(props: SendWelcomeEmailProps) {
  try {
    const html = getWelcomeEmailHtml({
      customerName: props.customerName,
    });

    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: props.recipientEmail,
      subject: 'Welcome to Hyena Society',
      html,
    });

    if (result.error) {
      throw new Error(`Failed to send welcome email: ${result.error.message}`);
    }

    console.log(`[EMAIL] Welcome email sent to ${props.recipientEmail}`);
    return result;
  } catch (error) {
    console.error('[EMAIL ERROR] Welcome email:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(props: SendPasswordResetProps) {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${props.resetToken}`;

    const html = getPasswordResetEmailHtml({
      resetLink,
      customerName: props.customerName,
    });

    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: props.recipientEmail,
      subject: 'Reset Your Password',
      html,
    });

    if (result.error) {
      throw new Error(`Failed to send password reset email: ${result.error.message}`);
    }

    console.log(`[EMAIL] Password reset email sent to ${props.recipientEmail}`);
    return result;
  } catch (error) {
    console.error('[EMAIL ERROR] Password reset email:', error);
    throw error;
  }
}

/**
 * Send order shipped notification email
 */
export async function sendOrderShippedEmail(props: SendOrderShippedProps) {
  try {
    const html = getOrderShippedEmailHtml({
      orderNumber: props.orderNumber,
      customerName: props.customerName,
      trackingNumber: props.trackingNumber,
      carrierName: props.carrierName,
      trackingUrl: props.trackingUrl,
    });

    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: props.recipientEmail,
      subject: `Your Order #${props.orderNumber} Has Shipped`,
      html,
    });

    if (result.error) {
      throw new Error(`Failed to send shipped email: ${result.error.message}`);
    }

    console.log(`[EMAIL] Shipped notification sent to ${props.recipientEmail}`);
    return result;
  } catch (error) {
    console.error('[EMAIL ERROR] Shipped notification:', error);
    throw error;
  }
}
