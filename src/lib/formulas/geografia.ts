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

export const GEOGRAFIA_FORMULAS: FormulaDef[] = [
  nvar3(
    "skala-mapy",
    "Kartografia",
    "Skala mapy",
    "M = \\frac{d_{rzecz}}{d_{mapy}}",
    ["M", "drzecz", "dmapy"],
    ["M", "d rzecz. [cm]", "d na mapie [cm]"],
    "M = \\frac{d_{rzecz}}{d_{mapy}}",
    (a, b) => `M = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
    "d_{rzecz} = M \\cdot d_{mapy}",
    (a, b) => `d_{rzecz} = ${a} \\cdot ${b}`,
    (x, y) => mul(x, y),
    "d_{mapy} = \\frac{d_{rzecz}}{M}",
    (a, b) => `d_{mapy} = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
  ),
  nvar3(
    "gestosc-zaludnienia",
    "Ludność",
    "Gęstość zaludnienia",
    "g = \\frac{L}{P}",
    ["g", "L", "P"],
    ["g [os./km²]", "L [os.]", "P [km²]"],
    "g = \\frac{L}{P}",
    (a, b) => `g = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
    "L = g \\cdot P",
    (a, b) => `L = ${a} \\cdot ${b}`,
    (x, y) => mul(x, y),
    "P = \\frac{L}{g}",
    (a, b) => `P = \\frac{${a}}{${b}}`,
    (x, y) => div(x, y),
  ),
  nvar3(
    "przyrost-naturalny",
    "Ludność",
    "Przyrost naturalny",
    "PN = U - Z",
    ["PN", "U", "Z"],
    ["PN", "U (urodzenia)", "Z (zgony)"],
    "PN = U - Z",
    (a, b) => `PN = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "U = PN + Z",
    (a, b) => `U = ${a} + ${b}`,
    (x, y) => add(x, y),
    "Z = U - PN",
    (a, b) => `Z = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
  nvar3(
    "saldo-migracji",
    "Ludność",
    "Saldo migracji",
    "S = I - E",
    ["S", "I", "E"],
    ["S", "I (imigracja)", "E (emigracja)"],
    "S = I - E",
    (a, b) => `S = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "I = S + E",
    (a, b) => `I = ${a} + ${b}`,
    (x, y) => add(x, y),
    "E = I - S",
    (a, b) => `E = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
  nvar3(
    "przyrost-rzeczywisty",
    "Ludność",
    "Przyrost rzeczywisty",
    "PR = PN + S",
    ["PR", "PN", "S"],
    ["PR", "PN", "S (saldo)"],
    "PR = PN + S",
    (a, b) => `PR = ${a} + ${b}`,
    (x, y) => add(x, y),
    "PN = PR - S",
    (a, b) => `PN = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "S = PR - PN",
    (a, b) => `S = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
  nvar3(
    "deniwelacja",
    "Rzeźba terenu",
    "Deniwelacja",
    "D = H_{max} - H_{min}",
    ["D", "Hmax", "Hmin"],
    ["D [m]", "Hmax [m]", "Hmin [m]"],
    "D = H_{max} - H_{min}",
    (a, b) => `D = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "H_{max} = D + H_{min}",
    (a, b) => `H_{max} = ${a} + ${b}`,
    (x, y) => add(x, y),
    "H_{min} = H_{max} - D",
    (a, b) => `H_{min} = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
  nvar3(
    "amplituda-temperatur",
    "Klimat",
    "Amplituda temperatur",
    "A = T_{max} - T_{min}",
    ["A", "Tmax", "Tmin"],
    ["A [°C]", "Tmax [°C]", "Tmin [°C]"],
    "A = T_{max} - T_{min}",
    (a, b) => `A = ${a} - ${b}`,
    (x, y) => sub(x, y),
    "T_{max} = A + T_{min}",
    (a, b) => `T_{max} = ${a} + ${b}`,
    (x, y) => add(x, y),
    "T_{min} = T_{max} - A",
    (a, b) => `T_{min} = ${a} - ${b}`,
    (x, y) => sub(x, y),
  ),
  nvar3(
    "nachylenie-stoku",
    "Rzeźba terenu",
    "Nachylenie stoku",
    "n = \\frac{D}{d} \\cdot 100\\%",
    ["n", "D", "d"],
    ["n [%]", "D [m]", "d [m]"],
    "n = \\frac{D}{d} \\cdot 100\\%",
    (a, b) => `n = \\frac{${a}}{${b}} \\cdot 100\\%`,
    (x, y) => mul(div(x, y), of(100)),
    "D = \\frac{n \\cdot d}{100}",
    (a, b) => `D = \\frac{${a} \\cdot ${b}}{100}`,
    (x, y) => div(mul(x, y), of(100)),
    "d = \\frac{D \\cdot 100}{n}",
    (a, b) => `d = \\frac{${a} \\cdot 100}{${b}}`,
    (x, y) => div(mul(x, of(100)), y),
  ),
];
