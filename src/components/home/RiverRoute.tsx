"use client";

// The River Route: a river that draws itself down the page as you scroll, with
// the riverboat riding its tip past the flip cards. The route is laid out in
// pixels for the current box, so the drawn river and the boat share one geometry.

import { useEffect, useRef } from "react";
import { Steamboat } from "@/components/illustrations";
import { FlipCards, type Step } from "@/components/zine/FlipCards";
import { useReducedMotion } from "@/lib/hooks";
import s from "./RiverRoute.module.css";

// The route in a 1000×1400 box. Absolute M/C/S commands only, so the numbers alternate x, y.
const ROUTE = "M500 30C160 150 170 320 470 400S880 580 560 720S100 910 430 1040S860 1260 520 1420";
const scalePath = (d: string, sx: number, sy: number) => {
  let i = 0;
  return d.replace(/-?\d*\.?\d+/g, (n) => (+n * (i++ % 2 ? sy : sx)).toFixed(1));
};

export function RiverRoute({ steps, tipLabel }: { steps: Step[]; tipLabel: string }) {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const boat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = box.current;
    const ship = boat.current;
    const paths = Array.from(svg.current?.querySelectorAll("path") ?? []);
    const [, ...drawn] = paths; // [ghost, edge, river]: the ghost always shows the whole route
    const river = paths[2];
    if (!wrap || !ship || !river) return;
    let len = 0;
    let raf = 0;
    const draw = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const at = len * (reduced ? 1 : Math.min(1, Math.max(0.02, (innerHeight * 0.6 - r.top) / r.height)));
      for (const p of drawn) p.style.strokeDasharray = `${at} ${len}`;
      const tip = river.getPointAtLength(at);
      const ahead = river.getPointAtLength(Math.min(len, at + 1));
      // The boat art faces left, so mirror it when heading right.
      ship.style.transform = `translate(${tip.x}px, ${tip.y}px) translate(-50%, -62%) scaleX(${ahead.x > tip.x ? -1 : 1})`;
    };
    const layout = () => {
      const d = scalePath(ROUTE, wrap.clientWidth / 1000, wrap.clientHeight / 1400);
      for (const p of paths) p.setAttribute("d", d);
      len = river.getTotalLength();
      draw();
    };
    const queue = () => {
      raf ||= requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    if (!reduced) window.addEventListener("scroll", queue, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
    };
  }, [reduced]);

  return (
    <div ref={box} className={s.route}>
      <svg ref={svg} className={s.map} aria-hidden>
        <path className={s.ghost} />
        <path className={s.edge} />
        <path className={s.river} />
      </svg>
      <div ref={boat} className={s.boat} aria-hidden>
        <Steamboat />
      </div>
      <FlipCards steps={steps} tipLabel={tipLabel} className={s.cards} />
    </div>
  );
}
