"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { CallLink } from "./CallLink";
import { EstimateButton } from "./Estimate";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./Logo";

/**
 * Sticky header (design-system §6.1).
 * Shrinks after 80px of scroll (IntersectionObserver on #top-sentinel, no scroll listener).
 * Tap-to-call is visible at every scroll position and every breakpoint.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-[250ms] ease-out-soft ${
        scrolled || menuOpen ? "bg-plaster/95 shadow-[0_1px_0_var(--color-stone-200)] backdrop-blur-sm" : "bg-plaster/0"
      }`}
    >
      {/* Fixed header: its height change doesn't reflow the page, so a height transition is OK here. */}
      <div
        className="wrap flex items-center justify-between gap-4 transition-[height] duration-[250ms] ease-out-soft"
        style={{ height: scrolled ? "var(--header-h-sm)" : "var(--header-h)" }}
      >
        <Link href="/" className="min-w-0 shrink" aria-label="From the Ground Up Construction, home">
          <Logo compact={scrolled} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 font-display text-[17px] font-semibold uppercase tracking-wide transition-colors hover:text-brick ${
                      active ? "text-brick" : "text-ink"
                    } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.short}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <EstimateButton variant="secondary" className="hidden xl:inline-flex" />
          {/* Tap-to-call: number on desktop, "Call" on mobile. Never hidden. */}
          <CallLink className="hidden md:inline-flex" />
          <CallLink variant="compact" className="md:hidden" />
          <button
            type="button"
            className="-mr-2 grid size-12 place-items-center text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-stone-200 bg-plaster lg:hidden">
        <nav aria-label="Mobile" className="wrap py-4">
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-14 items-center font-display text-2xl font-semibold uppercase tracking-wide text-ink aria-[current=page]:text-brick"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <EstimateButton className="mt-5 w-full" />
        </nav>
      </div>
    </header>
  );
}
