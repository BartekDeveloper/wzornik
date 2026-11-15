import { describe, expect, it } from "vitest";
import { analyzeOmni } from "./omni";

describe("analyzeOmni — kwadratowa", () => {
  const r = analyzeOmni("2x^2-8x+6=0", 2)!;

  it("rozpoznaje i liczy miejsca zerowe", () => {
    expect(r.title).toContain("Funkcja kwadratowa");
    const xs = r.values.filter((v) => v.label === "x₁" || v.label === "x₂");
    expect(xs.map((v) => v.dec).sort()).toEqual(["1", "3"]);
  });

  it("podaje kanoniczną i iloczynową", () => {
    const titles = r.sections.map((s) => s.title);
    expect(titles).toContain("Postać kanoniczna");
    expect(titles).toContain("Postać iloczynowa i wzory Viète'a");
    const canon = r.sections.find((s) => s.title === "Postać kanoniczna");
    expect(canon?.rows.find((row) => row.label === "f(x)")?.tex).toContain("(x-2)^2");
  });

  it("wyróżnik i Viète", () => {
    const delta = r.values.find((v) => v.label === "Δ");
    expect(delta?.dec).toBe("16");
    const viete = r.sections.find((s) => s.title.includes("Viète"));
    const sum = viete?.rows.find((row) => row.label === "Viète");
    expect(sum?.tex).toContain("4");
  });

  it("ma wykres i link do pełnego kalkulatora", () => {
    expect(r.plot).not.toBeNull();
    expect(r.link?.id).toBe("postacie-kwadratowej");
    expect(r.link?.query.v_a).toBe("2");
  });

  it("kanoniczna i iloczynowa na wejściu dają ten sam wynik", () => {
    const canon = analyzeOmni("2(x-2)^2-2", 2)!;
    const prod = analyzeOmni("2(x-1)(x-3)", 2)!;
    const base = analyzeOmni("2x^2-8x+6", 2)!;
    const rootDec = (x: typeof base): string[] =>
      x.values.filter((v) => v.label === "x₁").map((v) => v.dec);
    expect(rootDec(canon)).toEqual(rootDec(base));
    expect(rootDec(prod)).toEqual(rootDec(base));
  });

  it("przenosi równanie z prawą stroną", () => {
    const r2 = analyzeOmni("x^2=4x-3", 2)!;
    const xs = r2.values.filter((v) => v.label === "x₁" || v.label === "x₂").map((v) => v.dec);
    expect(xs.sort()).toEqual(["1", "3"]);
  });

  it("nierówność z op dostaje notę", () => {
    const r3 = analyzeOmni("x^2-5x+6>0", 2)!;
    expect(r3.title).toContain(">");
    expect(r3.sections.some((s) => s.note?.includes("f(x) > 0"))).toBe(true);
  });

  it("Δ<0 — brak miejsc zerowych", () => {
    const r4 = analyzeOmni("x^2+x+1=0", 2)!;
    expect(r4.sections.find((s) => s.title === "Wyróżnik")?.note).toContain("Δ < 0");
    expect(r4.values.some((v) => v.label === "x₁")).toBe(false);
  });
});

describe("analyzeOmni — liniowa", () => {
  it("y=2x-4: miejsce zerowe 2", () => {
    const r = analyzeOmni("y=2x-4", 2)!;
    expect(r.title).toContain("liniowa");
    expect(r.values[0]!.dec).toBe("2");
    expect(r.plot).not.toBeNull();
    expect(r.link?.id).toBe("funkcja-liniowa");
  });

  it("2x+3y=6 przechodzi przez postać kierunkową", () => {
    const r = analyzeOmni("2x+3y=6", 2)!;
    expect(r.title).toContain("liniowa");
    expect(r.values[0]!.dec).toBe("3");
  });
});

describe("analyzeOmni — wielomian i ułamek", () => {
  it("wielomian 3. stopnia: kroki + ekstrema", () => {
    const r = analyzeOmni("x^3-6x^2+11x-6", 2)!;
    expect(r.title).toContain("3. stopnia");
    expect(r.steps.length).toBeGreaterThan(3);
    expect(r.plot).not.toBeNull();
  });

  it("ułamek homograficzny: dziedzina + pochodna", () => {
    const r = analyzeOmni("(2x+1)/(x-3)", 2)!;
    expect(r.title).toContain("wymierna");
    expect(r.steps.some((s) => s.body.includes("x \\ne 3") || s.body.includes("D_f"))).toBe(true);
    expect(r.link?.id).toBe("dziedzina-ulamka-wymiernego");
  });
});

describe("analyzeOmni — wartości i pozostałe wzory", () => {
  it("sin(30) = 1/2", () => {
    const r = analyzeOmni("sin(30)", 2)!;
    expect(r.values[0]!.dec).toBe("0.5");
  });

  it("sin(π/3) = √3/2", () => {
    const r = analyzeOmni("sin(π/3)", 2)!;
    expect(r.values[0]!.tex).toContain("\\sqrt{3}");
  });

  it("log_2(8) = 3", () => {
    const r = analyzeOmni("log_2(8)", 2)!;
    expect(r.values[0]!.dec).toBe("3");
  });

  it("sin(x)=1/2 → pełny kalkulator", () => {
    const r = analyzeOmni("sin(x)=1/2", 2)!;
    expect(r.steps.length).toBeGreaterThan(0);
    expect(r.link?.id).toBe("rownanie-trygonometryczne");
  });

  it("|x-2|=3 → wartości z kalkulatora", () => {
    const r = analyzeOmni("|x-2|=3", 2)!;
    expect(r.values.length).toBeGreaterThan(0);
  });

  it("20% z 50 = 10", () => {
    const r = analyzeOmni("20% z 50", 2)!;
    expect(r.values[0]!.dec).toBe("10");
  });

  it("układ równań na żywo", () => {
    const r = analyzeOmni("2x+3y=7; x-y=1", 2)!;
    expect(r.steps.length).toBeGreaterThan(0);
    expect(r.link?.id).toBe("uklad-rownan");
  });

  it("parametry a;b;c jako kwadratowa", () => {
    const r = analyzeOmni("a=1;b=-5;c=6", 2)!;
    const xs = r.values.filter((v) => v.label === "x₁" || v.label === "x₂").map((v) => v.dec);
    expect(xs.sort()).toEqual(["2", "3"]);
  });

  it("nieznany zapis → null", () => {
    expect(analyzeOmni("delta", 2)).toBeNull();
    expect(analyzeOmni("koło", 2)).toBeNull();
    expect(analyzeOmni("", 2)).toBeNull();
  });
});
