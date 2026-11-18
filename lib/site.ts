/**
 * Single source of truth for business facts.
 *
 * Anything set to `null` is UNCONFIRMED. The UI renders a dashed brick
 * placeholder in its place, and the LocalBusiness schema leaves it out, so
 * no unverified fact ever reaches Google. Fill these in once Donavan confirms them.
 *
 * Do NOT add prices, reviews/ratings or a license number until confirmed.
 */

export type Phone = { display: string; e164: string };

export const site = {
  name: "From the Ground Up Construction",
  owner: "Donavan Jack",
  city: "New York City",

  /** PLACEHOLDER: production domain. Set NEXT_PUBLIC_SITE_URL in the deploy env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  /** PLACEHOLDER: e.g. { display: "(718) 555-0123", e164: "+17185550123" } */
  phone: null as Phone | null,

  /** PLACEHOLDER: one-line service area for the Home subhead, e.g. "Brooklyn, Queens and Manhattan" */
  serviceAreaLine: null as string | null,

  /** PLACEHOLDER: confirmed neighborhoods/boroughs. Until set, the Areas section shows `areasDraft`, marked as unconfirmed. */
  areas: null as string[] | null,
  areasDraft: ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"],

  /** PLACEHOLDER: e.g. "Mon–Fri 8am–6pm · Sat by appointment" */
  hours: null as string | null,

  /** PLACEHOLDER: NYC DCWP Home Improvement Contractor license number. Do not publish until confirmed. */
  license: null as string | null,

  /** PLACEHOLDER: path to logo file in /public, e.g. "/logo.svg" */
  logo: null as string | null,
} as const;

export const nav = [
  { href: "/kitchen-remodeling", label: "Kitchen Remodeling", short: "Kitchens" },
  { href: "/bathroom-remodeling", label: "Bathroom Remodeling", short: "Bathrooms" },
  { href: "/about", label: "About", short: "About" },
] as const;

export const projectTypes = ["Kitchen", "Bathroom", "Both", "Other"] as const;
export const contactTimes = ["Morning", "Midday", "Evening", "Anytime"] as const;

/** The 5-step "how a remodel works", used on Home and About. */
export const processSteps = [
  {
    label: "Call",
    title: "Start with a phone call.",
    body: "Tell us about the room: what's wrong with it, what you want instead, and roughly when. We'll set a time to come see it.",
  },
  {
    label: "Free in-home estimate",
    title: "We measure the real room.",
    body: "We come to your home, look at the plumbing, wiring and walls, and talk through options. The estimate is free.",
  },
  {
    label: "Design & selections",
    title: "Layout first, then the finishes.",
    body: "We lock the layout, then you choose cabinets, tile, counters and fixtures. Everything is settled before demo day.",
  },
  {
    label: "The build",
    title: "Gutted, rebuilt, closed up.",
    body: "Demo, rough plumbing and electrical, walls, then tile and finishes. Each stage is checked before the next one starts.",
  },
  {
    label: "Final walk-through",
    title: "We walk it together.",
    body: "We go through the finished room with you, fix anything on the punch list, and hand it back clean.",
  },
] as const;
