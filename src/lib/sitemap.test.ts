import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FORMULAS } from "./formulas/index";
import { BASE_URL, siteUrls } from "./seo";

describe("sitemap", () => {
  it("covers every registered formula", () => {
    const urls = siteUrls();
    for (const f of FORMULAS) {
      expect(urls).toContain(`${BASE_URL}/wzornik/${f.subject}/${f.id}`);
    }
  });

  it("lists core pages and subject indexes", () => {
    const urls = siteUrls();
    for (const p of [
      "/",
      "/wzornik",
      "/wzornik/matematyka",
      "/wzornik/fizyka",
      "/wzornik/chemia",
      "/wzornik/geografia",
      "/zadanie",
      "/konwerter",
      "/historia",
      "/ustawienia",
    ]) {
      expect(urls).toContain(`${BASE_URL}${p}`);
    }
  });

  it("has no duplicates", () => {
    const urls = siteUrls();
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("committed public/sitemap.xml matches the generator", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    expect(xml).toMatch(/<urlset/);
    for (const u of siteUrls()) {
      expect(xml).toContain(u);
    }
  });
});
