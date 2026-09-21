import { ZERO, add, cmp, div, isIntegerR, mul, of, pow, sub, toNumber } from "../exact/rational";
import { addExact, approx, approxOnly, exactOf, logExact, subExact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const kc: FormulaDef = {
  id: "kc",
  subject: "chemia",
  topic: "Równowaga · ROZSZ",
  name: "Stała równowagi Kc",
  latex: "K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
    { id: "CA", label: "[A]" },
    { id: "CB", label: "[B]" },
    { id: "CC", label: "[C]" },
    { id: "CD", label: "[D]" },
  ],
  mode: "fixed",
  outputId: "Kc",
  outputLabel: "Kc",
  solve(_unknown, known, places): FormulaSolution {
    const e = (id: string): number => requireNatural(known[id], id);
    const g = (id: string) => asRational(known[id], id);
    const [a, b, c, d] = [e("a"), e("b"), e("c"), e("d")];
    const [CA, CB, CC, CD] = [g("CA"), g("CB"), g("CC"), g("CD")];
    const num = mul(pow(CC, c), pow(CD, d));
    const den = mul(pow(CA, a), pow(CB, b));
    const value = exactOf(div(num, den));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}" },
        {
          title: "2. Podstawienie danych",
          body: `K_c = \\frac{${L(CC)}^{${c}}${L(CD)}^{${d}}}{${L(CA)}^{${a}}${L(CB)}^{${b}}}`,
        },
        {
          title: "3. Licznik i mianownik",
          body: `[C]^c[D]^d = ${L(num)}, \\; [A]^a[B]^b = ${L(den)}`,
        },
        { title: "4. Wynik", body: resultLatex("K_c", value, places) },
      ],
    };
  },
};

const dysocjacja: FormulaDef = {
  id: "dysocjacja",
  subject: "chemia",
  topic: "Równowaga · ROZSZ",
  name: "Stopień dysocjacji",
  latex: "\\alpha = \\frac{C_{zdys}}{C_0}",
  vars: [
    { id: "alfa", label: "α" },
    { id: "cz", label: "C zdysocjowane" },
    { id: "c0", label: "C₀" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "alfa") {
      const cz = asRational(known["cz"], "cz");
      const c0 = asRational(known["c0"], "c0");
      const value = exactOf(div(cz, c0));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\alpha = \\frac{C_{zdys}}{C_0}" },
          { title: "2. Podstawienie danych", body: `\\alpha = \\frac{${L(cz)}}{${L(c0)}}` },
          { title: "3. Wynik", body: resultLatex("\\alpha", value, places) },
        ],
      };
    }
    if (unknown === "cz") {
      const alfa = asRational(known["alfa"], "α");
      const c0 = asRational(known["c0"], "c0");
      const value = exactOf(mul(alfa, c0));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "C_{zdys} = \\alpha \\cdot C_0" },
          { title: "2. Podstawienie danych", body: `C_{zdys} = ${L(alfa)} \\cdot ${L(c0)}` },
          { title: "3. Wynik", body: resultLatex("C_{zdys}", value, places) },
        ],
      };
    }
    const alfa = asRational(known["alfa"], "α");
    const cz = asRational(known["cz"], "cz");
    const value = exactOf(div(cz, alfa));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "C_0 = \\frac{C_{zdys}}{\\alpha}" },
        { title: "2. Podstawienie danych", body: `C_0 = \\frac{${L(cz)}}{${L(alfa)}}` },
        { title: "3. Wynik", body: resultLatex("C_0", value, places) },
      ],
    };
  },
};

