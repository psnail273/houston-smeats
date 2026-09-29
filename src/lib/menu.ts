// The homepage's view of the menu (terms: see CONTEXT.md). This is placeholder
// data until Smokes and Menu Items live in a database: keep these types and
// replace the body of `getMenu`.

/** What's left of a Menu Item in one Smoke. */
export type SmokeAvailability = {
  smoke: string; // e.g. "Saturday's Smoke"
  label: string; // "Ready now" | "Next Smoke"
  when: string; // Ready Time, human-readable
  availableLb: number; // Available Amount
  totalLb: number; // pounds smoked
};

/** A Menu Item as the homepage lists it: price plus the ready-now and next Smokes. */
export type MenuListing = {
  name: string;
  blurb: string;
  pricePerLb: number;
  now: SmokeAvailability | null;
  next: SmokeAvailability | null;
};

export type Menu = { items: MenuListing[]; orderMaxLb: number };

export async function getMenu(): Promise<Menu> {
  return {
    orderMaxLb: 5,
    items: [
      {
        name: "Brisket",
        blurb: "Prime packer. Salt, pepper, post oak. Fourteen hours on the banks of the Mississippi (well, a backyard near it).",
        pricePerLb: 28,
        now: { smoke: "Sunday's Smoke", label: "Ready now", when: "Smoked Sun 9/27", availableLb: 3, totalLb: 18 },
        next: { smoke: "Saturday's Smoke", label: "Next Smoke", when: "Sat 10/3 · 2:00 PM", availableLb: 12, totalLb: 20 },
      },
    ],
  };
}
