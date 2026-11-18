# From the Ground Up Construction: Design System

Kitchen and bath remodeling · New York City · Owner: Donavan Jack

This file is the source of truth for how the site looks, reads and moves. If a page decision isn't covered here, pick the option closest to the two references below, not the option closest to "contractor website."

---

## 1. Direction

### Two references, nothing else

**1. A design-build firm's project case study.** Think of the case-study pages architecture and design-build studios publish: one big photograph per row, a short spec line under it (`Kitchen · Park Slope · 11 weeks`), plenty of margin, and a plain story of the problem, the decisions and the result. Copy is short and specific. Every project is shown as evidence, with nothing that reads as decoration.

**2. A tile showroom's display wall.** Samples sit in a strict grid with thin, even grout lines. Each sample has a small printed label giving the name, the material and the size. It's tactile and orderly, and the material itself provides the color. This is where the site's grids, its 1px "grout" dividers, its label typography and its swatch-like service cards come from.

### What this means in practice

| Do | Don't |
|---|---|
| Full-bleed real project photos, shot level and in daylight | Stock photos of hard hats, handshakes or blueprints |
| Spec lines: borough, scope, weeks, square footage | Unsupported claims like "Quality you can trust" |
| Thin 1px grout-line grids and hairline rules | Drop shadows, gradients, glassmorphism |
| Square or 2px corners, like cut tile | Pill buttons, bubbly 16px+ radii |
| One accent color, used sparingly | Orange-and-black "construction" palettes, caution stripes |
| Donavan's name and face on the about and contact pages | A faceless "our team" |

### Voice in one line
Plain, specific and from New York: *"We gut it, we rebuild it, and we tell you what it costs before we start."*

---

## 2. Color

### Palette

| Token | Hex | Role |
|---|---|---|
| `--plaster` | `#F6F2EB` | Page background. Warm off-white, like fresh skim coat. |
| `--limestone` | `#ECE7DF` | Alternate section background, cards. |
| `--stone-200` | `#DDD6CB` | Grout lines, dividers, image placeholders. **Decorative only.** |
| `--stone-500` | `#857D71` | Form-field borders, disabled icons. Meets 3:1 for non-text UI. |
| `--stone-600` | `#6E675D` | Secondary text, captions, spec lines. |
| `--ink` | `#1D1B18` | Primary text, headings, dark sections, footer. |
| `--ink-2` | `#3A3632` | Body text on long reads (slightly softer than ink). |
| `--walnut` | `#5A3A26` | Secondary tone: label text, section eyebrows, timeline rail, secondary buttons. |
| `--walnut-light` | `#8A6247` | Walnut hover/tint, large display numerals only. |
| `--brick` | `#A63F27` | **The one accent.** Primary CTA, tap-to-call, active states, links. |
| `--brick-dark` | `#86321F` | CTA hover/pressed, accent text on light tints. |
| `--brick-tint` | `#F3E3DC` | Very light accent wash: focused rows, selected chips. |
| `--brick-on-dark` | `#D9785C` | Accent text and links on `--ink` backgrounds only. |

### Usage proportions
Use roughly **70% plaster/limestone, 20% ink, 7% walnut and 3% brick.** If brick shows up more than about twice in one viewport, it no longer works as an accent. Remove one.

### Contrast check (WCAG 2.2, computed)

| Pair | Ratio | Passes |
|---|---|---|
| ink on plaster | 15.40 | AAA |
| ink on limestone | 13.96 | AAA |
| ink-2 on plaster | 10.73 | AAA |
| walnut on plaster | 9.10 | AAA |
| walnut on limestone | 8.25 | AAA |
| brick-dark on plaster | 7.56 | AAA |
| white on brick-dark | 8.43 | AAA |
| white on brick (CTA) | 6.25 | AA (AAA at large size) |
| brick on plaster (links) | 5.60 | AA |
| brick on limestone | 5.08 | AA |
| stone-600 on plaster | 5.00 | AA |
| stone-600 on limestone | 4.54 | AA (just). Avoid going below 14px here. |
| walnut-light on plaster | 4.80 | AA. Display numerals only. |
| brick-on-dark on ink | 5.56 | AA |
| stone-500 border on plaster | 3.64 | Passes the 3:1 non-text check |

