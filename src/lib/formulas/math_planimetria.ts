import { ZERO, add, cmp, div, isZero, mul, of } from "../exact/rational";
import {
  approx,
  approxOnly,
  divExact,
  exactOf,
  mulRat,
  sqrtRational,
  subExact,
  trigExact,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const poleTrojkataSinus: FormulaDef = {
  id: "pole-trojkata-sinus",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Pole trójkąta z sinusa kąta",
  latex: "P = \\frac{1}{2}ab\\sin\\gamma",
  vars: [
    { id: "P", label: "P (pole)" },
    { id: "a", label: "a (bok)" },
    { id: "b", label: "b (bok)" },
    { id: "gamma", label: "γ [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const gamma = asRational(known["gamma"], "γ");
      const sinE = trigExact("sin", approx(exactOf(gamma)));
      const P = mulRat(sinE, div(mul(a, b), of(2)));
      return {
        values: [P],
        steps: [
          { title: "1. Wzór", body: "P = \\frac{1}{2}ab\\sin\\gamma" },
          {
            title: "2. Podstawienie danych",
            body: `P = \\frac{1}{2} \\cdot ${L(a)} \\cdot ${L(b)} \\cdot \\sin ${L(gamma)}^\\circ`,
          },
          { title: "3. Sinus", body: `\\sin ${L(gamma)}^\\circ = ${formatLatex(sinE)}` },
          {
            title: "4. Wynik",
            body: resultLatex("P", P, places),
            note: sinE.irr?.type === "approx" ? "sinus przybliżony" : undefined,
          },
        ],
      };
    }
    if (unknown === "gamma") {
      const P = asRational(known["P"], "P");
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      if (isZero(a) || isZero(b)) throw new Error("boki nie mogą być zerowe");
      const s = approx(exactOf(div(mul(P, of(2)), mul(a, b))));
      if (!(Math.abs(s) <= 1)) throw new Error("2P/(ab) musi być w [−1, 1] — sprawdź dane");
      const value = approxOnly((Math.asin(s) * 180) / Math.PI);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\sin\\gamma = \\frac{2P}{ab}" },
          {
            title: "2. Podstawienie danych",
            body: `\\sin\\gamma = \\frac{2 \\cdot ${L(P)}}{${L(a)} \\cdot ${L(b)}}`,
          },
          { title: "3. Sinus", body: `\\sin\\gamma = ${trimNum(s)}` },
          {
            title: "4. Wynik",
            body: resultLatex("\\gamma", value, places),
            note: "kąt ostry (0–90°) w stopniach",
          },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const other = unknown === "a" ? "b" : "a";
    const o = asRational(known[other], other);
    const gamma = asRational(known["gamma"], "γ");
    if (isZero(o)) throw new Error(`${other} nie może być zerowe`);
    const sinE = trigExact("sin", approx(exactOf(gamma)));
    const value = divExact(mulRat(exactOf(P), of(2)), mulRat(sinE, o));
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${unknown} = \\frac{2P}{${other}\\sin\\gamma}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${unknown} = \\frac{2 \\cdot ${L(P)}}{${L(o)} \\cdot \\sin ${L(gamma)}^\\circ}`,
        },
        { title: "3. Sinus", body: `\\sin ${L(gamma)}^\\circ = ${formatLatex(sinE)}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const trojkatProstokatnyRelacje: FormulaDef = {
  id: "trojkat-prostokatny-relacje",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Trójkąt prostokątny — wysokość i promienie",
  latex: "c^2=a^2+b^2, \\; h=\\frac{ab}{c}, \\; r=\\frac{a+b-c}{2}, \\; R=\\frac{c}{2}",
  vars: [
    { id: "a", label: "a (przyprostokątna)" },
    { id: "b", label: "b (przyprostokątna)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "c, h, r, R",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    if (cmp(a, ZERO) <= 0 || cmp(b, ZERO) <= 0) throw new Error("boki muszą być dodatnie");
    const c = sqrtRational(add(mul(a, a), mul(b, b)));
    const h = divExact(exactOf(mul(a, b)), c);
    const r = mulRat(subExact(exactOf(add(a, b)), c), of(1, 2));
    const R = mulRat(c, of(1, 2));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [c, h, r, R],
      labels: ["c", "h", "r", "R"],
      steps: [
        { title: "1. Przeciwprostokątna", body: `c = \\sqrt{${L(a)}^2 + ${L(b)}^2} = ${show(c)}` },
        { title: "2. Wysokość na przeciwprostokątną", body: `h = \\frac{ab}{c} = ${show(h)}` },
        { title: "3. Promień okręgu wpisanego", body: `r = \\frac{a+b-c}{2} = ${show(r)}` },
        { title: "4. Promień okręgu opisanego", body: `R = \\frac{c}{2} = ${show(R)}` },
      ],
    };
  },
};

export const MATH_PLANIMETRIA: FormulaDef[] = [poleTrojkataSinus, trojkatProstokatnyRelacje];
