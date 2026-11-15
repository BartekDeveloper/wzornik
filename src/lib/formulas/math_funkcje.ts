import { ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf, solveQuadratic } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const dziedzinaWymierna: FormulaDef = {
  id: "dziedzina-ulamka-wymiernego",
  subject: "matematyka",
  topic: "Funkcje wymierne",
  name: "Dziedzina funkcji wymiernej",
  latex: "f(x) = \\frac{P(x)}{Q(x)}, \\; D_f = \\{ x \\in \\mathbb{R} : Q(x) \\ne 0 \\}",
  vars: [
    { id: "deg", label: "stopień mianownika", kind: "select", options: ["1", "2"] },
    { id: "q2", label: "a (przy x²)", showIf: { select: "deg", values: ["2"] } },
    { id: "q1", label: "b (przy x)" },
    { id: "q0", label: "c (wyraz wolny)" },
  ],
  mode: "fixed",
  outputId: "D",
  outputLabel: "dziedzina",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const deg = Number(selects?.["deg"] ?? "1");
    const q1 = asRational(known["q1"], "b");
    const q0 = asRational(known["q0"], "c");
    const head: FormulaSolution["steps"] = [
      { title: "1. Warunek", body: "mianownik musi być różny od zera: Q(x) \\ne 0" },
    ];

    const linearCase = (a: Rational, b: Rational): FormulaSolution => {
      if (isZero(a)) {
        if (isZero(b)) {
          return {
            values: [],
            steps: [
              ...head,
              { title: "2. Mianownik", body: "Q(x) = 0" },
              {
                title: "3. Wynik",
                body: "D_f = \\varnothing",
                note: "mianownik jest tożsamościowo zerowy — funkcja nieokreślona",
              },
            ],
          };
        }
        return {
          values: [],
          steps: [
            ...head,
            { title: "2. Mianownik", body: `Q(x) = ${L(b)} \\ne 0` },
            { title: "3. Wynik", body: "D_f = \\mathbb{R}" },
          ],
        };
      }
      const x0 = exactOf(div(neg(b), a));
      const xl = formatLatex(x0);
      return {
        values: [x0],
        labels: ["x₀"],
        steps: [
          ...head,
          { title: "2. Mianownik", body: `Q(x) = ${L(a)}x + ${L(b)} \\ne 0` },
          { title: "3. Punkt wykluczony", body: `x \\ne ${xl}` },
          { title: "4. Wynik", body: `D_f = \\mathbb{R} \\setminus \\{${xl}\\}` },
        ],
      };
    };

    if (deg === 1) {
      return linearCase(q1, q0);
    }
    const q2 = asRational(known["q2"], "a");
    if (isZero(q2)) {
      return linearCase(q1, q0);
    }

    const Q = solveQuadratic(q2, q1, q0);
    const sub = [
      ...head,
      { title: "2. Mianownik", body: `Q(x) = ${L(q2)}x^2 + ${L(q1)}x + ${L(q0)} \\ne 0` },
    ];
    if (Q.kind === "none") {
      return {
        values: [],
        steps: [
          ...sub,
          { title: "3. Delta", body: `\\Delta = ${formatLatex(Q.delta)} < 0` },
          {
            title: "4. Wynik",
            body: "D_f = \\mathbb{R}",
            note: "mianownik nigdy się nie zeruje (Δ < 0)",
          },
        ],
      };
    }
    const x1 = formatLatex(Q.roots[0]);
    if (Q.roots.length === 1) {
      return {
        values: Q.roots,
        labels: ["x₀"],
        steps: [
          ...sub,
          { title: "3. Pierwiastek", body: `x_0 = ${x1}` },
          { title: "4. Wynik", body: `D_f = \\mathbb{R} \\setminus \\{${x1}\\}` },
        ],
      };
    }
    const x2 = formatLatex(Q.roots[1]);
    return {
      values: Q.roots,
      labels: ["x₁", "x₂"],
      steps: [
        ...sub,
        { title: "3. Pierwiastki", body: `x_1 = ${x1}, \\; x_2 = ${x2}` },
        { title: "4. Wynik", body: `D_f = \\mathbb{R} \\setminus \\{${x1}, ${x2}\\}` },
      ],
    };
  },
};