**Two pairs were rejected while building this:**
- `--brick` on `--ink` scores **2.75**, which fails. On dark sections, accent text uses `--brick-on-dark`. A solid brick *button* on ink is fine, because its white label carries the contrast.
- `--stone-200`/`#B5ADA1` on plaster scores **1.99**, which fails for UI. Grout lines can be decorative, but anything a user has to see to operate (input borders, slider handle outlines) uses `--stone-500` or darker.

### Dark sections
Dark is used on purpose, not as a theme toggle. There are three dark surfaces: the remodel timeline's "gutted" stage, the final CTA band and the footer. Each one uses `--ink` with plaster text, stone-200 for secondary text (10.4:1 on ink) and `--brick-on-dark` for accent text.

---

## 3. Typography

### Families

| Role | Family | Weights | Why |
|---|---|---|---|
| Display & headings | **Barlow Condensed** | 600, 700 | Derived from California highway signage: sturdy, narrow, built rather than styled. The narrow width suits long NYC neighborhood names and fits big headlines on a phone. |
| Body & UI | **Source Sans 3** | 400, 600 | A humanist sans with open apertures, warmer than Inter or Roboto. It stays readable at 16px in long project write-ups and doesn't compete with the condensed heads. |
| Labels & specs | Barlow Condensed | 500, uppercase, +0.08em tracking | The tile-sample label: `PORCELAIN · 24×48 · MATTE`. Uses the same family as the headings, so the site loads only two families. |

Both families are on Google Fonts. Load only those weights, with `font-display: swap`. Fallbacks:

```css
--font-display: "Barlow Condensed", "Arial Narrow", "Roboto Condensed", sans-serif;
--font-body: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
```

### Pairing check
- **Contrast of form:** condensed geometric-grotesque heads against open humanist body text. The two are clearly different and don't fight. This holds up better than pairing Barlow Condensed with regular Barlow, which reads as one voice that changes width.
- **x-height:** the two are similar (around 0.5 of the em), so heads and body sit together cleanly in cards and spec lines.
- **Mood fit:** utilitarian heads read as "built for real," and the humanist body reads as warm and personal. Together they avoid both the generic SaaS look (Inter everywhere) and the cliché contractor look (Impact or stencil fonts).
- **Rule:** never set Barlow Condensed below 14px, and never set body copy in it. Never use Source Sans 3 for display sizes above 32px.

### Type scale (fluid, 360px → 1440px)

