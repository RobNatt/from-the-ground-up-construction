import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Logo placeholder: typeset wordmark plus a dashed "LOGO" mark until site.logo is set.
 * On phones the wordmark stacks onto two lines so the header fits at 320px
 * with tap-to-call and the menu button both visible.
 */
export function Logo({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  if (site.logo) {
    return <Image src={site.logo} alt={site.name} width={compact ? 120 : 180} height={compact ? 32 : 48} priority className="h-auto max-w-[40vw] sm:max-w-none" />;
  }
  return (
    <span className="flex items-center gap-2 sm:gap-3" data-placeholder title="Logo placeholder">
      <span
        aria-hidden
        className={`grid size-8 shrink-0 place-items-center border border-dashed font-display text-[9px] font-semibold tracking-widest transition-[width,height] duration-[250ms] ease-out-soft sm:text-[10px] ${
          onDark ? "border-brick-on-dark text-brick-on-dark" : "border-brick text-brick-dark"
        } ${compact ? "sm:size-9" : "sm:size-11"}`}
      >
        LOGO
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-bold uppercase leading-[0.95] tracking-wide sm:text-2xl sm:leading-none ${onDark ? "text-plaster" : "text-ink"}`}>
          From the <br className="sm:hidden" />
          Ground Up
        </span>
        <span
          className={`label mt-1 hidden overflow-hidden transition-[max-height,opacity] duration-[250ms] ease-out-soft sm:block ${
            onDark ? "text-stone-200" : "text-walnut"
          } ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
        >
          Construction · NYC
        </span>
      </span>
    </span>
  );
}
