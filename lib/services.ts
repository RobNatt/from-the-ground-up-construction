/**
 * Kitchen and bathroom page content.
 * The "included" scope lists are a starting draft. Donavan should confirm
 * each line matches what he actually does before launch.
 */

export type Stage = {
  label: string;
  title: string;
  body: string;
  /** Description of the photo that belongs in this slot (shown until a real photo is added). */
  photoNote: string;
  photoSrc?: string;
};

export type Service = {
  slug: "kitchen-remodeling" | "bathroom-remodeling";
  room: "Kitchen" | "Bathroom";
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroPair: { before: string; after: string; caption: string };
  included: { item: string; detail: string }[];
  includedNote: string;
  beforeAfter: { before: string; after: string; caption: string }[];
  stages: Stage[];
  sibling: { href: string; label: string };
};

export const kitchen: Service = {
  slug: "kitchen-remodeling",
  room: "Kitchen",
  keyword: "kitchen remodeling NYC",
  metaTitle: "Kitchen Remodeling NYC",
  metaDescription:
    "Full kitchen remodeling in NYC, from demo and rough-in to cabinets, counters, tile and the final walk-through. Request a free in-home estimate.",
  eyebrow: "Kitchen remodeling · NYC",
  h1: "Kitchen remodeling in NYC, from demo to the last cabinet pull.",
  lead: "We take the old kitchen out down to the studs, fix what's behind the walls, and build the new one with the layout, cabinets and finishes you picked before we started.",
  heroPair: { before: "Kitchen as found, wide shot, counter height", after: "Same kitchen finished, same camera spot", caption: "KITCHEN · [NEIGHBORHOOD] · [SCOPE]" },
  included: [
    { item: "Demo & haul-away", detail: "Old cabinets, counters, flooring and debris removed. Common areas protected." },
    { item: "Layout", detail: "Work out where the sink, range, fridge and storage go in the space you have." },
    { item: "Plumbing", detail: "Supply and drain lines moved or replaced to suit the new layout." },
    { item: "Electrical & lighting", detail: "Circuits for appliances, outlets where you need them, under-cabinet and ceiling lighting." },
    { item: "Walls & ceiling", detail: "Repair or replace drywall, patch, prime and paint." },
    { item: "Cabinets", detail: "Supply and install. Leveled, scribed to the walls, hardware on." },
    { item: "Countertops & backsplash", detail: "Template, install and seal counters. Tile backsplash set and grouted." },
    { item: "Flooring", detail: "Subfloor prep and new floor laid through the kitchen." },
    { item: "Fixtures & appliances", detail: "Sink, faucet, disposal and appliances hooked up and tested." },
  ],
  includedNote: "The exact scope is written up at your free in-home estimate.",
  beforeAfter: [
    { before: "Kitchen project 2: before demo, wide shot", after: "Kitchen project 2: finished, same camera spot", caption: "KITCHEN PROJECT 2 · [NEIGHBORHOOD] · [SCOPE]" },
    { before: "Kitchen project 3: sink wall before", after: "Kitchen project 3: sink wall after", caption: "KITCHEN PROJECT 3 · [NEIGHBORHOOD]" },
    { before: "Kitchen project 4: range wall before", after: "Kitchen project 4: range wall after", caption: "KITCHEN PROJECT 4 · [NEIGHBORHOOD]" },
  ],
  stages: [
    { label: "Demo", title: "Down to the studs.", body: "Cabinets, counters and flooring come out. Floors and hallways are protected and debris is hauled away.", photoNote: "Gutted kitchen: open studs, bare subfloor" },
    { label: "Rough-in", title: "What's behind the walls.", body: "New plumbing and electrical go in where the layout needs them, before anything is closed up.", photoNote: "Rough plumbing and wiring in open walls" },
    { label: "Close-up", title: "Walls go back on.", body: "Board, patch and prime. The room starts to look like a room again.", photoNote: "Fresh drywall, primed, no cabinets yet" },
    { label: "Finishes", title: "Cabinets, counters, tile.", body: "Cabinets set and leveled, counters installed, backsplash tiled, flooring laid, fixtures connected.", photoNote: "Cabinets and counters in, backsplash in progress" },
    { label: "Walk-through", title: "Yours again.", body: "We walk the kitchen with you, close out the punch list, and leave it clean.", photoNote: "Finished kitchen, same angle as the demo photo" },
  ],
  sibling: { href: "/bathroom-remodeling", label: "Bathroom remodeling" },
};

