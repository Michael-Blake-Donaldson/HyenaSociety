"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

type AdminProduct = {
  id: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  printifyProductId?: string | null;
  variants: Array<{ id: string }>;
};

type AdminOrder = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

type Metrics = {
  orderCount: number;
  paidOrderCount: number;
  revenueCents: number;
  averageOrderValueCents: number;
};

export function AdminDashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    setMessage(null);

    try {
      const [productsRes, ordersRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/orders"),
        fetch("/api/admin/analytics"),
      ]);

      if (!productsRes.ok || !ordersRes.ok || !analyticsRes.ok) {
        throw new Error("Unable to load admin data.");
      }

      const productsData = (await productsRes.json()) as { products: AdminProduct[] };
      const ordersData = (await ordersRes.json()) as { orders: AdminOrder[] };
      const analyticsData = (await analyticsRes.json()) as { metrics: Metrics };

      setProducts(productsData.products);
      setOrders(ordersData.orders);
      setMetrics(analyticsData.metrics);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  const runPrintifySync = async () => {
    setMessage("Syncing Printify catalog...");

    const response = await fetch("/api/admin/printify/sync", {
      method: "POST",
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setMessage(payload.error ?? "Sync failed.");
      return;
    }

    setMessage("Printify sync complete.");
    await fetchData();
  };

  const toggleProduct = async (product: AdminProduct) => {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        isActive: !product.isActive,
      }),
    });

    await fetchData();
  };

  return (
    <div className="space-y-10">
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
        <p className="text-sm text-brand-secondary/75">Load protected admin data and refresh anytime after updates.</p>
        <button
          type="button"
          onClick={() => void fetchData()}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 px-4 text-xs uppercase tracking-[0.14em] text-brand-secondary/80 transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Load dashboard"}
        </button>
      </section>

      {metrics ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Orders", value: String(metrics.orderCount) },
            { label: "Paid Orders", value: String(metrics.paidOrderCount) },
            { label: "Revenue", value: formatCurrency(metrics.revenueCents / 100) },
            { label: "AOV", value: formatCurrency(metrics.averageOrderValueCents / 100) },
          ].map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-white/10 bg-white/3 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/55">{metric.label}</p>
              <p className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-brand-secondary">{metric.value}</p>
            </article>
          ))}
        </section>
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-brand-secondary">Catalog</h2>
          <button
            type="button"
            onClick={runPrintifySync}
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-5 text-xs font-medium uppercase tracking-[0.15em] text-black transition-colors duration-500 hover:bg-brand-accent/90"
          >
            Sync Printify
          </button>
        </div>

        <div className="space-y-3">
          {products.map((product) => (
            <article key={product.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 p-4">
              <div>
                <p className="text-sm text-brand-secondary">{product.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-secondary/55">
                  {formatCurrency(product.basePrice)} • {product.variants.length} variants
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleProduct(product)}
                className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-xs uppercase tracking-[0.14em] transition-colors duration-500 ${
                  product.isActive
                    ? "border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-black"
                    : "border-white/20 text-brand-secondary/70 hover:border-brand-accent hover:text-brand-accent"
                }`}
              >
                {product.isActive ? "Active" : "Inactive"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-brand-secondary">Recent Orders</h2>
        <div className="mt-6 space-y-3">
          {orders.length === 0 ? (
            <p className="text-sm text-brand-secondary/65">No orders yet.</p>
          ) : (
            orders.slice(0, 12).map((order) => (
              <article key={order.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 p-4">
                <div>
                  <p className="text-sm text-brand-secondary">{order.user.email}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-secondary/55">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.status}
                  </p>
                </div>
                <p className="text-sm text-brand-secondary/80">{formatCurrency(order.total / 100)}</p>
              </article>
            ))
          )}
        </div>
      </section>

      {message ? <p className="text-sm text-brand-accent">{message}</p> : null}
    </div>
  );
}
