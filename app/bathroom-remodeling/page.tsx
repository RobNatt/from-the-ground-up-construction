import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServicePage } from "@/components/ServicePage";
import { localBusinessSchema } from "@/lib/schema";
import { bathroom } from "@/lib/services";

export const metadata: Metadata = {
  title: bathroom.metaTitle,
  description: bathroom.metaDescription,
  alternates: { canonical: "/bathroom-remodeling" },
  openGraph: { title: bathroom.metaTitle, description: bathroom.metaDescription, url: "/bathroom-remodeling" },
};

export default function BathroomPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/bathroom-remodeling")} />
      <ServicePage s={bathroom} />
    </>
  );
}
