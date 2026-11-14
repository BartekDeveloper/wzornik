import { ONE, ZERO, add, cmp, div, isZero, mul, neg, sub } from "../exact/rational";
import { approx, divExact, exactOf, mulRat, sqrtRational, trigExact } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const CW = ["I (0–90°)", "II (90–180°)", "III (180–270°)", "IV (270–360°)"];

const jedynka: FormulaDef = {
  id: "jedynka-trygonometryczna",
  subject: "matematyka",
  topic: "Trygonometria",
  name: "Funkcje trygonometryczne z ćwiartki",
  latex:
    "\\sin^2\\alpha + \\cos^2\\alpha = 1, \\; \\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}, \\; \\operatorname{ctg}\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}",
  vars: [
    { id: "fn", label: "co znasz", kind: "select", options: ["sin α", "cos α", "tg α", "ctg α"] },
    { id: "cw", label: "ćwiartka", kind: "select", options: CW },
    { id: "v", label: "wartość (np. 1/2)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "funkcje",
  solve(_unknown, known, places, selects): FormulaSolution {
    const fn = selects?.["fn"] ?? "sin α";
    const cw = selects?.["cw"] ?? CW[0]!;
    const v = asRational(known["v"], "wartość");
    const q = CW.indexOf(cw);
    const signSin = q === 0 || q === 1;
    const signCos = q === 0 || q === 3;
    const signTg = q === 0 || q === 2;
    const sgn = (e: Exact, pos: boolean): Exact => (pos ? e : mulRat(e, neg(ONE)));

    let sin: Exact;
    let cos: Exact;
    if (fn === "sin α") {
      sin = exactOf(v);
      cos = sgn(sqrtRational(sub(ONE, mul(v, v))), signCos);
    } else if (fn === "cos α") {
      cos = exactOf(v);
      sin = sgn(sqrtRational(sub(ONE, mul(v, v))), signSin);
    } else {
      if (fn === "ctg α" && isZero(v)) throw new Error("ctg nie istnieje dla kąta 0° lub 180°");
      const t = fn === "tg α" ? v : div(ONE, v);
      const den = sqrtRational(add(ONE, mul(t, t)));
      const cosAbs = divExact(exactOf(ONE), den);
      cos = sgn(cosAbs, signCos);
      sin = sgn(mulRat(cosAbs, cmp(t, ZERO) < 0 ? neg(t) : t), signSin);
    }

    const cosZero = isZero(cos.rat) && !cos.irr;
    const sinZero = isZero(sin.rat) && !sin.irr;
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };

    const values: Exact[] = [sin, cos];
    const labels: string[] = ["sin α", "cos α"];
    const results: string[] = [`\\sin\\alpha = ${show(sin)}`, `\\cos\\alpha = ${show(cos)}`];
    let note: string | undefined;
    if (!cosZero) {
      values.push(divExact(sin, cos));
      labels.push("tg α");
      results.push(`\\operatorname{tg}\\alpha = ${show(values[values.length - 1]!)}`);
    } else {
      note = "tg α nie istnieje (cos α = 0)";
    }
    if (!sinZero) {
      values.push(divExact(cos, sin));
      labels.push("ctg α");
      results.push(`\\operatorname{ctg}\\alpha = ${show(values[values.length - 1]!)}`);
    } else {
      note = note ? `${note}; ctg α nie istnieje (sin α = 0)` : "ctg α nie istnieje (sin α = 0)";
    }

    return {
      values,
      labels,
      steps: [
        { title: "1. Jedynka trygonometryczna", body: "\\sin^2\\alpha + \\cos^2\\alpha = 1" },
        {
          title: "2. Znaki w ćwiartce",
          body: `\\sin${signSin ? ">0" : "<0"}, \\; \\cos${signCos ? ">0" : "<0"}, \\; \\operatorname{tg}${signTg ? ">0" : "<0"}`,
          note: `ćwiartka ${["I", "II", "III", "IV"][q]}`,
        },
        { title: "3. Wynik", body: results.join(", \\; "), note },
      ],
    };
  },
};

const wzoryRedukcyjne: FormulaDef = {
  id: "wzory-redukcyjne",
  subject: "matematyka",
  topic: "Trygonometria",
  name: "Wzory redukcyjne",
  latex:
    "\\sin(180^\\circ-\\alpha)=\\sin\\alpha, \\; \\cos(180^\\circ+\\alpha)=-\\cos\\alpha, \\; \\operatorname{tg}(180^\\circ+\\alpha)=\\operatorname{tg}\\alpha",
  vars: [
    { id: "fn", label: "funkcja", kind: "select", options: ["sin", "cos", "tg"] },
    { id: "a", label: "α [°]" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wartość",
  solve(_unknown, known, places, selects): FormulaSolution {
    const fn = (selects?.["fn"] ?? "sin") as "sin" | "cos" | "tg";
    const deg = approx(known["a"]);
    const d = ((deg % 360) + 360) % 360;
    const ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
    const q = d <= 90 ? 1 : d <= 180 ? 2 : d <= 270 ? 3 : 4;
    const value = trigExact(fn, deg);
    const fname = fn === "sin" ? "\\sin" : fn === "cos" ? "\\cos" : "\\operatorname{tg}";
    const sign =
      fn === "sin"
        ? q === 2
          ? "+"
          : q === 3 || q === 4
            ? "-"
            : ""
        : fn === "cos"
          ? q === 2 || q === 3
            ? "-"
            : q === 4
              ? "+"
              : ""
          : q === 2 || q === 4
            ? "-"
            : q === 3
              ? "+"
              : "";
    let rule: string;
    if (q === 1) rule = `${fname} ${trimNum(d)}^\\circ = ${fname} ${trimNum(ref)}^\\circ`;
    else if (q === 2)
      rule = `${fname} ${trimNum(d)}^\\circ = ${fname}(180^\\circ - ${trimNum(ref)}^\\circ)`;
    else if (q === 3)
      rule = `${fname} ${trimNum(d)}^\\circ = ${fname}(180^\\circ + ${trimNum(ref)}^\\circ)`;
    else rule = `${fname} ${trimNum(d)}^\\circ = ${fname}(360^\\circ - ${trimNum(ref)}^\\circ)`;
    const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
    return {
      values: [value],
      steps: [
        {
          title: "1. Kąt i ćwiartka",
          body: `${trimNum(d)}^\\circ`,
          note: `ćwiartka ${["I", "II", "III", "IV"][q - 1]}`,
        },
        { title: "2. Kąt odniesienia", body: `\\alpha_0 = ${trimNum(ref)}^\\circ` },
        { title: "3. Redukcja", body: `${rule} = ${sign}${fname} ${trimNum(ref)}^\\circ` },
        {
          title: "4. Wynik",
          body: resultLatex(`${fname} ${trimNum(d)}^\\circ`, value, places),
          note,
        },
      ],
    };
  },
};

export const MATH_TRYGONOMETRIA: FormulaDef[] = [jedynka, wzoryRedukcyjne];
