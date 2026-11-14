import { add, binom, div, isZero, mul, neg, pow, sub } from "../exact/rational";
import { exactOf } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const roznicaNPoteg: FormulaDef = {
  id: "roznica-n-tych-poteg",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Różnica n-tych potęg",
  latex: "a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \\dots + b^{n-1})",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "n", label: "n" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "aⁿ − bⁿ",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const n = requireNatural(known["n"], "n");
    if (n < 2) throw new Error("n ≥ 2");
    const an = pow(a, n);
    const bn = pow(b, n);
    const diff = sub(an, bn);
    const terms: string[] = [];
    for (let k = 0; k < n; k++) {
      const pa = n - 1 - k;
      const pb = k;
      let t = "";
      if (pa > 0) t = pa === 1 ? "a" : `a^{${pa}}`;
      if (pb > 0) {
        const bt = pb === 1 ? "b" : `b^{${pb}}`;
        t = t === "" ? bt : `${t}${bt}`;
      }
      terms.push(t === "" ? "1" : t);
    }
    return {
      values: [exactOf(diff)],
      labels: ["aⁿ−bⁿ"],
      steps: [
        { title: "1. Wzór", body: "a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \\dots + b^{n-1})" },
        { title: "2. Rozpisanie", body: `a^{${n}} - b^{${n}} = (a-b)(${terms.join(" + ")})` },
        { title: "3. Wartości", body: `${L(a)}^{${n}} = ${L(an)}, \\; ${L(b)}^{${n}} = ${L(bn)}` },
        { title: "4. Wynik", body: resultLatex(`a^{${n}} - b^{${n}}`, exactOf(diff), places) },
      ],
    };
  },
};

const wyrazDwumianu: FormulaDef = {
  id: "wyraz-newtona",
  subject: "matematyka",
  topic: "Dwumian Newtona · ROZSZ",
  name: "k-ty wyraz rozwinięcia Newtona",
  latex: "T_{k+1} = \\binom{n}{k} a^{n-k} b^k",
  vars: [
    { id: "n", label: "n" },
    { id: "k", label: "k" },
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "T",
  outputLabel: "T_{k+1}",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    const k = requireNatural(known["k"], "k");
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    if (k > n) throw new Error("k ≤ n");
    const c = binom(BigInt(n), BigInt(k));
    const value = exactOf(mul(mul({ p: c, q: 1n }, pow(a, n - k)), pow(b, k)));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "T_{k+1} = \\binom{n}{k} a^{n-k} b^k" },
        { title: "2. Współczynnik", body: `\\binom{${n}}{${k}} = ${c}` },
        {
          title: "3. Podstawienie danych",
          body: `T_{${k + 1}} = ${c} \\cdot ${L(a)}^{${n - k}} \\cdot ${L(b)}^{${k}}`,
        },
        { title: "4. Wynik", body: resultLatex(`T_{${k + 1}}`, value, places) },
      ],
    };
  },
};

const twBezouta: FormulaDef = {
  id: "tw-bezouta",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Twierdzenie Bézouta (parametr m)",
  latex: "W(x) \\;\\text{dzieli się przez}\\; (x-a) \\iff W(a) = 0",
  vars: [
    { id: "a", label: "a (pierwiastek)" },
    { id: "b", label: "b (przy x)" },
    { id: "c", label: "c (wyraz wolny)" },
  ],
  mode: "fixed",
  outputId: "m",
  outputLabel: "m",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — dla a = 0 warunek sprowadza się do c = 0");
    const a2 = mul(a, a);
    const a3 = mul(a2, a);
    const num = add(add(a3, mul(b, a)), c);
    const m = div(neg(num), a2);
    return {
      values: [exactOf(m)],
      steps: [
        { title: "1. Warunek Bézouta", body: "W(a) = 0 \\Rightarrow a^3 + m a^2 + b a + c = 0" },
        { title: "2. Równanie na m", body: `m a^2 = -(a^3 + b a + c)` },
        {
          title: "3. Podstawienie danych",
          body: `m \\cdot ${L(a)}^2 = -(${L(a)}^3 + ${L(b)} \\cdot ${L(a)} + ${L(c)})`,
        },
        {
          title: "4. Licznik",
          body: `a^3 + b a + c = ${L(a3)} + ${L(mul(b, a))} + ${L(c)} = ${L(num)}`,
        },
        { title: "5. Wynik", body: resultLatex("m", exactOf(m), places) },
      ],
    };
  },
};

const vieta3Stopnia: FormulaDef = {
  id: "vieta-3-stopnia",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Wzory Viète'a wielomianu 3. stopnia",
  latex:
    "x_1+x_2+x_3 = -\\frac{b}{a}, \\; x_1x_2+x_1x_3+x_2x_3 = \\frac{c}{a}, \\; x_1x_2x_3 = -\\frac{d}{a}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "sumy",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const d = asRational(known["d"], "d");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
    const s1 = div(neg(b), a);
    const s2 = div(c, a);
    const s3 = div(neg(d), a);
    return {
      values: [exactOf(s1), exactOf(s2), exactOf(s3)],
      labels: ["x₁+x₂+x₃", "x₁x₂+x₁x₃+x₂x₃", "x₁x₂x₃"],
      steps: [
        {
          title: "1. Suma pierwiastków",
          body: `x_1+x_2+x_3 = -\\frac{b}{a} = -\\frac{${L(b)}}{${L(a)}} = ${L(s1)}`,
        },
        {
          title: "2. Suma iloczynów par",
          body: `x_1x_2+x_1x_3+x_2x_3 = \\frac{c}{a} = \\frac{${L(c)}}{${L(a)}} = ${L(s2)}`,
        },
        {
          title: "3. Iloczyn pierwiastków",
          body: `x_1x_2x_3 = -\\frac{d}{a} = -\\frac{${L(d)}}{${L(a)}} = ${L(s3)}`,
        },
      ],
    };
  },
};

export const MATH_WIELOMIANY2: FormulaDef[] = [
  roznicaNPoteg,
  wyrazDwumianu,
  twBezouta,
  vieta3Stopnia,
];
