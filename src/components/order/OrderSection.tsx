"use client";

// "This week's Smoke": each Menu Item with a ticket per Smoke (ready now / next),
// a receipt that prints as pounds are claimed, and the hand-off to checkout.

import { BrisketSlice } from "@/components/illustrations";
import { Arrow } from "@/components/zine/Arrow";
import { Section } from "@/components/zine/Section";
import { Riso } from "@/components/zine/text";
import { startCheckout } from "@/lib/checkout";
import { cx } from "@/lib/cx";
import type { Menu, MenuListing, SmokeAvailability } from "@/lib/menu";
import { fmtLb, useOrderDraft, type SmokeSlot } from "./useOrderDraft";
import s from "./OrderSection.module.css";

export type OrderCopy = { title: string; kicker: string; stub: string };

const SLOTS: SmokeSlot[] = ["now", "next"];

export function OrderSection({ menu, copy }: { menu: Menu; copy: OrderCopy }) {
  const draft = useOrderDraft(menu.orderMaxLb);
  const { slot } = draft;
  const smoke = slot ? (menu.items.find((it) => it[slot])?.[slot] ?? null) : null;
  const lines = menu.items.map((item) => ({ item, lb: slot ? draft.qty(item, slot) : 0 })).filter((l) => l.lb > 0);
  const subtotal = lines.reduce((sum, l) => sum + l.lb * l.item.pricePerLb, 0);
  const checkout = () =>
    smoke && startCheckout({ smoke: smoke.smoke, lines: lines.map((l) => ({ item: l.item.name, lb: l.lb, pricePerLb: l.item.pricePerLb })) });

  return (
    <Section id="order" title={copy.title} kicker={copy.kicker} width={1260}>
      <div className={s.grid}>
        <div>
          {menu.items.map((item) => (
            <article key={item.name}>
              <div className={s.head}>
                <h3 className={cx(s.name, "z-display")}>
                  <Riso text={item.name.toUpperCase()} />
                </h3>
                <span className={s.gunWrap}>
                  <span className={cx(s.gun, "z-display")}>
                    ${item.pricePerLb}
                    <small>/lb</small>
                  </span>
                </span>
              </div>
              <p className={cx(s.blurb, "z-script")}>{item.blurb}</p>
              <Anatomy />
              <div className={s.tickets}>
                {SLOTS.map((slot) => {
                  const offer = item[slot];
                  if (!offer) return null;
                  const lb = draft.qty(item, slot);
                  return (
                    <Ticket
                      key={slot}
                      slot={slot}
                      offer={offer}
                      lb={lb}
                      stub={copy.stub}
                      locked={draft.locked(slot)}
                      canAdd={lb < draft.maxFor(item, slot)}
                      onChange={(d) => draft.change(item, slot, d)}
                      onClear={draft.clear}
                    />
                  );
                })}
              </div>
              <p className={s.fine}>Max {menu.orderMaxLb} lb per item per order · Feeding a crowd? Email Houston.</p>
            </article>
          ))}
        </div>

        <aside className={s.aside}>
          <Receipt lines={lines} smoke={smoke} subtotal={subtotal} />
          <div className={s.cta}>
            <button type="button" className="z-btn z-display" disabled={!draft.totalLb} onClick={checkout}>
              Pick a pickup time →
            </button>
            {draft.totalLb > 0 && (
              <button type="button" className="z-link-btn" onClick={draft.clear}>
                start over
              </button>
            )}
          </div>
        </aside>
      </div>

      {draft.totalLb > 0 && (
        <div className={cx(s.mobileBar, "z-pop")}>
          <span>
            <b>{fmtLb(draft.totalLb)}</b> · ${subtotal.toFixed(2)}
          </span>
          <button type="button" className="z-btn z-btn-sm z-display" onClick={checkout}>
            Pick a time →
          </button>
        </div>
      )}
    </Section>
  );
}

function Anatomy() {
  return (
    <figure className={cx(s.anatomy, "z-reveal")}>
      <BrisketSlice className={s.slice} />
      <span className={cx(s.label, s.bark, "z-hand")}>
        bark <Arrow />
      </span>
      <span className={cx(s.label, s.fat, "z-hand")}>
        rendered fat <Arrow />
      </span>
      <span className={cx(s.label, s.ring, "z-hand")}>
        <Arrow /> smoke ring
      </span>
      <span className={cx(s.label, s.good, "z-hand")}>
        <Arrow /> the good stuff
      </span>
      <figcaption>fig. 1 — anatomy of a slice (not to scale, to taste)</figcaption>
    </figure>
  );
}

