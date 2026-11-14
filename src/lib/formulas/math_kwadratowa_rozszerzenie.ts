import { ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf, solveQuadratic, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const miejscaZerowe: FormulaDef = {
  id: "miejsca-zerowe-kwadratowej",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Miejsca zerowe funkcji kwadratowej",
  latex: "f(x) = ax^2+bx+c, \\; f(x) = 0",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "miejsca zerowe",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c));
    const q = solveQuadratic(a, b, c);
    const subst = `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`;
    if (q.kind === "none") {
      return {
        values: [],
        steps: [
          { title: "1. Delta", body: subst },
          { title: "2. Obliczenie", body: `${subst} = ${formatLatex(q.delta)} < 0` },
          { title: "3. Wynik", body: "\\varnothing", note: "brak miejsc zerowych (Δ < 0)" },
        ],
      };
    }
    if (q.kind === "one") {
      const x0 = q.roots[0];
      return {
        values: [x0],
        labels: ["x₀"],
        steps: [
          { title: "1. Delta", body: `${subst} = ${formatLatex(q.delta)} = 0` },
          { title: "2. Wzór", body: "x_0 = -\\frac{b}{2a}" },
          {
            title: "3. Wynik",
            body: resultLatex("x_0", x0, places),
            note: "jedno miejsce zerowe (pierwiastek podwójny)",
          },
        ],
      };
    }
    if (q.kind === "linear") throw new Error("miejsca zerowe: nieoczekiwany przypadek liniowy");
    const [x1, x2] = q.roots;
    const sq = formatLatex(sqrtRational(deltaRat));
    return {
      values: [x1, x2],
      labels: ["x₁", "x₂"],
      steps: [
        {
          title: "1. Delta",
          body: `${subst} = ${formatLatex(q.delta)}, \\; \\sqrt{\\Delta} = ${sq}`,
        },
        { title: "2. Wzór", body: "x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}" },
        {
          title: "3. Wynik",
          body: `${resultLatex("x_1", x1, places)}, \\; ${resultLatex("x_2", x2, places)}`,
        },
      ],
    };
  },
};

const kwadratowaZKanonicznej: FormulaDef = {
  id: "kwadratowa-z-kanonicznej",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Postać ogólna z kanonicznej",
  latex: "f(x) = a(x-p)^2 + q \\Rightarrow f(x) = ax^2+bx+c",
  vars: [
    { id: "a", label: "a" },
    { id: "p", label: "p" },
    { id: "q", label: "q" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "postać ogólna, Δ, miejsca zerowe",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const p = asRational(known["p"], "p");
    const q = asRational(known["q"], "q");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const b = mul(neg(a), mul(of(2), p));
    const c = add(mul(a, mul(p, p)), q);
    const delta = mul(of(-4), mul(a, q));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    const sgn = (v: Rational, name: string): string =>
      isZero(v) ? "" : cmp(v, ZERO) > 0 ? `+${L(v)}${name}` : `-${L(neg(v))}${name}`;
    const ogolna = `${L(a)}x^2${sgn(b, "x")}${sgn(c, "")}`;
    const steps: FormulaSolution["steps"] = [
      {
        title: "1. Współczynniki",
        body: `b = -2ap = -2 \\cdot ${L(a)} \\cdot ${L(p)} = ${L(b)}, \\; c = ap^2+q = ${L(c)}`,
      },
      { title: "2. Postać ogólna", body: `f(x) = ${ogolna}` },
      {
        title: "3. Delta",
        body: `\\Delta = -4aq = -4 \\cdot ${L(a)} \\cdot ${L(q)} = ${L(delta)}`,
      },
    ];
    const Q = solveQuadratic(a, b, c);
    if (Q.kind === "none") {
      steps.push({
        title: "4. Miejsca zerowe",
        body: "\\varnothing",
        note: "Δ < 0 — brak miejsc zerowych",
      });
      return { values: [exactOf(b), exactOf(c), exactOf(delta)], labels: ["b", "c", "Δ"], steps };
    }
    const roots = Q.roots;
    const rl = roots.map((r) => show(r));
    if (roots.length === 1) {
      steps.push({ title: "4. Miejsce zerowe", body: `x_0 = ${rl[0]}` });
      steps.push({ title: "5. Postać iloczynowa", body: `f(x) = ${L(a)}(x - ${rl[0]})^2` });
    } else {
      steps.push({ title: "4. Miejsca zerowe", body: `x_1 = ${rl[0]}, \\; x_2 = ${rl[1]}` });
      steps.push({
        title: "5. Postać iloczynowa",
        body: `f(x) = ${L(a)}(x - ${rl[0]})(x - ${rl[1]})`,
      });
    }
    return {
      values: [exactOf(b), exactOf(c), exactOf(delta), ...roots],
      labels: ["b", "c", "Δ", ...roots.map((_, i) => `x${i === 0 ? "₁" : "₂"}`)],
      steps,
    };
  },
};

const wierzcholekP: FormulaDef = {
  id: "wierzcholek-p-q",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Współrzędna p wierzchołka (rozbite)",
  latex: "p = -\\frac{b}{2a}",
  vars: [
    { id: "p", label: "p" },
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "p") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      if (isZero(a)) throw new Error("a ≠ 0");
      const value = exactOf(div(neg(b), mul(of(2), a)));
      return {
        values: [value],
        steps: [
          { title: "1. Wzór", body: "p = -\\frac{b}{2a}" },
          { title: "2. Podstawienie danych", body: `p = -\\frac{${L(b)}}{2 \\cdot ${L(a)}}` },
          { title: "3. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    if (unknown === "b") {
      const a = asRational(known["a"], "a");
      const p = asRational(known["p"], "p");
      if (isZero(a)) throw new Error("a ≠ 0");
      const value = exactOf(mul(neg(mul(of(2), a)), p));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "b = -2ap" },
          { title: "2. Podstawienie danych", body: `b = -2 \\cdot ${L(a)} \\cdot ${L(p)}` },
          { title: "3. Wynik", body: resultLatex("b", value, places) },
        ],
      };
    }
    const b = asRational(known["b"], "b");
    const p = asRational(known["p"], "p");
    if (isZero(p)) throw new Error("p ≠ 0 — inaczej a nieokreślone");
    const value = exactOf(div(neg(b), mul(of(2), p)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "a = -\\frac{b}{2p}" },
        { title: "2. Podstawienie danych", body: `a = -\\frac{${L(b)}}{2 \\cdot ${L(p)}}` },
        { title: "3. Wynik", body: resultLatex("a", value, places) },
      ],
    };
  },
};

