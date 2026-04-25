import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Full-bleed hero ── */}
      <section className="relative flex min-h-[100svh] w-full flex-col">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&auto=format&fit=crop&q=80"
            alt="Athlete in motion"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-[#0b0b0d]/20" />
        </div>

        {/* Info bar — pinned above the bottom of the hero */}
        <div className="absolute bottom-28 left-0 right-0 z-10 sm:bottom-32">
          <Reveal>
            <div className="mx-5 rounded-sm border border-white/10 bg-[#0b0b0d]/70 backdrop-blur-sm sm:mx-8">
              <div className="grid grid-cols-1 divide-y divide-white/10 px-6 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-0">
                <div className="flex items-center gap-3 py-3 sm:py-4">
                  <ArrowDownRight className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Scroll to explore</span>
                </div>
                <div className="flex items-center gap-3 py-3 sm:px-6 sm:py-4">
                  <span className="text-brand-accent">~</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Engineered for movement</span>
                </div>
                <div className="flex items-center gap-3 py-3 sm:px-6 sm:py-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Designed for the relentless</span>
                  <span className="ml-auto text-brand-accent">⊕</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero text — bottom left */}
        <div className="relative z-10 mt-auto px-5 pb-56 sm:px-8 sm:pb-64">
          <Reveal>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-accent">
              New Collection
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-2xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
              Built for
              <br />
              the hunt.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/collection"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand-accent px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-opacity duration-300 hover:opacity-85"
              >
                Discover our products
                <ArrowDownRight className="h-4 w-4" />
              </Link>
              <Link
                href="/story"
                className="inline-flex h-11 items-center justify-center rounded-sm border border-white/20 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:border-white/50 hover:text-white"
              >
                Our story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Attributes strip ── */}
      <section className="border-y border-brand-line">
        <div className="grid grid-cols-1 divide-y divide-brand-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "01", text: "Performance fabrics built for extreme conditions" },
            { label: "02", text: "Utility silhouettes. Zero compromise on movement" },
            { label: "03", text: "Limited drops. Maximum impact." },
          ].map(({ label, text }, idx) => (
            <Reveal key={label} delay={0.1 * idx}>
              <div className="px-8 py-8 md:px-12 md:py-10">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">{label}</p>
                <p className="text-sm font-medium leading-relaxed text-white/65">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">Latest drop</p>
              <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                Shop the
                <br />
                collection
              </h2>
            </div>
            <Link
              href="/collection"
              className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted transition-colors hover:text-white sm:inline-flex"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
