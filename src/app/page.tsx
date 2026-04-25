import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ProductCard } from "@/components/storefront/product-card";
import { brand } from "@/lib/constants/brand";
import { mockProducts } from "@/lib/data/mock-products";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description,
    slogan: brand.tagline,
  };

  return (
    <div className="relative grain-overlay">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,170,94,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(127,136,117,0.16),transparent_44%)]" />

      <section className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-24 sm:px-8 md:pb-20 md:pt-32">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-brand-muted">Field tested collection</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="max-w-4xl text-4xl font-semibold uppercase leading-tight tracking-[0.03em] text-brand-secondary sm:text-6xl md:text-7xl">
            Quiet force.
            <br />
            Built for repeat performance.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
            {brand.description}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/collection"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-accent bg-brand-accent px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a] transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-accent/90"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/story"
              className="inline-flex h-12 items-center justify-center rounded-full border border-brand-line bg-brand-surface/40 px-7 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
            >
              Brand Story
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-3 sm:px-8 md:pb-32">
        {[
          "Weather-adaptive technical fabrics",
          "Utility-tailored silhouettes",
          "Limited production per release",
        ].map((detail, idx) => (
          <Reveal key={detail} delay={0.15 * idx}>
            <article className="rounded-2xl border border-brand-line bg-brand-surface/45 p-6">
              <p className="text-sm leading-7 text-brand-secondary/75">{detail}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 md:pb-36">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Curated essentials</p>
            <h2 className="mt-3 text-3xl font-semibold uppercase tracking-[0.03em] text-brand-secondary sm:text-4xl">Featured in the drop</h2>
          </div>
          <Link
            href="/collection"
            className="hidden text-xs uppercase tracking-[0.16em] text-brand-muted transition-colors duration-500 hover:text-brand-accent sm:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.slice(0, 3).map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
