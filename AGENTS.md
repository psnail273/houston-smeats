<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SMEATS

Pre-order site for Houston's Smoked Meats, St. Louis. `CONTEXT.md` defines the domain language (Smoke, Available Amount, Pickup Slot…): use its terms in code, copy and commits. Decisions live in `docs/adr/`.

## Layout

- `src/app/` holds routes. A page loads data and composes components.
- `src/components/zine/` is the design system: the page shell (`ZinePage`), the tokens (`zine.css`) and the shared pieces.
- `src/components/<feature>/` holds one folder per feature (`home/`, `order/`). Homepage copy lives in `home/content.tsx`.
- `src/lib/` is logic that doesn't depend on React, plus the seams to unbuilt systems: `menu.ts` (placeholder data until the database exists) and `checkout.ts` (checkout isn't built yet).

Several agents work in parallel, so keep each change inside its feature folder. Edits to `zine/` reach every page: keep them small and focused.

## Styling

- Each component styles itself with a sibling CSS Module. Shared tokens and utilities live only in `zine.css`.
- Every color is a token. The page has two prints, day and night: it follows the OS until the visitor flips the coin, which sets `data-print` on `.zine`. A themed color is one `light-dark(day, night)` token, and non-color switches (`--night`, `--blend`, `--show-day`) are set in the print blocks in `zine.css`.
- Paper pieces (cards, notes, receipts) use `--paper-ink`, so they read in both prints.
- Every animation has a reduced-motion outcome: `zine.css` stops CSS motion, and scripted motion checks `useReducedMotion`. Page-wide transitions use `flood()`, an overlay; view-transition snapshots stalled and flashed in Orca's embedded browser.

## Interaction rules

- Clicking anything that isn't interactive slaps a sticker (`ZinePage`). Interactive things are real buttons or links, so they never slap. Stickers appear only when a visitor slaps them; the page starts clean.
- Anything that moves on hover does something unique on click, and names the action with `data-cursor="VERB"` for the ink cursor.

## Done

`npm run typecheck`, `npm run lint` and `npm run build` pass, and the page has been checked in a browser at 390px and 1440px wide, in both prints and with reduced motion.

Earlier homepage directions are kept on branch `prototype/homepage-directions`; its commit message records why this one won.
