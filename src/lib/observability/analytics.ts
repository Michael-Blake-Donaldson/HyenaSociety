import { env } from '@/lib/env';

interface PageViewEvent {
  path: string;
  referrer?: string;
  userAgent?: string;
}

interface ConversionEvent {
  type: 'signup' | 'purchase' | 'add_to_cart';
  value: number;
  currency: string;
  metadata?: Record<string, any>;
}

class AnalyticsClient {
  private isDev = process.env.NODE_ENV === 'development';

  trackPageView(event: PageViewEvent) {
    if (this.isDev) {
      console.log('[ANALYTICS] Page View:', event);
    } else if (env.NEXT_PUBLIC_ANALYTICS_ID) {
      // In production, would send to Google Analytics
      console.log('[PAGE VIEW]', event.path);
    }
  }

  trackConversion(event: ConversionEvent) {
    if (this.isDev) {
      console.log('[ANALYTICS] Conversion:', event);
    } else if (env.NEXT_PUBLIC_ANALYTICS_ID) {
      // In production, would track conversion
      console.log(`[CONVERSION] ${event.type}: $${event.value}`);
    }
  }

  trackEvent(name: string, properties?: Record<string, any>) {
    if (this.isDev) {
      console.log('[ANALYTICS] Event:', { name, properties });
    } else if (env.NEXT_PUBLIC_ANALYTICS_ID) {
      console.log(`[EVENT] ${name}`, properties);
    }
  }
}

export const analytics = new AnalyticsClient();