const kwadratowaZIloczynowej: FormulaDef = {
  id: "kwadratowa-z-iloczynowej",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Postać ogólna i kanoniczna z iloczynowej",
  latex: "f(x) = a(x-x_1)(x-x_2) \\Rightarrow ax^2+bx+c = a(x-p)^2+q",
  vars: [
    { id: "a", label: "a" },
    { id: "x1", label: "x₁" },
    { id: "x2", label: "x₂" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "b, c, p, q",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const x1 = asRational(known["x1"], "x₁");
    const x2 = asRational(known["x2"], "x₂");
    if (isZero(a)) throw new Error("a ≠ 0");
    const sum = add(x1, x2);
    const prod = mul(x1, x2);
    const b = mul(neg(a), sum);
    const c = mul(a, prod);
    const p = div(sum, of(2));
    const delta = sub(mul(b, b), mul(mul(of(4), a), c));
    const q = div(neg(delta), mul(of(4), a));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    const sgn = (v: Rational, name: string): string =>
      isZero(v) ? "" : cmp(v, ZERO) > 0 ? `+${L(v)}${name}` : `-${L(neg(v))}${name}`;
    return {
      values: [exactOf(b), exactOf(c), exactOf(p), exactOf(q)],
      labels: ["b", "c", "p", "q"],
      steps: [
        { title: "1. Wzory Viète'a", body: `x_1+x_2 = ${L(sum)}, \\; x_1x_2 = ${L(prod)}` },
        { title: "2. Postać ogólna", body: `f(x) = ${L(a)}x^2${sgn(b, "x")}${sgn(c, "")}` },
        {
          title: "3. Wierzchołek",
          body: `p = \\frac{x_1+x_2}{2} = ${show(exactOf(p))}, \\; q = ${show(exactOf(q))}`,
        },
        {
          title: "4. Postać kanoniczna",
          body: `f(x) = ${L(a)}(x - ${show(exactOf(p))})^2 + ${show(exactOf(q))}`,
        },
      ],
    };
  },
};

export const MATH_KWADRATOWA_ROZSZERZENIE: FormulaDef[] = [
  miejscaZerowe,
  kwadratowaZKanonicznej,
  wierzcholekP,
  kwadratowaZIloczynowej,
];
