import { ONE, ZERO, cmp, div, mul, sub } from "../exact/rational";
import { addExact, divExact, logExact, mulRat, subExact } from "../exact/exact";
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

const dzialaniaNaLogarytmach: FormulaDef = {
  id: "dzialania-na-logarytmach",
  subject: "matematyka",
  topic: "Logarytmy",
  name: "Działania na logarytmach",
  latex:
    "\\log_a(bc) = \\log_a b + \\log_a c, \\; \\log_a(b/c) = \\log_a b - \\log_a c, \\; \\log_a(b^r) = r\\log_a b",
  vars: [
    { id: "a", label: "a (podstawa)" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "r", label: "r (wykładnik)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyniki",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const r = asRational(known["r"], "r");
    if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0)
      throw new Error("podstawa dodatnia i różna od 1");
    if (cmp(b, ZERO) <= 0 || cmp(c, ZERO) <= 0) throw new Error("argumenty logarytmu dodatnie");
    const logB = logExact(a, b);
    const logC = logExact(a, c);
    const logBC = logExact(a, mul(b, c));
    const logBDivC = logExact(a, div(b, c));
    const logPow = mulRat(logB, r);
    return {
      values: [logB, logC, logBC, logBDivC, logPow],
      labels: ["log_a b", "log_a c", "log_a(bc)", "log_a(b/c)", "log_a(b^r)"],
      steps: [
        {
          title: "1. Logarytmy składowe",
          body: `\\log_a b = ${show(logB, places)}, \\; \\log_a c = ${show(logC, places)}`,
        },
        {
          title: "2. Logarytm iloczynu",
          body: `\\log_a(bc) = \\log_a b + \\log_a c = ${show(addExact(logB, logC), places)} = ${show(logBC, places)}`,
        },
        {
          title: "3. Logarytm ilorazu",
          body: `\\log_a(b/c) = \\log_a b - \\log_a c = ${show(subExact(logB, logC), places)} = ${show(logBDivC, places)}`,
        },
        {
          title: "4. Logarytm potęgi",
          body: `\\log_a(b^r) = r\\log_a b = ${L(r)} \\cdot ${show(logB, places)} = ${show(logPow, places)}`,
        },
      ],
    };
  },
};

const zamianaPodstawyLog: FormulaDef = {
  id: "zamiana-podstawy-log",
  subject: "matematyka",
  topic: "Logarytmy",
  name: "Zamiana podstawy logarytmu",
  latex: "\\log_b c = \\frac{\\log_a c}{\\log_a b}",
  vars: [
    { id: "a", label: "a (nowa podstawa)" },
    { id: "b", label: "b (stara podstawa)" },
    { id: "c", label: "c (liczba)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "log_b c",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const ok = (v: ReturnType<typeof asRational>): boolean =>
      cmp(v, ZERO) > 0 && cmp(sub(v, ONE), ZERO) !== 0;
    if (!ok(a)) throw new Error("nowa podstawa dodatnia i różna od 1");
    if (!ok(b)) throw new Error("stara podstawa dodatnia i różna od 1");
    if (cmp(c, ZERO) <= 0) throw new Error("liczba logarytmowana dodatnia");
    const direct = logExact(b, c);
    const logAC = logExact(a, c);
    const logAB = logExact(a, b);
    const ratio = divExact(logAC, logAB);
    return {
      values: [direct, logAC, logAB, ratio],
      labels: ["log_b c", "log_a c", "log_a b", "iloraz"],
      steps: [
        { title: "1. Wzór", body: "\\log_b c = \\frac{\\log_a c}{\\log_a b}" },
        {
          title: "2. Licznik i mianownik",
          body: `\\log_a c = ${show(logAC, places)}, \\; \\log_a b = ${show(logAB, places)}`,
        },
        { title: "3. Iloraz", body: `\\frac{\\log_a c}{\\log_a b} = ${show(ratio, places)}` },
        {
          title: "4. Wynik",
          body: `\\log_b c = ${show(direct, places)}`,
          note: direct.irr?.type === "approx" ? "wynik przybliżony" : undefined,
        },
      ],
    };
  },
};

export const MATH_LOGARYTMY: FormulaDef[] = [dzialaniaNaLogarytmach, zamianaPodstawyLog];
