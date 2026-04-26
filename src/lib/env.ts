import { z } from 'zod';

/**
 * Environment Variables Validation
 * This schema validates all required env vars at import time.
 * If any required env var is missing, the application will fail to start.
 */

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),

  // Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection URL'),

  // Printify
  PRINTIFY_API_TOKEN: z.string().min(1, 'PRINTIFY_API_TOKEN is required'),
  PRINTIFY_SHOP_ID: z.string().min(1, 'PRINTIFY_SHOP_ID is required'),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', 'STRIPE_SECRET_KEY must start with sk_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_', 'STRIPE_WEBHOOK_SECRET must start with whsec_'),

  // Email (Phase B)
  RESEND_API_KEY: z.string().optional().default(''),

  // Sentry (Phase H)
  SENTRY_DSN: z.string().optional().default(''),

  // Analytics
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional().default(''),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Parse and validate at import time
let validatedEnv: z.infer<typeof envSchema>;

try {
  validatedEnv = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`❌ Environment validation failed: ${error.message}`);
  }
  throw error;
}

export const env = validatedEnv;

/**
 * Type-safe environment access
 * Use this instead of process.env directly
 */
export type Env = typeof validatedEnv;
