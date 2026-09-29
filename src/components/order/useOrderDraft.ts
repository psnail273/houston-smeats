import { useState } from "react";
import type { MenuListing } from "@/lib/menu";

/** Which of a Menu Item's two listed Smokes a pick comes from. */
export type SmokeSlot = "now" | "next";

/** The Order being built on the homepage (see CONTEXT.md): pounds per Menu Item, all from one Smoke,
 *  in half-pound steps, capped by the Available Amount and the Order Max. */
export function useOrderDraft(orderMaxLb: number) {
  const [slot, setSlot] = useState<SmokeSlot | null>(null);
  const [lbs, setLbs] = useState<Record<string, number>>({});

  const locked = (s: SmokeSlot) => slot !== null && slot !== s; // one Smoke per Order
  const maxFor = (item: MenuListing, s: SmokeSlot) => Math.min(item[s]?.availableLb ?? 0, orderMaxLb);
  const qty = (item: MenuListing, s: SmokeSlot) => (slot === s ? (lbs[item.name] ?? 0) : 0);
  const totalLb = Object.values(lbs).reduce((a, b) => a + b, 0);

  const change = (item: MenuListing, s: SmokeSlot, deltaLb: number) => {
    if (locked(s)) return;
    const lb = Math.max(0, Math.min(maxFor(item, s), Math.round((qty(item, s) + deltaLb) * 2) / 2));
    const next = { ...lbs, [item.name]: lb };
    const total = Object.values(next).reduce((a, b) => a + b, 0);
    setLbs(total ? next : {});
    setSlot(total ? s : null);
  };
  const clear = () => {
    setLbs({});
    setSlot(null);
  };

  return { slot, qty, locked, maxFor, change, clear, totalLb };
}

export const fmtLb = (lb: number) => `${lb % 1 === 0 ? lb : lb.toFixed(1)} lb`;
