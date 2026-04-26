# Hyena Society - Luxury Performance Apparel

Premium e-commerce platform for luxury fitness wear with full stack Next.js implementation.

## 🎯 Features

### Core E-Commerce
- ✅ Product catalog with filtering & search
- ✅ Guest & authenticated checkout (Stripe)
- ✅ Order management & history
- ✅ Inventory sync with Printify (print-on-demand)
- ✅ Admin dashboard (order tracking, analytics)

### Authentication & Security
- ✅ Secure password reset with JWT tokens
- ✅ HTTP-only cookie sessions
- ✅ Rate limiting (anti-brute force)
- ✅ GDPR account deletion
- ✅ Environment variable validation

### Email & Notifications
- ✅ Transactional emails (Resend)
- ✅ Order confirmations
- ✅ Password reset emails
- ✅ Shipping notifications
- ✅ Toast notifications (in-app)

### Compliance & Legal
- ✅ Privacy policy & Terms of service
- ✅ Return & refund policy
- ✅ Shipping policy
- ✅ Contact form

### SEO & Discovery
- ✅ Dynamic meta tags per product
- ✅ Sitemap with priority/frequency
- ✅ Robots.txt for crawlers

### Testing & Quality
- ✅ Jest unit tests (10 passing)
- ✅ TypeScript strict mode
- ✅ GitHub Actions CI/CD

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
