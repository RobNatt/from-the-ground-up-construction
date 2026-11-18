import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServicePage } from "@/components/ServicePage";
import { localBusinessSchema } from "@/lib/schema";
import { kitchen } from "@/lib/services";

export const metadata: Metadata = {
  title: kitchen.metaTitle,
  description: kitchen.metaDescription,
  alternates: { canonical: "/kitchen-remodeling" },
  openGraph: { title: kitchen.metaTitle, description: kitchen.metaDescription, url: "/kitchen-remodeling" },
};

export default function KitchenPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/kitchen-remodeling")} />
      <ServicePage s={kitchen} />
    </>
  );
}