| Token | Size | Line height | Family / weight | Use |
|---|---|---|---|---|
| `--t-display` | `clamp(3rem, 2rem + 5vw, 6rem)` | 0.95 | Condensed 700, uppercase | Hero headline only |
| `--t-h1` | `clamp(2.5rem, 1.9rem + 3vw, 4.5rem)` | 1.0 | Condensed 700 | Page titles |
| `--t-h2` | `clamp(2rem, 1.6rem + 2vw, 3.25rem)` | 1.05 | Condensed 600 | Section headers |
| `--t-h3` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` | 1.15 | Condensed 600 | Card titles, timeline stage names |
| `--t-lead` | `1.25rem` | 1.5 | Source Sans 400 | Intro paragraphs |
| `--t-body` | `1.0625rem` (17px) | 1.6 | Source Sans 400 | Body text |
| `--t-small` | `0.9375rem` | 1.5 | Source Sans 400 | Captions, form help |
| `--t-label` | `0.8125rem` | 1.2 | Condensed 500, uppercase, `letter-spacing: .08em` | Eyebrows, spec lines, tags |

- Measure: body text is capped at `68ch`.
- Headings use `text-wrap: balance`; body uses `text-wrap: pretty`.
- Numerals in spec lines and timelines use `font-variant-numeric: tabular-nums`.

---

## 4. Space, grid & shape

### Spacing (8px base)
`--s-1: 4px` · `--s-2: 8px` · `--s-3: 12px` · `--s-4: 16px` · `--s-5: 24px` · `--s-6: 32px` · `--s-7: 48px` · `--s-8: 64px` · `--s-9: 96px` · `--s-10: 144px`

Section padding: `clamp(64px, 10vw, 144px)` vertical. Page gutter: `16px` on mobile, `clamp(24px, 4vw, 64px)` on desktop. Max content width: `1280px`. Full-bleed imagery may break out of it.

### Grid: the display wall
- 12 columns, `gap: 1px`, on a `--stone-200` background. The 1px gap shows through as a grout line between tiles. This is the signature move: services, gallery thumbnails and material callouts all sit on this grid.
- Tiles are `--plaster` or `--limestone`, padded `--s-6`.
- On mobile the grid collapses to 1 column (2 for gallery thumbs), and the grout lines stay.

### Shape
- Radius: `--r-0: 0` (images, tiles, sections) and `--r-1: 2px` (buttons, inputs, chips). Nothing rounder.
- Borders: `1px solid` only. Hairline rules (`--stone-200`) separate spec lines from captions.
- Shadows: none. The only exception is the sticky header once it's scrolled, which gets `0 1px 0 var(--stone-200)`, a line rather than a blur.

### Imagery
- Aspect ratios: `3:2` for project heroes, `4:5` for gallery tiles, `1:1` for material swatches.
- Photos are shot level, in daylight where possible, with lights on and no people posing. Apply no filters, no duotones and no overlays except where text sits on an image: then use a bottom-up `--ink` gradient at 0→60%.
- Every photo has a spec caption in `--t-label`: `PRIMARY BATH · BED-STUY · 6 WEEKS`.
- Before/after pairs must share the same camera position. If a project has no matched pair, it doesn't get a slider.

---

## 5. Components

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--brick` | `#FFF` | none | `--brick-dark` |
| Secondary | transparent | `--walnut` | `1px --walnut` | bg `--walnut`, text plaster |
| Text link | none | `--brick` | 1px underline, offset 3px | `--brick-dark`, underline thickness 2px |
| On dark | `--brick` | `#FFF` | none | `--brick-dark` |

- Label: Barlow Condensed 600, uppercase, `letter-spacing: .06em`, 16px.
- Size: min height 48px, horizontal padding `--s-5`. The touch target is never under 44×44.
- Focus: `outline: 2px solid var(--brick); outline-offset: 3px` on light surfaces, `--brick-on-dark` on dark ones. Always visible with `:focus-visible`.

### Spec line
```
KITCHEN  ·  PARK SLOPE  ·  11 WEEKS  ·  180 SQ FT
```
Uses `--t-label` in `--stone-600`, with a `--brick` dot separator or plain `·`. It sits under a hairline rule. Every project card, case-study hero and gallery image has one.

### Service tile (display-wall card)
A grout-grid tile containing a 1:1 material-texture photo (tile, wood, stone) on top, then an `--t-h3` title, a one-line description and a `--t-label` material line at the bottom. On hover, the image scales `1.02` over 400ms and the title underline draws in. No lift, no shadow.

### Project case-study page
Follows reference #1 exactly:
1. Full-bleed 3:2 hero with a spec line
2. "The room": the problem, ≤ 80 words
3. Before/after slider
4. "Decisions": 3–5 short items, each pairing a material swatch and label with a sentence
5. The remodel timeline, if photos exist for each stage
6. Grout-grid gallery
7. CTA band

### Forms (estimate request)
- Labels sit above fields in `--t-small` 600, in ink. Placeholder text is never used as a label.
- Fields: `--plaster` background, `1px --stone-500` border, 2px radius, 48px height. Focus state: `--brick` border plus a 2px `--brick-tint` ring.
- Errors appear inline in `--brick-dark` with an icon and text. Color alone is never the signal.
- Ask only for name, phone, borough/zip, room type (chips: Kitchen / Bath / Both) and an optional message with an optional photo upload.

### Iconography
Use 1.5px stroke line icons (Lucide or Phosphor "regular") in `--walnut`. Keep them small and functional: phone, arrow, check, plus. No illustrated icons and no emoji.

---

## 6. Motion

The rule: **motion explains the remodel and gets out of the way everywhere else.** Only four things move: the header, the before/after slider, the remodel timeline and section-header reveals. Nothing else animates on scroll.

