import { add, div, mul, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, stdSteps } from "./types";

const L = formatRatLatex;

function nvar3(
  id: string,
  topic: string,
  name: string,
  latex: string,
  ids: [string, string, string],
  labels: [string, string, string],
  fwd: string,
  fwdSub: (x: string, y: string) => string,
  op: (x: Rational, y: Rational) => Rational,
  back1: string,
  back1Sub: (x: string, y: string) => string,
  op1: (x: Rational, y: Rational) => Rational,
  back2: string,
  back2Sub: (x: string, y: string) => string,
  op2: (x: Rational, y: Rational) => Rational,
): FormulaDef {
  const [A, B, C] = ids;
  return {
    id,
    subject: "geografia",
    topic,
    name,
    latex,
    vars: [
      { id: A, label: labels[0] },
      { id: B, label: labels[1] },
      { id: C, label: labels[2] },
    ],
    mode: "nvar",
    outputId: "",
    outputLabel: "",
    solve(unknown, known, places): FormulaSolution {
      if (unknown === A) {
        const b = asRational(known[B], B);
        const c = asRational(known[C], C);
        const value = exactOf(op(b, c));
        return { values: [value], steps: stdSteps(fwd, fwdSub(L(b), L(c)), value, places) };
      }
      if (unknown === B) {
        const a = asRational(known[A], A);
        const c = asRational(known[C], C);
        const value = exactOf(op1(a, c));
        return { values: [value], steps: stdSteps(back1, back1Sub(L(a), L(c)), value, places) };
      }
      const a = asRational(known[A], A);
      const b = asRational(known[B], B);
      const value = exactOf(op2(a, b));
      return { values: [value], steps: stdSteps(back2, back2Sub(L(a), L(b)), value, places) };
    },
  };
}

const H = of(100);
const T = of(1000);

export const GEOGRAFIA_PR_FORMULAS: FormulaDef[] = [
  nvar3(
    "wskaznik-urbanizacji",
    "Ludność · ROZSZ",
    "Wskaźnik urbanizacji",
    "U = \\frac{L_m}{L} \\cdot 100\\%",
    ["U", "Lm", "L"],
    ["U [%]", "Lm (miasta)", "L (ogółem)"],
    "U = \\frac{L_m}{L} \\cdot 100\\%",
    (a, b) => `U = \\frac{${a}}{${b}} \\cdot 100\\%`,
    (x, y) => mul(div(x, y), H),
    "L_m = \\frac{U \\cdot L}{100}",
    (a, b) => `L_m = \\frac{${a} \\cdot ${b}}{100}`,
    (x, y) => div(mul(x, y), H),
    "L = \\frac{L_m \\cdot 100}{U}",
    (a, b) => `L = \\frac{${a} \\cdot 100}{${b}}`,
    (x, y) => div(mul(x, H), y),
  ),
  nvar3(
    "stopa-bezrobocia",
    "Gospodarka · ROZSZ",
    "Stopa bezrobocia",
    "u = \\frac{B}{A} \\cdot 100\\%",
    ["u", "B", "A"],
    ["u [%]", "B (bezrobotni)", "A (aktywni)"],
    "u = \\frac{B}{A} \\cdot 100\\%",
    (a, b) => `u = \\frac{${a}}{${b}} \\cdot 100\\%`,
    (x, y) => mul(div(x, y), H),
    "B = \\frac{u \\cdot A}{100}",
    (a, b) => `B = \\frac{${a} \\cdot ${b}}{100}`,
    (x, y) => div(mul(x, y), H),
    "A = \\frac{B \\cdot 100}{u}",
    (a, b) => `A = \\frac{${a} \\cdot 100}{${b}}`,
    (x, y) => div(mul(x, H), y),
  ),
  nvar3(
    "pkb-per-capita",
    "Gospodarka · ROZSZ",
    "PKB per capita",
    "PKB_{pc} = \\frac{PKB}{L}",
    ["PKBpc", "PKB", "L"],
    ["PKB per capita", "PKB", "L (ludność)"],
    "PKB_{pc} = \\frac{PKB}{L}",
    (a, b) => `PKB_{pc} = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
    "PKB = PKB_{pc} \\cdot L",
    (a, b) => `PKB = ${a} \\cdot ${b}`,
    (x, y) => mul(x, y),
    "L = \\frac{PKB}{PKB_{pc}}",
    (a, b) => `L = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
  ),
  nvar3(
    "wspolczynnik-feminizacji",
    "Ludność · ROZSZ",
    "Współczynnik feminizacji",
    "W_f = \\frac{K}{M} \\cdot 100",
    ["Wf", "K", "M"],
    ["Wf", "K (kobiety)", "M (mężczyźni)"],
    "W_f = \\frac{K}{M} \\cdot 100",
    (a, b) => `W_f = \\frac{${a}}{${b}} \\cdot 100`,
    (x, y) => mul(div(x, y), H),
    "K = \\frac{W_f \\cdot M}{100}",
    (a, b) => `K = \\frac{${a} \\cdot ${b}}{100}`,
    (x, y) => div(mul(x, y), H),
    "M = \\frac{K \\cdot 100}{W_f}",
    (a, b) => `M = \\frac{${a} \\cdot 100}{${b}}`,
    (x, y) => div(mul(x, H), y),
  ),
  nvar3(
    "wspolczynnik-przyrostu",
    "Ludność · ROZSZ",
    "Współczynnik przyrostu (‰)",
    "r = \\frac{PN}{L} \\cdot 1000",
    ["r", "PN", "L"],
    ["r [‰]", "PN", "L (ludność)"],
    "r = \\frac{PN}{L} \\cdot 1000",
    (a, b) => `r = \\frac{${a}}{${b}} \\cdot 1000`,
    (x, y) => mul(div(x, y), T),
    "PN = \\frac{r \\cdot L}{1000}",
    (a, b) => `PN = \\frac{${a} \\cdot ${b}}{1000}`,
    (x, y) => div(mul(x, y), T),
    "L = \\frac{PN \\cdot 1000}{r}",
    (a, b) => `L = \\frac{${a} \\cdot 1000}{${b}}`,
    (x, y) => div(mul(x, T), y),
  ),
  nvar3(
    "czas-sloneczny",
    "Astronomia · ROZSZ",
    "Czas słoneczny",
    "\\Delta t = \\Delta\\lambda \\cdot 4\\,min",
    ["dt", "dlambda", "k"],
    ["Δt [min]", "Δλ [°]", "k (stała = 4)"],
    "\\Delta t = \\Delta\\lambda \\cdot 4",
    (a, _b) => `\\Delta t = ${a} \\cdot 4`,
    (x, _y) => mul(x, of(4)),
    "\\Delta\\lambda = \\frac{\\Delta t}{4}",
    (a, _b) => `\\Delta\\lambda = \\frac{${a}}{4}`,
    (x, _y) => div(x, of(4)),
    "k = \\frac{\\Delta t}{\\Delta\\lambda}",
    (a, b) => `k = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
  ),
  nvar3(
    "bilans-wodny",
    "Hydrologia · ROZSZ",
    "Bilans wodny",
    "B = P - E",
    ["B", "P", "E"],
    ["B [mm]", "P (opad) [mm]", "E (parowanie) [mm]"],
    "B = P - E",
    (a, b) => `B = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "P = B + E",
    (a, b) => `P = ${a} + ${b}`,
    (x, y) => add(x, y),
    "E = P - B",
    (a, b) => `E = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
];
