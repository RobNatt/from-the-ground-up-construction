"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Section eyebrow + h2 with the only scroll reveal on the site (design-system §6.4):
 * a brick rule draws across, the eyebrow slides in, then the heading wipes on left to right.
 * Plays once at 20% visibility. Visible by default without JS.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  onDark = false,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  onDark?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal max-w-[44rem] ${className}`} data-in={inView || undefined}>
      <span aria-hidden className={`reveal-rule block h-0.5 w-12 ${onDark ? "bg-brick-on-dark" : "bg-brick"}`} />
      <p className={`reveal-eyebrow label mt-4 ${onDark ? "text-stone-200" : "text-walnut"}`}>{eyebrow}</p>
      <h2 id={id} className={`reveal-title mt-3 text-h2 font-semibold ${onDark ? "text-plaster" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <div className={`mt-5 max-w-[60ch] text-lead ${onDark ? "text-stone-200" : "text-ink-2"}`}>{intro}</div>}
    </div>
  );
}
