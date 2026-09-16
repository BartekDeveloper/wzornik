import { describe, expect, it } from "vitest";
import { getFormula } from "../formulas/index";
import { solveFormula } from "./solver";
import { formatExactText } from "../exact/format";
import { isApproxOnly } from "../exact/exact";

function run(subject: string, id: string, raw: Record<string, string>, places = 2) {
  const def = getFormula(subject, id);
  if (!def) throw new Error(`missing formula ${subject}/${id}`);
  return solveFormula(def, raw, places);
}

function exactOf(subject: string, id: string, raw: Record<string, string>): string[] {
  const r = run(subject, id, raw);
  if (!r.ok) throw new Error(`expected ok: ${r.error}`);
  return r.values.map(formatExactText);
}

describe("solver matematyka", () => {
  it("pitagoras 3-4 → 5", () => {
    expect(exactOf("matematyka", "pitagoras", { a: "3", b: "4", c: "" })).toEqual(["5"]);
  });

  it("pitagoras 5-3 → a=4", () => {
    const r = run("matematyka", "pitagoras", { a: "", b: "3", c: "5" });
    expect(r.ok && r.unknown).toBe("a");
    expect(exactOf("matematyka", "pitagoras", { a: "", b: "3", c: "5" })).toEqual(["4"]);
  });

  it("pitagoras odrzuca c krótsze od boku", () => {
    const r = run("matematyka", "pitagoras", { a: "", b: "5", c: "3" });
    expect(r.ok).toBe(false);
  });

  it("pole koła r=2 → 4π", () => {
    expect(exactOf("matematyka", "pole-kola", { P: "", r: "2" })).toEqual(["4π"]);
  });

  it("promień z 25π → 5", () => {
    expect(exactOf("matematyka", "pole-kola", { P: "25π", r: "" })).toEqual(["5"]);
  });

  it("promień z 25 → tylko przybliżenie", () => {
    const r = run("matematyka", "pole-kola", { P: "25", r: "" });
    if (!r.ok) throw new Error(r.error);
    expect(isApproxOnly(r.values[0])).toBe(true);
    expect(r.steps[2].note).toMatch(/przybliżony/);
  });

  it("procent: 20% z 50 → 10", () => {
    expect(exactOf("matematyka", "procent", { p: "20", x: "50", w: "" })).toEqual(["10"]);
  });

  it("ciąg arytmetyczny: a1=2 r=3 n=4 → 11", () => {
    expect(exactOf("matematyka", "ciag-arytmetyczny", { an: "", a1: "2", n: "4", r: "3" })).toEqual(
      ["11"],
    );
  });

  it("ciąg geometryczny odrzuca niewiadomą q", () => {
    const r = run("matematyka", "ciag-geometryczny", { an: "8", a1: "2", q: "", n: "3" });
    expect(r.ok).toBe(false);
  });

  it("kula r=3 → 36π", () => {
    expect(exactOf("matematyka", "objetosc-kuli", { V: "", r: "3" })).toEqual(["36π"]);
  });

  it("funkcja liniowa 2x-4 → x₀=2", () => {
    expect(exactOf("matematyka", "funkcja-liniowa", { a: "2", b: "-4" })).toEqual(["2"]);
  });

  it("potęga 2^10 → 1024", () => {
    expect(exactOf("matematyka", "potega", { p: "2", n: "10", w: "" })).toEqual(["1024"]);
  });

  it("tales: b=4, c=6, d=8 → a=3", () => {
    expect(exactOf("matematyka", "tales", { a: "", b: "4", c: "6", d: "8" })).toEqual(["3"]);
  });

  it("kombinacje C(49,6) → 13983816", () => {
    expect(exactOf("matematyka", "kombinacje", { n: "49", k: "6" })).toEqual(["13983816"]);
  });

  it("horner: x³-6x²+11x-6 → 1, 2, 3", () => {
    const r = run("matematyka", "horner-pierwiastki", { a: "1", b: "-6", c: "11", d: "-6" });
    if (!r.ok) throw new Error(r.error);
    expect(r.values.map(formatExactText)).toEqual(["1", "2", "3"]);
  });

  it("delta przez rejestr: x²-5x+6 → 2 i 3", () => {
    const r = run("matematyka", "rownanie-kwadratowe", { a: "1", b: "-5", c: "6" });
    if (!r.ok) throw new Error(r.error);
    expect(r.values.map(formatExactText)).toEqual(["2", "3"]);
    expect(r.steps).toHaveLength(3);
  });
});

describe("solver fizyka", () => {
  it("F=ma: F=10 a=2 → m=5", () => {
    expect(exactOf("fizyka", "sila", { F: "10", m: "", a: "2" })).toEqual(["5"]);
  });

  it("prędkość: s=100 v=25 → t=4", () => {
    expect(exactOf("fizyka", "predkosc", { v: "25", s: "100", t: "" })).toEqual(["4"]);
  });

  it("Ek=100 m=2 → v=10", () => {
    expect(exactOf("fizyka", "energia-kinetyczna", { Ek: "100", m: "2", v: "" })).toEqual(["10"]);
  });

  it("ohm: U=12, R=4 → I=3", () => {
    expect(exactOf("fizyka", "ohm", { I: "", U: "12", R: "4" })).toEqual(["3"]);
  });

  it("archimedes: ρ=1000, V=2 → 20000", () => {
    expect(exactOf("fizyka", "archimedes", { Fw: "", ro: "1000", V: "2" })).toEqual(["20000"]);
  });

  it("wymaga dokładnie jednej niewiadomej", () => {
    const r = run("fizyka", "sila", { F: "10", m: "", a: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/dokładnie jedno/);
  });

  it("zgłasza zły format liczby", () => {
    const r = run("fizyka", "sila", { F: "abc", m: "", a: "2" });
    expect(r.ok).toBe(false);
  });
});
