# Hyena Society Build Outline

## Confirmed Phases

1. Foundation setup (Next.js, Tailwind, Framer Motion, design system) ✅
2. Storefront UI (home, collection, product detail, cart drawer) ✅
3. Backend core (Prisma models, auth, API contracts) ✅
4. Printify sync and fulfillment pipeline ✅
5. Stripe checkout and order orchestration
6. Admin dashboard (catalog, orders, KPIs)
7. Polish (SEO, perf, micro-interactions, accessibility)

## Backlog Enhancements

- Add edge caching for collection and PDP responses.
- Add optimistic cart updates with rollback messaging.
- Add event tracking for funnel metrics (view, add-to-cart, checkout start, purchase).
- Add image pipeline for AVIF/WebP and responsive breakpoints.
- Add premium editorial content blocks for conversion lift.
- Add print-on-demand failover retries with dead-letter handling.
- Add customer segmentation hooks for loyalty and VIP drops.
- Add visual regression tests for key branded surfaces.
- Add edge middleware for geo-aware shipping estimations.
- Add server-side rate limiting for auth and checkout endpoints.
- Add structured logging and request IDs for production debugging.
- Add a scheduled Printify sync job for inventory consistency.
- Add admin preview of markup deltas before applying sync updates.
