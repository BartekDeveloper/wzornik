import { ZERO, add, cmp, div, mul, of, pow } from "../exact/rational";
import { approx, approxOnly, exactOf, logExact, subExact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const mol: FormulaDef = {
  id: "mol",
  subject: "chemia",
  topic: "Stechiometria",
  name: "Liczba moli",
  latex: "n = \\frac{m}{M}",
  vars: [
    { id: "n", label: "n [mol]" },
    { id: "m", label: "m [g]" },
    { id: "M", label: "M [g/mol]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "n") {
      const m = asRational(known["m"], "m");
      const M = asRational(known["M"], "M");
      const value = exactOf(div(m, M));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\frac{m}{M}" },
          { title: "2. Podstawienie danych", body: `n = \\frac{${L(m)}}{${L(M)}}` },
          { title: "3. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const n = asRational(known["n"], "n");
      const M = asRational(known["M"], "M");
      const value = exactOf(mul(n, M));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = n \\cdot M" },
          { title: "2. Podstawienie danych", body: `m = ${L(n)} \\cdot ${L(M)}` },
          { title: "3. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const n = asRational(known["n"], "n");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(m, n));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "M = \\frac{m}{n}" },
        { title: "2. Podstawienie danych", body: `M = \\frac{${L(m)}}{${L(n)}}` },
        { title: "3. Wynik", body: resultLatex("M", value, places) },
      ],
    };
  },
};

const stezenieMolowe: FormulaDef = {
  id: "stezenie-molowe",
  subject: "chemia",
  topic: "Roztwory",
  name: "Stężenie molowe",
  latex: "C = \\frac{n}{V}",
  vars: [
    { id: "C", label: "C [mol/dm³]" },
    { id: "n", label: "n [mol]" },
    { id: "V", label: "V [dm³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "C") {
      const n = asRational(known["n"], "n");
      const V = asRational(known["V"], "V");
      const value = exactOf(div(n, V));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "C = \\frac{n}{V}" },
          { title: "2. Podstawienie danych", body: `C = \\frac{${L(n)}}{${L(V)}}` },
          { title: "3. Wynik", body: resultLatex("C", value, places) },
        ],
      };
    }
    if (unknown === "n") {
      const C = asRational(known["C"], "C");
      const V = asRational(known["V"], "V");
      const value = exactOf(mul(C, V));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = C \\cdot V" },
          { title: "2. Podstawienie danych", body: `n = ${L(C)} \\cdot ${L(V)}` },
          { title: "3. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const C = asRational(known["C"], "C");
    const n = asRational(known["n"], "n");
    const value = exactOf(div(n, C));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "V = \\frac{n}{C}" },
        { title: "2. Podstawienie danych", body: `V = \\frac{${L(n)}}{${L(C)}}` },
        { title: "3. Wynik", body: resultLatex("V", value, places) },
      ],
    };
  },
};

const stezenieProcentowe: FormulaDef = {
  id: "stezenie-procentowe",
  subject: "chemia",
  topic: "Roztwory",
  name: "Stężenie procentowe",
  latex: "C_p = \\frac{m_s}{m_r} \\cdot 100\\%",
  vars: [
    { id: "Cp", label: "Cp [%]" },
    { id: "ms", label: "ms [g]" },
    { id: "mr", label: "mr [g]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Cp") {
      const ms = asRational(known["ms"], "ms");
      const mr = asRational(known["mr"], "mr");
      const frac = div(ms, mr);
      const value = exactOf(mul(frac, of(100)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "C_p = \\frac{m_s}{m_r} \\cdot 100\\%" },
          {
            title: "2. Podstawienie danych",
            body: `C_p = \\frac{${L(ms)}}{${L(mr)}} \\cdot 100\\%`,
          },
          { title: "3. Ułamek mas", body: `\\frac{m_s}{m_r} = ${L(frac)}` },
          { title: "4. Wynik", body: resultLatex("C_p", value, places) },
        ],
      };
    }
    if (unknown === "ms") {
      const Cp = asRational(known["Cp"], "Cp");
      const mr = asRational(known["mr"], "mr");
      const num = mul(Cp, mr);
      const value = exactOf(div(num, of(100)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m_s = \\frac{C_p \\cdot m_r}{100}" },
          { title: "2. Podstawienie danych", body: `m_s = \\frac{${L(Cp)} \\cdot ${L(mr)}}{100}` },
          { title: "3. Licznik", body: `C_p \\cdot m_r = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("m_s", value, places) },
        ],
      };
    }
    const Cp = asRational(known["Cp"], "Cp");
    const ms = asRational(known["ms"], "ms");
    const num = mul(ms, of(100));
    const value = exactOf(div(num, Cp));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "m_r = \\frac{m_s \\cdot 100}{C_p}" },
        { title: "2. Podstawienie danych", body: `m_r = \\frac{${L(ms)} \\cdot 100}{${L(Cp)}}` },
        { title: "3. Licznik", body: `m_s \\cdot 100 = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("m_r", value, places) },
      ],
    };
  },
};

