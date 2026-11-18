"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoSlot } from "./PhotoSlot";

export type TimelineStage = {
  label: string;
  title: string;
  body: string;
  photoNote?: string;
  photoSrc?: string;
};

/* Surfaces go from dark (gutted) to light (finished): design-system §6.3 */
const SURFACES = [
  { hex: "#1d1b18", bg: "bg-ink", dark: true },
  { hex: "#3a3632", bg: "bg-ink-2", dark: true },
  { hex: "#5a3a26", bg: "bg-walnut", dark: true },
  { hex: "#ece7df", bg: "bg-limestone", dark: false },
  { hex: "#f6f2eb", bg: "bg-plaster", dark: false },
];
const surfaceFor = (i: number, n: number) => SURFACES[Math.round((i / Math.max(1, n - 1)) * (SURFACES.length - 1))];
const pad = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Steps from gutted room to finished space as you scroll.
 * - Desktop (≥1024px) with motion allowed: pinned stage, rail fills continuously, stages step at boundaries.
 * - Mobile, reduced motion, and server render: a normal stacked list (no scroll-jacking).
 */
export function RemodelTimeline({ stages, ariaLabel }: { stages: readonly TimelineStage[]; ariaLabel: string }) {
  const [mode, setMode] = useState<"static" | "pinned">("static");
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const n = stages.length;
  const hasPhotos = stages.some((s) => s.photoNote || s.photoSrc);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(rm.matches);
      setMode(wide.matches && !rm.matches ? "pinned" : "static");
    };
    update();
    wide.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "pinned") {
        const headerSm = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h-sm")) || 64;
        const total = r.height - (vh - headerSm);
        setProgress(clamp((headerSm - r.top) / total));
      } else {
        setProgress(clamp((vh * 0.6 - r.top) / r.height));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode, reduced]);

  const fill = reduced ? 1 : progress;

  if (mode === "pinned") {
    const active = Math.min(n - 1, Math.floor(progress * n));
    const s = surfaceFor(active, n);
    const dark = s.dark;
    return (
      <div ref={ref} className="relative" style={{ height: `${n * 85}vh` }} role="region" aria-label={ariaLabel}>
        <div
          className={`sticky top-[var(--header-h-sm)] h-[calc(100vh-var(--header-h-sm))] overflow-hidden transition-colors duration-500 ease-step ${dark ? "on-dark" : ""}`}
          style={{ backgroundColor: s.hex }}
        >
          <div className="wrap grid h-full grid-cols-12 items-center gap-8">
            {/* Left: photo stack, or a rolling stage numeral when there are no photos */}
            <div className="col-span-6 flex h-full items-center">
              {hasPhotos ? (
                <div className="relative aspect-[4/5] h-[min(72vh,640px)]">
                  {stages.map((st, i) => (
                    <div
                      key={st.label}
                      className="absolute inset-0 transition-opacity duration-500 ease-step"
                      style={{ opacity: i === active ? 1 : 0 }}
                      aria-hidden={i !== active}
                    >
                      <PhotoSlot slot={`Job photo · ${st.label} stage`} note={st.photoNote ?? st.title} src={st.photoSrc} ratio="4/5" tone={surfaceFor(i, n).dark ? "dark" : "light"} className="h-full" sizes="40vw" />
                    </div>
                  ))}
                  <p className={`label absolute -bottom-8 left-0 transition-colors duration-500 ${dark ? "text-stone-200" : "text-stone-600"}`}>
                    Stage {pad(active)} of {pad(n - 1)} · {stages[active].label}
                  </p>
                </div>
              ) : (
                <div aria-hidden className="relative h-[clamp(10rem,24vw,20rem)] overflow-hidden">
                  <div className="transition-transform duration-500 ease-step" style={{ transform: `translateY(-${(active * 100) / n}%)` }}>
                    {stages.map((st, i) => (
                      <div
                        key={st.label}
                        className={`h-[clamp(10rem,24vw,20rem)] font-display text-[clamp(10rem,24vw,20rem)] font-bold leading-[1] tracking-tight tabular-nums transition-colors duration-500 ${
                          dark ? "text-plaster" : "text-ink"
                        }`}
                      >
                        {pad(i)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: walnut rail with stage markers */}
            <ol className="relative col-span-5 col-start-8 space-y-1">
              <span aria-hidden className={`absolute bottom-3 left-[11px] top-3 w-0.5 ${dark ? "bg-stone-500/40" : "bg-stone-200"}`} />
              <span
                aria-hidden
                className={`absolute bottom-3 left-[11px] top-3 w-0.5 origin-top ${dark ? "bg-brick-on-dark" : "bg-walnut"}`}
                style={{ transform: `scaleY(${fill})` }}
              />
              {stages.map((st, i) => {
                const isActive = i === active;
                const done = i < active;
                return (
                  <li key={st.label} className="relative pl-12" aria-current={isActive ? "step" : undefined}>
                    <span
                      aria-hidden
                      className={`absolute left-0 top-2.5 size-6 border-2 transition-colors duration-300 ${
                        isActive ? "border-brick bg-brick" : done ? (dark ? "border-brick-on-dark bg-brick-on-dark" : "border-walnut bg-walnut") : dark ? "border-stone-500 bg-transparent" : "border-stone-500 bg-plaster"
                      }`}
                    />
                    <p className={`label pt-3 transition-colors duration-300 ${isActive ? (dark ? "text-brick-on-dark" : "text-brick") : dark ? "text-stone-200" : "text-stone-600"}`}>
                      {pad(i)} · {st.label}
                    </p>
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-step"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <h3 className={`mt-2 text-h3 font-semibold ${dark ? "text-plaster" : "text-ink"}`}>{st.title}</h3>
                        <p className={`mt-2 max-w-[42ch] pb-4 ${dark ? "text-stone-200" : "text-ink-2"}`}>{st.body}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Static stacked list: mobile, reduced motion, and the server-rendered default.
  return (
    <div ref={ref} className="relative" role="region" aria-label={ariaLabel}>
      <ol>
        {stages.map((st, i) => {
          const s = surfaceFor(i, n);
          const reached = fill >= i / n;
          return (
            <li key={st.label} className={`${s.bg} ${s.dark ? "on-dark" : ""}`}>
              <div className={`wrap relative grid gap-6 py-12 sm:py-16 ${hasPhotos ? "md:grid-cols-12 md:items-center md:gap-10" : ""}`}>
                {/* Rail segment spans the whole stage band (padding included) so segments meet
                    edge to edge. First starts at its marker; last ends at its marker. */}
                {[s.dark ? "bg-stone-500/40" : "bg-stone-200", s.dark ? "bg-brick-on-dark" : "bg-walnut"].map((color, layer) => (
                  <span
                    key={layer}
                    aria-hidden
                    className={`absolute left-[calc(var(--gutter)+11px)] w-0.5 origin-top ${color} ${layer ? "transition-transform duration-300" : ""} ${
                      i === n - 1 ? "top-0 h-[60px] sm:h-[76px]" : i === 0 ? "bottom-0 top-[60px] sm:top-[76px]" : "inset-y-0"
                    }`}
                    style={layer ? { transform: `scaleY(${reached ? 1 : 0})` } : undefined}
                  />
                ))}
                <div className={`relative pl-12 ${hasPhotos ? "md:col-span-6" : ""}`}>
                  <span aria-hidden className={`absolute left-0 top-0 size-6 border-2 ${reached ? "border-brick bg-brick" : s.dark ? "border-stone-500" : "border-stone-500 bg-plaster"}`} />
                  <p className={`label ${s.dark ? "text-brick-on-dark" : "text-brick"}`}>
                    {pad(i)} · {st.label}
                  </p>
                  <h3 className={`mt-2 text-h3 font-semibold ${s.dark ? "text-plaster" : "text-ink"}`}>{st.title}</h3>
                  <p className={`mt-2 max-w-[48ch] ${s.dark ? "text-stone-200" : "text-ink-2"}`}>{st.body}</p>
                </div>
                {hasPhotos && (
                  <div className="pl-12 md:col-span-5 md:col-start-8 md:pl-0">
                    <PhotoSlot slot={`Job photo · ${st.label} stage`} note={st.photoNote ?? st.title} src={st.photoSrc} ratio="3/2" tone={s.dark ? "dark" : "light"} sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
