import type { MetadataRoute } from "next";

const siteUrl = "https://ochelaricluj.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/produse", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/rame", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/lentile", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/configurator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/incarca-reteta", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/recenzii", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/despre", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