const monotonicznoscKwadratowej: FormulaDef = {
  id: "monotonicznosc-kwadratowej",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Monotoniczność i zbiór wartości funkcji kwadratowej",
  latex: "f(x) = ax^2+bx+c, \\; p = -\\frac{b}{2a}, \\; q = -\\frac{\\Delta}{4a}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "analiza",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const p = exactOf(div(neg(b), mul(of(2), a)));
    const delta = sub(mul(b, b), mul(mul(of(4), a), c));
    const q = exactOf(div(neg(delta), mul(of(4), a)));
    const up = cmp(a, ZERO) > 0;
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    const sp = show(p);
    const sq = show(q);
    const decr = up ? `(-\\infty, ${sp})` : `(${sp}, +\\infty)`;
    const incr = up ? `(${sp}, +\\infty)` : `(-\\infty, ${sp})`;
    const zw = up ? `\\langle ${sq}, +\\infty)` : `(-\\infty, ${sq} \\rangle`;
    const extr = up ? "\\min" : "\\max";
    return {
      values: [p, q],
      labels: ["p", "q"],
      steps: [
        { title: "1. Wierzchołek", body: `p = -\\frac{b}{2a} = ${sp}, \\; q = f(p) = ${sq}` },
        {
          title: "2. Ramiona paraboli",
          body: `a ${up ? "> 0" : "< 0"}`,
          note: `ramiona w ${up ? "górę" : "dół"}`,
        },
        {
          title: "3. Monotoniczność",
          body: `${up ? "\\searrow" : "\\nearrow"} \\; x \\in ${decr}, \\quad ${up ? "\\nearrow" : "\\searrow"} \\; x \\in ${incr}`,
          note: up ? "maleje potem rośnie" : "rośnie potem maleje",
        },
        { title: "4. Zbiór wartości", body: `ZW = ${zw}` },
        {
          title: "5. Ekstremum",
          body: `${extr} f = q = ${sq}`,
          note: `dla x = ${sp} (${up ? "wartość najmniejsza" : "wartość największa"})`,
        },
      ],
    };
  },
};

const minmaxKwadratowej: FormulaDef = {
  id: "minmax-kwadratowej-przedzial",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Najmniejsza i największa wartość w przedziale",
  latex: "f(x) = ax^2+bx+c, \\; x \\in [\\alpha, \\beta]",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "alfa", label: "α (lewy koniec)" },
    { id: "beta", label: "β (prawy koniec)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "min, max",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    let alfa = asRational(known["alfa"], "α");
    let beta = asRational(known["beta"], "β");
    if (cmp(alfa, beta) > 0) [alfa, beta] = [beta, alfa];
    const f = (x: Rational): Rational => add(add(mul(a, mul(x, x)), mul(b, x)), c);
    const p = div(neg(b), mul(of(2), a));
    const inInterval = cmp(alfa, p) <= 0 && cmp(p, beta) <= 0;
    const cands: { x: Rational; y: Rational; label: string }[] = [
      { x: alfa, y: f(alfa), label: `f(${L(alfa)})` },
      { x: beta, y: f(beta), label: `f(${L(beta)})` },
    ];
    if (inInterval) cands.push({ x: p, y: f(p), label: `f(${L(p)})` });
    let minC = cands[0]!;
    let maxC = cands[0]!;
    for (const cnd of cands) {
      if (cmp(cnd.y, minC.y) < 0) minC = cnd;
      if (cmp(cnd.y, maxC.y) > 0) maxC = cnd;
    }
    const minV = exactOf(minC.y);
    const maxV = exactOf(maxC.y);
    return {
      values: [minV, maxV],
      labels: ["min", "max"],
      steps: [
        {
          title: "1. Wierzchołek",
          body: `p = -\\frac{b}{2a} = ${L(p)}`,
          note: inInterval
            ? "wierzchołek leży w przedziale [α, β]"
            : "wierzchołek poza przedziałem [α, β]",
        },
        {
          title: "2. Wartości w kandydatach",
          body: `${cands.map((cd) => `${cd.label} = ${L(cd.y)}`).join(", \\; ")}`,
        },
        {
          title: "3. Wynik",
          body: `\\min f = ${formatLatex(minV)} \\text{ dla } x = ${L(minC.x)}, \\; \\max f = ${formatLatex(maxV)} \\text{ dla } x = ${L(maxC.x)}`,
          note:
            places > 0
              ? `przybliżenia: min ≈ ${formatDecimal(minV, places)}, max ≈ ${formatDecimal(maxV, places)}`
              : undefined,
        },
      ],
    };
  },
};

export const MATH_FUNKCJE: FormulaDef[] = [
  dziedzinaWymierna,
  monotonicznoscKwadratowej,
  minmaxKwadratowej,
];