const rozcienczanie: FormulaDef = {
  id: "rozcienczanie",
  subject: "chemia",
  topic: "Roztwory",
  name: "Rozcieńczanie (C₁V₁ = C₂V₂)",
  latex: "C_1 V_1 = C_2 V_2",
  vars: [
    { id: "C1", label: "C₁ [mol/dm³]" },
    { id: "V1", label: "V₁ [dm³]" },
    { id: "C2", label: "C₂ [mol/dm³]" },
    { id: "V2", label: "V₂ [dm³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "C1" || unknown === "C2") {
      const other = unknown === "C1" ? "C2" : "C1";
      const vThis = unknown === "C1" ? "V1" : "V2";
      const vOther = unknown === "C1" ? "V2" : "V1";
      const num = mul(g(other), g(vOther));
      const value = exactOf(div(num, g(vThis)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: `${unknown} = \\frac{${other} \\cdot ${vOther}}{${vThis}}`,
          },
          {
            title: "2. Podstawienie danych",
            body: `${unknown} = \\frac{${L(g(other))} \\cdot ${L(g(vOther))}}{${L(g(vThis))}}`,
          },
          { title: "3. Licznik", body: `${L(g(other))} \\cdot ${L(g(vOther))} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex(unknown, value, places) },
        ],
      };
    }
    const num = unknown === "V1" ? "C2" : "C1";
    const numV = unknown === "V1" ? "V2" : "V1";
    const den = unknown === "V1" ? "C1" : "C2";
    const prod = mul(g(num), g(numV));
    const value = exactOf(div(prod, g(den)));
    const lab = unknown === "V1" ? "V_1" : "V_2";
    const lnum = unknown === "V1" ? "C_2" : "C_1";
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${lab} = \\frac{${lnum} \\cdot ${numV}}{${den}}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${lab} = \\frac{${L(g(num))} \\cdot ${L(g(numV))}}{${L(g(den))}}`,
        },
        { title: "3. Licznik", body: `${L(g(num))} \\cdot ${L(g(numV))} = ${L(prod)}` },
        { title: "4. Wynik", body: resultLatex(lab, value, places) },
      ],
    };
  },
};

const ph: FormulaDef = {
  id: "ph",
  subject: "chemia",
  topic: "Roztwory",
  name: "pH roztworu",
  latex: "pH = -\\log[H^+]",
  vars: [
    { id: "pH", label: "pH" },
    { id: "H", label: "[H⁺] [mol/dm³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "pH") {
      const H = asRational(known["H"], "[H⁺]");
      if (cmp(H, ZERO) <= 0) throw new Error("stężenie jonów musi być dodatnie");
      const l = logExact(of(10), H);
      const value = subExact(exactOf(ZERO), l);
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "pH = -\\log[H^+]" },
          { title: "2. Podstawienie danych", body: `pH = -\\log ${L(H)}` },
          { title: "3. Logarytm", body: `\\log ${L(H)} = ${formatLatex(l)}` },
          { title: "4. Wynik", body: resultLatex("pH", value, places), note },
        ],
      };
    }
    const pH = asRational(known["pH"], "pH");
    let value;
    let note: string | undefined;
    if (pH.q === 1n) {
      value = exactOf(pow(of(10), -Number(pH.p)));
    } else {
      value = approxOnly(10 ** -approx(exactOf(pH)));
      note = "wynik tylko przybliżony";
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "[H^+] = 10^{-pH}" },
        { title: "2. Podstawienie danych", body: `[H^+] = 10^{${L(pH)}}` },
        { title: "3. Wynik", body: resultLatex("[H^+]", value, places), note },
      ],
    };
  },
};

