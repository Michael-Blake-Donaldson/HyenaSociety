import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <div className="mb-12 space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Operations</p>
        <h1 className="font-serif text-4xl text-brand-secondary sm:text-6xl">Admin Dashboard</h1>
        <p className="max-w-2xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
          Manage products, monitor revenue, and control fulfillment operations.
        </p>
      </div>

      <AdminDashboard />
    </section>
  );
}
