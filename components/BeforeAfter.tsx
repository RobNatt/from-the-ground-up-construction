"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsLR } from "./icons";

type Shot = { note: string; src?: string; alt?: string };

/**
 * Drag-to-compare before/after slider (design-system §6.2).
 * Pointer Events with capture; touch-action: pan-y so the page still scrolls vertically.
 * The divider follows the pointer 1:1. A single hint nudge plays on first view.
 * Keyboard: role="slider", arrows ±5, Home/End.
 */
export function BeforeAfter({
  before,
  after,
  caption,
  ratio = "3/2",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  hint = true,
}: {
  before: Shot;
  after: Shot;
  caption?: string;
  ratio?: "3/2" | "4/5";
  sizes?: string;
  hint?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  // One-time hint nudge: 50 → 42 → 50 over 900ms. Skipped for reduced motion or once the user has interacted.
  useEffect(() => {
    if (!hint || !wrap.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start) / 900);
          setPos(50 - 8 * Math.sin(Math.PI * ease(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(wrap.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hint]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
    touched.current = true;
    if (step !== undefined) {
      e.preventDefault();
      setPos((p) => Math.min(100, Math.max(0, p + step)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  const aspect = ratio === "4/5" ? "aspect-[4/5]" : "aspect-[3/2]";

  return (
    <figure>
      <div
        ref={wrap}
        className={`relative select-none overflow-hidden bg-stone-200 ${aspect} cursor-ew-resize`}
        style={{ touchAction: "pan-y", WebkitUserSelect: "none" }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          touched.current = true;
          if (e.pointerType === "touch") {
            // Don't move yet: the finger might be scrolling the page. Decide on first movement.
            touchStart.current = { x: e.clientX, y: e.clientY };
            return;
          }
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => {
          const t = touchStart.current;
          if (t && !dragging.current) {
            const dx = Math.abs(e.clientX - t.x);
            const dy = Math.abs(e.clientY - t.y);
            if (dx > 6 && dx > dy) {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
            } else if (dy > 6) {
              touchStart.current = null; // vertical: let the page scroll
              return;
            } else return;
          }
          if (dragging.current) setFromX(e.clientX);
        }}
        onPointerUp={(e) => {
          if (touchStart.current && !dragging.current) setFromX(e.clientX); // a tap jumps the divider
          touchStart.current = null;
          dragging.current = false;
        }}
        onPointerCancel={() => {
          touchStart.current = null;
          dragging.current = false;
        }}
      >
        <Panel shot={before} kind="before" sizes={sizes} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Panel shot={after} kind="after" sizes={sizes} />
        </div>

        <span className="label pointer-events-none absolute left-3 top-3 bg-ink/70 px-2 py-1 text-plaster">Before</span>
        <span className="label pointer-events-none absolute right-3 top-3 bg-ink/70 px-2 py-1 text-plaster">After</span>

        {/* Divider + handle */}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-plaster" style={{ left: `${pos}%` }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
          onKeyDown={onKey}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-tile bg-ink text-plaster outline outline-1 outline-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick-on-dark"
          style={{ left: `${pos}%` }}
        >
          <ChevronsLR />
        </div>
      </div>
      {caption && <figcaption className="label mt-3 border-t border-stone-200 pt-3 text-stone-600">{caption}</figcaption>}
    </figure>
  );
}

function Panel({ shot, kind, sizes }: { shot: Shot; kind: "before" | "after"; sizes: string }) {
  if (shot.src) {
    return <Image src={shot.src} alt={shot.alt ?? shot.note} fill sizes={sizes} draggable={false} className="object-cover" />;
  }
  const dark = kind === "before";
  return (
    <div
      data-placeholder
      aria-label={`${kind} photo placeholder (Donavan's real job photo): ${shot.note}`}
      role="img"
      className={`absolute inset-0 flex items-end ${dark ? "hatch-dark" : "hatch-light"} ${dark ? "justify-start" : "justify-end"}`}
    >
      <div className={`m-2 max-w-[46%] border border-dashed p-2 sm:m-4 sm:max-w-[44%] sm:p-3 ${dark ? "border-stone-500 bg-ink/75" : "border-brick bg-plaster/90"}`}>
        <p className={`label text-[11px] sm:text-[13px] ${dark ? "text-brick-on-dark" : "text-brick-dark"}`}>{kind} · real job photo</p>
        <p className={`mt-1 hidden text-small sm:block ${dark ? "text-plaster" : "text-ink-2"}`}>{shot.note}</p>
      </div>
    </div>
  );
}
