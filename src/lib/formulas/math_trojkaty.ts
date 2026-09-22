import { add, cmp, div, mul, of, sub } from "../exact/rational";
import {
  approx,
  approxOnly,
  divExact,
  exactOf,
  mulRat,
  sqrtRational,
  trigExact,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const twSinusow: FormulaDef = {
  id: "tw-sinusow",
  subject: "matematyka",
  topic: "Planimetria · ROZSZ",
  name: "Twierdzenie sinusów",
  latex: "\\frac{a}{\\sin\\alpha} = 2R",
  vars: [
    { id: "a", label: "a (bok)" },
    { id: "alfa", label: "α [°]" },
    { id: "R", label: "R (promień opis.)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "alfa") {
      const a = asRational(known["a"], "a");
      const R = asRational(known["R"], "R");
      const s = approx(exactOf(a)) / (2 * approx(exactOf(R)));
      if (!(Math.abs(s) <= 1)) throw new Error("a/(2R) musi być w [−1, 1]");
      const deg = (Math.asin(s) * 180) / Math.PI;
      const value = approxOnly(deg);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\sin\\alpha = \\frac{a}{2R}" },
          {
            title: "2. Podstawienie danych",
            body: `\\sin\\alpha = \\frac{${L(a)}}{2 \\cdot ${L(R)}}`,
          },
          { title: "3. Sinus", body: `\\sin\\alpha = ${trimNum(s)}` },
          {
            title: "4. Wynik",
            body: resultLatex("\\alpha", value, places),
            note: "kąt ostry (0–90°)",
          },
        ],
      };
    }
    const alfa = asRational(known["alfa"], "α");
    const deg = approx(exactOf(alfa));
    const sinE = trigExact("sin", deg);
    const note = sinE.irr?.type === "approx" ? "sinus tylko przybliżony" : undefined;
    if (unknown === "a") {
      const R = asRational(known["R"], "R");
      const twoR = mul(of(2), R);
      const value = mulRat(sinE, twoR);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a = 2R\\sin\\alpha" },
          {
            title: "2. Podstawienie danych",
            body: `a = 2 \\cdot ${L(R)} \\cdot \\sin ${L(alfa)}^\\circ`,
          },
          { title: "3. Sinus", body: `\\sin\\alpha = ${formatLatex(sinE)}` },
          { title: "4. Wynik", body: resultLatex("a", value, places), note },
        ],
      };
    }
    const a = asRational(known["a"], "a");
    const two = mulRat(sinE, of(2));
    const value = divExact(exactOf(a), two);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "R = \\frac{a}{2\\sin\\alpha}" },
        { title: "2. Podstawienie danych", body: `R = \\frac{${L(a)}}{2\\sin ${L(alfa)}^\\circ}` },
        { title: "3. Sinus", body: `\\sin\\alpha = ${formatLatex(sinE)}` },
        { title: "4. Wynik", body: resultLatex("R", value, places), note },
      ],
    };
  },
};

