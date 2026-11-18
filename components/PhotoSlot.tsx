import Image from "next/image";

type Props = {
  /** What photo goes here. Shown on the placeholder until `src` is set. */
  note: string;
  src?: string;
  alt?: string;
  ratio?: "3/2" | "4/5" | "1/1" | "16/9";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Slot heading shown on the placeholder, e.g. "Before · Kitchen project 1". */
  slot?: string;
  /** Optional small caption under a real image, e.g. to mark an illustrative image. */
  credit?: string;
  /** Narrow slots (e.g. half of a before/after pair): show only the heading on phones. */
  compact?: boolean;
};

const ratioClass = {
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

export function PhotoSlot({ note, src, alt, ratio = "3/2", tone = "light", className = "", priority, sizes = "(min-width: 1024px) 50vw, 100vw", slot = "Real job photo", credit, compact = false }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-stone-200 ${ratioClass[ratio]} ${className}`}>
        <Image src={src} alt={alt ?? note} fill sizes={sizes} priority={priority} className="object-cover" />
        {credit && <span className="label absolute bottom-2 left-2 bg-ink/70 px-2 py-1 text-[11px] text-plaster">{credit}</span>}
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photo placeholder (${slot}): ${note}`}
      data-placeholder
      className={`relative flex flex-col justify-end overflow-hidden ${ratioClass[ratio]} ${dark ? "hatch-dark text-stone-200" : "hatch-light text-stone-600"} ${className}`}
    >
      <div className={`m-2 border border-dashed p-2.5 sm:m-4 sm:p-3 ${dark ? "border-stone-500 bg-ink/70" : "border-brick bg-plaster/90"}`}>
        <p className={`label ${dark ? "text-brick-on-dark" : "text-brick-dark"}`}>{slot}</p>
        <p className={`mt-1 text-small ${compact ? "hidden sm:block" : ""} ${dark ? "text-plaster" : "text-ink-2"}`}>{note}</p>
        <p className={`mt-1 text-[13px] leading-snug ${dark ? "text-stone-200" : "text-stone-600"}`}>
          {compact ? <span className="sm:hidden">Donavan&apos;s photo</span> : null}
          <span className={compact ? "hidden sm:inline" : ""}>Donavan&apos;s own photo. No stock.</span>
        </p>
      </div>
    </div>
  );
}
