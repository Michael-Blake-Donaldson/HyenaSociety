# Pre-Launch Validation Checklist

Production readiness verification for Hyena Society deployment.

## ✅ Build & Compilation

- [ ] `npm run build` succeeds with 0 errors
- [ ] `npx tsc --noEmit` passes with 0 type errors
- [ ] All 36 routes compile successfully
- [ ] No warnings in build output (except deprecation notices)
- [ ] `.next` directory created with optimized production build

## ✅ Testing & Quality

- [ ] `npm run test:ci` - all tests passing (10/10)
- [ ] Test coverage > 80% on critical paths
- [ ] No console errors or warnings in production build
- [ ] ESLint checks pass (or configured for CI)
- [ ] TypeScript strict mode passes

## ✅ Environment & Configuration

- [ ] Production `.env.local` configured with all required variables
- [ ] `DATABASE_URL` points to production PostgreSQL
- [ ] `JWT_SECRET` generated with `openssl rand -base64 32`
- [ ] `STRIPE_SECRET_KEY` is production key (sk_live_...)
- [ ] `RESEND_API_KEY` verified for production
- [ ] `PRINTIFY_API_TOKEN` and `PRINTIFY_SHOP_ID` configured
- [ ] `NEXT_PUBLIC_APP_URL` matches production domain

## ✅ Database

- [ ] PostgreSQL database created and accessible
- [ ] `npx prisma migrate deploy` runs successfully
- [ ] All migrations applied (0 pending)
- [ ] Seed data loaded (initial products if needed)
- [ ] Database backups configured

## ✅ Authentication & Security

- [ ] Password reset flow tested end-to-end
- [ ] JWT tokens expire correctly (7 days auth, 1 hour reset)
- [ ] HTTP-only cookies set correctly (domain specific)
- [ ] Forgot password emails delivered
- [ ] Account deletion (GDPR) works without errors
- [ ] Rate limiting active on login/signup endpoints

## ✅ Payments & Orders

- [ ] Stripe webhook endpoint registered and verified
- [ ] Test payment with Stripe test card succeeds
- [ ] Order confirmation email received
- [ ] Order appears in /orders page after payment
- [ ] Admin orders dashboard shows new orders
- [ ] Refund flow tested (if applicable)
- [ ] Guest checkout tested (order creation without user)

## ✅ Email Delivery

- [ ] Welcome email received after signup
- [ ] Order confirmation email received after payment
- [ ] Password reset email received (with valid link)
- [ ] Order shipped email template ready
- [ ] All emails render correctly in major clients (Gmail, Outlook)
- [ ] Sender domain verified in Resend
- [ ] No emails in spam folder

## ✅ UI/UX & Responsiveness

- [ ] Homepage loads correctly
- [ ] Product catalog renders all items
- [ ] Shopping cart works (add/remove items)
- [ ] Checkout flow complete (guest & auth)
- [ ] Mobile responsiveness verified (iPhone, Android)
- [ ] Toast notifications appear for user actions
- [ ] Error pages display (404, 500)
- [ ] Loading states visible during operations

## ✅ Content & Legal

- [ ] Privacy policy page displays correctly
- [ ] Terms of service accessible
- [ ] Refund policy complete and accurate
- [ ] Shipping policy with correct timelines
- [ ] Contact form functional (test submission)
- [ ] Footer links to all legal pages
- [ ] Contact page displays support email/hours

## ✅ SEO & Discovery

- [ ] Sitemap.xml generates with 11+ routes
- [ ] Robots.txt allows crawlers
- [ ] Product pages have meta tags (title, description, OG image)
- [ ] Collection page has metadata
- [ ] Schema.org markup present (if applicable)

## ✅ Observability & Monitoring

- [ ] Sentry DSN configured (optional but recommended)
- [ ] Google Analytics ID set (NEXT_PUBLIC_ANALYTICS_ID)
- [ ] Logger utility working
- [ ] Error tracking in global-error.tsx
- [ ] Monitor setup for production alerts

## ✅ Performance

- [ ] Lighthouse score > 90 on mobile
- [ ] First Contentful Paint < 2s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size reasonable (check with `npm run analyze` if available)

## ✅ Security Audit

- [ ] No hardcoded secrets in code
- [ ] Environment variables not logged
- [ ] CORS configured correctly
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Prisma parameterized)
- [ ] XSS protection enabled (Next.js default)
- [ ] CSRF tokens on state-changing operations
- [ ] No sensitive data in localStorage
- [ ] HTTPS enforced

## ✅ Deployment Readiness

- [ ] GitHub repository clean (no uncommitted changes)
- [ ] All 10 commits sequential and meaningful
- [ ] `.gitignore` includes `.env.local`, `.next`, `node_modules`
- [ ] `main` branch selected for deployment
- [ ] Vercel project created and linked
- [ ] GitHub Actions workflow configured
- [ ] Deployment environment variables set in Vercel
- [ ] Preview deployments tested

## ✅ Cross-Browser Testing

- [ ] Chrome/Edge: Full functionality
- [ ] Firefox: Full functionality
- [ ] Safari (iOS): Full functionality, responsiveness
- [ ] Mobile Chrome: Cart, checkout, account
- [ ] Mobile Safari: Cart, checkout, account

## ✅ Load & Stress Testing (Production Only)

- [ ] Concurrent 10 users browsing
- [ ] Concurrent 5 checkout operations
- [ ] Database queries optimized (no N+1)
- [ ] API response times < 500ms
- [ ] No connection pool exhaustion

## ✅ Post-Deployment

- [ ] Verify Vercel deployment completed
- [ ] Smoke test on production URL
- [ ] Check error logs for issues
- [ ] Monitor analytics for data
- [ ] Verify email delivery in production
- [ ] Test payment processing (small amount)
- [ ] Set up uptime monitoring
- [ ] Backup database before launch

## Sign-Off

- [ ] Product Manager: ___________________ Date: _______
- [ ] Tech Lead: _______________________ Date: _______
- [ ] QA Lead: ________________________ Date: _______

**Notes:**
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

## Common Issues & Fixes

### Build Fails in Production
- Run `npm ci` (clean install) vs `npm install`
- Check TypeScript `lib: [...]` for browser APIs
- Verify all imports are correct path case

### Email Not Sending
- Verify Resend verified domain
- Check RESEND_API_KEY matches production
- Review API rate limits

### Payments Not Processing
- Ensure STRIPE_SECRET_KEY is production key (sk_live_)
- Check webhook signing secret
- Verify webhook endpoint URL is correct

### Database Connection Fails
- Confirm PostgreSQL listening on correct host/port
- Verify DATABASE_URL format
- Check IP whitelisting (if cloud-hosted)
- Test connection: `psql $DATABASE_URL`
