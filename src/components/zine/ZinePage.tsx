"use client";

// The zine page shell. It owns the print (day/night: follows the OS until the
// visitor flips it, shared through usePrint), the scroll-progress bar, the ink
// cursor, and the sticker layer — clicking anything that isn't interactive
// slaps a sticker there.

import { createContext, useContext, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import { flood } from "./flood";
import { InkCursor } from "./InkCursor";
import { Sticker, type StickerKind } from "./Sticker";
import "./zine.css";
import s from "./ZinePage.module.css";

type Print = { night: boolean; flip: (origin: Element) => void };
const PrintContext = createContext<Print>({ night: false, flip: () => {} });

/** The current print and a flip that floods the other one in from `origin`. */
export const usePrint = () => useContext(PrintContext);

type Slap = StickerKind & { id: number; x: number; y: number; r: number; peeling?: boolean };

// Clicks on these never slap a sticker.
const INTERACTIVE = "button, a, input, select, textarea, label, summary, [role=button], [role=slider], [role=dialog]";

export function ZinePage({ stickers, children }: { stickers: StickerKind[]; children: React.ReactNode }) {
  const osNight = useMediaQuery("(prefers-color-scheme: dark)");
  const [print, setPrint] = useState<"day" | "night" | null>(null);
  const night = print ? print === "night" : osNight;
  const flip = (origin: Element) => flood(origin, () => setPrint(night ? "day" : "night"));

  const reduced = useReducedMotion();
  const page = useRef<HTMLElement>(null);
  const [slaps, setSlaps] = useState<Slap[]>([]);
  const count = useRef(0);

  const slap = (e: React.MouseEvent) => {
    const box = page.current?.getBoundingClientRect();
    if (!box || !(e.target instanceof Element) || e.target.closest(INTERACTIVE) || getSelection()?.toString()) return;
    const n = count.current++;
    setSlaps((all) => [
      ...all.slice(-39),
      {
        ...stickers[n % stickers.length],
        id: n,
        x: ((e.clientX - box.left) / box.width) * 100,
        y: e.clientY - box.top,
        r: Math.round(Math.random() * 40 - 20),
      },
    ]);
  };
  const remove = (id: number) => setSlaps((all) => all.filter((t) => t.id !== id));
  const peel = (id: number) => (reduced ? remove(id) : setSlaps((all) => all.map((t) => (t.id === id ? { ...t, peeling: true } : t))));

  return (
    <PrintContext value={{ night, flip }}>
      <main ref={page} className={cx("zine", s.page)} data-print={print ?? undefined} data-cursor="SLAP!" onClick={slap}>
        <div className={s.progress} aria-hidden>
          <i />
        </div>
        <InkCursor />
        {children}
        <div className={s.stickers}>
          {slaps.map((t) => (
            <Sticker
              key={t.id}
              kind={t}
              style={{ left: `${t.x}%`, top: t.y, ["--r" as string]: t.r }}
              peeling={t.peeling}
              onPeel={() => peel(t.id)}
              onPeeled={() => remove(t.id)}
            />
          ))}
        </div>
      </main>
    </PrintContext>
  );
}
