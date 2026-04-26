import type { MetadataRoute } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, frequency: "daily" as const },
    { path: "/collection", priority: 0.9, frequency: "weekly" as const },
    { path: "/story", priority: 0.7, frequency: "monthly" as const },
    { path: "/account", priority: 0.6, frequency: "weekly" as const },
    { path: "/orders", priority: 0.6, frequency: "weekly" as const },
    { path: "/checkout", priority: 0.8, frequency: "daily" as const },
    { path: "/contact", priority: 0.7, frequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, frequency: "monthly" as const },
    { path: "/terms", priority: 0.5, frequency: "monthly" as const },
    { path: "/refunds", priority: 0.5, frequency: "monthly" as const },
    { path: "/shipping", priority: 0.5, frequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, frequency }) => ({
    url: `${appUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority,
  }));
}
