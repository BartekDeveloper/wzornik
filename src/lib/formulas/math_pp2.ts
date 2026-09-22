import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import {
  approx,
  approxOnly,
  divExact,
  exactOf,
  mulRat,
  sqrtRational,
  stripPi,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { APPROX_PI_NOTE, asRational, resultLatex } from "./types";

const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
const L = formatRatLatex;

const katyOkrag: FormulaDef = {
  id: "katy-okrag",
  subject: "matematyka",
  topic: "Koło i okrąg",
  name: "Kąt środkowy i wpisany",
  latex: "\\alpha = 2\\beta",
  vars: [
    { id: "alfa", label: "α (środkowy) [°]" },
    { id: "beta", label: "β (wpisany) [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "alfa") {
      const beta = asRational(known["beta"], "β");
      const value = exactOf(mul(of(2), beta));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\alpha = 2\\beta" },
          { title: "2. Podstawienie danych", body: `\\alpha = 2 \\cdot ${L(beta)}` },
          { title: "3. Wynik", body: resultLatex("\\alpha", value, places) },
        ],
      };
    }
    const alfa = asRational(known["alfa"], "α");
    const value = exactOf(div(alfa, of(2)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "\\beta = \\frac{\\alpha}{2}" },
        { title: "2. Podstawienie danych", body: `\\beta = \\frac{${L(alfa)}}{2}` },
        { title: "3. Wynik", body: resultLatex("\\beta", value, places) },
      ],
    };
  },
};

