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
import { APPROX_PI_NOTE, asRational, requireNatural, resultLatex, stdSteps } from "./types";

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
      const value = sqrtRational(add(mul(a, a), mul(b, b)));
      return {
        values: [value],
        steps: stdSteps(
          "c = \\sqrt{a^2 + b^2}",
          `c = \\sqrt{${L(a)}^2 + ${L(b)}^2}`,
          value,
          places,
        ),
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
      steps: stdSteps(
        `${unknown} = \\sqrt{c^2 - ${other}^2}`,
        `${unknown} = \\sqrt{${L(c)}^2 - ${L(o)}^2}`,
        value,
        places,
      ),
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
      const value = exactOf(div(mul(a, h), of(2)));
      return {
        values: [value],
        steps: stdSteps(
          "P = \\frac{a \\cdot h}{2}",
          `P = \\frac{${L(a)} \\cdot ${L(h)}}{2}`,
          value,
          places,
        ),
      };
    }
    const P = asRational(known["P"], "P");
    if (unknown === "a") {
      const h = asRational(known["h"], "h");
      const value = exactOf(div(mul(P, of(2)), h));
      return {
        values: [value],
        steps: stdSteps(
          "a = \\frac{2P}{h}",
          `a = \\frac{2 \\cdot ${L(P)}}{${L(h)}}`,
          value,
          places,
        ),
      };
    }
    const a = asRational(known["a"], "a");
    const value = exactOf(div(mul(P, of(2)), a));
    return {
      values: [value],
      steps: stdSteps("h = \\frac{2P}{a}", `h = \\frac{2 \\cdot ${L(P)}}{${L(a)}}`, value, places),
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
        steps: stdSteps("P = a \\cdot b", `P = ${L(a)} \\cdot ${L(b)}`, value, places),
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "a" ? "b" : "a";
    const o = asRational(known[other], other);
    const value = exactOf(div(P, o));
    return {
      values: [value],
      steps: stdSteps(
        `${unknown} = \\frac{P}{${other}}`,
        `${unknown} = \\frac{${L(P)}}{${L(o)}}`,
        value,
        places,
      ),
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
      const value = mulRat(PI, mul(r, r));
      return {
        values: [value],
        steps: stdSteps("P = \\pi r^2", `P = \\pi \\cdot ${L(r)}^2`, value, places),
      };
    }
    const P = known["P"];
    let value: Exact;
    let note: string | undefined;
    try {
      value = sqrtRational(stripPi(P));
    } catch {
      value = approxOnly(Math.sqrt(approx(P) / Math.PI));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: stdSteps(
        "r = \\sqrt{\\frac{P}{\\pi}}",
        `r = \\sqrt{\\frac{${formatLatex(P)}}{\\pi}}`,
        value,
        places,
        note,
      ),
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
      const value = mulRat(PI, mul(of(2), r));
      return {
        values: [value],
        steps: stdSteps("Ob = 2\\pi r", `Ob = 2\\pi \\cdot ${L(r)}`, value, places),
      };
    }
    const Ob = known["Ob"];
    let value: Exact;
    let note: string | undefined;
    try {
      value = exactOf(div(stripPi(Ob), of(2)));
    } catch {
      value = approxOnly(approx(Ob) / (2 * Math.PI));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: stdSteps(
        "r = \\frac{Ob}{2\\pi}",
        `r = \\frac{${formatLatex(Ob)}}{2\\pi}`,
        value,
        places,
        note,
      ),
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
      const value = exactOf(mul(mul(a, b), c));
      return {
        values: [value],
        steps: stdSteps(
          "V = a \\cdot b \\cdot c",
          `V = ${L(a)} \\cdot ${L(b)} \\cdot ${L(c)}`,
          value,
          places,
        ),
      };
    }
    const V = asRational(known["V"], "V");
    const rest = ["a", "b", "c"].filter((id) => id !== unknown);
    const x = asRational(known[rest[0]], rest[0]);
    const y = asRational(known[rest[1]], rest[1]);
    const value = exactOf(div(V, mul(x, y)));
    return {
      values: [value],
      steps: stdSteps(
        `${unknown} = \\frac{V}{${rest[0]} \\cdot ${rest[1]}}`,
        `${unknown} = \\frac{${L(V)}}{${L(x)} \\cdot ${L(y)}}`,
        value,
        places,
      ),
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
      const value = mulRat(PI, div(mul(of(4), pow(r, 3)), of(3)));
      return {
        values: [value],
        steps: stdSteps(
          "V = \\frac{4}{3}\\pi r^3",
          `V = \\frac{4}{3}\\pi \\cdot ${L(r)}^3`,
          value,
          places,
        ),
      };
    }
    const V = known["V"];
    let value: Exact;
    let note: string | undefined;
    try {
      value = cbrtRational(div(mul(stripPi(V), of(3)), of(4)));
    } catch {
      value = approxOnly(Math.cbrt((3 * approx(V)) / (4 * Math.PI)));
      note = "wynik tylko przybliżony — dokładny wychodzi dla objętości z π (np. 36π)";
    }
    return {
      values: [value],
      steps: stdSteps(
        "r = \\sqrt[3]{\\frac{3V}{4\\pi}}",
        `r = \\sqrt[3]{\\frac{3 \\cdot ${formatLatex(V)}}{4\\pi}}`,
        value,
        places,
        note,
      ),
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
      const value = mulRat(PI, mul(of(4), mul(r, r)));
      return {
        values: [value],
        steps: stdSteps("P = 4\\pi r^2", `P = 4\\pi \\cdot ${L(r)}^2`, value, places),
      };
    }
    const P = known["P"];
    let value: Exact;
    let note: string | undefined;
    try {
      value = sqrtRational(div(stripPi(P), of(4)));
    } catch {
      value = approxOnly(Math.sqrt(approx(P) / (4 * Math.PI)));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: stdSteps(
        "r = \\sqrt{\\frac{P}{4\\pi}}",
        `r = \\sqrt{\\frac{${formatLatex(P)}}{4\\pi}}`,
        value,
        places,
        note,
      ),
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
