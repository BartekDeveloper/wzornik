import { ZERO, add, cmp, div, isIntegerR, mul, of, pow, sub, toNumber } from "../exact/rational";
import { addExact, approx, approxOnly, exactOf, logExact, subExact } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex, stdSteps } from "./types";

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
    const value = exactOf(div(mul(pow(CC, c), pow(CD, d)), mul(pow(CA, a), pow(CB, b))));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}" },
        {
          title: "2. Podstawienie danych",
          body: `K_c = \\frac{${L(CC)}^{${c}}${L(CD)}^{${d}}}{${L(CA)}^{${a}}${L(CB)}^{${b}}}`,
        },
        { title: "3. Wynik", body: resultLatex("K_c", value, places) },
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
        steps: stdSteps(
          "\\alpha = \\frac{C_{zdys}}{C_0}",
          `\\alpha = \\frac{${L(cz)}}{${L(c0)}}`,
          value,
          places,
        ),
      };
    }
    if (unknown === "cz") {
      const alfa = asRational(known["alfa"], "α");
      const c0 = asRational(known["c0"], "c0");
      const value = exactOf(mul(alfa, c0));
      return {
        values: [value],
        steps: stdSteps(
          "C_{zdys} = \\alpha \\cdot C_0",
          `C_{zdys} = ${L(alfa)} \\cdot ${L(c0)}`,
          value,
          places,
        ),
      };
    }
    const alfa = asRational(known["alfa"], "α");
    const cz = asRational(known["cz"], "cz");
    const value = exactOf(div(cz, alfa));
    return {
      values: [value],
      steps: stdSteps(
        "C_0 = \\frac{C_{zdys}}{\\alpha}",
        `C_0 = \\frac{${L(cz)}}{${L(alfa)}}`,
        value,
        places,
      ),
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
        steps: stdSteps("K_s = [A][B]", `K_s = ${L(A)}${L(B)}`, value, places),
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
      steps: stdSteps(
        `${sym} = \\frac{K_s}{${so}}`,
        `${sym} = \\frac{${L(Ks)}}{${L(o)}}`,
        value,
        places,
      ),
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
        steps: stdSteps("E = E_{kat} - E_{an}", `E = ${L(Ekat)} - ${L(Ean)}`, value, places),
      };
    }
    if (unknown === "Ekat") {
      const E = asRational(known["E"], "E");
      const Ean = asRational(known["Ean"], "Ean");
      const value = exactOf(add(E, Ean));
      return {
        values: [value],
        steps: stdSteps("E_{kat} = E + E_{an}", `E_{kat} = ${L(E)} + ${L(Ean)}`, value, places),
      };
    }
    const E = asRational(known["E"], "E");
    const Ekat = asRational(known["Ekat"], "Ekat");
    const value = exactOf(sub(Ekat, E));
    return {
      values: [value],
      steps: stdSteps("E_{an} = E_{kat} - E", `E_{an} = ${L(Ekat)} - ${L(E)}`, value, places),
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
      const value = exactOf(mul(mul(g("k"), g("I")), g("t")));
      return {
        values: [value],
        steps: stdSteps(
          "m = k I t",
          `m = ${L(g("k"))} \\cdot ${L(g("I"))} \\cdot ${L(g("t"))}`,
          value,
          places,
        ),
      };
    }
    const others = ["k", "I", "t"].filter((id) => id !== unknown);
    const o = others.map(g);
    const m = g("m");
    const value = exactOf(div(m, mul(o[0], o[1])));
    const sym = { k: "k", I: "I", t: "t" } as const;
    const s = sym[unknown as keyof typeof sym];
    const so = others.map((id) => sym[id as keyof typeof sym]);
    return {
      values: [value],
      steps: stdSteps(
        `${s} = \\frac{m}{${so[0]}${so[1]}}`,
        `${s} = \\frac{${L(m)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        value,
        places,
      ),
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
      const value = addExact(exactOf(pKa), logExact(of(10), div(Cs, Ck)));
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      return {
        values: [value],
        steps: stdSteps(
          "pH = pK_a + \\log\\frac{C_s}{C_k}",
          `pH = ${L(pKa)} + \\log\\frac{${L(Cs)}}{${L(Ck)}}`,
          value,
          places,
          note,
        ),
      };
    }
    if (unknown === "pKa") {
      const pH = asRational(known["pH"], "pH");
      const Cs = asRational(known["Cs"], "Cs");
      const Ck = asRational(known["Ck"], "Ck");
      if (cmp(Cs, ZERO) <= 0 || cmp(Ck, ZERO) <= 0) throw new Error("stężenia muszą być dodatnie");
      const value = subExact(exactOf(pH), logExact(of(10), div(Cs, Ck)));
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      return {
        values: [value],
        steps: stdSteps(
          "pK_a = pH - \\log\\frac{C_s}{C_k}",
          `pK_a = ${L(pH)} - \\log\\frac{${L(Cs)}}{${L(Ck)}}`,
          value,
          places,
          note,
        ),
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
    return {
      values: [value],
      steps: stdSteps(
        `${sym} = ${so} \\cdot 10^{${unknown === "Cs" ? "+" : "-"}(pH-pK_a)}`,
        `${sym} = ${L(Co)} \\cdot 10^{${unknown === "Cs" ? "+" : "-"}(${L(pH)}-${L(pKa)})}`,
        value,
        places,
        note,
      ),
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
