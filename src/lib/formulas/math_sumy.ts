import { ONE, ZERO, add, cmp, div, isZero, mul, of, pow, sub } from "../exact/rational";
import { approx, exactOf, logExact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const sumaArytmetyczny: FormulaDef = {
  id: "suma-ciagu-arytmetycznego",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Suma ciągu arytmetycznego",
  latex: "S_n = \\frac{(a_1 + a_n)n}{2}",
  vars: [
    { id: "Sn", label: "Sₙ" },
    { id: "a1", label: "a₁" },
    { id: "an", label: "aₙ" },
    { id: "n", label: "n" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "n") {
      const Sn = asRational(known["Sn"], "Sₙ");
      const a1 = asRational(known["a1"], "a₁");
      const an = asRational(known["an"], "aₙ");
      const sum = add(a1, an);
      if (isZero(sum)) throw new Error("a₁ + aₙ ≠ 0 — inaczej n nieoznaczone");
      const nf = div(mul(Sn, of(2)), sum);
      if (nf.q !== 1n || nf.p < 1n) throw new Error("te dane nie dają naturalnego n");
      const value = exactOf(nf);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\frac{2S_n}{a_1 + a_n}" },
          {
            title: "2. Podstawienie danych",
            body: `n = \\frac{2 \\cdot ${L(Sn)}}{${L(a1)} + ${L(an)}}`,
          },
          { title: "3. Suma krańców", body: `a_1 + a_n = ${L(sum)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const n = requireNatural(known["n"], "n");
    if (unknown === "Sn") {
      const a1 = asRational(known["a1"], "a₁");
      const an = asRational(known["an"], "aₙ");
      const sum = add(a1, an);
      const value = exactOf(div(mul(sum, of(n)), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "S_n = \\frac{(a_1 + a_n)n}{2}" },
          {
            title: "2. Podstawienie danych",
            body: `S_{${n}} = \\frac{(${L(a1)} + ${L(an)}) \\cdot ${n}}{2}`,
          },
          { title: "3. Suma krańców", body: `a_1 + a_n = ${L(sum)}` },
          { title: "4. Wynik", body: resultLatex(`S_{${n}}`, value, places) },
        ],
      };
    }
    const Sn = asRational(known["Sn"], "Sₙ");
    const other = unknown === "a1" ? "an" : "a1";
    const o = asRational(known[other], other);
    const frac = div(mul(Sn, of(2)), of(n));
    const value = exactOf(sub(frac, o));
    const sym = unknown === "a1" ? "a_1" : "a_n";
    const so = unknown === "a1" ? "a_n" : "a_1";
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${sym} = \\frac{2S_n}{n} - ${so}` },
        {
          title: "2. Podstawienie danych",
          body: `${sym} = \\frac{2 \\cdot ${L(Sn)}}{${n}} - ${L(o)}`,
        },
        { title: "3. Ułamek", body: `\\frac{2S_n}{n} = ${L(frac)}` },
        { title: "4. Wynik", body: resultLatex(sym, value, places) },
      ],
    };
  },
};

