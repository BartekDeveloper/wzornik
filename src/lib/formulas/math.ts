import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, pow, sub } from "../exact/rational";
import {
  approx,
  approxOnly,
  cbrtRational,
  exactOf,
  mulRat,
  solveQuadratic,
  sqrtRational,
  stripPi,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { APPROX_PI_NOTE, asRational, requireNatural, resultLatex } from "./types";

const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };

function positive(r: ReturnType<typeof asRational>, label: string): void {
  if (cmp(r, ZERO) <= 0) throw new Error(`${label} musi być dodatnie`);
}

const L = formatRatLatex;

const pitagoras: FormulaDef = {
  id: "pitagoras",
  subject: "matematyka",
  topic: "Trójkąt prostokątny",
  name: "Twierdzenie Pitagorasa",
  latex: "a^2 + b^2 = c^2",
  vars: [
    { id: "a", label: "a (przyprostokątna)" },
    { id: "b", label: "b (przyprostokątna)" },
    { id: "c", label: "c (przeciwprostokątna)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "c") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      positive(a, "a");
      positive(b, "b");
      const a2 = mul(a, a);
      const b2 = mul(b, b);
      const value = sqrtRational(add(a2, b2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "c = \\sqrt{a^2 + b^2}" },
          { title: "2. Podstawienie danych", body: `c = \\sqrt{${L(a)}^2 + ${L(b)}^2}` },
          { title: "3. Kwadraty", body: `a^2 = ${L(a2)}, \\; b^2 = ${L(b2)}` },
          { title: "4. Wynik", body: resultLatex("c", value, places) },
        ],
      };
    }
    const other = unknown === "a" ? "b" : "a";
    const c = asRational(known["c"], "c");
    const o = asRational(known[other], other);
    positive(c, "c");
    positive(o, other);
    const diff = sub(mul(c, c), mul(o, o));
    if (cmp(diff, ZERO) <= 0)
      throw new Error("przeciwprostokątna musi być dłuższa od przyprostokątnej");
    const value = sqrtRational(diff);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\sqrt{c^2 - ${other}^2}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\sqrt{${L(c)}^2 - ${L(o)}^2}` },
        { title: "3. Kwadraty", body: `c^2 = ${L(mul(c, c))}, \\; ${other}^2 = ${L(mul(o, o))}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const poleTrojkata: FormulaDef = {
  id: "pole-trojkata",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole trójkąta",
  latex: "P = \\frac{a \\cdot h}{2}",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "a", label: "a (podstawa)" },
    { id: "h", label: "h (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const a = asRational(known["a"], "a");
      const h = asRational(known["h"], "h");
      const num = mul(a, h);
      const value = exactOf(div(num, of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\frac{a \\cdot h}{2}" },
          { title: "2. Podstawienie danych", body: `P = \\frac{${L(a)} \\cdot ${L(h)}}{2}` },
          { title: "3. Licznik", body: `a \\cdot h = ${L(a)} \\cdot ${L(h)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    if (unknown === "a") {
      const h = asRational(known["h"], "h");
      const num = mul(P, of(2));
      const value = exactOf(div(num, h));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a = \\frac{2P}{h}" },
          { title: "2. Podstawienie danych", body: `a = \\frac{2 \\cdot ${L(P)}}{${L(h)}}` },
          { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("a", value, places) },
        ],
      };
    }
    const a = asRational(known["a"], "a");
    const num = mul(P, of(2));
    const value = exactOf(div(num, a));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "h = \\frac{2P}{a}" },
        { title: "2. Podstawienie danych", body: `h = \\frac{2 \\cdot ${L(P)}}{${L(a)}}` },
        { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("h", value, places) },
      ],
    };
  },
};

const poleProstokata: FormulaDef = {
  id: "pole-prostokata",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole prostokąta",
  latex: "P = a \\cdot b",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "a", label: "a (bok)" },
    { id: "b", label: "b (bok)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const value = exactOf(mul(a, b));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = a \\cdot b" },
          { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(b)}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "a" ? "b" : "a";
    const o = asRational(known[other], other);
    const value = exactOf(div(P, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{P}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(P)}}{${L(o)}}` },
        { title: "3. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const poleKola: FormulaDef = {
  id: "pole-kola",
  subject: "matematyka",
  topic: "Koło i okrąg",
  name: "Pole koła",
  latex: "P = \\pi r^2",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "r", label: "r (promień)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const r = asRational(known["r"], "r");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r2 = mul(r, r);
      const value = mulRat(PI, r2);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\pi r^2" },
          { title: "2. Podstawienie danych", body: `P = \\pi \\cdot ${L(r)}^2` },
          { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
          { title: "4. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = known["P"];
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = stripPi(P);
      value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{\\pi}}" },
          { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{\\pi}}` },
          { title: "3. Skrócenie π", body: `\\frac{P}{\\pi} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(Math.sqrt(approx(P) / Math.PI));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{\\pi}}" },
        { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{\\pi}}` },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const obwodKola: FormulaDef = {
  id: "obwod-kola",
  subject: "matematyka",
  topic: "Koło i okrąg",
  name: "Obwód koła",
  latex: "Ob = 2\\pi r",
  vars: [
    { id: "Ob", label: "Ob (obwód)" },
    { id: "r", label: "r (promień)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Ob") {
      const r = asRational(known["r"], "r");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const twoR = mul(of(2), r);
      const value = mulRat(PI, twoR);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "Ob = 2\\pi r" },
          { title: "2. Podstawienie danych", body: `Ob = 2\\pi \\cdot ${L(r)}` },
          { title: "3. Średnica", body: `2r = 2 \\cdot ${L(r)} = ${L(twoR)}` },
          { title: "4. Wynik", body: resultLatex("Ob", value, places) },
        ],
      };
    }
    const Ob = known["Ob"];
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(stripPi(Ob), of(2));
      value = exactOf(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\frac{Ob}{2\\pi}" },
          { title: "2. Podstawienie danych", body: `r = \\frac{${formatLatex(Ob)}}{2\\pi}` },
          { title: "3. Skrócenie π i dwójki", body: `r = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(approx(Ob) / (2 * Math.PI));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\frac{Ob}{2\\pi}" },
        { title: "2. Podstawienie danych", body: `r = \\frac{${formatLatex(Ob)}}{2\\pi}` },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const rownanieKwadratowe: FormulaDef = {
  id: "rownanie-kwadratowe",
  subject: "matematyka",
  topic: "Równania",
  name: "Równanie kwadratowe",
  latex: "ax^2 + bx + c = 0",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const q = solveQuadratic(a, b, c);
    const subst = `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`;
    if (q.kind === "linear") {
      const v = q.roots[0];
      return {
        values: [v],
        steps: [
          { title: "1. Sprawdzenie", body: "a = 0", note: "to równanie liniowe: bx + c = 0" },
          { title: "2. Podstawienie danych", body: `${L(b)}x + ${L(c)} = 0` },
          { title: "3. Wynik", body: resultLatex("x", v, places) },
        ],
      };
    }
    const dText = formatLatex(q.delta);
    const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c));
    if (q.kind === "none") {
      return {
        values: [],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\; \\Delta = b^2 - 4ac",
          },
          { title: "2. Podstawienie danych", body: subst },
          { title: "3. Obliczenie delty", body: `${subst} = ${dText} < 0` },
          {
            title: "4. Wynik",
            body: "brak rozwiązań",
            note: "Δ < 0 — brak rozwiązań rzeczywistych",
          },
        ],
      };
    }
    if (q.kind === "one") {
      const v = q.roots[0];
      return {
        values: [v],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "x = \\frac{-b}{2a} \\; (\\Delta = 0)" },
          { title: "2. Podstawienie danych", body: subst },
          {
            title: "3. Delta i pierwiastek",
            body: `${subst} = ${dText} = 0, \\; x = \\frac{-${L(b)}}{2 \\cdot ${L(a)}}`,
          },
          { title: "4. Wynik", body: resultLatex("x", v, places), note: "pierwiastek podwójny" },
        ],
      };
    }
    const [x1, x2] = q.roots;
    const sqText = formatLatex(sqrtRational(deltaRat));
    const frac = (sgn: string): string => `x = \\frac{-${L(b)} ${sgn} ${sqText}}{2 \\cdot ${L(a)}}`;
    return {
      values: [x1, x2],
      labels: ["x₁", "x₂"],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\; \\Delta = b^2 - 4ac",
        },
        { title: "2. Podstawienie danych", body: subst },
        {
          title: "3. Delta i pierwiastek",
          body: `${subst} = ${dText}, \\; \\sqrt{\\Delta} = ${sqText}`,
        },
        { title: "4. Ułamki", body: `${frac("-")}, \\; ${frac("+")}` },
        {
          title: "5. Wynik",
          body: `${resultLatex("x_1", x1, places)}, \\; ${resultLatex("x_2", x2, places)}`,
        },
      ],
    };
  },
};

