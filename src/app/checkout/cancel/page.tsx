import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-8 md:py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Payment Canceled</p>
      <h1 className="mt-6 font-serif text-4xl text-brand-secondary sm:text-6xl">Your cart is still waiting.</h1>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
        No charge was made. Return to checkout when you are ready.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/checkout"
          className="inline-flex h-12 items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-7 text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90"
        >
          Return to checkout
        </Link>
        <Link
          href="/collection"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
        >
          Back to collection
        </Link>
      </div>
    </section>
  );
}
