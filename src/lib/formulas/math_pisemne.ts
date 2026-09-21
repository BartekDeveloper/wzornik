import { ZERO, cmp } from "../exact/rational";
import type { Rational } from "../exact/rational";
import type { FormulaDef, FormulaSolution } from "./types";
import { addWritten, divWritten, mulWritten, subWritten } from "./pisemne";

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

function decInput(known: Record<string, { rat: Rational }>, id: string): string {
  const v = known[id];
  if (!v) throw new Error(`uzupełnij pole ${id}`);
  if (cmp(v.rat, ZERO) < 0) throw new Error("działania pisemne: tylko liczby nieujemne");
  return ratToDecimal(v.rat);
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
  solve(_unknown, known, _places): FormulaSolution {
    const steps = divWritten(decInput(known, "a"), decInput(known, "b"));
    return { values: [], steps };
  },
};

export const MATH_PISEMNE: FormulaDef[] = [dodawanie, odejmowanie, mnozenie, dzielenie];
