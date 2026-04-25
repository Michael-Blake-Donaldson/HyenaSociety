import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { brand } from "@/lib/constants/brand";

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,161,91,0.2),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(245,245,245,0.06),transparent_42%)]" />

      <section className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-24 sm:px-8 md:pb-20 md:pt-32">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-brand-secondary/60">Limited launch collection</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight text-brand-secondary sm:text-6xl md:text-7xl">
            Quiet power.
            <br />
            Precision in motion.
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-accent bg-brand-accent px-7 text-xs font-medium uppercase tracking-[0.16em] text-black transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-accent/90"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/story"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
            >
              Brand Story
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-3 sm:px-8 md:pb-32">
        {[
          "Technical performance fabrics",
          "Tailored silhouettes and clean lines",
          "Small-batch exclusivity for members",
        ].map((detail, idx) => (
          <Reveal key={detail} delay={0.15 * idx}>
            <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm leading-7 text-brand-secondary/75">{detail}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
