import { ONE, ZERO, add, cmp, div, isZero, mul, of, sub } from "../exact/rational";
import { approx, approxOnly, exactOf, mulRat, stripPi } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { APPROX_PI_NOTE, asRational, requireNatural, resultLatex } from "./types";

const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
const L = formatRatLatex;

const zamianaMiary: FormulaDef = {
  id: "zamiana-miary",
  subject: "matematyka",
  topic: "Kąty",
  name: "Stopnie ↔ radiany",
  latex: "180^\\circ = \\pi",
  vars: [
    { id: "deg", label: "α [°]" },
    { id: "rad", label: "α [rad]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "rad") {
      const deg = asRational(known["deg"], "α");
      const frac = div(deg, of(180));
      const value = mulRat(PI, frac);
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\alpha = \\alpha^\\circ \\cdot \\frac{\\pi}{180}",
          },
          { title: "2. Podstawienie danych", body: `\\alpha = ${L(deg)} \\cdot \\frac{\\pi}{180}` },
          { title: "3. Ułamek", body: `\\frac{${L(deg)}}{180} = ${L(frac)}` },
          { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
        ],
      };
    }
    const rad = known["rad"];
    let value: Exact;
    let note: string | undefined;
    try {
      value = exactOf(mul(stripPi(rad), of(180)));
    } catch {
      value = approxOnly((approx(rad) * 180) / Math.PI);
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "\\alpha^\\circ = \\alpha \\cdot \\frac{180}{\\pi}",
        },
        {
          title: "2. Podstawienie danych",
          body: `\\alpha^\\circ = ${formatLatex(rad)} \\cdot \\frac{180}{\\pi}`,
        },
        { title: "3. Wynik", body: resultLatex("\\alpha^\\circ", value, places), note },
      ],
    };
  },
};

const katTrojkat: FormulaDef = {
  id: "kat-trojkat",
  subject: "matematyka",
  topic: "Kąty",
  name: "Trzeci kąt trójkąta",
  latex: "\\gamma = 180^\\circ - \\alpha - \\beta",
  vars: [
    { id: "alfa", label: "α [°]" },
    { id: "beta", label: "β [°]" },
    { id: "gamma", label: "γ [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const others = ["alfa", "beta", "gamma"].filter((id) => id !== unknown);
    const o = others.map((id) => asRational(known[id], id));
    const rest = sub(of(180), o[0]);
    const value = exactOf(sub(rest, o[1]));
    if (cmp(value.rat, ZERO) <= 0)
      throw new Error("kąty trójkąta muszą być dodatnie i sumować się do 180°");
    const sym = { alfa: "\\alpha", beta: "\\beta", gamma: "\\gamma" } as const;
    const s = sym[unknown as keyof typeof sym];
    const so = others.map((id) => sym[id as keyof typeof sym]);
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${s} = 180^\\circ - ${so[0]} - ${so[1]}`,
        },
        { title: "2. Podstawienie danych", body: `${s} = 180 - ${L(o[0])} - ${L(o[1])}` },
        { title: "3. Pierwsze odejmowanie", body: `180 - ${L(o[0])} = ${L(rest)}` },
        { title: "4. Wynik", body: resultLatex(s, value, places) },
      ],
    };
  },
};

const katMiedzyProstymi: FormulaDef = {
  id: "kat-miedzy-prostymi",
  subject: "matematyka",
  topic: "Kąty",
  name: "Kąt między prostymi",
  latex: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
  vars: [
    { id: "a1", label: "a₁" },
    { id: "a2", label: "a₂" },
  ],
  mode: "fixed",
  outputId: "phi",
  outputLabel: "φ",
  solve(_unknown, known, places): FormulaSolution {
    const a1 = asRational(known["a1"], "a₁");
    const a2 = asRational(known["a2"], "a₂");
    const den = add(ONE, mul(a1, a2));
    if (isZero(sub(a1, a2))) {
      const value = exactOf(ZERO);
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\tan\\varphi = \\left|\\frac{${L(a2)} - ${L(a1)}}{1 + ${L(a1)}${L(a2)}}\\right| = 0`,
          },
          {
            title: "3. Wynik",
            body: resultLatex("\\varphi", value, places),
            note: "proste równoległe",
          },
        ],
      };
    }
    if (isZero(den)) {
      const value = exactOf(of(90));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
          },
          { title: "2. Mianownik", body: `1 + ${L(a1)}${L(a2)} = 0` },
          {
            title: "3. Wynik",
            body: resultLatex("\\varphi", value, places),
            note: "proste prostopadłe",
          },
        ],
      };
    }
    const t = Math.abs(approx(exactOf(div(sub(a2, a1), den))));
    const num = sub(a2, a1);
    const value = approxOnly((Math.atan(t) * 180) / Math.PI);
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
        },
        {
          title: "2. Podstawienie danych",
          body: `\\tan\\varphi = \\left|\\frac{${L(a2)} - ${L(a1)}}{1 + ${L(a1)}${L(a2)}}\\right|`,
        },
        {
          title: "3. Licznik i mianownik",
          body: `a_2 - a_1 = ${L(num)}, \\; 1 + a_1a_2 = ${L(den)}`,
        },
        {
          title: "4. Wynik",
          body: resultLatex("\\varphi", value, places),
          note: "wynik w stopniach",
        },
      ],
    };
  },
};

