import { ZERO, add, cmp, div, mul, of, sub } from "../exact/rational";
import { approx, approxOnly, exactOf, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const heron: FormulaDef = {
  id: "wzor-herona",
  subject: "matematyka",
  topic: "Pola figur · ROZSZ",
  name: "Wzór Herona na pole trójkąta",
  latex: "P = \\sqrt{p(p-a)(p-b)(p-c)}, \\; p = \\frac{a+b+c}{2}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "P",
  outputLabel: "P",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const sum = add(add(a, b), c);
    if (
      cmp(sub(sum, mul(of(2), a)), ZERO) <= 0 ||
      cmp(sub(sum, mul(of(2), b)), ZERO) <= 0 ||
      cmp(sub(sum, mul(of(2), c)), ZERO) <= 0
    ) {
      throw new Error("trójkąt nie istnieje (nierówność trójkąta)");
    }
    const p = div(sum, of(2));
    const pa = sub(p, a);
    const pb = sub(p, b);
    const pc = sub(p, c);
    const prod = mul(mul(mul(p, pa), pb), pc);
    let value: Exact;
    let note: string | undefined;
    try {
      value = sqrtRational(prod);
    } catch {
      value = approxOnly(Math.sqrt(approx(exactOf(prod))));
      note = "wynik tylko przybliżony";
    }
    return {
      values: [value, exactOf(p)],
      labels: ["P", "p"],
      steps: [
        {
          title: "1. Półobwód",
          body: `p = \\frac{a+b+c}{2} = \\frac{${L(a)}+${L(b)}+${L(c)}}{2} = ${L(p)}`,
        },
        {
          title: "2. Podstawienie do wzoru Herona",
          body: `P = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{${L(p)}(${L(p)}-${L(a)})(${L(p)}-${L(b)})(${L(p)}-${L(c)})} = \\sqrt{${L(p)}\\cdot${L(pa)}\\cdot${L(pb)}\\cdot${L(pc)}}`,
        },
        { title: "3. Wynik", body: `P = ${formatLatex(value)}`, note },
      ],
    };
  },
};

export const MATH_HERON: FormulaDef[] = [heron];
