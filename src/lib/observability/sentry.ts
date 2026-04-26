import { env } from '@/lib/env';

class SentryLogger {
  private isDev = process.env.NODE_ENV === 'development';

  captureException(error: Error, context?: Record<string, any>) {
    if (this.isDev) {
      console.error('[SENTRY]', error, context);
    } else if (env.SENTRY_DSN) {
      // In production, would send to Sentry
      console.error('[ERROR]', error.message, context);
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (this.isDev) {
      console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](
        `[SENTRY] ${message}`
      );
    } else if (env.SENTRY_DSN) {
      console.log(`[${level.toUpperCase()}]`, message);
    }
  }
}

export const sentry = new SentryLogger();
