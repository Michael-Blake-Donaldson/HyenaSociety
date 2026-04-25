import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-8 md:py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">404</p>
      <h1 className="mt-6 font-serif text-4xl text-brand-secondary sm:text-6xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
        The page you requested is unavailable or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-7 text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90"
      >
        Back to home
      </Link>
    </section>
  );
}
