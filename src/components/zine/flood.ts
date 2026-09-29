import { flushSync } from "react-dom";

let flooding = false;
const nextFrame = () => new Promise(requestAnimationFrame);

/** Floods `--flood` ink over the screen from `origin`, commits `update` under full cover, then fades the ink.
 *  Uses a plain overlay rather than view-transition snapshots, which stalled and flashed in some embedded
 *  browsers. Instant under reduced motion; calls made mid-flood are ignored. */
export function flood(origin: Element, update: () => void) {
  if (flooding) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return update();
  flooding = true;
  const { left, top, width, height } = origin.getBoundingClientRect();
  const at = `at ${left + width / 2}px ${top + height / 2}px`;
  const ink = Object.assign(document.createElement("div"), { className: "z-ink" });
  (origin.closest(".zine") ?? document.body).append(ink);
  ink.style.backgroundColor = getComputedStyle(ink).backgroundColor; // pin it: the update changes --flood
  ink
    .animate({ clipPath: [`circle(0 ${at})`, `circle(150vmax ${at})`] }, { duration: 450, easing: "cubic-bezier(.55,0,.3,1)", fill: "forwards" })
    .finished.then(async () => {
      flushSync(update);
      await nextFrame(); // let the new print paint under the ink before revealing it
      await nextFrame();
      return ink.animate({ opacity: [1, 0] }, { duration: 380, easing: "ease-out", fill: "forwards" }).finished;
    })
    .finally(() => {
      ink.remove();
      flooding = false;
    });
}
