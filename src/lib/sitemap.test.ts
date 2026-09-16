import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FORMULAS } from "./formulas/index";

const BASE = "https://bartekdeveloper.github.io/wzornik";

describe("sitemap", () => {
  it("covers every registered formula", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    expect(xml).toMatch(/<urlset/);
    for (const f of FORMULAS) {
      expect(xml).toContain(`${BASE}/wzornik/${f.subject}/${f.id}`);
    }
  });

  it("lists core pages", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    for (const p of ["", "/wzornik", "/konwerter", "/historia", "/ustawienia"]) {
      expect(xml).toContain(`${BASE}${p}`);
    }
  });
});
