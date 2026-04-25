"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";

type SessionUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: "CUSTOMER" | "ADMIN";
};

type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
};

type AuthMode = "login" | "signup";

const AUTH_TOKEN_KEY = "hyena.auth.token";

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload;
}

export function AccountPanel() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(AUTH_TOKEN_KEY);
  });
  const [user, setUser] = useState<SessionUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void (async () => {
      try {
        const meRes = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await parseJsonResponse<{ user: SessionUser }>(meRes);
        setUser(meData.user);

        const ordersRes = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = await parseJsonResponse<{ orders: Order[] }>(ordersRes);
        setOrders(ordersData.orders);
      } catch {
        setToken(null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    })();
  }, [token]);

  const displayName = useMemo(() => {
    if (!user) return "";
    return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email;
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const body = {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        firstName: String(formData.get("firstName") ?? "") || undefined,
        lastName: String(formData.get("lastName") ?? "") || undefined,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = await parseJsonResponse<{ token: string }>(response);
      localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
      setToken(payload.token);
      setMessage(mode === "login" ? "Welcome back." : "Account created.");
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    setMessage("Signed out.");
  };

  if (user) {
    return (
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Profile</p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-brand-secondary">{displayName}</h2>
          <p className="mt-2 text-sm text-brand-secondary/70">{user.email}</p>
          <p className="mt-6 inline-flex rounded-full border border-brand-accent/60 px-4 py-2 text-xs uppercase tracking-[0.15em] text-brand-accent">
            {user.role}
          </p>

          <button
            type="button"
            onClick={logout}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-xs uppercase tracking-[0.16em] text-brand-secondary/80 transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
          >
            Sign out
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Saved Orders</p>
          <div className="mt-6 space-y-3">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-brand-secondary/65">
                No orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="rounded-2xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-brand-secondary">{order.id.slice(0, 12)}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/55">{order.status}</p>
                  </div>
                  <p className="mt-2 text-sm text-brand-secondary/80">{formatCurrency(order.total / 100)}</p>
                  <p className="mt-2 text-xs text-brand-secondary/50">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
      <div className="flex gap-2 rounded-full border border-white/10 bg-black/60 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors duration-500 ${
            mode === "login" ? "bg-brand-accent text-black" : "text-brand-secondary/70"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors duration-500 ${
            mode === "signup" ? "bg-brand-accent text-black" : "text-brand-secondary/70"
          }`}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
              className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
            />
            <input
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
              className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
            />
          </div>
        ) : null}

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className="h-11 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="h-11 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-accent bg-brand-accent text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Please wait" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

        {message ? (
          <p role="status" aria-live="polite" className="mt-4 text-sm text-brand-accent">
            {message}
          </p>
        ) : null}
    </section>
  );
}
