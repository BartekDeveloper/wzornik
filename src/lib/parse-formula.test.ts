import { describe, expect, it } from "vitest";
import { looksLikeEquation, parseEquation } from "./parse-formula";

describe("parseEquation", () => {
  it("parses the user example", () => {
    expect(parseEquation("4x^2 + -2x + 10 = 0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "4", b: "-2", c: "10" },
      label: "równanie kwadratowe",
    });
  });

  it("handles implicit coefficients and no spaces", () => {
    expect(parseEquation("x^2-5x+6=0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "1", b: "-5", c: "6" },
      label: "równanie kwadratowe",
    });
  });

  it("handles leading minus and superscript", () => {
    expect(parseEquation("-x²+x+1=0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "-1", b: "1", c: "1" },
      label: "równanie kwadratowe",
    });
  });

  it("falls through to linear", () => {
    expect(parseEquation("2x-4=0")).toEqual({
      subject: "matematyka",
      id: "funkcja-liniowa",
      values: { a: "2", b: "-4" },
      label: "funkcja liniowa",
    });
  });

  it("moves nonzero right side over", () => {
    expect(parseEquation("x^2-5x+6=1")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "1", b: "-5", c: "5" },
      label: "równanie kwadratowe",
    });
  });

  it("rejects other letters and garbage", () => {
    expect(parseEquation("2y+3=0")).toBeNull();
    expect(parseEquation("delta")).toBeNull();
    expect(parseEquation("2x+3=0=0")).toBeNull();
    expect(parseEquation("5=5")).toBeNull();
  });

  it("parses a 2-equation system", () => {
    expect(parseEquation("2x+3y=7; x-y=1")).toEqual({
      subject: "matematyka",
      id: "uklad-rownan",
      values: { a1: "2", b1: "3", c1: "7", a2: "1", b2: "-1", c2: "1" },
      label: "układ dwóch równań",
    });
  });

  it("parses quadratic inequalities with operator select", () => {
    expect(parseEquation("x^2-5x+6>0")).toEqual({
      subject: "matematyka",
      id: "nierownosc-kwadratowa",
      values: { a: "1", b: "-5", c: "6" },
      selects: { op: ">" },
      label: "nierówność kwadratowa",
    });
    expect(parseEquation("x^2+x+1≤0")?.selects).toEqual({ op: "≤" });
  });

  it("parses exponential and logarithmic equations", () => {
    expect(parseEquation("2^x=8")).toEqual({
      subject: "matematyka",
      id: "rownanie-wykladnicze",
      values: { a: "2", b: "8" },
      label: "równanie wykładnicze",
    });
    expect(parseEquation("log_2(x)=3")).toEqual({
      subject: "matematyka",
      id: "rownanie-logarytmiczne",
      values: { a: "2", c: "3" },
      label: "równanie logarytmiczne",
    });
  });

  it("parses percent, power and roots", () => {
    expect(parseEquation("20% z 50")).toEqual({
      subject: "matematyka",
      id: "procent",
      values: { p: "20", x: "50" },
      label: "procent z liczby",
    });
    expect(parseEquation("2^10")).toEqual({
      subject: "matematyka",
      id: "potega",
      values: { p: "2", n: "10" },
      label: "potęga",
    });
    expect(parseEquation("sqrt(9)")).toEqual({
      subject: "matematyka",
      id: "pierwiastek",
      values: { m: "9", n: "2" },
      label: "pierwiastek",
    });
    expect(parseEquation("√9")?.values).toEqual({ m: "9", n: "2" });
    expect(parseEquation("∛27")?.values).toEqual({ m: "27", n: "3" });
  });

  it("parses sequences from key=value triples", () => {
    expect(parseEquation("a1=2;r=3;n=5")).toEqual({
      subject: "matematyka",
      id: "ciag-arytmetyczny",
      values: { a1: "2", r: "3", n: "5" },
      label: "ciąg arytmetyczny",
    });
    expect(parseEquation("a1=2;q=3;n=4")).toEqual({
      subject: "matematyka",
      id: "ciag-geometryczny",
      values: { a1: "2", q: "3", n: "4" },
      label: "ciąg geometryczny",
    });
  });

  it("parses a proportion with one unknown", () => {
    expect(parseEquation("x/4=6/8")).toEqual({
      subject: "matematyka",
      id: "tales",
      values: { b: "4", c: "6", d: "8" },
      label: "proporcja (Tales)",
    });
  });

  it("parses scale and concentration", () => {
    expect(parseEquation("1:50000")).toEqual({
      subject: "geografia",
      id: "skala-mapy",
      values: { M: "50000" },
      label: "skala mapy",
    });
    expect(parseEquation("ms=5;mr=100")).toEqual({
      subject: "chemia",
      id: "stezenie-procentowe",
      values: { ms: "5", mr: "100" },
      label: "stężenie procentowe",
    });
  });

  it("parses cubic equations into rozklad-wielomianu", () => {
    expect(parseEquation("x^3-6x^2+11x-6=0")).toEqual({
      subject: "matematyka",
      id: "rozklad-wielomianu",
      values: { a6: "0", a5: "0", a4: "0", a3: "1", a2: "-6", a1: "11", a0: "-6" },
      selects: { deg: "3" },
      label: "rozkład wielomianu",
    });
    expect(parseEquation("x^2-5x+6=0")?.id).toBe("rownanie-kwadratowe");
  });

  it("parses absolute value equations", () => {
    expect(parseEquation("|x-2|=3")).toEqual({
      subject: "matematyka",
      id: "wartosc-bezwzgledna",
      values: { a: "2", w: "3" },
      label: "wartość bezwzględna",
    });
    expect(parseEquation("|x|=3")?.values).toEqual({ a: "0", w: "3" });
  });

  it("parses vertex form into postacie-kwadratowej", () => {
    expect(parseEquation("2(x-1)^2+3")).toEqual({
      subject: "matematyka",
      id: "postacie-kwadratowej",
      values: { a: "2", b: "-4", c: "5" },
      label: "postacie funkcji kwadratowej",
    });
  });

  it("parses decimal logarithm", () => {
    expect(parseEquation("log(x)=2")).toEqual({
      subject: "matematyka",
      id: "rownanie-logarytmiczne",
      values: { a: "10", c: "2" },
      label: "równanie logarytmiczne",
    });
  });
});

describe("looksLikeEquation", () => {
  it("detects equation-shaped input", () => {
    expect(looksLikeEquation("4x^2-2x+10=0")).toBe(true);
    expect(looksLikeEquation("delta")).toBe(false);
    expect(looksLikeEquation("koło")).toBe(false);
  });
});
