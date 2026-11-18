import Link from "next/link";
import type { Service } from "@/lib/services";
import { BeforeAfter } from "./BeforeAfter";
import { CallLink } from "./CallLink";
import { CtaBand } from "./CtaBand";
import { EstimateButton } from "./Estimate";
import { ArrowRight } from "./icons";
import { ProjectPair } from "./ProjectPair";
import { RemodelTimeline } from "./RemodelTimeline";
import { SectionHeader } from "./SectionHeader";

export function ServicePage({ s }: { s: Service }) {
  const [feature, ...more] = s.beforeAfter;
  return (
    <>
      {/* Hero: case-study layout. Text left, tall photo right, spec rule under. */}
      <section className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-walnut">{s.eyebrow}</p>
            <h1 className="mt-4 text-h1 font-bold uppercase text-ink">{s.h1}</h1>
            <p className="mt-6 max-w-[56ch] text-lead">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EstimateButton />
              <CallLink tone="secondary" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <ProjectPair
              project={`${s.room} project 1`}
              before={{ note: s.heroPair.before }}
              after={{ note: s.heroPair.after }}
              ratio="4/5"
              priority
              sizes="(min-width: 1024px) 21vw, 50vw"
              caption={s.heroPair.caption}
            />
          </div>
        </div>
      </section>

      {/* What's included: a numbered spec sheet, not icon cards */}
      <section aria-labelledby="included" className="section-y border-t border-stone-200 bg-limestone">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader id="included" eyebrow="What's included" title={`A full ${s.room.toLowerCase()} remodel, start to finish.`} />
              <p className="mt-6 max-w-[40ch] text-stone-600">{s.includedNote}</p>
            </div>
          </div>
          <ol className="border-t border-ink lg:col-span-8">
            {s.included.map((row, i) => (
              <li key={row.item} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-stone-200 py-5 sm:grid-cols-[3rem_14rem_1fr] sm:gap-x-6">
                <span className="label pt-1 text-brick">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[1.375rem] font-semibold uppercase leading-tight text-ink">{row.item}</h3>
                <p className="col-start-2 mt-1 sm:col-start-3 sm:mt-0">{row.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Before & after */}
      <section aria-labelledby="before-after" className="section-y">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeader className="lg:col-span-5" id="before-after" eyebrow="Before & after" title="Same room. Same camera. Drag the line." intro={<p>Every pair is shot from the same spot so you see the change, not a new angle.</p>} />
            <div className="lg:col-span-7">
              <BeforeAfter before={{ note: feature.before }} after={{ note: feature.after }} caption={feature.caption} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </div>
          {more.length > 0 && (
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {more.map((p) => (
                <BeforeAfter key={p.before} before={{ note: p.before }} after={{ note: p.after }} caption={p.caption} ratio="4/5" hint={false} sizes="(min-width: 768px) 45vw, 100vw" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What to expect */}
      <section aria-labelledby="expect" className="border-t border-stone-200">
        <div className="wrap pb-12 pt-20 md:pt-28">
          <SectionHeader id="expect" eyebrow="What to expect" title={`From gutted to finished: how your ${s.room.toLowerCase()} comes together.`} />
        </div>
        <RemodelTimeline stages={s.stages} ariaLabel={`${s.room} remodel stages`} />
      </section>

      <div className="wrap border-t border-stone-200 py-8">
        <Link href={s.sibling.href} className="group inline-flex items-center gap-3 font-display text-xl font-semibold uppercase tracking-wide text-ink hover:text-brick">
          <span className="label text-stone-600">Also</span>
          <span className="draw-underline">{s.sibling.label}</span>
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <CtaBand title={`Let's look at your ${s.room.toLowerCase()}.`} />
    </>
  );
}
