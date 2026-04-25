export default function StoryPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Our Story</p>
      <h1 className="mt-5 max-w-4xl font-serif text-4xl text-brand-secondary sm:text-6xl">
        Built for disciplined athletes with elevated taste.
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Material Intelligence",
            description:
              "We source premium performance textiles designed for breathability, structure, and longevity.",
          },
          {
            title: "Minimal by Design",
            description:
              "Every seam and silhouette is intentional to create a calm, powerful presence in motion.",
          },
          {
            title: "Exclusive Production",
            description:
              "Limited drops and print-on-demand manufacturing minimize waste while preserving rarity.",
          },
        ].map((block) => (
          <article key={block.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-2xl text-brand-secondary">{block.title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-secondary/70">{block.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
