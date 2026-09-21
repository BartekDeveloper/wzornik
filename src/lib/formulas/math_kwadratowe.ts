import { add, isZero, mul, neg } from "../exact/rational";
import { exactOf, solveQuadratic } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const kwadratowaIloczynowa: FormulaDef = {
  id: "kwadratowa-iloczynowa",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Postać iloczynowa z ogólnej",
  latex: "ax^2+bx+c = a(x-x_1)(x-x_2)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "f",
  outputLabel: "iloczynowa",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const q = solveQuadratic(a, b, c);
    if (q.kind === "linear")
      throw new Error("kwadratowa-iloczynowa: nieoczekiwany przypadek liniowy");
    if (q.kind === "none") {
      const d = formatLatex(q.delta);
      return {
        values: [],
        steps: [
          { title: "1. Delta", body: `\\Delta = ${L(b)}^2 - 4\\cdot${L(a)}\\cdot${L(c)} = ${d}` },
          {
            title: "2. Wynik",
            body: "\\Delta < 0",
            note: "brak postaci iloczynowej nad ℝ (Δ < 0)",
          },
        ],
      };
    }
    const roots = q.roots;
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatLatex(e);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    const iloczynowa =
      roots.length === 1
        ? `${L(a)}(x - ${show(roots[0])})^2`
        : `${L(a)}(x - ${show(roots[0])})(x - ${show(roots[1])})`;
    const steps: FormulaSolution["steps"] = [
      {
        title: "1. Delta",
        body: `\\Delta = ${L(b)}^2 - 4\\cdot${L(a)}\\cdot${L(c)} = ${formatLatex(q.delta)}`,
      },
      {
        title: "2. Pierwiastki",
        body: `x_{1,2} = \\frac{-${L(b)} \\pm \\sqrt{\\Delta}}{2\\cdot${L(a)}}`,
      },
      { title: "3. Postać iloczynowa", body: `f(x) = ${iloczynowa}` },
    ];
    return {
      values: roots,
      labels: roots.map((_, i) => `x${["₁", "₂"][i] ?? i + 1}`),
      steps,
    };
  },
};

const kwadratowaOgolna: FormulaDef = {
  id: "kwadratowa-ogolna",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Postać ogólna z iloczynowej",
  latex: "a(x-x_1)(x-x_2) = ax^2+bx+c",
  vars: [
    { id: "a", label: "a" },
    { id: "x1", label: "x₁" },
    { id: "x2", label: "x₂" },
  ],
  mode: "fixed",
  outputId: "bc",
  outputLabel: "b, c",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const x1 = asRational(known["x1"], "x₁");
    const x2 = asRational(known["x2"], "x₂");
    if (isZero(a)) throw new Error("a ≠ 0");
    const sum = add(x1, x2);
    const prod = mul(x1, x2);
    const b = mul(neg(a), sum);
    const c = mul(a, prod);
    const bVal = exactOf(b);
    const cVal = exactOf(c);
    return {
      values: [bVal, cVal],
      labels: ["b", "c"],
      steps: [
        {
          title: "1. Wzory Viete'a",
          body: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}",
        },
        {
          title: "2. Obliczenie b, c",
          body: `b = -a(x_1+x_2) = -${L(a)}(${L(x1)}+${L(x2)}) = ${L(b)}, \\; c = a x_1 x_2 = ${L(a)}\\cdot${L(x1)}\\cdot${L(x2)} = ${L(c)}`,
        },
        {
          title: "3. Postać ogólna",
          body: `f(x) = ${L(a)}x^2 ${b.p >= 0 ? "+" : ""}${L(b)}x ${c.p >= 0 ? "+" : ""}${L(c)}`,
        },
      ],
    };
  },
};

export const MATH_KWADRATOWE: FormulaDef[] = [kwadratowaIloczynowa, kwadratowaOgolna];
