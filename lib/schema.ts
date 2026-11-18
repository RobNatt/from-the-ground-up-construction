import { site } from "./site";

/**
 * LocalBusiness JSON-LD (as HomeAndConstructionBusiness, a LocalBusiness subtype).
 * Unconfirmed fields (null in lib/site.ts) are left out on purpose.
 * No aggregateRating, review or priceRange until Donavan confirms them.
 */
export function localBusinessSchema(pagePath = "/") {
  const base = site.url.replace(/\/$/, "");
  const areas = site.areas;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${base}/#business`,
    name: site.name,
    url: `${base}/`,
    description:
      "Kitchen and bathroom remodeling in New York City. Free in-home estimates.",
    founder: { "@type": "Person", name: site.owner },
    knowsAbout: ["Kitchen remodeling", "Bathroom remodeling"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Remodeling services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen remodeling", url: `${base}/kitchen-remodeling` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom remodeling", url: `${base}/bathroom-remodeling` } },
      ],
    },
    mainEntityOfPage: `${base}${pagePath}`,
  };

  if (site.phone) schema.telephone = site.phone.e164;
  if (site.logo) schema.logo = `${base}${site.logo}`;
  if (areas?.length) {
    schema.areaServed = areas.map((name) => ({ "@type": "Place", name: `${name}, New York, NY` }));
  } else {
    // City-level is true regardless of which boroughs are confirmed.
    schema.areaServed = { "@type": "City", name: "New York" };
  }

  return schema;
}