const procent: FormulaDef = {
  id: "procent",
  subject: "matematyka",
  topic: "Procenty",
  name: "Procent z liczby",
  latex: "w = \\frac{p \\cdot x}{100}",
  vars: [
    { id: "p", label: "p [%]" },
    { id: "x", label: "x (liczba)" },
    { id: "w", label: "w (wynik)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "w") {
      const p = asRational(known["p"], "p");
      const x = asRational(known["x"], "x");
      const num = mul(p, x);
      const value = exactOf(div(num, of(100)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "w = \\frac{p \\cdot x}{100}" },
          { title: "2. Podstawienie danych", body: `w = \\frac{${L(p)} \\cdot ${L(x)}}{100}` },
          { title: "3. Licznik", body: `p \\cdot x = ${L(p)} \\cdot ${L(x)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("w", value, places) },
        ],
      };
    }
    const w = asRational(known["w"], "w");
    if (unknown === "p") {
      const x = asRational(known["x"], "x");
      const num = mul(w, of(100));
      const value = exactOf(div(num, x));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "p = \\frac{100w}{x}" },
          { title: "2. Podstawienie danych", body: `p = \\frac{100 \\cdot ${L(w)}}{${L(x)}}` },
          { title: "3. Licznik", body: `100 \\cdot w = 100 \\cdot ${L(w)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    const p = asRational(known["p"], "p");
    const num = mul(w, of(100));
    const value = exactOf(div(num, p));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "x = \\frac{100w}{p}" },
        { title: "2. Podstawienie danych", body: `x = \\frac{100 \\cdot ${L(w)}}{${L(p)}}` },
        { title: "3. Licznik", body: `100 \\cdot w = 100 \\cdot ${L(w)} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("x", value, places) },
      ],
    };
  },
};

const ciagArytmetyczny: FormulaDef = {
  id: "ciag-arytmetyczny",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Ciąg arytmetyczny",
  latex: "a_n = a_1 + (n - 1) \\cdot r",
  vars: [
    { id: "an", label: "aₙ" },
    { id: "a1", label: "a₁" },
    { id: "n", label: "n" },
    { id: "r", label: "r (różnica)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "an") {
      const a1 = asRational(known["a1"], "a₁");
      const n = requireNatural(known["n"], "n");
      const r = asRational(known["r"], "r");
      const prod = mul(of(n - 1), r);
      const value = exactOf(add(a1, prod));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_n = a_1 + (n - 1) \\cdot r" },
          {
            title: "2. Podstawienie danych",
            body: `a_{${n}} = ${L(a1)} + ${n - 1} \\cdot ${L(r)}`,
          },
          {
            title: "3. Iloczyn",
            body: `(${n} - 1) \\cdot r = ${n - 1} \\cdot ${L(r)} = ${L(prod)}`,
          },
          { title: "4. Wynik", body: resultLatex(`a_{${n}}`, value, places) },
        ],
      };
    }
    if (unknown === "a1") {
      const an = asRational(known["an"], "aₙ");
      const n = requireNatural(known["n"], "n");
      const r = asRational(known["r"], "r");
      const prod = mul(of(n - 1), r);
      const value = exactOf(sub(an, prod));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_1 = a_n - (n - 1) \\cdot r" },
          { title: "2. Podstawienie danych", body: `a_1 = ${L(an)} - ${n - 1} \\cdot ${L(r)}` },
          {
            title: "3. Iloczyn",
            body: `(${n} - 1) \\cdot r = ${n - 1} \\cdot ${L(r)} = ${L(prod)}`,
          },
          { title: "4. Wynik", body: resultLatex("a_1", value, places) },
        ],
      };
    }
    if (unknown === "n") {
      const an = asRational(known["an"], "aₙ");
      const a1 = asRational(known["a1"], "a₁");
      const r = asRational(known["r"], "r");
      const k = div(sub(an, a1), r);
      if (k.q !== 1n || k.p < 0n)
        throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
      const value = exactOf(add(k, ONE));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\frac{a_n - a_1}{r} + 1" },
          {
            title: "2. Podstawienie danych",
            body: `n = \\frac{${L(an)} - ${L(a1)}}{${L(r)}} + 1`,
          },
          { title: "3. Iloraz", body: `\\frac{${L(an)} - ${L(a1)}}{${L(r)}} = ${L(k)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const an = asRational(known["an"], "aₙ");
    const a1 = asRational(known["a1"], "a₁");
    const n = requireNatural(known["n"], "n");
    if (n === 1) throw new Error("dla n = 1 różnica r jest dowolna — podaj n większe od 1");
    const diff = sub(an, a1);
    const value = exactOf(div(diff, of(n - 1)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\frac{a_n - a_1}{n - 1}" },
        { title: "2. Podstawienie danych", body: `r = \\frac{${L(an)} - ${L(a1)}}{${n - 1}}` },
        { title: "3. Licznik", body: `a_n - a_1 = ${L(an)} - ${L(a1)} = ${L(diff)}` },
        { title: "4. Wynik", body: resultLatex("r", value, places) },
      ],
    };
  },
};

const ciagGeometryczny: FormulaDef = {
  id: "ciag-geometryczny",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Ciąg geometryczny",
  latex: "a_n = a_1 \\cdot q^{n-1}",
  vars: [
    { id: "an", label: "aₙ" },
    { id: "a1", label: "a₁" },
    { id: "q", label: "q (iloraz)" },
    { id: "n", label: "n" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "q" || unknown === "n") {
      throw new Error("ten kalkulator liczy aₙ i a₁ — q i n wymagają pierwiastków i logarytmów");
    }
    const n = requireNatural(known["n"], "n");
    if (unknown === "an") {
      const a1 = asRational(known["a1"], "a₁");
      const q = asRational(known["q"], "q");
      const pw = pow(q, n - 1);
      const value = exactOf(mul(a1, pw));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_n = a_1 \\cdot q^{n-1}" },
          {
            title: "2. Podstawienie danych",
            body: `a_{${n}} = ${L(a1)} \\cdot ${L(q)}^{${n - 1}}`,
          },
          { title: "3. Potęga", body: `q^{${n - 1}} = ${L(q)}^{${n - 1}} = ${L(pw)}` },
          { title: "4. Wynik", body: resultLatex(`a_{${n}}`, value, places) },
        ],
      };
    }
    const an = asRational(known["an"], "aₙ");
    const q = asRational(known["q"], "q");
    const pw = pow(q, n - 1);
    const value = exactOf(div(an, pw));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "a_1 = \\frac{a_n}{q^{n-1}}" },
        { title: "2. Podstawienie danych", body: `a_1 = \\frac{${L(an)}}{${L(q)}^{${n - 1}}}` },
        { title: "3. Potęga", body: `q^{${n - 1}} = ${L(q)}^{${n - 1}} = ${L(pw)}` },
        { title: "4. Wynik", body: resultLatex("a_1", value, places) },
      ],
    };
  },
};

