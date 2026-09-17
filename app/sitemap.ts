import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://truongviethung.dev";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about` },
    { url: `${base}/projects` },
    { url: `${base}/experience` },
    { url: `${base}/skills` },
    { url: `${base}/contact` },
    { url: `${base}/cv` },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` as string })),
  ];
}
