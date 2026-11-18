import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { Ph } from "@/components/Ph";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProjectPair } from "@/components/ProjectPair";
import { RemodelTimeline } from "@/components/RemodelTimeline";
import { SectionHeader } from "@/components/SectionHeader";
import { localBusinessSchema } from "@/lib/schema";
import { processSteps, site } from "@/lib/site";

const description =
  "Kitchen and bath remodeling in NYC by From the Ground Up Construction. Full kitchen and bathroom remodels, from demo to final walk-through. Free in-home estimates.";

export const metadata: Metadata = {
  title: { absolute: `Kitchen and Bath Remodeling NYC | ${site.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: `Kitchen and Bath Remodeling NYC | ${site.name}`, description, url: "/" },
};

const services = [
  {
    href: "/kitchen-remodeling",
    num: "01",
    room: "Kitchens",
    title: "Kitchen remodeling",
    body: "Layout, plumbing, electrical, cabinets, counters, backsplash and floors. The whole room, taken back to the studs and built new.",
    spec: "Cabinets · Counters · Tile · Plumbing · Lighting",
    project: "Kitchen project 1",
    before: "Kitchen before demo, wide shot",
    after: "Same kitchen finished, same spot",
    ratio: "1/1" as const,
    span: "lg:col-span-7",
  },
  {
    href: "/bathroom-remodeling",
    num: "02",
    room: "Bathrooms",
    title: "Bathroom remodeling",
    body: "Plumbing, waterproofing, tile, vanity and fixtures, done in the right order so it stays dry for years.",
    spec: "Waterproofing · Tile · Vanity · Fixtures",
    project: "Bathroom project 1",
    before: "Bathroom before demo, from the doorway",
    after: "Same bathroom finished, same spot",
    ratio: "4/5" as const,
    span: "lg:col-span-5",
  },
];

export default function Home() {
  const areas = site.areas ?? site.areasDraft;

  return (
    <>
      <JsonLd data={localBusinessSchema("/")} />

      {/* Hero */}
      <section className="pt-8 md:pt-12">
        <div className="wrap grid gap-10 pb-16 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="label text-walnut">Kitchen and bath remodeling · New York City</p>
            <h1 className="mt-4 max-w-[15ch] text-display font-bold uppercase text-ink">
              Kitchens and baths, built right from the ground up.
            </h1>
            <p className="mt-8 max-w-[44ch] text-lead text-ink-2">
              Full kitchen and bathroom remodels for homes in {site.serviceAreaLine ?? <Ph>service area</Ph>}. Owned and run by {site.owner}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EstimateButton />
              <CallLink tone="secondary" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:-mr-[var(--gutter)]">
            <PhotoSlot
              src="/images/hero-kitchen.webp"
              note="Finished kitchen in a New York apartment"
              alt="Remodeled apartment kitchen with walnut cabinets, limestone counters and a terracotta tile backsplash, lit by a window overlooking a brick fire escape"
              credit="Illustrative image"
              ratio="4/5"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Spec strip: grout-line row of quick facts */}
      <div className="wrap">
        <dl className="grout grid-cols-2 lg:grid-cols-4">
          {[
            ["Kitchens", "Full remodels"],
            ["Bathrooms", "Full remodels"],
            ["Estimates", "Free, in your home"],
            ["Area", site.serviceAreaLine ?? <Ph key="a">To confirm</Ph>],
          ].map(([k, v], i) => (
            <div key={i} className="bg-plaster px-4 py-5 sm:px-6">
              <dt className="label text-stone-600">{k}</dt>
              <dd className="mt-1 font-display text-xl font-semibold uppercase text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Two services, side by side, unequal widths like samples on a display wall */}
      <section aria-labelledby="services" className="section-y">
        <div className="wrap">
          <SectionHeader id="services" eyebrow="What we build" title="Two rooms. Done completely." />
          <div className="grout mt-12 lg:grid-cols-12">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className={`group flex flex-col bg-plaster p-4 sm:p-6 ${s.span}`}>
                <ProjectPair project={s.project} before={{ note: s.before }} after={{ note: s.after }} ratio={s.ratio} sizes="(min-width: 1024px) 25vw, 50vw" />
                <div className="flex flex-1 flex-col pt-6">
                  <p className="label text-brick">
                    {s.num} · {s.room}
                  </p>
                  <h3 className="mt-2 text-h3 font-semibold uppercase text-ink">
                    <span className="draw-underline">{s.title}</span>
                  </h3>
                  <p className="mt-3 max-w-[48ch]">{s.body}</p>
                  <div className="mt-auto pt-6">
                    <p className="label border-t border-stone-200 pt-4 text-stone-600">{s.spec}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wide text-walnut group-hover:text-brick">
                    See {s.title.toLowerCase()} <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* One line for other renovation work */}
          <p className="mt-6 flex flex-col gap-1 border-y border-stone-200 py-4 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="label shrink-0 text-walnut">Other work</span>
            <span>
              Something besides a kitchen or bath? We take on other renovation work case by case. Ask when you call.
            </span>
          </p>
        </div>
      </section>

      {/* Before & after */}
      <section aria-labelledby="before-after" className="section-y bg-limestone">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <BeforeAfter
              before={{ note: "Before: same room, gutted or original condition" }}
              after={{ note: "After: finished room, same camera position" }}
              caption="[ROOM] · [NEIGHBORHOOD] · [SCOPE]"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-4">
            <SectionHeader
              id="before-after"
              eyebrow="Before & after"
              title="Drag the line."
              intro={<p>Same room, same camera, before demo and after the walk-through.</p>}
            />
          </div>
        </div>
      </section>

      {/* How a remodel works: steps from first call to finished room */}
      <section aria-labelledby="process" id="how-it-works">
        <div className="wrap pb-12 pt-20 md:pt-28">
          <SectionHeader
            id="process"
            eyebrow="How a remodel works"
            title="Five steps from the first call to the finished room."
          />
        </div>
        <RemodelTimeline stages={processSteps} ariaLabel="How a remodel works, five steps" />
      </section>

      {/* Areas served */}
      <section aria-labelledby="areas" className="section-y border-t border-stone-200">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="areas" eyebrow="Areas served" title="Remodeling homes across New York City." />
            {!site.areas && (
              <p className="mt-6 text-small">
                <Ph>Service area not confirmed. Boroughs shown as a draft.</Ph>
              </p>
            )}
          </div>
          <ul className="grout grid-cols-2 self-start sm:grid-cols-3 lg:col-span-7">
            {areas.map((a) => (
              <li key={a} className="bg-plaster px-4 py-6 sm:px-6">
                <span className="label text-stone-600">NYC</span>
                <span className="mt-1 block font-display text-2xl font-semibold uppercase text-ink">{a}</span>
              </li>
            ))}
            <li className="bg-limestone px-4 py-6 sm:px-6">
              <span className="label text-stone-600">Not listed?</span>
              <span className="mt-1 block">Call and ask.</span>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
