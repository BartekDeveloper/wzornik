import { ZERO, cmp, pow } from "../exact/rational";
import { exactOf } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const dzialaniaNaPotegach: FormulaDef = {
  id: "dzialania-na-potegach",
  subject: "matematyka",
  topic: "Potęgi i pierwiastki",
  name: "Działania na potęgach",
  latex:
    "a^r \\cdot a^s = a^{r+s}, \\; \\frac{a^r}{a^s} = a^{r-s}, \\; (a^r)^s = a^{rs}, \\; (ab)^r = a^r b^r",
  vars: [
    { id: "a", label: "a" },
    { id: "r", label: "r (wykładnik)" },
    { id: "s", label: "s (wykładnik)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyniki",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const r = asRational(known["r"], "r");
    const s = asRational(known["s"], "s");
    if (cmp(a, ZERO) === 0 && (cmp(r, ZERO) < 0 || cmp(s, ZERO) < 0))
      throw new Error("a ≠ 0 przy ujemnych wykładnikach");
    const checkInt = (v: ReturnType<typeof asRational>, name: string): number => {
      if (v.q !== 1n) throw new Error(`${name} musi być liczbą całkowitą`);
      return Number(v.p);
    };
    const ri = checkInt(r, "r");
    const si = checkInt(s, "s");
    const prod = exactOf(pow(a, ri + si));
    const quotient = exactOf(pow(a, ri - si));
    const power = exactOf(pow(a, ri * si));
    return {
      values: [prod, quotient, power],
      labels: ["a^(r+s)", "a^(r−s)", "a^(r·s)"],
      steps: [
        {
          title: "1. Iloczyn potęg",
          body: `a^r \\cdot a^s = a^{${ri}+${si}} = a^{${ri + si}} = ${show(prod, places)}`,
        },
        {
          title: "2. Iloraz potęg",
          body: `\\frac{a^r}{a^s} = a^{${ri}-${si}} = a^{${ri - si}} = ${show(quotient, places)}`,
        },
        {
          title: "3. Potęga potęgi",
          body: `(a^r)^s = a^{${ri} \\cdot ${si}} = a^{${ri * si}} = ${show(power, places)}`,
        },
      ],
    };
  },
};

export const MATH_POTEGI: FormulaDef[] = [dzialaniaNaPotegach];