### Tokens
```css
--ease-out: cubic-bezier(.22, .61, .36, 1);   /* most UI */
--ease-in-out: cubic-bezier(.65, 0, .35, 1);  /* timeline stage swaps */
--dur-fast: 150ms;   /* hovers, focus */
--dur-base: 250ms;   /* header shrink */
--dur-slow: 500ms;   /* reveals, stage crossfades */
```
Animate `transform` and `opacity` only. Never animate width, height, top or left.

### 6.1 Sticky header that shrinks, with tap-to-call always visible

| State | Height | Logo | Background | Bottom edge |
|---|---|---|---|---|
| Top of page | 88px desktop / 72px mobile | Full lockup | `--plaster` at 0% (transparent over the hero) | none |
| Scrolled > 80px | 64px desktop / 56px mobile | Compact mark | `--plaster` at 96% + `backdrop-filter: blur(8px)` | `0 1px 0 --stone-200` |

- **Trigger:** an IntersectionObserver on an 80px sentinel at the top of `<body>`, not a scroll listener. It toggles `[data-scrolled]`.
- **Transition:** the header is `position: fixed`, so its height change doesn't reflow the page and a `height` transition is allowed here (the only exception to the transform/opacity rule). The logo's subline collapses and the mark shrinks. All at `--dur-base` with `--ease-out`.
- **Tap-to-call is never hidden.** It's in the header at every scroll position and every breakpoint:
  - Desktop: a primary brick button, phone icon plus the full number: `(XXX) XXX-XXXX`.
  - Mobile: a 48×48 brick button with a phone icon **and** the visible text "Call", which stays visible while the nav collapses into a menu button. It's a real `<a href="tel:+1XXXXXXXXXX">`.
- Over the dark hero, header text is plaster. It flips to ink when `[data-scrolled]` is set.
- The header doesn't hide on scroll-down. It stays put so the call button never disappears.

### 6.2 Drag-to-compare before/after slider

- **Structure:** two stacked images of the same size. The "after" image is clipped with `clip-path: inset(0 0 0 var(--pos))`. A vertical 2px plaster divider and a 48×48 handle sit at `--pos`.
- **Handle:** an `--ink` square with a 2px radius, white left/right chevrons and a `1px --stone-500` outline. Labels `BEFORE` and `AFTER` in `--t-label` sit in the top corners on `--ink` at 70%.
- **Start position:** 50%. On first entering the viewport, play a single "hint" nudge: 50% → 42% → 50% over 900ms with `--ease-in-out`. Play it once per page, never in a loop.
- **Input:** Pointer Events (`pointerdown` / `pointermove` / `pointerup` with `setPointerCapture`). Use `touch-action: pan-y` on the container so vertical page scroll still works on phones. Clicking anywhere on the image jumps the divider there.
- **Following the pointer:** the divider tracks the pointer 1:1 with no easing while dragging. Easing feels laggy on a physical drag.
- **Keyboard and assistive tech:** the handle is `role="slider"` with `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow`, and `aria-label="Before and after comparison"`. Left and right arrows move it 5%, Home and End move it to 0 and 100, and it has a visible focus ring.
- **Reduced motion:** skip the hint nudge. Dragging still works.

### 6.3 Remodel timeline: gutted room to finished space

The scrolling centerpiece, used on the homepage and on case studies that have stage photos.

**Stages (5):**

| # | Label | Surface | Copy focus |
|---|---|---|---|
| 01 | DEMO | `--ink` (dark) | Down to studs, haul-out, protection of common areas |
| 02 | ROUGH-IN | `--ink` → `--ink-2` | Plumbing, electrical, DOB permits |
| 03 | CLOSE-UP | `--walnut` | Board, waterproofing, inspections |
| 04 | FINISHES | `--limestone` | Tile, cabinets, stone, fixtures |
| 05 | HANDOVER | `--plaster` | Walkthrough, punch list, warranty |

The background moves from dark to light as the room comes together. That gradual brightening is the visual story, so the stage colors carry most of the meaning.

