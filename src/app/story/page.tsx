export default function StoryPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Our Story</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-semibold uppercase tracking-[0.03em] text-brand-secondary sm:text-6xl">
        Designed for athletes who train in every condition.
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
              "Every seam and silhouette is intentional to create a confident technical profile in motion.",
          },
          {
            title: "Exclusive Production",
            description:
              "Limited drops and print-on-demand manufacturing minimize waste while preserving rarity.",
          },
        ].map((block) => (
          <article key={block.title} className="rounded-2xl border border-brand-line bg-brand-surface/45 p-6">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.03em] text-brand-secondary">{block.title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-secondary/70">{block.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
