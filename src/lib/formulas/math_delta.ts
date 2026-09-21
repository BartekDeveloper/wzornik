import { ZERO, cmp, isZero, mul, of, sub } from "../exact/rational";
import { exactOf, sqrtRational } from "../exact/exact";
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
  ],
  mode: "fixed",
  outputId: "Delta",
  outputLabel: "Δ",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
    const deltaVal = sub(mul(b, b), mul(mul(of(4), a), c));
    const value = exactOf(deltaVal);
    let note: string | undefined;
    const dCmp = cmp(deltaVal, ZERO);
    if (dCmp > 0) note = "Δ > 0 — dwa pierwiastki rzeczywiste";
    else if (dCmp === 0) note = "Δ = 0 — jeden pierwiastek podwójny";
    else note = "Δ < 0 — brak pierwiastków rzeczywistych";
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
      steps.push({ title: "4. Pierwiastek z delty", body: `\\sqrt{\\Delta} = ${formatLatex(sq)}` });
      steps.push({ title: "5. Wynik", body: resultLatex("\\Delta", value, places), note });
      return { values: [value, sq], labels: ["Δ", "√Δ"], steps };
    }
    steps.push({ title: "4. Wynik", body: resultLatex("\\Delta", value, places), note });
    return { values: [value], steps };
  },
};

export const MATH_DELTA: FormulaDef[] = [delta];