**Behavior (desktop ≥ 1024px):**
- The section is `5 × 100vh` tall, with a sticky inner stage at `top: 0; height: 100vh`.
- Left column (sticky): a single photo frame at 4:5. Same camera angle across all five photos.
- Right column: a vertical walnut rail (2px) with five stage markers. The active marker fills brick, and completed markers fill walnut.
- Scroll progress comes from a **CSS scroll-driven animation** (`animation-timeline: view()`) where supported, falling back to IntersectionObserver with 5 thresholds. Each stage boundary crossfades the photo (`opacity`, `--dur-slow`, `--ease-in-out`) and steps the rail fill.
- The rail fill is `transform: scaleY(progress)` with `transform-origin: top`. It moves continuously while photos step at discrete boundaries.
- Stage text changes with a 16px upward translate and fade, at `--dur-slow`.

**Mobile (< 1024px):** no pinning. Each stage becomes a normal stacked block: label, photo, two lines of copy, with the rail running down the left edge. Rail fill still follows scroll. Pinned scroll-jacking on phones is not allowed.

**Reduced motion:** all five stages render as a static stacked list with no crossfades, and the rail is fully filled.

### 6.4 Section header reveals (the only scroll reveal)

- Applies **only** to section eyebrows (`--t-label`) and `h2` section headers. It does not apply to body copy, cards, images or buttons.
- Effect (not a plain fade-up): a 48px brick rule draws in from the left (`scaleX 0 → 1`), the eyebrow slides in from the left (80ms delay), then the h2 is wiped on left to right with `clip-path: inset(0 100% 0 0) → inset(0)` (160ms delay, 750ms, `--ease-step`), like a course of tile being laid.
- Plays once when 20% of the header is in view, and never replays on scroll-up.
- Content is visible by default. The hidden starting state is applied only when JS has added a `.js-reveal` class to `<html>`, so nothing stays invisible if scripts fail.

### 6.5 Reduced motion (global)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Plus the per-component fallbacks above. The header still changes size under reduced motion, but instantly.

---

## 7. Token sheet (paste-ready)

```css
:root {
  /* color */
  --plaster: #F6F2EB;
  --limestone: #ECE7DF;
  --stone-200: #DDD6CB;
  --stone-500: #857D71;
  --stone-600: #6E675D;
  --ink: #1D1B18;
  --ink-2: #3A3632;
  --walnut: #5A3A26;
  --walnut-light: #8A6247;
  --brick: #A63F27;
  --brick-dark: #86321F;
  --brick-tint: #F3E3DC;
  --brick-on-dark: #D9785C;

  /* type */
  --font-display: "Barlow Condensed", "Arial Narrow", "Roboto Condensed", sans-serif;
  --font-body: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
  --t-display: clamp(3rem, 2rem + 5vw, 6rem);
  --t-h1: clamp(2.5rem, 1.9rem + 3vw, 4.5rem);
  --t-h2: clamp(2rem, 1.6rem + 2vw, 3.25rem);
  --t-h3: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  --t-lead: 1.25rem;
  --t-body: 1.0625rem;
  --t-small: 0.9375rem;
  --t-label: 0.8125rem;

  /* space */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 24px;
  --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 144px;
  --gutter: clamp(16px, 4vw, 64px);
  --max-w: 1280px;

  /* shape */
  --r-0: 0;
  --r-1: 2px;
  --grout: 1px;

  /* motion */
  --ease-out: cubic-bezier(.22, .61, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 500ms;
}

body {
  background: var(--plaster);
  color: var(--ink-2);
  font: 400 var(--t-body)/1.6 var(--font-body);
}
```

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

---

## 8. Pre-launch checklist

- [ ] Tap-to-call is visible in the header at every scroll position on a 360px-wide phone
- [ ] No brick text on ink (use `--brick-on-dark`)
- [ ] Every project photo has a spec line
- [ ] Before/after pairs share the same camera angle; the slider works by keyboard and screen reader
- [ ] The timeline doesn't pin on mobile; reduced motion shows a static list
- [ ] Scroll reveals only on section eyebrows and h2s
- [ ] No radius above 2px, no shadows, no gradients except the image-text scrim
- [ ] Brick appears at most twice per viewport
- [ ] Body text is ≥ 17px and the measure is ≤ 68ch
- [ ] Real phone number, a real `tel:` link and NAP that matches Google Business Profile
