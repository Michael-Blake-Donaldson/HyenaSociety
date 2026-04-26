import { Resend } from 'resend';
import { env } from '@/lib/env';

// Validate env at import
void env;

declare global {
  var resendClient: Resend | undefined;
}

export function getResendClient() {
  if (global.resendClient) {
    return global.resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const client = new Resend(apiKey);

  if (process.env.NODE_ENV !== 'production') {
    global.resendClient = client;
  }

  return client;
}

/**
 * Export singleton instance
 */
export const resend = getResendClient();

export type { Resend };
