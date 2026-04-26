# Deployment Guide

## Environment Variables

Before deploying, set these environment variables:

### Required (All Environments)
- `NEXT_PUBLIC_APP_URL` - Base URL (http://localhost:3000 for dev, production domain for prod)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing (generate with: `openssl rand -base64 32`)

### Payment (Stripe)
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key

### Email (Resend)
- `RESEND_API_KEY` - Resend email service API key

### Printify (Fulfillment)
- `PRINTIFY_API_TOKEN` - Printify API token
- `PRINTIFY_SHOP_ID` - Printify shop ID

### Monitoring & Analytics (Optional)
- `SENTRY_DSN` - Sentry error tracking DSN
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics ID

## Vercel Deployment

### 1. Connect Repository
```bash
vercel link
```

### 2. Set Environment Variables
```bash
vercel env add
```

### 3. Deploy
```bash
vercel deploy --prod
```

Or push to `main` branch for automatic deployment via GitHub Actions.

## Database Setup

### 1. Create PostgreSQL Database
```bash
createdb hyena_society
```

### 2. Apply Migrations
```bash
npx prisma migrate deploy
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Setup Database
```bash
npx prisma migrate dev
```

### 4. Run Development Server
```bash
npm run dev
```

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Stripe webhooks configured to production
- [ ] Resend verified sender domain
- [ ] HTTPS enabled
- [ ] Monitoring (Sentry) configured
- [ ] Analytics (Google Analytics) configured
- [ ] Backup strategy in place
- [ ] Rate limiting verified working
- [ ] Error pages tested (404, 500)

## Monitoring

### Sentry
- Set `SENTRY_DSN` for error tracking
- Errors automatically captured in production

### Analytics
- Set `NEXT_PUBLIC_ANALYTICS_ID` for Google Analytics
- Page views and conversions tracked automatically

### Logs
- Check application logs in Vercel dashboard
- Structured logging via Logger utility

## Troubleshooting

### Build Fails
- Run `npm run build` locally first
- Check all dependencies installed: `npm ci`
- Verify TypeScript: `npm run build`

### Database Connection Error
- Verify `DATABASE_URL` format
- Check PostgreSQL is running
- Confirm IP whitelisted (if using managed DB)

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check verified sender domain in Resend
- Review email logs in Resend dashboard

### Payment Failures
- Verify `STRIPE_SECRET_KEY` (starts with sk_)
- Check webhook signing secret
- Confirm test vs production keys
