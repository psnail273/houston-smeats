// Seam for the checkout flow (pick a Pickup Slot, then pay with Stripe). Not
// built yet: the order section calls this with the Order being built.

export type OrderDraft = { smoke: string; lines: { item: string; lb: number; pricePerLb: number }[] };

export function startCheckout(draft: OrderDraft) {
  const lb = draft.lines.reduce((sum, l) => sum + l.lb, 0);
  window.alert(`Online checkout is coming soon — email Houston to claim ${lb} lb from ${draft.smoke}.`);
}
