import { ZERO, add, cmp, isIntegerR, isZero, pow, sub } from "../exact/rational";
import { approx, approxOnly, exactOf, rootRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const nierownoscBezwzgledna: FormulaDef = {
  id: "nierownosc-bezwzgledna",
  subject: "matematyka",
  topic: "Wartość bezwzględna",
  name: "Nierówność z wartością bezwzględną",
  latex: "|x - a| < r \\iff x \\in (a-r, a+r)",
  vars: [
    { id: "a", label: "a (środek)" },
    { id: "r", label: "r (promień)" },
    { id: "op", label: "znak", kind: "select", options: ["<", "≤", ">", "≥"] },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "rozwiązanie",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const op = selects?.["op"] ?? "<";
    const a = asRational(known["a"], "a");
    const r = asRational(known["r"], "r");
    if (cmp(r, ZERO) < 0) throw new Error("r ≥ 0 — promień nie może być ujemny");
    const opL = op === "≤" ? "\\le" : op === "≥" ? "\\ge" : op === ">" ? ">" : "<";
    const head = [{ title: "1. Nierówność", body: `|x - ${L(a)}| ${opL} ${L(r)}` }];
    const isZeroR = isZero(r);
    if (op === "<" || op === "≤") {
      if (isZeroR) {
        if (op === "<") {
          return {
            values: [],
            steps: [
              ...head,
              {
                title: "2. Wynik",
                body: "\\varnothing",
                note: "wartość bezwzględna nie jest ujemna",
              },
            ],
          };
        }
        return {
          values: [exactOf(a)],
          labels: ["x"],
          steps: [
            ...head,
            { title: "2. Wynik", body: `x = ${L(a)}`, note: "jedynie x = a (odległość 0)" },
          ],
        };
      }
      const lo = sub(a, r);
      const hi = add(a, r);
      const lB = op === "<" ? "(" : "[";
      const rB = op === "<" ? ")" : "]";
      return {
        values: [exactOf(lo), exactOf(hi)],
        labels: ["lewy", "prawy"],
        steps: [
          ...head,
          {
            title: "2. Przekształcenie",
            body: `${L(a)} - ${L(r)} ${opL} x ${opL} ${L(a)} + ${L(r)}`,
          },
          { title: "3. Wynik", body: `x \\in ${lB}${L(lo)}, ${L(hi)}${rB}` },
        ],
      };
    }
    if (isZeroR) {
      if (op === ">") {
        return {
          values: [],
          steps: [
            ...head,
            {
              title: "2. Wynik",
              body: `x \\in \\mathbb{R} \\setminus \\{${L(a)}\\}`,
              note: "wszystkie x poza a",
            },
          ],
        };
      }
      return {
        values: [],
        steps: [
          ...head,
          {
            title: "2. Wynik",
            body: "x \\in \\mathbb{R}",
            note: "zawsze prawdziwe (odległość ≥ 0)",
          },
        ],
      };
    }
    const lo = sub(a, r);
    const hi = add(a, r);
    const strict = op === ">";
    const lB = strict ? "(" : "[";
    const rB = strict ? ")" : "]";
    return {
      values: [exactOf(lo), exactOf(hi)],
      labels: ["lewy", "prawy"],
      steps: [
        ...head,
        {
          title: "2. Przekształcenie",
          body: `x ${strict ? "<" : "≤"} ${L(lo)} \\;\\lor\\; x ${strict ? ">" : "≥"} ${L(hi)}`,
        },
        {
          title: "3. Wynik",
          body: `x \\in (-\\infty, ${L(lo)}${rB} \\cup ${lB}${L(hi)}, +\\infty)`,
        },
      ],
    };
  },
};

const potegaWymierna: FormulaDef = {
  id: "potega-wymierna",
  subject: "matematyka",
  topic: "Potęgi i pierwiastki",
  name: "Potęga o wykładniku wymiernym",
  latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}",
  vars: [
    { id: "a", label: "a (podstawa)" },
    { id: "m", label: "m (licznik)" },
    { id: "n", label: "n (mianownik)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wartość",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const mRat = asRational(known["m"], "m");
    if (!isIntegerR(mRat)) throw new Error("m musi być liczbą całkowitą");
    const m = Number(mRat.p);
    const n = requireNatural(known["n"], "n");
    if (cmp(a, ZERO) <= 0) throw new Error("a > 0 — podstawa dodatnia");
    const powVal = pow(a, m);
    let value: Exact;
    let note: string | undefined;
    try {
      value = rootRational(powVal, n);
    } catch {
      value = approxOnly(Math.pow(approx(exactOf(a)), m / n));
      note = "wynik tylko przybliżony";
    }
    return {
      values: [value],
      steps: [
        { title: "1. Definicja", body: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}" },
        {
          title: "2. Podstawienie danych",
          body: `${L(a)}^{\\frac{${m}}{${n}}} = \\sqrt[${n}]{${L(a)}^{${m}}}`,
        },
        { title: "3. Potęga pod pierwiastkiem", body: `${L(a)}^{${m}} = ${L(powVal)}` },
        { title: "4. Wynik", body: resultLatex(`\\sqrt[${n}]{${L(powVal)}}`, value, places), note },
      ],
    };
  },
};

export const MATH_LICZBY: FormulaDef[] = [nierownoscBezwzgledna, potegaWymierna];
