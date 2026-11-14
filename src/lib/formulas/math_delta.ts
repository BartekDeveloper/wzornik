import { ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import { exactOf, mulRat, sqrtRational } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const delta: FormulaDef = {
  id: "delta",
  subject: "matematyka",
  topic: "Równania",
  name: "Wyróżnik (delta)",
  latex: "\\Delta = b^2 - 4ac",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "Delta", label: "Δ" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Delta") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const c = asRational(known["c"], "c");
      if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
      const deltaVal = sub(mul(b, b), mul(mul(of(4), a), c));
      const value = exactOf(deltaVal);
      const dCmp = cmp(deltaVal, ZERO);
      const note =
        dCmp > 0
          ? "Δ > 0 — dwa pierwiastki rzeczywiste"
          : dCmp === 0
            ? "Δ = 0 — jeden pierwiastek podwójny"
            : "Δ < 0 — brak pierwiastków rzeczywistych";
      const steps: FormulaSolution["steps"] = [
        { title: "1. Wzór", body: "\\Delta = b^2 - 4ac" },
        {
          title: "2. Podstawienie danych",
          body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`,
        },
        {
          title: "3. Obliczenie",
          body: `\\Delta = ${L(mul(b, b))} - ${L(mul(mul(of(4), a), c))} = ${formatLatex(value)}`,
        },
      ];
      if (dCmp >= 0) {
        const sq = sqrtRational(deltaVal);
        steps.push({
          title: "4. Pierwiastek z delty",
          body: `\\sqrt{\\Delta} = ${formatLatex(sq)}`,
        });
        steps.push({ title: "5. Wynik", body: resultLatex("\\Delta", value, places), note });
        return { values: [value, sq], labels: ["Δ", "√Δ"], steps };
      }
      steps.push({ title: "4. Wynik", body: resultLatex("\\Delta", value, places), note });
      return { values: [value], steps };
    }

    const g = (id: string): ReturnType<typeof asRational> => asRational(known[id], id);

    if (unknown === "a") {
      const b = g("b");
      const c = g("c");
      const D = g("Delta");
      if (isZero(c)) throw new Error("c ≠ 0 — inaczej a nie da się wyznaczyć z samej delty");
      const num = sub(mul(b, b), D);
      const value = exactOf(div(num, mul(of(4), c)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\Delta = b^2 - 4ac \\Rightarrow a = \\frac{b^2 - \\Delta}{4c}",
          },
          {
            title: "2. Podstawienie danych",
            body: `a = \\frac{${L(b)}^2 - ${L(D)}}{4 \\cdot ${L(c)}}`,
          },
          { title: "3. Licznik", body: `b^2 - \\Delta = ${L(mul(b, b))} - ${L(D)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("a", value, places) },
        ],
      };
    }

    if (unknown === "b") {
      const a = g("a");
      const c = g("c");
      const D = g("Delta");
      const inner = add(D, mul(mul(of(4), a), c));
      if (cmp(inner, ZERO) < 0)
        throw new Error("Δ + 4ac < 0 — taki b nie istnieje na liczbach rzeczywistych");
      const sq = sqrtRational(inner);
      const plus = sq;
      const minus = mulRat(plus, neg(of(1)));
      return {
        values: [minus, plus],
        labels: ["b₁", "b₂"],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "b^2 = \\Delta + 4ac \\Rightarrow b = \\pm\\sqrt{\\Delta + 4ac}",
          },
          {
            title: "2. Podstawienie danych",
            body: `b^2 = ${L(D)} + 4 \\cdot ${L(a)} \\cdot ${L(c)}`,
          },
          { title: "3. Wartość pod pierwiastkiem", body: `\\Delta + 4ac = ${L(inner)}` },
          {
            title: "4. Wynik",
            body: `${resultLatex("b_1", minus, places)}, \\; ${resultLatex("b_2", plus, places)}`,
            note: "dwa możliwe znaki b (±)",
          },
        ],
      };
    }

    const a = g("a");
    const b = g("b");
    const D = g("Delta");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
    const num = sub(mul(b, b), D);
    const value = exactOf(div(num, mul(of(4), a)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "c = \\frac{b^2 - \\Delta}{4a}" },
        {
          title: "2. Podstawienie danych",
          body: `c = \\frac{${L(b)}^2 - ${L(D)}}{4 \\cdot ${L(a)}}`,
        },
        { title: "3. Licznik", body: `b^2 - \\Delta = ${L(mul(b, b))} - ${L(D)} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("c", value, places) },
      ],
    };
  },
};

export const MATH_DELTA: FormulaDef[] = [delta];