const twCosinusow: FormulaDef = {
  id: "tw-cosinusow",
  subject: "matematyka",
  topic: "Planimetria · ROZSZ",
  name: "Twierdzenie cosinusów",
  latex: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma",
  vars: [
    { id: "c", label: "c (bok)" },
    { id: "a", label: "a (bok)" },
    { id: "b", label: "b (bok)" },
    { id: "gamma", label: "γ [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "gamma") {
      const num = sub(add(mul(g("a"), g("a")), mul(g("b"), g("b"))), mul(g("c"), g("c")));
      const den = mul(mul(of(2), g("a")), g("b"));
      const s = approx(exactOf(num)) / approx(exactOf(den));
      if (!(Math.abs(s) <= 1)) throw new Error("cos γ poza [−1, 1] — sprawdź boki");
      const value = approxOnly((Math.acos(s) * 180) / Math.PI);
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\cos\\gamma = \\frac{a^2 + b^2 - c^2}{2ab}",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\cos\\gamma = \\frac{${L(g("a"))}^2 + ${L(g("b"))}^2 - ${L(g("c"))}^2}{2 \\cdot ${L(g("a"))} \\cdot ${L(g("b"))}}`,
          },
          { title: "3. Cosinus", body: `\\cos\\gamma = ${trimNum(s)}` },
          {
            title: "4. Wynik",
            body: resultLatex("\\gamma", value, places),
            note: "wynik w stopniach",
          },
        ],
      };
    }
    const deg = approx(exactOf(g("gamma")));
    const cosE = trigExact("cos", deg);
    if (unknown === "c") {
      let value: Exact;
      let note: string | undefined;
      try {
        if (cosE.irr) throw new Error("no-exact");
        const inner = sub(
          add(mul(g("a"), g("a")), mul(g("b"), g("b"))),
          mul(mul(mul(of(2), g("a")), g("b")), cosE.rat),
        );
        value = sqrtRational(inner);
      } catch {
        const c2 =
          approx(exactOf(g("a"))) ** 2 +
          approx(exactOf(g("b"))) ** 2 -
          2 * approx(exactOf(g("a"))) * approx(exactOf(g("b"))) * approx(cosE);
        if (!(c2 > 0)) throw new Error("c² ≤ 0 — sprawdź dane");
        value = approxOnly(Math.sqrt(c2));
        note = "wynik tylko przybliżony";
      }
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma" },
          {
            title: "2. Podstawienie danych",
            body: `c^2 = ${L(g("a"))}^2 + ${L(g("b"))}^2 - 2 \\cdot ${L(g("a"))} \\cdot ${L(g("b"))} \\cdot ${formatLatex(cosE)}`,
          },
          { title: "3. Cosinus", body: `\\cos\\gamma = ${formatLatex(cosE)}` },
          { title: "4. Wynik", body: resultLatex("c", value, places), note },
        ],
      };
    }
    const side = unknown === "a" ? "b" : "a";
    const o = g(side);
    const c = g("c");
    const B = -2 * approx(exactOf(o)) * approx(cosE);
    const C = approx(exactOf(o)) ** 2 - approx(exactOf(c)) ** 2;
    const D = B * B - 4 * C;
    if (!(D >= 0)) throw new Error("Δ < 0 — taki trójkąt nie istnieje");
    const roots = [(-B + Math.sqrt(D)) / 2, (-B - Math.sqrt(D)) / 2].filter((x) => x > 0);
    if (roots.length === 0) throw new Error("brak dodatniego rozwiązania — sprawdź dane");
    const values = roots.map((x) => approxOnly(x));
    return {
      values,
      labels: roots.map((_, i) => `${unknown}${i + 1}`),
      steps: [
        {
          title: "1. Równanie kwadratowe",
          body: `${unknown}^2 - (2${side}\\cos\\gamma)${unknown} + (${side}^2 - c^2) = 0`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${unknown}^2 - ${trimNum(B === 0 ? 0 : -B)}${unknown} + ${trimNum(C)} = 0, \\; \\cos\\gamma = ${formatLatex(cosE)}`,
        },
        { title: "3. Delta", body: `\\Delta = ${trimNum(D)}` },
        {
          title: "4. Wynik",
          body: values.map((v, i) => resultLatex(`${unknown}${i + 1}`, v, places)).join(", \\; "),
          note: "biorę pierwiastki dodatnie (długości boków)",
        },
      ],
    };
  },
};

const okregi: FormulaDef = {
  id: "okrag-opisany-wpisany",
  subject: "matematyka",
  topic: "Planimetria · ROZSZ",
  name: "Okrąg opisany i wpisany",
  latex: "R = \\frac{abc}{4P}, \\; r = \\frac{P}{p}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "Rr",
  outputLabel: "R, r",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const [a, b, c] = [g("a"), g("b"), g("c")];
    if (cmp(add(a, b), c) <= 0 || cmp(add(a, c), b) <= 0 || cmp(add(b, c), a) <= 0) {
      throw new Error("trójkąt nie istnieje (nierówność trójkąta)");
    }
    const p = div(add(add(a, b), c), of(2));
    const pa = sub(p, a);
    const pb = sub(p, b);
    const pc = sub(p, c);
    const prod = mul(mul(mul(p, pa), pb), pc);
    let P: Exact;
    let note: string | undefined;
    try {
      P = sqrtRational(prod);
    } catch {
      P = approxOnly(Math.sqrt(approx(exactOf(prod))));
      note = "pierwiastek tylko przybliżony";
    }
    const abc = mul(mul(a, b), c);
    const Rv = divExact({ rat: abc, irr: null }, mulRat(P, of(4)));
    const rv = divExact(P, { rat: p, irr: null });
    return {
      values: [Rv, rv],
      labels: ["R", "r"],
      steps: [
        { title: "1. Półobwód", body: `p = \\frac{${L(a)}+${L(b)}+${L(c)}}{2} = ${L(p)}` },
        {
          title: "2. Heron",
          body: `P = \\sqrt{p(p-a)(p-b)(p-c)} = ${formatLatex(P)}`,
        },
        {
          title: "3. Promień opisany",
          body: `R = \\frac{abc}{4P} = \\frac{${L(a)}${L(b)}${L(c)}}{4 \\cdot ${formatLatex(P)}}`,
        },
        {
          title: "4. Wynik",
          body: `${resultLatex("R", Rv, places)}, \\; ${resultLatex("r", rv, places)}`,
          note,
        },
      ],
    };
  },
};

export const MATH_TROJKATY: FormulaDef[] = [twSinusow, twCosinusow, okregi];
