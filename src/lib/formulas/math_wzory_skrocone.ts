import { add, mul, of, sub } from "../exact/rational";
import { exactOf } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const kwadratSumyRoznicy: FormulaDef = {
  id: "kwadrat-sumy-roznicy",
  subject: "matematyka",
  topic: "Wzory skróconego mnożenia",
  name: "Kwadrat sumy i różnicy",
  latex: "(a+b)^2 = a^2+2ab+b^2, \\; (a-b)^2 = a^2-2ab+b^2",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyniki",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const a2 = mul(a, a);
    const b2 = mul(b, b);
    const ab2 = mul(mul(of(2), a), b);
    const sumSq = exactOf(add(add(a2, ab2), b2));
    const diffSq = exactOf(sub(sub(a2, ab2), b2));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatLatex(e);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [sumSq, diffSq],
      labels: ["(a+b)²", "(a−b)²"],
      steps: [
        { title: "1. Wzory", body: "(a+b)^2 = a^2+2ab+b^2, \\quad (a-b)^2 = a^2-2ab+b^2" },
        { title: "2. Podstawienie", body: `a = ${L(a)}, \\; b = ${L(b)}` },
        { title: "3. Wynik", body: `(a+b)^2 = ${show(sumSq)}, \\; (a-b)^2 = ${show(diffSq)}` },
      ],
    };
  },
};

const roznicaKwadratow: FormulaDef = {
  id: "roznica-kwadratow",
  subject: "matematyka",
  topic: "Wzory skróconego mnożenia",
  name: "Różnica kwadratów",
  latex: "a^2 - b^2 = (a-b)(a+b)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wynik",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const a2 = mul(a, a);
    const b2 = mul(b, b);
    const diff = exactOf(sub(a2, b2));
    const prod = exactOf(mul(add(a, b), sub(a, b)));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatLatex(e);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [diff, prod],
      labels: ["a²−b²", "(a−b)(a+b)"],
      steps: [
        { title: "1. Wzór", body: "a^2 - b^2 = (a-b)(a+b)" },
        { title: "2. Podstawienie", body: `a = ${L(a)}, \\; b = ${L(b)}` },
        { title: "3. Wynik", body: `a^2 - b^2 = ${show(diff)}, \\; (a-b)(a+b) = ${show(prod)}` },
      ],
    };
  },
};

export const MATH_WZORY_SKROCONEGO: FormulaDef[] = [kwadratSumyRoznicy, roznicaKwadratow];