const iloczyn: FormulaDef = {
  id: "iloczyn",
  subject: "chemia",
  topic: "Równowaga · ROZSZ",
  name: "Iloczyn rozpuszczalności (1:1)",
  latex: "K_s = [A][B]",
  vars: [
    { id: "Ks", label: "Ks" },
    { id: "A", label: "[A]" },
    { id: "B", label: "[B]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Ks") {
      const A = asRational(known["A"], "[A]");
      const B = asRational(known["B"], "[B]");
      const value = exactOf(mul(A, B));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "K_s = [A][B]" },
          { title: "2. Podstawienie danych", body: `K_s = ${L(A)}${L(B)}` },
          { title: "3. Wynik", body: resultLatex("K_s", value, places) },
        ],
      };
    }
    const Ks = asRational(known["Ks"], "Ks");
    const other = unknown === "A" ? "B" : "A";
    const o = asRational(known[other], other);
    const value = exactOf(div(Ks, o));
    const sym = unknown === "A" ? "[A]" : "[B]";
    const so = unknown === "A" ? "[B]" : "[A]";
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${sym} = \\frac{K_s}{${so}}` },
        { title: "2. Podstawienie danych", body: `${sym} = \\frac{${L(Ks)}}{${L(o)}}` },
        { title: "3. Wynik", body: resultLatex(sym, value, places) },
      ],
    };
  },
};

const ogniwo: FormulaDef = {
  id: "ogniwo",
  subject: "chemia",
  topic: "Elektrochemia · ROZSZ",
  name: "SEM ogniwa",
  latex: "E = E_{kat} - E_{an}",
  vars: [
    { id: "E", label: "E [V]" },
    { id: "Ekat", label: "E katody [V]" },
    { id: "Ean", label: "E anody [V]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "E") {
      const Ekat = asRational(known["Ekat"], "Ekat");
      const Ean = asRational(known["Ean"], "Ean");
      const value = exactOf(sub(Ekat, Ean));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E = E_{kat} - E_{an}" },
          { title: "2. Podstawienie danych", body: `E = ${L(Ekat)} - ${L(Ean)}` },
          { title: "3. Wynik", body: resultLatex("E", value, places) },
        ],
      };
    }
    if (unknown === "Ekat") {
      const E = asRational(known["E"], "E");
      const Ean = asRational(known["Ean"], "Ean");
      const value = exactOf(add(E, Ean));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E_{kat} = E + E_{an}" },
          { title: "2. Podstawienie danych", body: `E_{kat} = ${L(E)} + ${L(Ean)}` },
          { title: "3. Wynik", body: resultLatex("E_{kat}", value, places) },
        ],
      };
    }
    const E = asRational(known["E"], "E");
    const Ekat = asRational(known["Ekat"], "Ekat");
    const value = exactOf(sub(Ekat, E));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "E_{an} = E_{kat} - E" },
        { title: "2. Podstawienie danych", body: `E_{an} = ${L(Ekat)} - ${L(E)}` },
        { title: "3. Wynik", body: resultLatex("E_{an}", value, places) },
      ],
    };
  },
};

const elektroliza: FormulaDef = {
  id: "elektroliza",
  subject: "chemia",
  topic: "Elektrochemia · ROZSZ",
  name: "Elektroliza (m = k·I·t)",
  latex: "m = k I t",
  vars: [
    { id: "m", label: "m [g]" },
    { id: "k", label: "k [g/(A·s)]" },
    { id: "I", label: "I [A]" },
    { id: "t", label: "t [s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "m") {
      const kI = mul(g("k"), g("I"));
      const value = exactOf(mul(kI, g("t")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = k I t" },
          {
            title: "2. Podstawienie danych",
            body: `m = ${L(g("k"))} \\cdot ${L(g("I"))} \\cdot ${L(g("t"))}`,
          },
          { title: "3. Iloczyn kI", body: `kI = ${L(g("k"))} \\cdot ${L(g("I"))} = ${L(kI)}` },
          { title: "4. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const others = ["k", "I", "t"].filter((id) => id !== unknown);
    const o = others.map(g);
    const m = g("m");
    const den = mul(o[0], o[1]);
    const value = exactOf(div(m, den));
    const sym = { k: "k", I: "I", t: "t" } as const;
    const s = sym[unknown as keyof typeof sym];
    const so = others.map((id) => sym[id as keyof typeof sym]);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${s} = \\frac{m}{${so[0]}${so[1]}}` },
        {
          title: "2. Podstawienie danych",
          body: `${s} = \\frac{${L(m)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        },
        { title: "3. Mianownik", body: `${L(o[0])} \\cdot ${L(o[1])} = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex(s, value, places) },
      ],
    };
  },
};

