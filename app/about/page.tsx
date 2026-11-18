import type { Metadata } from "next";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { Ph } from "@/components/Ph";
import { PhotoSlot } from "@/components/PhotoSlot";
import { SectionHeader } from "@/components/SectionHeader";
import { localBusinessSchema } from "@/lib/schema";
import { processSteps, site } from "@/lib/site";

const description = `${site.owner} owns and runs ${site.name}, a kitchen and bath remodeling company in New York City. Free in-home estimates.`;

export const metadata: Metadata = {
  title: `About ${site.owner}`,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${site.owner} | ${site.name}`, description, url: "/about" },
};

export default function About() {
  const facts: [string, React.ReactNode][] = [
    ["Owner", site.owner],
    ["Work", "Kitchen & bathroom remodeling"],
    ["Based in", "New York City"],
    ["Service area", site.serviceAreaLine ?? <Ph key="sa">Service area</Ph>],
    ["Hours", site.hours ?? <Ph key="h">Hours</Ph>],
    ["License", site.license ? `NYC HIC #${site.license}` : <Ph key="l">License number: publish only once confirmed</Ph>],
    ["Insurance", <Ph key="i">Insurance details: confirm</Ph>],
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema("/about")} />

      {/* Intro: portrait left, text right, offset like a case-study spread */}
      <section className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:order-2 lg:col-span-7 lg:col-start-6">
            <p className="label text-walnut">About</p>
            <h1 className="mt-4 text-h1 font-bold uppercase text-ink">Meet {site.owner}.</h1>
            <p className="mt-6 max-w-[56ch] text-lead">
              {site.owner} owns and runs {site.name}, a kitchen and bathroom remodeling company in New York City.
            </p>
            <p className="mt-4 max-w-[56ch]">
              <Ph>
                Bio: 2–4 sentences in Donavan&apos;s own words. How he got into the trades, how long he&apos;s been remodeling, and what he cares
                about on a job.
              </Ph>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EstimateButton />
              <CallLink tone="secondary" />
            </div>
          </div>
          <div className="lg:order-1 lg:col-span-4">
            <PhotoSlot slot="Portrait of Donavan" note="Donavan on one of his job sites, natural light" ratio="4/5" priority sizes="(min-width: 1024px) 33vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Fact sheet: tile-sample labels */}
      <section aria-labelledby="facts" className="section-y border-t border-stone-200 bg-limestone">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <SectionHeader className="lg:col-span-4" id="facts" eyebrow="The details" title="The company at a glance." />
          <dl className="border-t border-ink lg:col-span-8">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-stone-200 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="label pt-1 text-walnut">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How a project runs: compact version of the 5 steps */}
      <section aria-labelledby="how" className="section-y">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="how" eyebrow="How a project runs" title="Same five steps, every job." />
            <Link href="/#how-it-works" className="link mt-6 inline-flex items-center gap-2">
              See it step by step <ArrowRight className="size-4" />
            </Link>
          </div>
          <ol className="lg:col-span-8">
            {processSteps.map((s, i) => (
              <li key={s.label} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-stone-200 py-6 first:border-t first:border-t-ink">
                <span className="font-display text-5xl font-bold leading-none text-walnut-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="label text-brick">{s.label}</p>
                  <h3 className="mt-1 text-h3 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 max-w-[56ch]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Talk to Donavan about your project." />
    </>
  );
}
