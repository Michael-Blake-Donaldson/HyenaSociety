export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60svh] w-full max-w-7xl flex-col items-center justify-center px-5 py-20 sm:px-8">
      <div className="h-16 w-16 animate-[spin_1.4s_linear_infinite] rounded-full border-2 border-white/20 border-t-brand-accent" />
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Preparing your experience</p>
    </div>
  );
}
