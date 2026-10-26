# @pact-safety/tokens

The shared color, type and shape tokens for every [PACT](https://pact-safety.org) tool, so bench, Touchstone and pact-safety.org read as one family.

- `tokens.css`: CSS variables. Light and dark palettes, plus resolved tokens that follow the OS color scheme.
- `tailwind.css`: a Tailwind v4 theme mapping those variables to utilities (`bg-paper`, `text-muted`, `font-display`).

Every text pairing passes WCAG AA (4.5:1) in both palettes. `npm test` checks it, so a change that breaks contrast fails CI.

## Use

```bash
npm install github:pact-safety/tokens#v0.1.0
```

```css
@import "tailwindcss";
@import "@pact-safety/tokens/tokens.css";
@import "@pact-safety/tokens/tailwind.css";
```

Without a build step, link `tokens.css` directly, or vendor a tagged copy.

On `<html>`:
- `data-pact-product="bench"` or `"touchstone"` picks the product accent. Without it, the accent is PACT blue.
- `data-pact-theme="light"` or `"dark"` forces one palette. Without it, the page follows the OS setting.

Load the faces yourself. On Google Fonts they are Martian Mono (display), IBM Plex Mono (UI and code) and IBM Plex Sans (body).

## Rules

- Use the resolved tokens (`--pact-ink`, `--pact-accent`). Reach for the raw `--pact-light-*` and `--pact-dark-*` palettes only when an app runs its own theme switching and must pin one palette.
- One accent per product, used for links, focus and the one thing that should stand out. Status colors (`ok`, `warn`, `err`) mean state only, never decoration.
- Change a value here, run `npm test`, tag a release, then bump consumers.

| Product | Light accent | Dark accent |
| --- | --- | --- |
| PACT | `#2443C4` | `#9DB0FF` |
| bench | `#8F5B00` | `#E8B339` |
| Touchstone | `#A8401F` | `#F08A6E` |