function Ticket({
  slot,
  offer,
  lb,
  stub,
  locked,
  canAdd,
  onChange,
  onClear,
}: {
  slot: SmokeSlot;
  offer: SmokeAvailability;
  lb: number;
  stub: string;
  locked: boolean;
  canAdd: boolean;
  onChange: (deltaLb: number) => void;
  onClear: () => void;
}) {
  return (
    <div className={cx(s.ticket, s[slot], lb > 0 && s.on, locked && s.off)}>
      <div className={s.stub} aria-hidden>
        <span className={s.stubNo}>Nº {slot === "now" ? "026" : "027"}</span>
        <span className={s.stubLabel}>{stub}</span>
        {lb > 0 && <span className={cx(s.punch, "z-pop")} />}
      </div>
      <div className={s.main}>
        <span className={cx(s.tag, "z-hand")}>{offer.label}</span>
        <span className={s.when}>
          {offer.smoke} · {offer.when}
        </span>
        <div className={s.left}>
          <b className="z-display">{offer.availableLb}</b>
          <span>
            lb left
            <br />
            of {offer.totalLb}
          </span>
          <Tally lb={offer.availableLb} />
        </div>
        <div className={s.stepper}>
          <button type="button" disabled={locked || lb === 0} onClick={() => onChange(-0.5)} aria-label={`Remove half pound from ${offer.smoke}`}>
            −
          </button>
          <output aria-live="polite">{fmtLb(lb)}</output>
          <button type="button" disabled={locked || !canAdd} onClick={() => onChange(0.5)} aria-label={`Add half pound from ${offer.smoke}`}>
            +
          </button>
        </div>
      </div>
      {locked && (
        <>
          <div className={s.stamp} aria-hidden>
            ONE SMOKE
            <br />
            PER ORDER
          </div>
          <button type="button" className={s.switch} onClick={onClear}>
            clear order to switch
          </button>
        </>
      )}
    </div>
  );
}

/** Tally marks for a number of pounds (a short mark for a half pound). */
function Tally({ lb }: { lb: number }) {
  const whole = Math.floor(lb);
  const groups = Math.floor(whole / 5);
  const singles = whole % 5;
  const stroke = (x: number, k: number) => `M${x} 6Q${x + ((k * 3) % 4) - 1.5} 20 ${x} 34`;
  const marks: string[] = [];
  for (let g = 0; g < groups; g++) {
    for (let k = 0; k < 4; k++) marks.push(stroke(g * 42 + 5 + k * 7, k));
    marks.push(`M${g * 42} 29L${g * 42 + 32} 9`);
  }
  for (let k = 0; k < singles; k++) marks.push(stroke(groups * 42 + 5 + k * 7, k));
  if (lb % 1) marks.push(`M${groups * 42 + 5 + singles * 7} 21V34`);
  const width = groups * 42 + (singles + (lb % 1 ? 1 : 0)) * 7 + 10;
  return (
    <svg viewBox={`0 0 ${width} 40`} className={s.tally} style={{ width }} aria-hidden>
      {marks.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Receipt({ lines, smoke, subtotal }: { lines: { item: MenuListing; lb: number }[]; smoke: SmokeAvailability | null; subtotal: number }) {
  return (
    <div className={s.printer}>
      <div className={s.slot} aria-hidden />
      <div className={s.receiptShadow}>
        <div className={s.receipt} key={`${subtotal}-${smoke?.smoke ?? "none"}`}>
          <p className={cx(s.center, s.big, "z-display")}>SMEATS</p>
          <p className={cx(s.center, s.small)}>
            Houston&apos;s Smoked Meats
            <br />
            St. Louis, MO · Pickup only
          </p>
          <hr />
          <div className={s.row}>
            <span>Smoke</span>
            <span>{smoke ? smoke.when : "— pick one —"}</span>
          </div>
          {lines.length === 0 ? (
            <p className={cx(s.center, s.dim)}>nothing claimed yet</p>
          ) : (
            lines.map(({ item, lb }) => (
              <div className={s.row} key={item.name}>
                <span>
                  {item.name} {fmtLb(lb)} @ ${item.pricePerLb}
                </span>
                <span>${(lb * item.pricePerLb).toFixed(2)}</span>
              </div>
            ))
          )}
          <hr />
          <div className={s.row}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={s.row}>
            <span>Tax</span>
            <span>at checkout</span>
          </div>
          <hr />
          <div className={s.row}>
            <span>Pickup</span>
            <span>choose next</span>
          </div>
          <p className={s.small}>Cancel within 1 hr = full refund</p>
          <div className={s.barcode} aria-hidden />
          <p className={cx(s.center, s.small)}>thank you · come hungry</p>
        </div>
      </div>
    </div>
  );
}
