# From the Ground Up Construction: website

Next.js 16 (App Router) + Tailwind CSS 4. Four pages: Home, Kitchen Remodeling, Bathroom Remodeling, About.
Visual rules live in [design-system.md](design-system.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before launch: placeholders to fill

Placeholders show on the page as **dashed brick boxes**. Search the code for `PLACEHOLDER` or `data-placeholder` to find them all.

| What | Where | Notes |
|---|---|---|
| Phone number | `lib/site.ts` → `phone` | Turns on the real `tel:` link everywhere and adds `telephone` to the schema |
| Service area | `lib/site.ts` → `serviceAreaLine`, `areas` | Home subhead, spec strip, Areas section, footer, schema `areaServed` |
| Hours | `lib/site.ts` → `hours` | Footer, About |
| Logo | `lib/site.ts` → `logo` (file in `/public`) | Replaces the typeset wordmark |
| License number | `lib/site.ts` → `license` | **Only once Donavan confirms it** |
| Insurance | `app/about/page.tsx` | Fact sheet row |
| Donavan's bio | `app/about/page.tsx` | 2–4 sentences in his words |
| Project photos | `ProjectPair`, `BeforeAfter`, timeline `photoSrc` | Every slot is labeled (e.g. "Before · Kitchen project 1"). Add `src` (files in `/public/images`). Donavan's own photos only, no stock. Before/after pairs must share the same camera position |
| Hero image | `public/images/hero-kitchen.webp` | AI-generated illustration, tagged "Illustrative image" on the page. Swap for a real finished project when one is available, and drop the `credit` prop |
| Analytics | `NEXT_PUBLIC_GA_ID` env var | Optional. GA4 loads **only after** a visitor clicks Accept in the cookie banner |
| Before/after captions | `lib/services.ts`, `app/page.tsx` | `[NEIGHBORHOOD]`, `[SCOPE]` |
| Domain | `NEXT_PUBLIC_SITE_URL` env var | Until set, every page is `noindex` and robots.txt disallows crawling |
| Lead delivery | `app/api/estimate/route.ts` | Currently validates and **logs only**. Connect email/SMS/CRM before launch |

Also confirm with Donavan:
- The "what's included" scope lists in `lib/services.ts`
- The wording of the 5 process steps in `lib/site.ts`

No prices, reviews or ratings are on the site, and none are in the schema. Keep it that way until he confirms them.

## How it's built

- `lib/site.ts`: business facts. `null` means unconfirmed: the page shows a placeholder and the schema omits the field.
- `lib/schema.ts`: LocalBusiness JSON-LD (`HomeAndConstructionBusiness`), rendered on every page.
- `components/Header.tsx`: fixed header that shrinks after 80px of scroll; tap-to-call always visible.
- `components/Estimate.tsx`: the "Get a free estimate" dialog, shared by every page.
- `components/BeforeAfter.tsx`: drag-to-compare slider (pointer, touch, keyboard).
- `components/RemodelTimeline.tsx`: pinned scroll timeline on desktop, stacked list on mobile and with reduced motion.
- `components/Consent.tsx`: cookie banner. No analytics script is requested until Accept; Decline (equal weight) loads nothing; "Cookie settings" in the footer reopens it; withdrawing clears `_ga` cookies.
- `components/ProjectPair.tsx`: static before/after slots for one project.
- `components/SectionHeader.tsx`: the only scroll reveal (rule draws, eyebrow slides, heading wipes).
