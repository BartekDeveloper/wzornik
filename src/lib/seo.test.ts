import { describe, expect, it } from "vitest";
import { DESCRIPTIONS } from "./descriptions";
import { FORMULAS } from "./formulas/index";
import { BASE_URL, metaFor, siteUrls } from "./seo";

describe("metaFor", () => {
  it("home returns the base meta", () => {
    const meta = metaFor("home", {});
    expect(meta.title).toContain("Wzornik Maturalny");
    expect(meta.url).toBe(`${BASE_URL}/`);
    expect(meta.description.length).toBeGreaterThan(10);
  });

  it("wzornik without subject lists all formulas", () => {
    const meta = metaFor("wzornik", {});
    expect(meta.title).toContain("wszystkie wzory");
    expect(meta.url).toBe(`${BASE_URL}/wzornik`);
  });

  it("wzornik with subject uses its label and blurb", () => {
    const meta = metaFor("wzornik", { subject: "chemia" });
    expect(meta.title).toContain("Chemia");
    expect(meta.url).toBe(`${BASE_URL}/wzornik/chemia`);
  });

  it("solver uses formula name and description", () => {
    const meta = metaFor("solver", { subject: "matematyka", formula: "pitagoras" });
    expect(meta.title).toContain("Twierdzenie Pitagorasa");
    expect(meta.description).toBe(DESCRIPTIONS["pitagoras"]);
    expect(meta.url).toBe(`${BASE_URL}/wzornik/matematyka/pitagoras`);
  });

  it("solver with unknown formula falls back to home", () => {
    expect(metaFor("solver", { subject: "matematyka", formula: "nie-ma" })).toEqual(
      metaFor("home", {}),
    );
  });

  it("static pages have their own meta", () => {
    const meta = metaFor("zadanie", {});
    expect(meta.url).toBe(`${BASE_URL}/zadanie`);
    expect(meta.description).not.toBe(metaFor("home", {}).description);
  });

  it("unknown route falls back to home", () => {
    expect(metaFor("not-found", {})).toEqual(metaFor("home", {}));
  });
});

describe("siteUrls", () => {
  it("covers core, subjects and every formula exactly once", () => {
    const urls = siteUrls();
    expect(urls.length).toBe(6 + 4 + FORMULAS.length);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