const sumaGeometryczny: FormulaDef = {
  id: "suma-ciagu-geometrycznego",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Suma ciągu geometrycznego",
  latex: "S_n = a_1\\frac{1 - q^n}{1 - q}",
  vars: [
    { id: "Sn", label: "Sₙ" },
    { id: "a1", label: "a₁" },
    { id: "q", label: "q (iloraz)" },
    { id: "n", label: "n" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "q")
      throw new Error("iloraz z sumy wymaga pierwiastków wyższych stopni — policz numerycznie");
    if (unknown === "n") {
      const Sn = asRational(known["Sn"], "Sₙ");
      const a1 = asRational(known["a1"], "a₁");
      const q = asRational(known["q"], "q");
      if (cmp(q, ONE) === 0) throw new Error("dla q = 1 suma to n·a₁ — sprawdź dane");
      const rhs = sub(ONE, div(mul(Sn, sub(ONE, q)), a1));
      if (cmp(rhs, ZERO) <= 0 || cmp(q, ZERO) <= 0 || cmp(sub(q, ONE), ZERO) === 0) {
        throw new Error("n wyznaczam dla q > 0, q ≠ 1 i prawej dodatniej");
      }
      const lq = logExact(q, rhs);
      const nf = Math.round(approx(lq));
      if (!Number.isInteger(nf) || nf < 1 || cmp(pow(q, nf), rhs) !== 0) {
        throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
      }
      const value = exactOf(of(nf));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "q^n = 1 - S_n(1-q)/a_1, \\; n = \\log_q" },
          {
            title: "2. Podstawienie danych",
            body: `q^n = 1 - ${L(Sn)}(1-${L(q)})/${L(a1)} = ${L(rhs)}`,
          },
          { title: "3. Logarytm", body: `n = ${formatLatex(lq)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const n = requireNatural(known["n"], "n");
    const q = asRational(known["q"], "q");
    if (cmp(sub(q, ONE), ZERO) === 0)
      throw new Error("mianownik 1 − q ≠ 0 — q musi być różne od 1");
    const qn = pow(q, n);
    const den = sub(ONE, q);
    if (unknown === "Sn") {
      const a1 = asRational(known["a1"], "a₁");
      const num = mul(a1, sub(ONE, qn));
      const value = exactOf(div(num, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "S_n = a_1\\frac{1 - q^n}{1 - q}" },
          {
            title: "2. Podstawienie danych",
            body: `S_{${n}} = ${L(a1)}\\frac{1 - ${L(q)}^{${n}}}{1 - ${L(q)}}`,
          },
          { title: "3. Potęga i nawiasy", body: `q^${n} = ${L(qn)}, \\; 1-q = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex(`S_{${n}}`, value, places) },
        ],
      };
    }
    const Sn = asRational(known["Sn"], "Sₙ");
    const num = mul(Sn, den);
    const den2 = sub(ONE, qn);
    const value = exactOf(div(num, den2));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "a_1 = S_n\\frac{1-q}{1-q^n}" },
        {
          title: "2. Podstawienie danych",
          body: `a_1 = ${L(Sn)}\\frac{1-${L(q)}}{1-${L(q)}^{${n}}}`,
        },
        { title: "3. Potęga i nawiasy", body: `q^${n} = ${L(qn)}, \\; 1-q = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex("a_1", value, places) },
      ],
    };
  },
};

const szereg: FormulaDef = {
  id: "szereg-geometryczny",
  subject: "matematyka",
  topic: "Ciągi · ROZSZ",
  name: "Suma szeregu geometrycznego",
  latex: "S = \\frac{a_1}{1 - q}, \\; |q| < 1",
  vars: [
    { id: "S", label: "S (suma)" },
    { id: "a1", label: "a₁" },
    { id: "q", label: "q (|q| < 1)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const chk = (q: { p: bigint; q: bigint }): void => {
      const aq = approx(exactOf(q));
      if (!(Math.abs(aq) < 1)) throw new Error("szereg zbieżny wymaga |q| < 1");
    };
    if (unknown === "S") {
      const a1 = asRational(known["a1"], "a₁");
      const q = asRational(known["q"], "q");
      chk(q);
      const den = sub(ONE, q);
      const value = exactOf(div(a1, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "S = \\frac{a_1}{1 - q}" },
          { title: "2. Podstawienie danych", body: `S = \\frac{${L(a1)}}{1 - ${L(q)}}` },
          { title: "3. Mianownik", body: `1 - q = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("S", value, places) },
        ],
      };
    }
    if (unknown === "a1") {
      const S = asRational(known["S"], "S");
      const q = asRational(known["q"], "q");
      chk(q);
      const den = sub(ONE, q);
      const value = exactOf(mul(S, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_1 = S(1 - q)" },
          { title: "2. Podstawienie danych", body: `a_1 = ${L(S)}(1 - ${L(q)})` },
          { title: "3. Nawias", body: `1 - q = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("a_1", value, places) },
        ],
      };
    }
    const S = asRational(known["S"], "S");
    const a1 = asRational(known["a1"], "a₁");
    const value = exactOf(sub(ONE, div(a1, S)));
    chk(value.rat);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "q = 1 - a_1/S" },
        { title: "2. Podstawienie danych", body: `q = 1 - ${L(a1)}/${L(S)}` },
        { title: "3. Wynik", body: resultLatex("q", value, places) },
      ],
    };
  },
};

export const MATH_SUMY: FormulaDef[] = [sumaArytmetyczny, sumaGeometryczny, szereg];
