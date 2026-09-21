import type { Rational } from "../exact/rational";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";
import { factorPolynomial } from "./poly";

const rozkladWielomianu: FormulaDef = {
  id: "rozklad-wielomianu",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Rozkład wielomianu na czynniki (stopień 2–6)",
  latex: "W(x) = a_n x^n + \\dots + a_1 x + a_0",
  vars: [
    { id: "deg", label: "stopień (2–6)", kind: "select", options: ["2", "3", "4", "5", "6"] },
    { id: "a6", label: "a₆" },
    { id: "a5", label: "a₅" },
    { id: "a4", label: "a₄" },
    { id: "a3", label: "a₃" },
    { id: "a2", label: "a₂" },
    { id: "a1", label: "a₁" },
    { id: "a0", label: "a₀" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "rozkład",
  solve(_unknown, known, _places, selects): FormulaSolution {
    const deg = Number(selects?.["deg"] ?? "2");
    if (![2, 3, 4, 5, 6].includes(deg)) throw new Error("stopień musi być 2–6");
    const coeffIds = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
    const start = 6 - deg;
    const coeffs: Rational[] = [];
    for (let i = start; i <= 6; i++) {
      const id = coeffIds[i];
      const val = known[id];
      if (!val || (val.rat.p === 0n && !val.irr)) {
        if (i === start)
          throw new Error("współczynnik przy najwyższej potędze nie może być zerowy");
        coeffs.push({ p: 0n, q: 1n });
      } else {
        coeffs.push(asRational(val, id));
      }
    }
    const res = factorPolynomial(coeffs);
    return { values: [], steps: res.steps, labels: [] };
  },
};

export const MATH_POLY: FormulaDef[] = [rozkladWielomianu];
