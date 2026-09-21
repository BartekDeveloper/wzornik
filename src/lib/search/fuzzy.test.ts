import { describe, expect, it } from "vitest";
import { buildFuzzyIndex, fuzzyScore, levenshtein, tokenize } from "./fuzzy";
import { searchFormulas } from "./search";

describe("levenshtein", () => {
  it("computes edit distance", () => {
    expect(levenshtein("delta", "delta")).toBe(0);
    expect(levenshtein("dleta", "delta")).toBe(2);
    expect(levenshtein("pitagors", "pitagoras")).toBe(1);
    expect(levenshtein("", "abc")).toBe(3);
  });
});

describe("tokenize", () => {
  it("normalizes diacritics and splits", () => {
    expect(tokenize("Równanie Kwadratowe")).toEqual(["rownanie", "kwadratowe"]);
    expect(tokenize("a")).toEqual([]);
  });
});

const idx = () =>
  buildFuzzyIndex([
    { id: "m/rownanie-kwadratowe", text: "rownanie kwadratowe delta pierwiastki" },
    { id: "m/pitagoras", text: "pitagoras trojkat przyprostokatna" },
    { id: "m/logarytm", text: "logarytm podstawa" },
  ]);

describe("fuzzyScore", () => {
  it("rewards prefix matches", () => {
    const s = fuzzyScore(idx(), "log");
    expect(s.get("m/logarytm")).toBeGreaterThan(0);
    expect(s.get("m/pitagoras") ?? 0).toBe(0);
  });

  it("tolerates typos within distance 2", () => {
    const s = fuzzyScore(idx(), "dleta");
    expect(s.get("m/rownanie-kwadratowe")).toBeGreaterThan(0);
  });
});

describe("searchFormulas fuzzy", () => {
  it("finds quadratic on typo 'dleta'", () => {
    const r = searchFormulas("dleta");
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].id).toBe("rownanie-kwadratowe");
  });

  it("finds pitagoras on 'pitagors'", () => {
    expect(searchFormulas("pitagors")[0].id).toBe("pitagoras");
  });

  it("keeps exact matches first", () => {
    expect(searchFormulas("delta")[0].id).toBe("delta");
  });
});
