import { add, div, isZero, mul, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { addWritten, divWritten, expandPeriod, mulWritten, subWritten } from "./pisemne";

const L = formatRatLatex;

function ratToDecimal(r: Rational): string {
  const neg = r.p < 0n;
  const p = neg ? -r.p : r.p;
  const q = r.q;
  const int = p / q;
  let rem = p % q;
  if (rem === 0n) return (neg ? "-" : "") + int.toString();
  let frac = "";
  const seen = new Set<bigint>();
  while (rem !== 0n) {
    if (seen.has(rem))
      throw new Error("ułamki okresowe nie są obsługiwane w działaniach pisemnych");
    seen.add(rem);
    if (frac.length >= 12)
      throw new Error("ułamki okresowe nie są obsługiwane w działaniach pisemnych");
    rem *= 10n;
    frac += (rem / q).toString();
    rem %= q;
  }
  return (neg ? "-" : "") + int.toString() + "." + frac;
}

function ratOf(known: Record<string, { rat: Rational }>, id: string): Rational {
  const v = known[id];
  if (!v) throw new Error(`uzupełnij pole ${id}`);
  return v.rat;
}

function decInput(known: Record<string, { rat: Rational }>, id: string): string {
  return ratToDecimal(ratOf(known, id));
}

function isTerminating(r: Rational): boolean {
  let q = r.q < 0n ? -r.q : r.q;
  while (q % 2n === 0n) q /= 2n;
  while (q % 5n === 0n) q /= 5n;
  return q === 1n;
}

function expandRat(r: Rational): string {
  const neg = r.p < 0n;
  const ex = expandPeriod(neg ? -r.p : r.p, r.q, 64);
  const sign = neg ? "-" : "";
  if (ex.per !== "") return `${sign}${ex.int}.${ex.pre}(${ex.per})`;
  return `${sign}${ex.int}${ex.pre !== "" ? `.${ex.pre}` : ""}`;
}

function exactSteps(opTex: string, a: Rational, b: Rational, res: Rational): FormulaSolution {
  return {
    values: [],
    steps: [
      { title: "1. Zamiana na ułamki", body: `${L(a)} ${opTex} ${L(b)}` },
      { title: "2. Wynik dokładny", body: `= ${L(res)}` },
      { title: "3. Rozwinięcie dziesiętne", body: `= ${expandRat(res)}` },
    ],
    labels: [],
  };
}

const dodawanie: FormulaDef = {
  id: "dodawanie-pisemne",
  subject: "matematyka",
  topic: "Arytmetyka",
  name: "Dodawanie pisemne",
  latex: "a + b = c",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "sum",
  outputLabel: "suma",
  solve(_unknown, known, _places): FormulaSolution {
    const a = ratOf(known, "a");
    const b = ratOf(known, "b");
    if (!isTerminating(a) || !isTerminating(b)) {
      return exactSteps("+", a, b, add(a, b));
    }
    const steps = addWritten(decInput(known, "a"), decInput(known, "b"));
    return { values: [], steps };
  },
};

const odejmowanie: FormulaDef = {
  id: "odejmowanie-pisemne",
  subject: "matematyka",
  topic: "Arytmetyka",
  name: "Odejmowanie pisemne",
  latex: "a - b = c",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "diff",
  outputLabel: "różnica",
  solve(_unknown, known, _places): FormulaSolution {
    const a = ratOf(known, "a");
    const b = ratOf(known, "b");
    if (!isTerminating(a) || !isTerminating(b)) {
      return exactSteps("-", a, b, sub(a, b));
    }
    const steps = subWritten(decInput(known, "a"), decInput(known, "b"));
    return { values: [], steps };
  },
};

const mnozenie: FormulaDef = {
  id: "mnozenie-pisemne",
  subject: "matematyka",
  topic: "Arytmetyka",
  name: "Mnożenie pisemne",
  latex: "a \\times b = c",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "prod",
  outputLabel: "iloczyn",
  solve(_unknown, known, _places): FormulaSolution {
    const a = ratOf(known, "a");
    const b = ratOf(known, "b");
    if (!isTerminating(a) || !isTerminating(b)) {
      return exactSteps("\\times", a, b, mul(a, b));
    }
    const steps = mulWritten(decInput(known, "a"), decInput(known, "b"));
    return { values: [], steps };
  },
};

const dzielenie: FormulaDef = {
  id: "dzielenie-pisemne",
  subject: "matematyka",
  topic: "Arytmetyka",
  name: "Dzielenie pisemne",
  latex: "a : b = c \\text{ (reszta } r)",
  vars: [
    { id: "a", label: "a (dzielna)" },
    { id: "b", label: "b (dzielnik)" },
  ],
  mode: "fixed",
  outputId: "quot",
  outputLabel: "iloraz",
  solve(_unknown, known, places): FormulaSolution {
    const a = ratOf(known, "a");
    const b = ratOf(known, "b");
    if (isZero(b)) throw new Error("dzielenie przez zero");
    if (!isTerminating(a) || !isTerminating(b)) {
      return exactSteps(":", a, b, div(a, b));
    }
    const steps = divWritten(decInput(known, "a"), decInput(known, "b"), Math.max(0, places));
    return { values: [], steps };
  },
};

export const MATH_PISEMNE: FormulaDef[] = [dodawanie, odejmowanie, mnozenie, dzielenie];