const objetoscProstopadloscianu: FormulaDef = {
  id: "objetosc-prostopadloscianu",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość prostopadłościanu",
  latex: "V = a \\cdot b \\cdot c",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const c = asRational(known["c"], "c");
      const ab = mul(a, b);
      const value = exactOf(mul(ab, c));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = a \\cdot b \\cdot c" },
          {
            title: "2. Podstawienie danych",
            body: `V = ${L(a)} \\cdot ${L(b)} \\cdot ${L(c)}`,
          },
          { title: "3. Podstawa", body: `a \\cdot b = ${L(a)} \\cdot ${L(b)} = ${L(ab)}` },
          { title: "4. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    const V = asRational(known["V"], "V");
    const rest = ["a", "b", "c"].filter((id) => id !== unknown);
    const x = asRational(known[rest[0]], rest[0]);
    const y = asRational(known[rest[1]], rest[1]);
    const prod = mul(x, y);
    const value = exactOf(div(V, prod));
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${unknown} = \\frac{V}{${rest[0]} \\cdot ${rest[1]}}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${unknown} = \\frac{${L(V)}}{${L(x)} \\cdot ${L(y)}}`,
        },
        {
          title: "3. Mianownik",
          body: `${rest[0]} \\cdot ${rest[1]} = ${L(x)} \\cdot ${L(y)} = ${L(prod)}`,
        },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const objetoscKuli: FormulaDef = {
  id: "objetosc-kuli",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość kuli",
  latex: "V = \\frac{4}{3}\\pi r^3",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "r", label: "r (promień)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const r = asRational(known["r"], "r");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r3 = pow(r, 3);
      const value = mulRat(PI, div(mul(of(4), r3), of(3)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = \\frac{4}{3}\\pi r^3" },
          { title: "2. Podstawienie danych", body: `V = \\frac{4}{3}\\pi \\cdot ${L(r)}^3` },
          { title: "3. Sześcian promienia", body: `r^3 = ${L(r)}^3 = ${L(r3)}` },
          { title: "4. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    const V = known["V"];
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(mul(stripPi(V), of(3)), of(4));
      value = cbrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\sqrt[3]{\\frac{3V}{4\\pi}}" },
          {
            title: "2. Podstawienie danych",
            body: `r = \\sqrt[3]{\\frac{3 \\cdot ${formatLatex(V)}}{4\\pi}}`,
          },
          { title: "3. Skrócenie π", body: `\\frac{3V}{4\\pi} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(Math.cbrt((3 * approx(V)) / (4 * Math.PI)));
      note = "wynik tylko przybliżony — dokładny wychodzi dla objętości z π (np. 36π)";
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\sqrt[3]{\\frac{3V}{4\\pi}}" },
        {
          title: "2. Podstawienie danych",
          body: `r = \\sqrt[3]{\\frac{3 \\cdot ${formatLatex(V)}}{4\\pi}}`,
        },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const poleKuli: FormulaDef = {
  id: "pole-kuli",
  subject: "matematyka",
  topic: "Bryły",
  name: "Pole powierzchni kuli",
  latex: "P = 4\\pi r^2",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "r", label: "r (promień)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const r = asRational(known["r"], "r");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r2 = mul(r, r);
      const value = mulRat(PI, mul(of(4), r2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = 4\\pi r^2" },
          { title: "2. Podstawienie danych", body: `P = 4\\pi \\cdot ${L(r)}^2` },
          { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
          { title: "4. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = known["P"];
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(stripPi(P), of(4));
      value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{4\\pi}}" },
          { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{4\\pi}}` },
          { title: "3. Skrócenie π i czwórki", body: `\\frac{P}{4\\pi} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(Math.sqrt(approx(P) / (4 * Math.PI)));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{4\\pi}}" },
        { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{4\\pi}}` },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const funkcjaLiniowa: FormulaDef = {
  id: "funkcja-liniowa",
  subject: "matematyka",
  topic: "Funkcje",
  name: "Miejsce zerowe funkcji liniowej",
  latex: "y = ax + b",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "x0",
  outputLabel: "x₀",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    if (isZero(a)) {
      if (isZero(b)) {
        return {
          values: [],
          steps: [
            { title: "1. Sprawdzenie", body: "a = 0" },
            { title: "2. Podstawienie danych", body: `0 \\cdot x + ${L(b)} = 0` },
            {
              title: "3. Wynik",
              body: "0 = 0",
              note: "tożsamość — każda liczba jest miejscem zerowym",
            },
          ],
        };
      }
      return {
        values: [],
        steps: [
          { title: "1. Sprawdzenie", body: "a = 0" },
          { title: "2. Podstawienie danych", body: `0 \\cdot x + ${L(b)} = 0` },
          { title: "3. Wynik", body: `${L(b)} = 0`, note: "sprzeczność — brak miejsc zerowych" },
        ],
      };
    }
    const v = exactOf(div(neg(b), a));
    return {
      values: [v],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "x_0 = -\\frac{b}{a}" },
        { title: "2. Podstawienie danych", body: `x_0 = -\\frac{${L(b)}}{${L(a)}}` },
        { title: "3. Licznik", body: `-b = -${L(b)} = ${L(neg(b))}` },
        { title: "4. Wynik", body: resultLatex("x_0", v, places) },
      ],
    };
  },
};

export const MATH_FORMULAS: FormulaDef[] = [
  pitagoras,
  poleTrojkata,
  poleProstokata,
  poleKola,
  obwodKola,
  rownanieKwadratowe,
  funkcjaLiniowa,
  procent,
  ciagArytmetyczny,
  ciagGeometryczny,
  objetoscProstopadloscianu,
  objetoscKuli,
  poleKuli,
];
