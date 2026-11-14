import { ZERO, cmp, div, mul, of } from "../exact/rational";
import { mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;
const SQRT3: Exact = sqrtRational(of(3));

const trojkatRownoboczny: FormulaDef = {
  id: "trojkat-rownoboczny",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Trójkąt równoboczny",
  latex:
    "h = \\frac{a\\sqrt{3}}{2}, \\; P = \\frac{a^2\\sqrt{3}}{4}, \\; R = \\frac{a\\sqrt{3}}{3}, \\; r = \\frac{a\\sqrt{3}}{6}",
  vars: [{ id: "a", label: "a (bok)" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "h, P, R, r",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    if (cmp(a, ZERO) <= 0) throw new Error("bok trójkąta musi być dodatni");
    const h = mulRat(SQRT3, div(a, of(2)));
    const P = mulRat(SQRT3, div(mul(a, a), of(4)));
    const R = mulRat(SQRT3, div(a, of(3)));
    const r = mulRat(SQRT3, div(a, of(6)));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [h, P, R, r],
      labels: ["h", "P", "R", "r"],
      steps: [
        {
          title: "1. Wzory",
          body: "h = \\frac{a\\sqrt{3}}{2}, \\; P = \\frac{a^2\\sqrt{3}}{4}, \\; R = \\frac{a\\sqrt{3}}{3}, \\; r = \\frac{a\\sqrt{3}}{6}",
        },
        { title: "2. Podstawienie danych", body: `a = ${L(a)}` },
        {
          title: "3. Wynik",
          body: `h = ${show(h)}, \\; P = ${show(P)}, \\; R = ${show(R)}, \\; r = ${show(r)}`,
        },
      ],
    };
  },
};

export const MATH_TROJKAT_ROWNOBOCZNY: FormulaDef[] = [trojkatRownoboczny];