export const bathroom: Service = {
  slug: "bathroom-remodeling",
  room: "Bathroom",
  keyword: "bathroom remodeling NYC",
  metaTitle: "Bathroom Remodeling NYC",
  metaDescription:
    "Bathroom remodeling in NYC: demo, plumbing, waterproofing, tile, vanity and fixtures, then a final walk-through. Request a free in-home estimate.",
  eyebrow: "Bathroom remodeling · NYC",
  h1: "Bathroom remodeling in NYC, down to the studs and back.",
  lead: "Most bathroom problems are behind the tile. We open it up, fix the plumbing and waterproofing properly, then build the room back with the tile, vanity and fixtures you chose.",
  heroPair: { before: "Bathroom as found, from the doorway", after: "Same bathroom finished, lights on", caption: "BATHROOM · [NEIGHBORHOOD] · [SCOPE]" },
  included: [
    { item: "Demo & haul-away", detail: "Tile, tub or shower, vanity and toilet removed. Common areas protected." },
    { item: "Plumbing", detail: "Supply and drain lines, shower valve and fixture locations set for the new layout." },
    { item: "Waterproofing", detail: "Membrane on shower walls and floor before any tile goes on." },
    { item: "Electrical & ventilation", detail: "Lighting, outlets where code requires them, and an exhaust fan that vents properly." },
    { item: "Tub or shower", detail: "New tub, or a tiled walk-in shower with glass." },
    { item: "Tile", detail: "Floor and wall tile set, grouted and sealed." },
    { item: "Vanity & storage", detail: "Vanity, top, sink, mirror or medicine cabinet installed." },
    { item: "Fixtures", detail: "Toilet, faucets, shower trim and accessories installed and tested." },
  ],
  includedNote: "The exact scope is written up at your free in-home estimate.",
  beforeAfter: [
    { before: "Bathroom project 2: before demo, from the doorway", after: "Bathroom project 2: finished, same camera spot", caption: "BATHROOM PROJECT 2 · [NEIGHBORHOOD] · [SCOPE]" },
    { before: "Bathroom project 3: shower or tub before", after: "Bathroom project 3: shower after", caption: "BATHROOM PROJECT 3 · [NEIGHBORHOOD]" },
    { before: "Bathroom project 4: vanity wall before", after: "Bathroom project 4: vanity wall after", caption: "BATHROOM PROJECT 4 · [NEIGHBORHOOD]" },
  ],
  stages: [
    { label: "Demo", title: "Tile off, walls open.", body: "Old tile, fixtures and vanity come out. We look at what the walls and floor are really hiding.", photoNote: "Gutted bathroom: studs, old pipes visible" },
    { label: "Rough-in", title: "Pipes and wiring set.", body: "Drains, supply lines, the shower valve, lighting and the fan go exactly where the new layout needs them.", photoNote: "New valve and supply lines in open wall" },
    { label: "Waterproofing", title: "The part you never see.", body: "Backer board and membrane on every wet wall and the shower floor, before a single tile.", photoNote: "Waterproofing membrane on shower walls" },
    { label: "Tile & finishes", title: "Tile, vanity, fixtures.", body: "Tile set and grouted, vanity and top installed, toilet and trim connected and tested.", photoNote: "Tile going up, vanity not yet installed" },
    { label: "Walk-through", title: "Run every tap.", body: "We test everything with you, close out the punch list, and leave the room clean.", photoNote: "Finished bathroom, same angle as the demo photo" },
  ],
  sibling: { href: "/kitchen-remodeling", label: "Kitchen remodeling" },
};
