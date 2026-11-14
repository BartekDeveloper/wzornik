import { ZERO, add, cmp, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf, solveQuadratic } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const rownanieStycznej: FormulaDef = {
  id: "rownanie-stycznej",
  subject: "matematyka",
  topic: "Pochodne",
  name: "Równanie stycznej do paraboli",
  latex: "y = f'(x_0)(x - x_0) + f(x_0)",
  vars: [
    { id: "a", label: "a (x²)" },
    { id: "b", label: "b (x)" },
    { id: "c", label: "c (wyraz wolny)" },
    { id: "x0", label: "x₀" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "m, f(x₀), równanie stycznej",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const x0 = asRational(known["x0"], "x₀");
    const fx0 = add(add(mul(a, mul(x0, x0)), mul(b, x0)), c);
    const m = add(mul(mul(of(2), a), x0), b);
    const bTang = sub(fx0, mul(m, x0));
    const sgn = (v: Rational): string => (cmp(v, ZERO) >= 0 ? `+ ${L(v)}` : `- ${L(neg(v))}`);
    return {
      values: [exactOf(m), exactOf(fx0), exactOf(bTang)],
      labels: ["m = f′(x₀)", "f(x₀)", "wyraz wolny stycznej"],
      steps: [
        { title: "1. Pochodna", body: `f'(x) = 2ax + b \\\\Rightarrow f'(x_0) = ${L(m)}` },
        { title: "2. Wartość w punkcie", body: `f(x_0) = ${L(fx0)}` },
        {
          title: "3. Równanie stycznej",
          body: `y = ${L(m)}(x - ${L(x0)}) + ${L(fx0)} = ${L(m)}x ${sgn(bTang)}`,
        },
      ],
    };
  },
};

const monotonicznoscWielomianu: FormulaDef = {
  id: "monotonicznosc-ekstrema-wielomianu",
  subject: "matematyka",
  topic: "Pochodne",
  name: "Monotoniczność i ekstrema wielomianu 3. stopnia",
  latex: "f(x) = ax^3+bx^2+cx+d, \\\\; f'(x) = 3ax^2+2bx+c",
  vars: [
    { id: "a", label: "a (x³)" },
    { id: "b", label: "b (x²)" },
    { id: "c", label: "c (x)" },
    { id: "d", label: "d (wyraz wolny)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "punkty krytyczne, monotoniczność",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
    void known["d"];
    const A = mul(of(3), a);
    const B = mul(of(2), b);
    const C = c;
    const q = solveQuadratic(A, B, C);
    const bodySign = cmp(A, ZERO) > 0 ? "rosnący" : "malejący";
    const bodyOpp = cmp(A, ZERO) > 0 ? "malejący" : "rosnący";
    if (q.kind === "none") {
      return {
        values: [],
        steps: [
          {
            title: "1. Pochodna",
            body: `f'(x) = ${L(A)}x^2 ${cmp(B, ZERO) >= 0 ? "+" : "-"} ${L(neg(B))}x ${cmp(C, ZERO) >= 0 ? "+" : "-"} ${L(neg(C))}`,
          },
          { title: "2. Delta", body: `\\\\Delta < 0 \\\\Rightarrow f'(x) \\\\neq 0` },
          {
            title: "3. Monotoniczność",
            body: `f'(x) ma stały znak — funkcja ${bodySign} w \\\\mathbb{R}`,
          },
        ],
      };
    }
    const roots = q.roots;
    const rl = roots.map((r) => show(r, places));
    if (roots.length === 1) {
      const x1 = roots[0]!;
      return {
        values: [x1],
        labels: ["x₀ (punkt krytyczny)"],
        steps: [
          {
            title: "1. Pochodna",
            body: `f'(x) = ${L(A)}x^2 ${cmp(B, ZERO) >= 0 ? "+" : "-"} ${L(neg(B))}x ${cmp(C, ZERO) >= 0 ? "+" : "-"} ${L(neg(C))}`,
          },
          {
            title: "2. Punkt krytyczny",
            body: `f'(x) = 0 \\\\Rightarrow x_0 = ${rl[0]}`,
            note: "pierwiastek podwójny",
          },
          {
            title: "3. Monotoniczność",
            body: `f' nie zmienia znaku — brak ekstremów lokalnych, funkcja ${bodySign} w \\\\mathbb{R}`,
          },
        ],
      };
    }
    const x1 = roots[0]!;
    const x2 = roots[1]!;
    const r1 = cmp(x1.rat, x2.rat) < 0 ? x1 : x2;
    const r2 = cmp(x1.rat, x2.rat) < 0 ? x2 : x1;
    return {
      values: [r1, r2],
      labels: ["x₁", "x₂"],
      steps: [
        {
          title: "1. Pochodna",
          body: `f'(x) = ${L(A)}x^2 ${cmp(B, ZERO) >= 0 ? "+" : "-"} ${L(neg(B))}x ${cmp(C, ZERO) >= 0 ? "+" : "-"} ${L(neg(C))}`,
        },
        {
          title: "2. Punkty krytyczne",
          body: `x_1 = ${show(r1, places)}, \\\\; x_2 = ${show(r2, places)}`,
        },
        {
          title: "3. Monotoniczność",
          body: `f ${bodySign} na \\\\left(-\\\\infty, ${show(r1, places)}\\\\right) \\\\cup \\\\left(${show(r2, places)}, +\\\\infty\\\\right), \\\\; f ${bodyOpp} na \\\\left(${show(r1, places)}, ${show(r2, places)}\\\\right)`,
        },
        {
          title: "4. Ekstrema lokalne",
          body:
            cmp(A, ZERO) > 0
              ? `maximum lokalne w x = ${show(r1, places)}, \\\\; minimum lokalne w x = ${show(r2, places)}`
              : `minimum lokalne w x = ${show(r1, places)}, \\\\; maximum lokalne w x = ${show(r2, places)}`,
        },
      ],
    };
  },
};

const pochodnaIlorazIloczyn: FormulaDef = {
  id: "pochodna-ilorazu-iloczynu",
  subject: "matematyka",
  topic: "Pochodne",
  name: "Pochodna ilorazu i iloczynu funkcji liniowych",
  latex:
    "\\\\left(\\\\frac{ax+b}{cx+d}\\\\right)' = \\\\frac{ad-bc}{(cx+d)^2}, \\\\; \\\\left[(ax+b)(cx+d)\\\\right]' = ac\\\\cdot 2x + ad+bc",
  vars: [
    { id: "typ", label: "rodzaj", kind: "select", options: ["iloraz", "iloczyn"] },
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "pochodna",
  solve(_unknown, known, _places, selects): FormulaSolution {
    const typ = selects?.["typ"] ?? "iloraz";
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const d = asRational(known["d"], "d");
    if (typ === "iloczyn") {
      const ac = mul(a, c);
      const adbc = add(mul(a, d), mul(b, c));
      return {
        values: [exactOf(ac), exactOf(adbc)],
        labels: ["wsp. x²", "wsp. x"],
        steps: [
          { title: "1. Funkcja", body: `f(x) = (${L(a)}x + ${L(b)})(${L(c)}x + ${L(d)})` },
          {
            title: "2. Pochodna iloczynu",
            body: `f'(x) = ${L(a)}(${L(c)}x + ${L(d)}) + ${L(c)}(${L(a)}x + ${L(b)}) = ${L(ac)}\\\\cdot 2x ${cmp(adbc, ZERO) >= 0 ? "+" : "-"} ${L(cmp(adbc, ZERO) >= 0 ? adbc : neg(adbc))}`,
          },
        ],
      };
    }
    if (isZero(c) && isZero(d)) throw new Error("cx + d ≠ 0 — mianownik nie może być zerowy");
    const num = sub(mul(a, d), mul(b, c));
    const body =
      cmp(num, ZERO) === 0
        ? "f'(x) = 0 — funkcja stała"
        : `f'(x) = \\\\frac{${L(num)}}{(${L(c)}x ${cmp(d, ZERO) >= 0 ? "+" : "-"} ${L(neg(d))})^2}`;
    const signNote =
      cmp(num, ZERO) === 0
        ? undefined
        : cmp(num, ZERO) > 0
          ? "f'(x) > 0 dla każdego x z dziedziny — funkcja rosnąca"
          : "f'(x) < 0 dla każdego x z dziedziny — funkcja malejąca";
    return {
      values: [exactOf(num)],
      labels: ["ad−bc"],
      steps: [
        {
          title: "1. Funkcja",
          body: `f(x) = \\\\frac{${L(a)}x + ${L(b)}}{${L(c)}x ${cmp(d, ZERO) >= 0 ? "+" : "-"} ${L(neg(d))}}`,
        },
        { title: "2. Pochodna ilorazu", body, note: signNote },
        { title: "3. Wynik", body: `${L(a)}\\\\cdot${L(d)} - ${L(b)}\\\\cdot${L(c)} = ${L(num)}` },
      ],
    };
  },
};

export const MATH_POCHODNE: FormulaDef[] = [
  rownanieStycznej,
  monotonicznoscWielomianu,
  pochodnaIlorazIloczyn,
];
