import { CallLink } from "./CallLink";
import { EstimateButton } from "./Estimate";

export function CtaBand({ title = "Tell us about the room.", body = "A free in-home estimate starts with a short form or a phone call." }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-ink">
      <div className="wrap grid gap-8 py-20 md:grid-cols-12 md:items-end md:py-28">
        <div className="md:col-span-7">
          <span aria-hidden className="block h-0.5 w-12 bg-brick-on-dark" />
          <h2 id="cta-title" className="mt-5 text-h1 font-bold uppercase text-plaster">{title}</h2>
          <p className="mt-4 max-w-[46ch] text-lead text-stone-200">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <EstimateButton />
          <CallLink tone="secondary" />
        </div>
      </div>
    </section>
  );
}