const bufor: FormulaDef = {
  id: "bufor",
  subject: "chemia",
  topic: "Równowaga · ROZSZ",
  name: "Bufor (Henderson–Hasselbalch)",
  latex: "pH = pK_a + \\log\\frac{C_s}{C_k}",
  vars: [
    { id: "pH", label: "pH" },
    { id: "pKa", label: "pKa" },
    { id: "Cs", label: "Cs (sól)" },
    { id: "Ck", label: "Ck (kwas)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "pH") {
      const pKa = asRational(known["pKa"], "pKa");
      const Cs = asRational(known["Cs"], "Cs");
      const Ck = asRational(known["Ck"], "Ck");
      if (cmp(Cs, ZERO) <= 0 || cmp(Ck, ZERO) <= 0) throw new Error("stężenia muszą być dodatnie");
      const ratio = div(Cs, Ck);
      const lg = logExact(of(10), ratio);
      const value = addExact(exactOf(pKa), lg);
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "pH = pK_a + \\log\\frac{C_s}{C_k}" },
          {
            title: "2. Podstawienie danych",
            body: `pH = ${L(pKa)} + \\log\\frac{${L(Cs)}}{${L(Ck)}}`,
          },
          {
            title: "3. Stosunek i logarytm",
            body: `\\frac{C_s}{C_k} = ${L(ratio)}, \\; \\log = ${formatLatex(lg)}`,
          },
          { title: "4. Wynik", body: resultLatex("pH", value, places), note },
        ],
      };
    }
    if (unknown === "pKa") {
      const pH = asRational(known["pH"], "pH");
      const Cs = asRational(known["Cs"], "Cs");
      const Ck = asRational(known["Ck"], "Ck");
      if (cmp(Cs, ZERO) <= 0 || cmp(Ck, ZERO) <= 0) throw new Error("stężenia muszą być dodatnie");
      const ratio = div(Cs, Ck);
      const lg = logExact(of(10), ratio);
      const value = subExact(exactOf(pH), lg);
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "pK_a = pH - \\log\\frac{C_s}{C_k}" },
          {
            title: "2. Podstawienie danych",
            body: `pK_a = ${L(pH)} - \\log\\frac{${L(Cs)}}{${L(Ck)}}`,
          },
          {
            title: "3. Stosunek i logarytm",
            body: `\\frac{C_s}{C_k} = ${L(ratio)}, \\; \\log = ${formatLatex(lg)}`,
          },
          { title: "4. Wynik", body: resultLatex("pK_a", value, places), note },
        ],
      };
    }
    const other = unknown === "Cs" ? "Ck" : "Cs";
    const pH = asRational(known["pH"], "pH");
    const pKa = asRational(known["pKa"], "pKa");
    const Co = asRational(known[other], other);
    const d = sub(pH, pKa);
    let value;
    let note: string | undefined;
    if (isIntegerR(d) && d.p > -100n && d.p < 100n) {
      const f = pow(of(10), Number(d.p));
      value = unknown === "Cs" ? exactOf(mul(Co, f)) : exactOf(div(Co, f));
    } else {
      const f = 10 ** toNumber(d);
      value = approxOnly(unknown === "Cs" ? approx(exactOf(Co)) * f : approx(exactOf(Co)) / f);
      note = "wynik tylko przybliżony";
    }
    const sym = unknown === "Cs" ? "C_s" : "C_k";
    const so = unknown === "Cs" ? "C_k" : "C_s";
    const sgn = unknown === "Cs" ? "+" : "-";
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${sym} = ${so} \\cdot 10^{${sgn}(pH-pK_a)}` },
        {
          title: "2. Podstawienie danych",
          body: `${sym} = ${L(Co)} \\cdot 10^{${sgn}(${L(pH)}-${L(pKa)})}`,
        },
        { title: "3. Różnica pH", body: `pH - pK_a = ${L(d)}` },
        { title: "4. Wynik", body: resultLatex(sym, value, places), note },
      ],
    };
  },
};

export const CHEMIA_PR_FORMULAS: FormulaDef[] = [
  kc,
  dysocjacja,
  iloczyn,
  ogniwo,
  elektroliza,
  bufor,
];
