import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return ["", "/kitchen-remodeling", "/bathroom-remodeling", "/about"].map((p) => ({
    url: `${base}${p || "/"}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
