// Every text pairing the tokens promise must pass WCAG AA (4.5:1), in both
// palettes. Reads tokens.css directly so the test can't drift from it.
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8");
const hex = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  assert.ok(m, `missing --${name}`);
  return m[1];
};

const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const text = ["ink", "ink-2", "muted", "ok", "warn", "err", "accent-pact", "accent-bench", "accent-touchstone"];
const grounds = ["paper", "sheet", "hover"];

for (const scheme of ["light", "dark"]) {
  for (const fg of text) {
    for (const bg of grounds) {
      test(`${scheme}: ${fg} on ${bg} >= 4.5`, () => {
        const r = ratio(hex(`pact-${scheme}-${fg}`), hex(`pact-${scheme}-${bg}`));
        assert.ok(r >= 4.5, `${r.toFixed(2)}:1`);
      });
    }
  }
  for (const fg of ["code-fg", "code-muted"]) {
    test(`${scheme}: ${fg} on code-bg >= 4.5`, () => {
      const r = ratio(hex(`pact-${scheme}-${fg}`), hex(`pact-${scheme}-code-bg`));
      assert.ok(r >= 4.5, `${r.toFixed(2)}:1`);
    });
  }
}
