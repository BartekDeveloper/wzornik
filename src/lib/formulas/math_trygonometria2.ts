import { add, div, isZero, mul } from "../exact/rational";
import {
  addExact,
  approx,
  divExact,
  exactOf,
  sqrtRational,
  subExact,
  trigExact,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const trygPunkt: FormulaDef = {
  id: "trygonometria-trojkat-punkt",
  subject: "matematyka",
  topic: "Trygonometria",
  name: "Funkcje trygonometryczne punktu M(x, y)",
  latex:
    "r = \\sqrt{x^2+y^2}, \\; \\sin\\alpha = \\frac{y}{r}, \\; \\cos\\alpha = \\frac{x}{r}, \\; \\operatorname{tg}\\alpha = \\frac{y}{x}",
  vars: [
    { id: "x", label: "x" },
    { id: "y", label: "y" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "r, sin, cos, tg",
  solve(_unknown, known, places): FormulaSolution {
    const x = asRational(known["x"], "x");
    const y = asRational(known["y"], "y");
    if (isZero(x) && isZero(y)) throw new Error("punkt (0, 0) nie definiuje kąta");
    const r = sqrtRational(add(mul(x, x), mul(y, y)));
    const sin = divExact(exactOf(y), r);
    const cos = divExact(exactOf(x), r);
    const values: Exact[] = [r, sin, cos];
    const labels: string[] = ["r", "sin α", "cos α"];
    const results: string[] = [
      `r = ${show(r, places)}`,
      `\\sin\\alpha = ${show(sin, places)}`,
      `\\cos\\alpha = ${show(cos, places)}`,
    ];
    let note: string | undefined;
    if (isZero(x)) {
      note = "tg α nie istnieje (x = 0)";
    } else {
      const tg = exactOf(div(y, x));
      values.push(tg);
      labels.push("tg α");
      results.push(`\\operatorname{tg}\\alpha = ${show(tg, places)}`);
    }
    return {
      values,
      labels,
      steps: [
        {
          title: "1. Promień wodzący",
          body: `r = \\sqrt{${L(x)}^2 + ${L(y)}^2} = ${show(r, places)}`,
        },
        { title: "2. Wynik", body: results.join(", \\; "), note },
      ],
    };
  },
};

const tangensSumy: FormulaDef = {
  id: "tangens-sumy-podwojony",
  subject: "matematyka",
  topic: "Trygonometria · ROZSZ",
  name: "Tangens sumy i podwojonego kąta",
  latex:
    "\\operatorname{tg}(\\alpha\\pm\\beta) = \\frac{\\operatorname{tg}\\alpha \\pm \\operatorname{tg}\\beta}{1 \\mp \\operatorname{tg}\\alpha\\operatorname{tg}\\beta}, \\; \\operatorname{tg}2\\alpha = \\frac{2\\operatorname{tg}\\alpha}{1-\\operatorname{tg}^2\\alpha}",
  vars: [
    { id: "alfa", label: "α [°]" },
    { id: "beta", label: "β [°]" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyniki",
  solve(_unknown, known, places): FormulaSolution {
    const alfa = approx(exactOf(asRational(known["alfa"], "α")));
    const beta = approx(exactOf(asRational(known["beta"], "β")));
    const tgSum = trigExact("tan", alfa + beta);
    const tgDiff = trigExact("tan", alfa - beta);
    const tg2a = trigExact("tan", 2 * alfa);
    const cos2a = trigExact("cos", 2 * alfa);
    return {
      values: [tgSum, tgDiff, tg2a, cos2a],
      labels: ["tg(α+β)", "tg(α−β)", "tg 2α", "cos 2α"],
      steps: [
        {
          title: "1. Wzory",
          body: "\\operatorname{tg}(\\alpha\\pm\\beta) = \\frac{\\operatorname{tg}\\alpha \\pm \\operatorname{tg}\\beta}{1 \\mp \\operatorname{tg}\\alpha\\operatorname{tg}\\beta}, \\; \\cos2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha",
        },
        {
          title: "2. Wynik",
          body: `\\operatorname{tg}(${trimNum(alfa)}+${trimNum(beta)}) = ${show(tgSum, places)}, \\; \\operatorname{tg}(${trimNum(alfa)}-${trimNum(beta)}) = ${show(tgDiff, places)}, \\; \\operatorname{tg}2\\alpha = ${show(tg2a, places)}, \\; \\cos2\\alpha = ${show(cos2a, places)}`,
        },
      ],
    };
  },
};

const sumyIloczyny: FormulaDef = {
  id: "sumy-iloczyny-tryg",
  subject: "matematyka",
  topic: "Trygonometria · ROZSZ",
  name: "Sumy i iloczyny funkcji trygonometrycznych",
  latex:
    "\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}, \\; \\cos\\alpha - \\cos\\beta = -2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}",
  vars: [
    { id: "alfa", label: "α [°]" },
    { id: "beta", label: "β [°]" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "sumy i różnice",
  solve(_unknown, known, places): FormulaSolution {
    const alfa = approx(exactOf(asRational(known["alfa"], "α")));
    const beta = approx(exactOf(asRational(known["beta"], "β")));
    const sinA = trigExact("sin", alfa);
    const sinB = trigExact("sin", beta);
    const cosA = trigExact("cos", alfa);
    const cosB = trigExact("cos", beta);
    const sumSin = addExact(sinA, sinB);
    const diffSin = subExact(sinA, sinB);
    const sumCos = addExact(cosA, cosB);
    const diffCos = subExact(cosA, cosB);
    return {
      values: [sumSin, diffSin, sumCos, diffCos],
      labels: ["sinα+sinβ", "sinα−sinβ", "cosα+cosβ", "cosα−cosβ"],
      steps: [
        {
          title: "1. Wzory (suma → iloczyn)",
          body: "\\sin\\alpha+\\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}, \\; \\sin\\alpha-\\sin\\beta = 2\\sin\\frac{\\alpha-\\beta}{2}\\cos\\frac{\\alpha+\\beta}{2}",
        },
        {
          title: "2. Wzory (cosinusy)",
          body: "\\cos\\alpha+\\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}, \\; \\cos\\alpha-\\cos\\beta = -2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}",
        },
        {
          title: "3. Wynik",
          body: `\\sin\\alpha+\\sin\\beta = ${show(sumSin, places)}, \\; \\sin\\alpha-\\sin\\beta = ${show(diffSin, places)}, \\; \\cos\\alpha+\\cos\\beta = ${show(sumCos, places)}, \\; \\cos\\alpha-\\cos\\beta = ${show(diffCos, places)}`,
        },
      ],
    };
  },
};

const rownanieTryg: FormulaDef = {
  id: "rownanie-trygonometryczne",
  subject: "matematyka",
  topic: "Trygonometria · ROZSZ",
  name: "Równanie trygonometryczne",
  latex: "\\sin x = a, \\; \\cos x = a, \\; \\operatorname{tg} x = a",
  vars: [
    { id: "fn", label: "funkcja", kind: "select", options: ["sin", "cos", "tg"] },
    { id: "a", label: "a" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "rozwiązanie",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const fn = selects?.["fn"] ?? "sin";
    const av = approx(known["a"]);
    let deg: number;
    if (fn === "sin") {
      if (Math.abs(av) > 1) throw new Error("|a| ≤ 1 dla sinusa");
      deg = (Math.asin(av) * 180) / Math.PI;
    } else if (fn === "cos") {
      if (Math.abs(av) > 1) throw new Error("|a| ≤ 1 dla cosinusa");
      deg = (Math.acos(av) * 180) / Math.PI;
    } else {
      deg = (Math.atan(av) * 180) / Math.PI;
    }
    const degTxt = trimNum(deg);
    const fname = fn === "sin" ? "\\sin" : fn === "cos" ? "\\cos" : "\\operatorname{tg}";
    let sol: string;
    if (fn === "sin")
      sol = `x = ${degTxt}^\\circ + 360^\\circ k \\;\\lor\\; x = ${trimNum(180 - deg)}^\\circ + 360^\\circ k`;
    else if (fn === "cos") sol = `x = \\pm ${degTxt}^\\circ + 360^\\circ k`;
    else sol = `x = ${degTxt}^\\circ + 180^\\circ k`;
    return {
      values: [],
      steps: [
        {
          title: "1. Kąt podstawowy",
          body: `${fname} x = ${formatLatex(known["a"])} \\Rightarrow x_0 = ${degTxt}^\\circ`,
        },
        { title: "2. Rozwiązanie", body: sol, note: "k ∈ ℤ" },
      ],
    };
  },
};

export const MATH_TRYGONOMETRIA2: FormulaDef[] = [
  trygPunkt,
  tangensSumy,
  sumyIloczyny,
  rownanieTryg,
];
