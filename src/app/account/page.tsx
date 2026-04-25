import { AccountPanel } from "@/components/account/account-panel";

export default function AccountPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <div className="mb-12 space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Member Access</p>
        <h1 className="font-serif text-4xl text-brand-secondary sm:text-6xl">Account</h1>
        <p className="max-w-2xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
          Manage identity, review order history, and access future VIP drops.
        </p>
      </div>

      <AccountPanel />
    </section>
  );
}