const poleTrapez: FormulaDef = {
  id: "pole-trapez",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole trapezu",
  latex: "P = \\frac{(a + b)h}{2}",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "a", label: "a (podstawa)" },
    { id: "b", label: "b (podstawa)" },
    { id: "h", label: "h (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const h = asRational(known["h"], "h");
      const sum = add(a, b);
      const num = mul(sum, h);
      const value = exactOf(div(num, of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\frac{(a + b)h}{2}" },
          {
            title: "2. Podstawienie danych",
            body: `P = \\frac{(${L(a)} + ${L(b)}) \\cdot ${L(h)}}{2}`,
          },
          { title: "3. Suma podstaw", body: `a + b = ${L(a)} + ${L(b)} = ${L(sum)}` },
          { title: "4. Licznik", body: `(${L(sum)}) \\cdot ${L(h)} = ${L(num)}` },
          { title: "5. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    if (unknown === "h") {
      const P = asRational(known["P"], "P");
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const sum = add(a, b);
      const num = mul(P, of(2));
      const value = exactOf(div(num, sum));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "h = \\frac{2P}{a + b}" },
          {
            title: "2. Podstawienie danych",
            body: `h = \\frac{2 \\cdot ${L(P)}}{${L(a)} + ${L(b)}}`,
          },
          { title: "3. Licznik i mianownik", body: `2P = ${L(num)}, \\; a + b = ${L(sum)}` },
          { title: "4. Wynik", body: resultLatex("h", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const h = asRational(known["h"], "h");
    const other = unknown === "a" ? "b" : "a";
    const o = asRational(known[other], other);
    const frac = div(mul(P, of(2)), h);
    const value = exactOf(sub(frac, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{2P}{h} - ${other}` },
        {
          title: "2. Podstawienie danych",
          body: `${unknown} = \\frac{2 \\cdot ${L(P)}}{${L(h)}} - ${L(o)}`,
        },
        { title: "3. Ułamek", body: `\\frac{2 \\cdot ${L(P)}}{${L(h)}} = ${L(frac)}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const poleRombu: FormulaDef = {
  id: "pole-rombu",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole rombu (przekątne)",
  latex: "P = \\frac{ef}{2}",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "e", label: "e (przekątna)" },
    { id: "f", label: "f (przekątna)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const e = asRational(known["e"], "e");
      const f = asRational(known["f"], "f");
      const num = mul(e, f);
      const value = exactOf(div(num, of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\frac{ef}{2}" },
          { title: "2. Podstawienie danych", body: `P = \\frac{${L(e)} \\cdot ${L(f)}}{2}` },
          { title: "3. Licznik", body: `e \\cdot f = ${L(e)} \\cdot ${L(f)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "e" ? "f" : "e";
    const o = asRational(known[other], other);
    const num = mul(P, of(2));
    const value = exactOf(div(num, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{2P}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{2 \\cdot ${L(P)}}{${L(o)}}` },
        { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const poleRownoleglobok: FormulaDef = {
  id: "pole-rownoleglobok",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole równoległoboku",
  latex: "P = a \\cdot h",
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
      const value = exactOf(mul(a, h));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = a \\cdot h" },
          { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(h)}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "a" ? "h" : "a";
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

const lukOkregu: FormulaDef = {
  id: "luk-okregu",
  subject: "matematyka",
  topic: "Koło i okrąg",
  name: "Długość łuku okręgu",
  latex: "l = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r",
  vars: [
    { id: "l", label: "l (długość łuku)" },
    { id: "r", label: "r (promień)" },
    { id: "alfa", label: "α (kąt) [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "l") {
      const r = asRational(known["r"], "r");
      const alfa = asRational(known["alfa"], "α");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const circ = mul(of(2), r);
      const value = mulRat(PI, div(mul(alfa, circ), of(360)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "l = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r",
          },
          {
            title: "2. Podstawienie danych",
            body: `l = \\frac{${L(alfa)}}{360} \\cdot 2\\pi \\cdot ${L(r)}`,
          },
          { title: "3. Obwód koła bez π", body: `2r = 2 \\cdot ${L(r)} = ${L(circ)}` },
          { title: "4. Wynik", body: resultLatex("l", value, places) },
        ],
      };
    }
    if (unknown === "alfa") {
      const l = known["l"];
      const r = asRational(known["r"], "r");
      let value: Exact;
      let note: string | undefined;
      try {
        const inner = div(mul(stripPi(l), of(360)), mul(of(2), r));
        value = exactOf(inner);
        return {
          values: [value],
          steps: [
            {
              title: "1. Przekształcenie wzoru",
              body: "\\alpha = \\frac{360^\\circ \\cdot l}{2\\pi r}",
            },
            {
              title: "2. Podstawienie danych",
              body: `\\alpha = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(r)}}`,
            },
            { title: "3. Skrócenie π", body: `\\alpha = ${L(inner)}` },
            { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
          ],
        };
      } catch {
        value = approxOnly((approx(l) * 360) / (2 * Math.PI * approx(exactOf(r))));
        note = APPROX_PI_NOTE;
      }
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\alpha = \\frac{360^\\circ \\cdot l}{2\\pi r}",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\alpha = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(r)}}`,
          },
          { title: "3. Wynik", body: resultLatex("\\alpha", value, places), note },
        ],
      };
    }
    const l = known["l"];
    const alfa = asRational(known["alfa"], "α");
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(mul(stripPi(l), of(360)), mul(alfa, of(2)));
      value = exactOf(inner);
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "r = \\frac{360^\\circ \\cdot l}{2\\pi\\alpha}",
          },
          {
            title: "2. Podstawienie danych",
            body: `r = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(alfa)}}`,
          },
          { title: "3. Skrócenie π", body: `r = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      const num = approx(l) * 360;
      const den = approx(exactOf(alfa)) * 2 * Math.PI;
      value = approxOnly(num / den);
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "r = \\frac{360^\\circ \\cdot l}{2\\pi\\alpha}",
        },
        {
          title: "2. Podstawienie danych",
          body: `r = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(alfa)}}`,
        },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const wycinekKola: FormulaDef = {
  id: "wycinek-kola",
  subject: "matematyka",
  topic: "Koło i okrąg",
  name: "Pole wycinka koła",
  latex: "P = \\frac{\\alpha}{360^\\circ} \\cdot \\pi r^2",
  vars: [
    { id: "P", label: "P (pole wycinka)" },
    { id: "r", label: "r (promień)" },
    { id: "alfa", label: "α (kąt) [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const r = asRational(known["r"], "r");
      const alfa = asRational(known["alfa"], "α");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r2 = mul(r, r);
      const value = mulRat(PI, div(mul(alfa, r2), of(360)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "P = \\frac{\\alpha}{360^\\circ} \\cdot \\pi r^2",
          },
          {
            title: "2. Podstawienie danych",
            body: `P = \\frac{${L(alfa)}}{360} \\cdot \\pi \\cdot ${L(r)}^2`,
          },
          { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
          { title: "4. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    if (unknown === "alfa") {
      const P = known["P"];
      const r = asRational(known["r"], "r");
      let value: Exact;
      let note: string | undefined;
      try {
        const r2 = mul(r, r);
        const inner = div(mul(stripPi(P), of(360)), r2);
        value = exactOf(inner);
        return {
          values: [value],
          steps: [
            {
              title: "1. Przekształcenie wzoru",
              body: "\\alpha = \\frac{360^\\circ \\cdot P}{\\pi r^2}",
            },
            {
              title: "2. Podstawienie danych",
              body: `\\alpha = \\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(r)}^2}`,
            },
            {
              title: "3. Kwadrat i skrócenie π",
              body: `r^2 = ${L(r2)}, \\; \\alpha = ${L(inner)}`,
            },
            { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
          ],
        };
      } catch {
        value = approxOnly((approx(P) * 360) / (Math.PI * approx(exactOf(r)) ** 2));
        note = APPROX_PI_NOTE;
      }
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\alpha = \\frac{360^\\circ \\cdot P}{\\pi r^2}",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\alpha = \\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(r)}^2}`,
          },
          { title: "3. Wynik", body: resultLatex("\\alpha", value, places), note },
        ],
      };
    }
    const P = known["P"];
    const alfa = asRational(known["alfa"], "α");
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(stripPi(P), div(mul(alfa, ONE), of(360)));
      value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "r = \\sqrt{\\frac{360^\\circ \\cdot P}{\\pi\\alpha}}",
          },
          {
            title: "2. Podstawienie danych",
            body: `r = \\sqrt{\\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(alfa)}}}`,
          },
          { title: "3. Skrócenie π", body: `\\frac{360P}{\\pi\\alpha} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      const num = approx(P);
      const den = (approx(exactOf(alfa)) * Math.PI) / 360;
      value = approxOnly(Math.sqrt(num / den));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "r = \\sqrt{\\frac{360^\\circ \\cdot P}{\\pi\\alpha}}",
        },
        {
          title: "2. Podstawienie danych",
          body: `r = \\sqrt{\\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(alfa)}}}`,
        },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const odlPunktow: FormulaDef = {
  id: "odl-punktow",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Odległość dwóch punktów",
  latex: "|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
  vars: [
    { id: "x1", label: "x₁" },
    { id: "y1", label: "y₁" },
    { id: "x2", label: "x₂" },
    { id: "y2", label: "y₂" },
  ],
  mode: "fixed",
  outputId: "d",
  outputLabel: "|AB|",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const dx = sub(g("x2"), g("x1"));
    const dy = sub(g("y2"), g("y1"));
    const dx2 = mul(dx, dx);
    const dy2 = mul(dy, dy);
    const value = sqrtRational(add(dx2, dy2));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" },
        {
          title: "2. Podstawienie danych",
          body: `|AB| = \\sqrt{(${L(g("x2"))} - ${L(g("x1"))})^2 + (${L(g("y2"))} - ${L(g("y1"))})^2}`,
        },
        {
          title: "3. Różnice",
          body: `\\Delta x = ${L(dx)}, \\; \\Delta y = ${L(dy)}`,
        },
        {
          title: "4. Kwadraty",
          body: `\\Delta x^2 = ${L(dx2)}, \\; \\Delta y^2 = ${L(dy2)}`,
        },
        { title: "5. Wynik", body: resultLatex("|AB|", value, places) },
      ],
    };
  },
};

const srodekOdcinka: FormulaDef = {
  id: "srodek-odcinka",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Środek odcinka",
  latex: "S = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)",
  vars: [
    { id: "x1", label: "x₁" },
    { id: "y1", label: "y₁" },
    { id: "x2", label: "x₂" },
    { id: "y2", label: "y₂" },
  ],
  mode: "fixed",
  outputId: "S",
  outputLabel: "S",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const sumX = add(g("x1"), g("x2"));
    const sumY = add(g("y1"), g("y2"));
    const xs = exactOf(div(sumX, of(2)));
    const ys = exactOf(div(sumY, of(2)));
    return {
      values: [xs, ys],
      labels: ["x_S", "y_S"],
      steps: [
        { title: "1. Wzór", body: "S = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)" },
        {
          title: "2. Podstawienie danych",
          body: `S = \\left(\\frac{${L(g("x1"))} + ${L(g("x2"))}}{2}, \\frac{${L(g("y1"))} + ${L(g("y2"))}}{2}\\right)`,
        },
        {
          title: "3. Sumy",
          body: `x_1 + x_2 = ${L(sumX)}, \\; y_1 + y_2 = ${L(sumY)}`,
        },
        {
          title: "4. Wynik",
          body: `${resultLatex("x_S", xs, places)}, \\; ${resultLatex("y_S", ys, places)}`,
        },
      ],
    };
  },
};

const prosta2Punkty: FormulaDef = {
  id: "prosta-2-punkty",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Prosta przez 2 punkty",
  latex: "y = ax + b",
  vars: [
    { id: "x1", label: "x₁" },
    { id: "y1", label: "y₁" },
    { id: "x2", label: "x₂" },
    { id: "y2", label: "y₂" },
  ],
  mode: "fixed",
  outputId: "ab",
  outputLabel: "a, b",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const dx = sub(g("x2"), g("x1"));
    if (isZero(dx)) {
      return {
        values: [],
        steps: [
          { title: "1. Sprawdzenie", body: "x_1 = x_2" },
          { title: "2. Podstawienie danych", body: `x_1 = ${L(g("x1"))}, \\; x_2 = ${L(g("x2"))}` },
          {
            title: "3. Wynik",
            body: `x = ${L(g("x1"))}`,
            note: "prosta pionowa — nie da się zapisać jako y = ax + b",
          },
        ],
      };
    }
    const a = exactOf(div(sub(g("y2"), g("y1")), dx));
    const ax1 = mul(a.rat, g("x1"));
    const b = exactOf(sub(g("y1"), ax1));
    return {
      values: [a, b],
      labels: ["a", "b"],
      steps: [
        { title: "1. Wzór", body: "a = \\frac{y_2 - y_1}{x_2 - x_1}, \\; b = y_1 - ax_1" },
        {
          title: "2. Podstawienie danych",
          body: `a = \\frac{${L(g("y2"))} - ${L(g("y1"))}}{${L(g("x2"))} - ${L(g("x1"))}}`,
        },
        {
          title: "3. Współczynnik a",
          body: `a = ${formatLatex(a)}, \\; ax_1 = ${L(ax1)}`,
        },
        {
          title: "4. Wynik",
          body: `${resultLatex("a", a, places)}, \\; ${resultLatex("b", b, places)}`,
        },
      ],
    };
  },
};

const prostopadlosc: FormulaDef = {
  id: "prostopadlosc",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Proste równoległe / prostopadłe",
  latex: "a_1 = a_2 \\; \\lor \\; a_1 \\cdot a_2 = -1",
  vars: [
    { id: "a1", label: "a₁" },
    { id: "a2", label: "a₂" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "werdykt",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a1 = asRational(known["a1"], "a₁");
    const a2 = asRational(known["a2"], "a₂");
    const prod = mul(a1, a2);
    if (cmp(a1, a2) === 0) {
      return {
        values: [],
        steps: [
          { title: "1. Warunek równoległości", body: "a_1 = a_2" },
          { title: "2. Podstawienie danych", body: `${L(a1)} = ${L(a2)}` },
          { title: "3. Wynik", body: "a_1 = a_2", note: "proste równoległe" },
        ],
      };
    }
    if (cmp(prod, neg(ONE)) === 0) {
      return {
        values: [],
        steps: [
          { title: "1. Warunek prostopadłości", body: "a_1 \\cdot a_2 = -1" },
          { title: "2. Podstawienie danych", body: `${L(a1)} \\cdot ${L(a2)} = -1` },
          { title: "3. Wynik", body: `${L(a1)} \\cdot ${L(a2)} = -1`, note: "proste prostopadłe" },
        ],
      };
    }
    return {
      values: [],
      steps: [
        { title: "1. Warunki", body: "a_1 = a_2 \\; \\lor \\; a_1 \\cdot a_2 = -1" },
        {
          title: "2. Podstawienie danych",
          body: `a_1 = ${L(a1)}, \\; a_2 = ${L(a2)}, \\; a_1 \\cdot a_2 = ${formatLatex({ rat: prod, irr: null })}`,
        },
        {
          title: "3. Wynik",
          body: `a_1 \\cdot a_2 = ${formatLatex({ rat: prod, irr: null })}`,
          note: "proste ani równoległe, ani prostopadłe",
        },
      ],
    };
  },
};

const okragRownanie: FormulaDef = {
  id: "okrag-rownanie",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Równanie okręgu",
  latex: "(x - h)^2 + (y - k)^2 = r^2",
  vars: [
    { id: "h", label: "h (środek x)" },
    { id: "k", label: "k (środek y)" },
    { id: "r", label: "r (promień)" },
  ],
  mode: "fixed",
  outputId: "row",
  outputLabel: "równanie",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const h = asRational(known["h"], "h");
    const k = asRational(known["k"], "k");
    const r = asRational(known["r"], "r");
    if (cmp(r, ZERO) <= 0) throw new Error("promień dodatni");
    const r2 = mul(r, r);
    const fh = (v: Rational): string =>
      cmp(v, ZERO) === 0 ? "" : cmp(v, ZERO) > 0 ? `- ${L(v)}` : `+ ${L(neg(v))}`;
    return {
      values: [],
      steps: [
        { title: "1. Wzór", body: "(x - h)^2 + (y - k)^2 = r^2" },
        {
          title: "2. Podstawienie danych",
          body: `(x ${fh(h)})^2 + (y ${fh(k)})^2 = ${L(r)}^2`,
        },
        {
          title: "3. Kwadrat promienia",
          body: `r^2 = ${L(r)}^2 = ${formatLatex({ rat: r2, irr: null })}`,
        },
        {
          title: "4. Wynik",
          body: `(x ${fh(h)})^2 + (y ${fh(k)})^2 = ${formatLatex({ rat: r2, irr: null })}`,
        },
      ],
    };
  },
};

const odlPunktProsta: FormulaDef = {
  id: "odl-punkt-prosta",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Odległość punktu od prostej",
  latex: "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}",
  vars: [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "x0", label: "x₀" },
    { id: "y0", label: "y₀" },
  ],
  mode: "fixed",
  outputId: "d",
  outputLabel: "d",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const [A, B, C, x0, y0] = [g("A"), g("B"), g("C"), g("x0"), g("y0")];
    if (isZero(A) && isZero(B)) throw new Error("A i B nie mogą być jednocześnie zerami");
    const num = add(add(mul(A, x0), mul(B, y0)), C);
    const anum = cmp(num, ZERO) < 0 ? neg(num) : num;
    const denInner = add(mul(A, A), mul(B, B));
    const den = sqrtRational(denInner);
    const value = divExact(exactOf(anum), den);
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}",
        },
        {
          title: "2. Podstawienie danych",
          body: `d = \\frac{|${L(A)} \\cdot ${L(x0)} + ${L(B)} \\cdot ${L(y0)} + ${L(C)}|}{\\sqrt{${L(A)}^2 + ${L(B)}^2}}`,
        },
        { title: "3. Licznik", body: `Ax_0 + By_0 + C = ${L(num)}, \\; |\\cdot| = ${L(anum)}` },
        { title: "4. Mianownik", body: `\\sqrt{${L(A)}^2 + ${L(B)}^2} = ${formatLatex(den)}` },
        { title: "5. Wynik", body: resultLatex("d", value, places) },
      ],
    };
  },
};

const graniastoslup: FormulaDef = {
  id: "graniastoslup",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość graniastosłupa",
  latex: "V = P_p \\cdot H",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "Pp", label: "Pₚ (pole podstawy)" },
    { id: "H", label: "H (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const Pp = asRational(known["Pp"], "Pₚ");
      const H = asRational(known["H"], "H");
      const value = exactOf(mul(Pp, H));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = P_p \\cdot H" },
          { title: "2. Podstawienie danych", body: `V = ${L(Pp)} \\cdot ${L(H)}` },
          { title: "3. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    const V = asRational(known["V"], "V");
    const other = unknown === "Pp" ? "H" : "Pp";
    const o = asRational(known[other], other);
    const value = exactOf(div(V, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{V}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(V)}}{${L(o)}}` },
        { title: "3. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const ostroslup: FormulaDef = {
  id: "ostroslup",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość ostrosłupa",
  latex: "V = \\frac{1}{3} P_p H",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "Pp", label: "Pₚ (pole podstawy)" },
    { id: "H", label: "H (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const Pp = asRational(known["Pp"], "Pₚ");
      const H = asRational(known["H"], "H");
      const num = mul(Pp, H);
      const value = exactOf(div(num, of(3)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = \\frac{P_p H}{3}" },
          { title: "2. Podstawienie danych", body: `V = \\frac{${L(Pp)} \\cdot ${L(H)}}{3}` },
          { title: "3. Licznik", body: `P_p \\cdot H = ${L(Pp)} \\cdot ${L(H)} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    const V = asRational(known["V"], "V");
    const other = unknown === "Pp" ? "H" : "Pp";
    const o = asRational(known[other], other);
    const num = mul(V, of(3));
    const value = exactOf(div(num, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{3V}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{3 \\cdot ${L(V)}}{${L(o)}}` },
        { title: "3. Licznik", body: `3 \\cdot V = 3 \\cdot ${L(V)} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const walec: FormulaDef = {
  id: "walec",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość walca",
  latex: "V = \\pi r^2 H",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "r", label: "r (promień)" },
    { id: "H", label: "H (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const r = asRational(known["r"], "r");
      const H = asRational(known["H"], "H");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r2 = mul(r, r);
      const value = mulRat(PI, mul(r2, H));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = \\pi r^2 H" },
          { title: "2. Podstawienie danych", body: `V = \\pi \\cdot ${L(r)}^2 \\cdot ${L(H)}` },
          { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
          { title: "4. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    if (unknown === "H") {
      const V = known["V"];
      const r = asRational(known["r"], "r");
      let value: Exact;
      let note: string | undefined;
      try {
        const r2 = mul(r, r);
        const inner = div(stripPi(V), r2);
        value = exactOf(inner);
        return {
          values: [value],
          steps: [
            { title: "1. Przekształcenie wzoru", body: "H = \\frac{V}{\\pi r^2}" },
            {
              title: "2. Podstawienie danych",
              body: `H = \\frac{${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
            },
            { title: "3. Kwadrat i skrócenie π", body: `r^2 = ${L(r2)}, \\; H = ${L(inner)}` },
            { title: "4. Wynik", body: resultLatex("H", value, places) },
          ],
        };
      } catch {
        value = approxOnly(approx(V) / (Math.PI * approx(exactOf(r)) ** 2));
        note = APPROX_PI_NOTE;
      }
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "H = \\frac{V}{\\pi r^2}" },
          {
            title: "2. Podstawienie danych",
            body: `H = \\frac{${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
          },
          { title: "3. Wynik", body: resultLatex("H", value, places), note },
        ],
      };
    }
    const V = known["V"];
    const H = asRational(known["H"], "H");
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(stripPi(V), H);
      value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{V}{\\pi H}}" },
          {
            title: "2. Podstawienie danych",
            body: `r = \\sqrt{\\frac{${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
          },
          { title: "3. Skrócenie π", body: `\\frac{V}{\\pi H} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(Math.sqrt(approx(V) / (Math.PI * approx(exactOf(H)))));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{V}{\\pi H}}" },
        {
          title: "2. Podstawienie danych",
          body: `r = \\sqrt{\\frac{${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
        },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const stozek: FormulaDef = {
  id: "stozek",
  subject: "matematyka",
  topic: "Bryły",
  name: "Objętość stożka",
  latex: "V = \\frac{1}{3}\\pi r^2 H",
  vars: [
    { id: "V", label: "V (objętość)" },
    { id: "r", label: "r (promień)" },
    { id: "H", label: "H (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const r = asRational(known["r"], "r");
      const H = asRational(known["H"], "H");
      if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
      const r2 = mul(r, r);
      const num = mul(r2, H);
      const value = mulRat(PI, div(num, of(3)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = \\frac{\\pi r^2 H}{3}" },
          {
            title: "2. Podstawienie danych",
            body: `V = \\frac{\\pi \\cdot ${L(r)}^2 \\cdot ${L(H)}}{3}`,
          },
          { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
          { title: "4. Licznik", body: `r^2H = ${L(r2)} \\cdot ${L(H)} = ${L(num)}` },
          { title: "5. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    if (unknown === "H") {
      const V = known["V"];
      const r = asRational(known["r"], "r");
      let value: Exact;
      let note: string | undefined;
      try {
        const r2 = mul(r, r);
        const inner = div(mul(stripPi(V), of(3)), r2);
        value = exactOf(inner);
        return {
          values: [value],
          steps: [
            { title: "1. Przekształcenie wzoru", body: "H = \\frac{3V}{\\pi r^2}" },
            {
              title: "2. Podstawienie danych",
              body: `H = \\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
            },
            { title: "3. Kwadrat i skrócenie π", body: `r^2 = ${L(r2)}, \\; H = ${L(inner)}` },
            { title: "4. Wynik", body: resultLatex("H", value, places) },
          ],
        };
      } catch {
        value = approxOnly((approx(V) * 3) / (Math.PI * approx(exactOf(r)) ** 2));
        note = APPROX_PI_NOTE;
      }
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "H = \\frac{3V}{\\pi r^2}" },
          {
            title: "2. Podstawienie danych",
            body: `H = \\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
          },
          { title: "3. Wynik", body: resultLatex("H", value, places), note },
        ],
      };
    }
    const V = known["V"];
    const H = asRational(known["H"], "H");
    let value: Exact;
    let note: string | undefined;
    try {
      const inner = div(mul(stripPi(V), of(3)), H);
      value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{3V}{\\pi H}}" },
          {
            title: "2. Podstawienie danych",
            body: `r = \\sqrt{\\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
          },
          { title: "3. Skrócenie π", body: `\\frac{3V}{\\pi H} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    } catch {
      value = approxOnly(Math.sqrt((approx(V) * 3) / (Math.PI * approx(exactOf(H)))));
      note = APPROX_PI_NOTE;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{3V}{\\pi H}}" },
        {
          title: "2. Podstawienie danych",
          body: `r = \\sqrt{\\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
        },
        { title: "3. Wynik", body: resultLatex("r", value, places), note },
      ],
    };
  },
};

const rombBok: FormulaDef = {
  id: "romb-bok",
  subject: "matematyka",
  topic: "Pola figur",
  name: "Pole rombu (bok i wysokość)",
  latex: "P = a \\cdot h",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "a", label: "a (bok)" },
    { id: "h", label: "h (wysokość)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const a = asRational(known["a"], "a");
      const h = asRational(known["h"], "h");
      const value = exactOf(mul(a, h));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = a \\cdot h" },
          { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(h)}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "a" ? "h" : "a";
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

export const MATH_PP2: FormulaDef[] = [
  katyOkrag,
  poleTrapez,
  poleRombu,
  poleRownoleglobok,
  lukOkregu,
  wycinekKola,
  odlPunktow,
  srodekOdcinka,
  prosta2Punkty,
  prostopadlosc,
  okragRownanie,
  odlPunktProsta,
  graniastoslup,
  ostroslup,
  walec,
  stozek,
  rombBok,
];