const wydajnosc: FormulaDef = {
  id: "wydajnosc",
  subject: "chemia",
  topic: "Stechiometria",
  name: "Wydajność reakcji",
  latex: "W = \\frac{m_{prakt}}{m_{teor}} \\cdot 100\\%",
  vars: [
    { id: "W", label: "W [%]" },
    { id: "mp", label: "m praktyczna [g]" },
    { id: "mt", label: "m teoretyczna [g]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "W") {
      const mp = asRational(known["mp"], "mp");
      const mt = asRational(known["mt"], "mt");
      const frac = div(mp, mt);
      const value = exactOf(mul(frac, of(100)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "W = \\frac{m_{prakt}}{m_{teor}} \\cdot 100\\%",
          },
          { title: "2. Podstawienie danych", body: `W = \\frac{${L(mp)}}{${L(mt)}} \\cdot 100\\%` },
          { title: "3. Ułamek mas", body: `\\frac{m_{prakt}}{m_{teor}} = ${L(frac)}` },
          { title: "4. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    if (unknown === "mp") {
      const W = asRational(known["W"], "W");
      const mt = asRational(known["mt"], "mt");
      const num = mul(W, mt);
      const value = exactOf(div(num, of(100)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m_{prakt} = \\frac{W \\cdot m_{teor}}{100}" },
          {
            title: "2. Podstawienie danych",
            body: `m_{prakt} = \\frac{${L(W)} \\cdot ${L(mt)}}{100}`,
          },
          { title: "3. Licznik", body: `W \\cdot m_{teor} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("m_{prakt}", value, places) },
        ],
      };
    }
    const W = asRational(known["W"], "W");
    const mp = asRational(known["mp"], "mp");
    const num = mul(mp, of(100));
    const value = exactOf(div(num, W));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "m_{teor} = \\frac{m_{prakt} \\cdot 100}{W}" },
        {
          title: "2. Podstawienie danych",
          body: `m_{teor} = \\frac{${L(mp)} \\cdot 100}{${L(W)}}`,
        },
        { title: "3. Licznik", body: `m_{prakt} \\cdot 100 = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("m_{teor}", value, places) },
      ],
    };
  },
};

const mieszanie: FormulaDef = {
  id: "mieszanie",
  subject: "chemia",
  topic: "Roztwory",
  name: "Mieszanie roztworów",
  latex: "C_3 = \\frac{C_1 m_1 + C_2 m_2}{m_1 + m_2}",
  vars: [
    { id: "C1", label: "C₁ [%]" },
    { id: "m1", label: "m₁ [g]" },
    { id: "C2", label: "C₂ [%]" },
    { id: "m2", label: "m₂ [g]" },
  ],
  mode: "fixed",
  outputId: "C3",
  outputLabel: "C₃",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const t1 = mul(g("C1"), g("m1"));
    const t2 = mul(g("C2"), g("m2"));
    const num = add(t1, t2);
    const den = add(g("m1"), g("m2"));
    const value = exactOf(div(num, den));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "C_3 = \\frac{C_1 m_1 + C_2 m_2}{m_1 + m_2}" },
        {
          title: "2. Podstawienie danych",
          body: `C_3 = \\frac{${L(g("C1"))} \\cdot ${L(g("m1"))} + ${L(g("C2"))} \\cdot ${L(g("m2"))}}{${L(g("m1"))} + ${L(g("m2"))}}`,
        },
        {
          title: "3. Licznik i mianownik",
          body: `C_1m_1 = ${L(t1)}, \\; C_2m_2 = ${L(t2)}, \\; m_1+m_2 = ${L(den)}`,
        },
        { title: "4. Wynik", body: resultLatex("C_3", value, places) },
      ],
    };
  },
};

export const CHEMIA_FORMULAS: FormulaDef[] = [
  mol,
  stezenieMolowe,
  stezenieProcentowe,
  rozcienczanie,
  ph,
  wydajnosc,
  mieszanie,
];
