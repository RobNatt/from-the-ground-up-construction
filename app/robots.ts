import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const live = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
  return {
    rules: live ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
