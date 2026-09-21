import { ZERO, cmp, isZero, mul, of, sub } from "../exact/rational";
import { exactOf } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, stdSteps } from "./types";

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
    return {
      values: [value],
      steps: stdSteps(
        "\\Delta = b^2 - 4ac",
        `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)} = ${formatLatex(value)}`,
        value,
        places,
        note,
      ),
    };
  },
};

export const MATH_DELTA: FormulaDef[] = [delta];