const trojkatyPodobne: FormulaDef = {
  id: "trojkaty-podobne",
  subject: "matematyka",
  topic: "Kąty",
  name: "Trójkąty podobne (skala)",
  latex: "y = k \\cdot x",
  vars: [
    { id: "k", label: "k (skala)" },
    { id: "x", label: "x (bok)" },
    { id: "y", label: "y (bok odpowiadający)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "y") {
      const k = asRational(known["k"], "k");
      const x = asRational(known["x"], "x");
      const value = exactOf(mul(k, x));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "y = k \\cdot x" },
          { title: "2. Podstawienie danych", body: `y = ${L(k)} \\cdot ${L(x)}` },
          { title: "3. Wynik", body: resultLatex("y", value, places) },
        ],
      };
    }
    if (unknown === "x") {
      const k = asRational(known["k"], "k");
      const y = asRational(known["y"], "y");
      const value = exactOf(div(y, k));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "x = \\frac{y}{k}" },
          { title: "2. Podstawienie danych", body: `x = \\frac{${L(y)}}{${L(k)}}` },
          { title: "3. Wynik", body: resultLatex("x", value, places) },
        ],
      };
    }
    const x = asRational(known["x"], "x");
    const y = asRational(known["y"], "y");
    const value = exactOf(div(y, x));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "k = \\frac{y}{x}" },
        { title: "2. Podstawienie danych", body: `k = \\frac{${L(y)}}{${L(x)}}` },
        { title: "3. Wynik", body: resultLatex("k", value, places) },
      ],
    };
  },
};

const katZBokow: FormulaDef = {
  id: "kat-z-bokow",
  subject: "matematyka",
  topic: "Kąty",
  name: "Kąt z boków trójkąta prostokątnego",
  latex: "\\alpha = \\arcsin\\frac{a}{c} = \\arccos\\frac{b}{c} = \\arctan\\frac{a}{b}",
  vars: [
    {
      id: "jak",
      label: "przez",
      kind: "select",
      options: ["sin⁻¹ (x/y)", "cos⁻¹ (x/y)", "tan⁻¹ (x/y)"],
    },
    { id: "x", label: "x (licznik)" },
    { id: "y", label: "y (mianownik)" },
  ],
  mode: "fixed",
  outputId: "alfa",
  outputLabel: "α",
  solve(_unknown, known, places, selects): FormulaSolution {
    const x = asRational(known["x"], "x");
    const y = asRational(known["y"], "y");
    const jak = selects?.["jak"] ?? "sin⁻¹ (x/y)";
    const r = approx(exactOf(div(x, y)));
    let deg: number;
    if (jak.startsWith("sin")) {
      if (Math.abs(r) > 1) throw new Error("|x/y| ≤ 1 dla sinusa");
      deg = (Math.asin(r) * 180) / Math.PI;
    } else if (jak.startsWith("cos")) {
      if (Math.abs(r) > 1) throw new Error("|x/y| ≤ 1 dla cosinusa");
      deg = (Math.acos(r) * 180) / Math.PI;
    } else {
      deg = (Math.atan(r) * 180) / Math.PI;
    }
    const fn = jak.startsWith("sin") ? "\\arcsin" : jak.startsWith("cos") ? "\\arccos" : "\\arctan";
    const value = approxOnly(deg);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `\\alpha = ${fn}\\frac{x}{y}` },
        { title: "2. Podstawienie danych", body: `\\alpha = ${fn}\\frac{${L(x)}}{${L(y)}}` },
        { title: "3. Iloraz", body: `\\frac{x}{y} = \\frac{${L(x)}}{${L(y)}} = ${trimNum(r)}` },
        {
          title: "4. Wynik",
          body: resultLatex("\\alpha", value, places),
          note: "wynik w stopniach",
        },
      ],
    };
  },
};

const sumaKatow: FormulaDef = {
  id: "suma-katow",
  subject: "matematyka",
  topic: "Kąty",
  name: "Suma kątów wielokąta",
  latex: "S = (n - 2) \\cdot 180^\\circ",
  vars: [
    { id: "n", label: "n (liczba boków)" },
    { id: "S", label: "S (suma) [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "S") {
      const n = requireNatural(known["n"], "n");
      if (n < 3) throw new Error("wielokąt ma co najmniej 3 boki");
      const value = exactOf(mul(of(n - 2), of(180)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "S = (n - 2) \\cdot 180^\\circ" },
          { title: "2. Podstawienie danych", body: `S = (${n} - 2) \\cdot 180` },
          { title: "3. Nawias", body: `n - 2 = ${n} - 2 = ${n - 2}` },
          { title: "4. Wynik", body: resultLatex("S", value, places) },
        ],
      };
    }
    const S = asRational(known["S"], "S");
    const n = div(S, of(180));
    if (n.q !== 1n || n.p < 3n) throw new Error("S musi być wielokrotnością 180° dla n ≥ 3");
    const value = exactOf(add(n, of(2)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "n = \\frac{S}{180} + 2" },
        { title: "2. Podstawienie danych", body: `n = \\frac{${L(S)}}{180} + 2` },
        { title: "3. Iloraz", body: `\\frac{S}{180} = ${L(n)}` },
        { title: "4. Wynik", body: resultLatex("n", value, places) },
      ],
    };
  },
};

export const MATH_KATY: FormulaDef[] = [
  zamianaMiary,
  katTrojkat,
  katMiedzyProstymi,
  trojkatyPodobne,
  katZBokow,
  sumaKatow,
];
