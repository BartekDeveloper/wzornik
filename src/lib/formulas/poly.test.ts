import { describe, expect, it } from "vitest";
import type { Rational } from "../exact/rational";
import { factorPolynomial, hornerColumnSteps, hornerRow, hornerTableLatex } from "./poly";

const R = (...ps: number[]): Rational[] => ps.map((p) => ({ p: BigInt(p), q: 1n }));

describe("factorPolynomial", () => {
  it("rozkłada trójmian stopnia 2", () => {
    const r = factorPolynomial(R(1, -5, 6));
    expect(r.finalLatex).toContain("(x - 2)");
    expect(r.finalLatex).toContain("(x - 3)");
    expect(r.irreducible).toBeUndefined();
  });

  it("wykrywa trójmian nierozkładalny (Δ < 0)", () => {
    const r = factorPolynomial(R(1, 0, 1));
    expect(r.irreducible).toBeDefined();
    expect(r.steps.length).toBeGreaterThan(0);
  });

  it("rozkłada sześcian na 3 czynniki liniowe", () => {
    const r = factorPolynomial(R(1, -6, 11, -6));
    expect(r.finalLatex).toContain("(x - 1)");
    expect(r.finalLatex).toContain("(x - 2)");
    expect(r.finalLatex).toContain("(x - 3)");
    expect(r.irreducible).toBeUndefined();
  });

  it("wyłącza wspólny czynnik liczbowy", () => {
    const r = factorPolynomial(R(2, 4));
    expect(r.finalLatex).toContain("2");
    expect(r.finalLatex).toContain("(x + 2)");
  });

  it("wyłącza x do potęgi", () => {
    const r = factorPolynomial(R(1, 0, 0));
    expect(r.finalLatex).toContain("x^{2}");
  });

  it("rozpoznaje różnicę kwadratów", () => {
    const r = factorPolynomial(R(4, 0, -9));
    expect(r.finalLatex).toBe("(2x - 3)(2x + 3)");
  });

  it("grupuje 4 wyrazy", () => {
    const r = factorPolynomial(R(1, 2, 2, 4));
    expect(r.finalLatex).toContain("(x + 2)");
    expect(r.irreducible).toBeUndefined();
  });

  it("rozkłada stopień 4 na 4 czynniki", () => {
    const r = factorPolynomial(R(1, 0, -5, 0, 4));
    expect(r.finalLatex).toContain("(x - 1)");
    expect(r.finalLatex).toContain("(x - 2)");
    expect(r.irreducible).toBeUndefined();
  });

  it("rozkłada stopień 5 na 5 czynników", () => {
    const r = factorPolynomial(R(1, -15, 85, -225, 274, -120));
    for (const k of [1, 2, 3, 4, 5]) expect(r.finalLatex).toContain(`(x - ${k})`);
    expect(r.irreducible).toBeUndefined();
  });

  it("rozkłada stopień 6 na 6 czynników", () => {
    const r = factorPolynomial(R(1, 0, -14, 0, 49, 0, -36));
    for (const k of [1, 2, 3]) {
      expect(r.finalLatex).toContain(`(x - ${k})`);
      expect(r.finalLatex).toContain(`(x + ${k})`);
    }
    expect(r.irreducible).toBeUndefined();
  });

  it("zgłasza resztę bez pierwiastków wymiernych", () => {
    const r = factorPolynomial(R(1, 0, 0, 0, 1));
    expect(r.irreducible).toBeDefined();
  });

  it("każdy krok ma tytuł i treść", () => {
    const r = factorPolynomial(R(1, -6, 11, -6));
    expect(r.steps.length).toBeGreaterThanOrEqual(3);
    for (const s of r.steps) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.body.length).toBeGreaterThan(0);
    }
  });
});

describe("hornerRow", () => {
  it("liczy wiersz dla x³-6x²+11x-6 przy x₀=1", () => {
    const { results, prods } = hornerRow(R(1, -6, 11, -6), { p: 1n, q: 1n });
    expect(results.map((r) => Number(r.p))).toEqual([1, -5, 6, 0]);
    expect(prods.map((r) => Number(r.p))).toEqual([0, 1, -5, 6]);
  });
});

describe("hornerTableLatex", () => {
  it("rysuje tabelkę z kreską", () => {
    const t = hornerTableLatex(R(1, -6, 11, -6), { p: 1n, q: 1n });
    expect(t).toContain("\\begin{array}");
    expect(t).toContain("\\hline");
    expect(t).toContain("0");
  });
});

describe("hornerColumnSteps", () => {
  it("rozpisuje kolumna po kolumnie", () => {
    const steps = hornerColumnSteps(R(1, -6, 11, -6), { p: 1n, q: 1n });
    expect(steps).toHaveLength(3);
    expect(steps[0].body).toContain("=");
    expect(steps[2].title).toContain("4 z 4");
  });
});
