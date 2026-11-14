import { ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const monotonicznoscLiniowej: FormulaDef = {
  id: "monotonicznosc-liniowej",
  subject: "matematyka",
  topic: "Funkcje",
  name: "Funkcja liniowa — monotoniczność i znaki",
  latex: "f(x) = ax + b",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "analiza",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    if (isZero(a)) {
      const isPos = cmp(b, ZERO) > 0;
      const isNeg = cmp(b, ZERO) < 0;
      return {
        values: [],
        steps: [
          { title: "1. Rodzaj funkcji", body: "a = 0", note: "funkcja stała f(x) = b" },
          { title: "2. Wykres", body: `f(x) = ${L(b)}` },
          {
            title: "3. Wynik",
            body: isZero(b) ? "f(x) = 0" : isPos ? "f(x) > 0" : "f(x) < 0",
            note: isZero(b)
              ? "pokrywa się z osią OX"
              : isNeg
                ? "prosta poniżej osi OX"
                : "prosta powyżej osi OX",
          },
        ],
      };
    }
    const x0 = exactOf(div(neg(b), a));
    const xl = formatLatex(x0);
    const asc = cmp(a, ZERO) > 0;
    return {
      values: [x0],
      labels: ["x₀"],
      steps: [
        {
          title: "1. Monotoniczność",
          body: `a ${asc ? "> 0" : "< 0"}`,
          note: asc ? "funkcja rosnąca" : "funkcja malejąca",
        },
        {
          title: "2. Miejsce zerowe",
          body: `x_0 = -\\frac{b}{a} = -\\frac{${L(b)}}{${L(a)}} = ${xl}`,
        },
        { title: "3. Punkt przecięcia z Oy", body: `(0, ${L(b)})` },
        {
          title: "4. Znak funkcji",
          body: asc
            ? `f(x) > 0 \\iff x > ${xl}, \\; f(x) < 0 \\iff x < ${xl}`
            : `f(x) > 0 \\iff x < ${xl}, \\; f(x) < 0 \\iff x > ${xl}`,
        },
        { title: "5. Kąt nachylenia", body: `\\operatorname{tg}\\alpha = a = ${L(a)}` },
      ],
    };
  },
};

const vietaRozszerzone: FormulaDef = {
  id: "vieta-rozszerzone",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Wzory Viète'a — wyrażenia symetryczne",
  latex: "x_1+x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyrażenia",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
    const S = div(neg(b), a);
    const P = div(c, a);
    const S2 = mul(S, S);
    const sumSq = sub(S2, mul(of(2), P));
    const recip = isZero(P) ? null : div(S, P);
    const diffSq = sub(S2, mul(of(4), P));
    const sumCub = sub(mul(S, S2), mul(mul(of(3), S), P));
    const values: Exact[] = [];
    const labels: string[] = [];
    const lines: string[] = [];
    const add = (label: string, tex: string, v: Rational): void => {
      labels.push(label);
      values.push(exactOf(v));
      lines.push(tex);
    };
    add("x₁+x₂", `x_1+x_2 = ${L(S)}`, S);
    add("x₁·x₂", `x_1 x_2 = ${L(P)}`, P);
    add("x₁²+x₂²", `x_1^2+x_2^2 = ${L(sumSq)}`, sumSq);
    let note: string | undefined;
    if (recip) {
      add("1/x₁+1/x₂", `\\frac{1}{x_1}+\\frac{1}{x_2} = ${L(recip)}`, recip);
    } else {
      note = "1/x₁ + 1/x₂ nieokreślone (x₁·x₂ = 0)";
    }
    add("(x₁−x₂)²", `(x_1-x_2)^2 = ${L(diffSq)}`, diffSq);
    add("x₁³+x₂³", `x_1^3+x_2^3 = ${L(sumCub)}`, sumCub);
    return {
      values,
      labels,
      steps: [
        {
          title: "1. Wzory Viète'a",
          body: `x_1+x_2 = -\\frac{b}{a} = ${L(S)}, \\; x_1 x_2 = \\frac{c}{a} = ${L(P)}`,
        },
        { title: "2. Wyrażenia symetryczne", body: lines.join(", \\; "), note },
      ],
    };
  },
};

const kwadratowaZWierzcholkaIPunktu: FormulaDef = {
  id: "kwadratowa-z-wierzcholka-i-punktu",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Funkcja kwadratowa z wierzchołka i punktu",
  latex: "f(x) = a(x-p)^2 + q, \\; A = (x_A, y_A)",
  vars: [
    { id: "p", label: "p (wierzchołek x)" },
    { id: "q", label: "q (wierzchołek y)" },
    { id: "xA", label: "x_A (punkt)" },
    { id: "yA", label: "y_A (punkt)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wzór funkcji",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const p = asRational(known["p"], "p");
    const q = asRational(known["q"], "q");
    const xA = asRational(known["xA"], "x_A");
    const yA = asRational(known["yA"], "y_A");
    const dx = sub(xA, p);
    if (isZero(dx)) throw new Error("x_A ≠ p — punkt musi być różny od wierzchołka");
    const a = div(sub(yA, q), mul(dx, dx));
    const b = mul(neg(a), mul(of(2), p));
    const c = add(mul(a, mul(p, p)), q);
    const sgn = (v: Rational, name: string): string =>
      isZero(v) ? "" : cmp(v, ZERO) > 0 ? `+${L(v)}${name}` : `-${L(neg(v))}${name}`;
    return {
      values: [exactOf(a), exactOf(b), exactOf(c)],
      labels: ["a", "b", "c"],
      steps: [
        {
          title: "1. Współczynnik a",
          body: `a = \\frac{y_A - q}{(x_A - p)^2} = \\frac{${L(yA)} - ${L(q)}}{(${L(xA)} - ${L(p)})^2} = ${L(a)}`,
        },
        { title: "2. Postać kanoniczna", body: `f(x) = ${L(a)}(x - ${L(p)})^2 + ${L(q)}` },
        { title: "3. Postać ogólna", body: `f(x) = ${L(a)}x^2${sgn(b, "x")}${sgn(c, "")}` },
      ],
    };
  },
};

export const MATH_DODATKOWE: FormulaDef[] = [
  monotonicznoscLiniowej,
  vietaRozszerzone,
  kwadratowaZWierzcholkaIPunktu,
];
