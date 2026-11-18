import { PhotoSlot } from "./PhotoSlot";

/**
 * Static before/after pair for one of Donavan's real projects: two slots side by
 * side on a 1px grout line. Used where a generic single image used to be.
 * (The draggable comparison is <BeforeAfter>.)
 */
export function ProjectPair({
  project,
  before,
  after,
  ratio = "4/5",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  caption,
}: {
  /** e.g. "Kitchen project 1" */
  project: string;
  before: { note: string; src?: string; alt?: string };
  after: { note: string; src?: string; alt?: string };
  ratio?: "4/5" | "1/1" | "3/2";
  sizes?: string;
  priority?: boolean;
  caption?: string;
}) {
  return (
    <figure>
      <div className="grout grid-cols-2">
        <div className="relative">
          <PhotoSlot slot={`Before · ${project}`} note={before.note} src={before.src} alt={before.alt} ratio={ratio} tone="dark" sizes={sizes} priority={priority} compact />
          {before.src && <span className="label pointer-events-none absolute left-2 top-2 bg-ink/70 px-2 py-1 text-plaster">Before</span>}
        </div>
        <div className="relative">
          <PhotoSlot slot={`After · ${project}`} note={after.note} src={after.src} alt={after.alt} ratio={ratio} sizes={sizes} priority={priority} compact />
          {after.src && <span className="label pointer-events-none absolute right-2 top-2 bg-ink/70 px-2 py-1 text-plaster">After</span>}
        </div>
      </div>
      {caption && <figcaption className="label mt-3 border-t border-stone-200 pt-3 text-stone-600">{caption}</figcaption>}
    </figure>
  );
}
