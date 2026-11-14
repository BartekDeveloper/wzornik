import { ZERO, add, cmp, div, mul, of, sub } from "../exact/rational";
import { approx, divExact, exactOf, mulRat, sqrtRational, trigExact } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const poleTrojkataPromienie: FormulaDef = {
  id: "pole-trojkata-promienie",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Pole trójkąta a promienie (p, r, R)",
  latex: "P = p \\cdot r = \\frac{abc}{4R}, \\; p = \\frac{a+b+c}{2}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "p, P, r, R",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (cmp(a, ZERO) <= 0 || cmp(b, ZERO) <= 0 || cmp(c, ZERO) <= 0)
      throw new Error("boki muszą być dodatnie");
    const p = div(add(add(a, b), c), of(2));
    if (cmp(sub(p, a), ZERO) <= 0 || cmp(sub(p, b), ZERO) <= 0 || cmp(sub(p, c), ZERO) <= 0)
      throw new Error("boki nie spełniają nierówności trójkąta");
    const prod = mul(mul(mul(p, sub(p, a)), sub(p, b)), sub(p, c));
    const P = sqrtRational(prod);
    const r = divExact(P, exactOf(p));
    const R = divExact(exactOf(mul(mul(a, b), c)), mulRat(P, of(4)));
    return {
      values: [exactOf(p), P, r, R],
      labels: ["p", "P", "r", "R"],
      steps: [
        {
          title: "1. Połowa obwodu",
          body: `p = \\frac{a+b+c}{2} = \\frac{${L(a)}+${L(b)}+${L(c)}}{2} = ${show(exactOf(p), places)}`,
        },
        {
          title: "2. Wzór Herona",
          body: `P = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{${L(prod)}} = ${show(P, places)}`,
        },
        { title: "3. Promień okręgu wpisanego", body: `r = \\frac{P}{p} = ${show(r, places)}` },
        { title: "4. Promień okręgu opisanego", body: `R = \\frac{abc}{4P} = ${show(R, places)}` },
        {
          title: "5. Sprawdzenie",
          body: `P = p \\cdot r = ${show(exactOf(p), places)} \\cdot ${show(r, places)} = ${show(P, places)}`,
        },
      ],
    };
  },
};

const poleCzworokataSinus: FormulaDef = {
  id: "pole-czworokata-sinus",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Pole równoległoboku i czworokąta z przekątnych",
  latex: "P = ab\\sin\\alpha, \\; P = \\frac{1}{2}d_1 d_2 \\sin\\gamma",
  vars: [
    { id: "typ", label: "rodzaj", kind: "select", options: ["rownoleglobok", "przekatne"] },
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "gamma", label: "kąt [°]" },
  ],
  mode: "fixed",
  outputId: "P",
  outputLabel: "P",
  solve(_unknown, known, places, selects): FormulaSolution {
    const typ = selects?.["typ"] ?? "rownoleglobok";
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const gamma = asRational(known["gamma"], "kąt");
    const sinE = trigExact("sin", approx(exactOf(gamma)));
    const half = typ === "przekatne";
    const P = mulRat(sinE, half ? div(mul(a, b), of(2)) : mul(a, b));
    return {
      values: [P],
      steps: [
        {
          title: "1. Wzór",
          body: half ? "P = \\frac{1}{2}d_1 d_2 \\sin\\gamma" : "P = ab\\sin\\alpha",
        },
        {
          title: "2. Podstawienie danych",
          body: half
            ? `P = \\frac{1}{2} \\cdot ${L(a)} \\cdot ${L(b)} \\cdot \\sin${L(gamma)}^\\circ`
            : `P = ${L(a)} \\cdot ${L(b)} \\cdot \\sin${L(gamma)}^\\circ`,
        },
        { title: "3. Wynik", body: resultLatex("P", P, places) },
      ],
    };
  },
};

const czworokatOkrag: FormulaDef = {
  id: "czworokat-okrag",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Czworokąt wpisany w okrąg (Brahmagupta)",
  latex: "P = \\sqrt{(p-a)(p-b)(p-c)(p-d)}, \\; a+c = b+d \\; (\\text{opisany})",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "p, P",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const d = asRational(known["d"], "d");
    if (cmp(a, ZERO) <= 0 || cmp(b, ZERO) <= 0 || cmp(c, ZERO) <= 0 || cmp(d, ZERO) <= 0)
      throw new Error("boki muszą być dodatnie");
    const p = div(add(add(add(a, b), c), d), of(2));
    const prod = mul(mul(mul(p, sub(p, a)), sub(p, b)), mul(sub(p, c), sub(p, d)));
    if (cmp(prod, ZERO) < 0)
      throw new Error("boki nie tworzą czworokątu (jeden bok ≥ suma pozostałych)");
    const P = sqrtRational(prod);
    const pitot = cmp(add(a, c), add(b, d)) === 0;
    return {
      values: [exactOf(p), P],
      labels: ["p", "P"],
      steps: [
        { title: "1. Połowa obwodu", body: `p = \\frac{a+b+c+d}{2} = ${show(exactOf(p), places)}` },
        {
          title: "2. Wzór Brahmaguptey",
          body: `P = \\sqrt{(p-a)(p-b)(p-c)(p-d)} = \\sqrt{${L(prod)}} = ${show(P, places)}`,
          note: "czworokąt wpisany w okrąg",
        },
        {
          title: "3. Warunek czworokąta opisanego",
          body: pitot
            ? `a+c = b+d = ${L(add(a, c))}`
            : `a+c = ${L(add(a, c))} \\neq b+d = ${L(add(b, d))}`,
          note: pitot ? "istnieje okrąg wpisany (warunek Pitota)" : "brak okręgu wpisanego",
        },
      ],
    };
  },
};

const podobneSkale: FormulaDef = {
  id: "pola-objetosci-podobnych",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Pola i objętości figur podobnych",
  latex: "\\frac{P_2}{P_1} = k^2, \\; \\frac{V_2}{V_1} = k^3",
  vars: [{ id: "k", label: "k (skala podobieństwa)" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "k², k³",
  solve(_unknown, known, places): FormulaSolution {
    const k = asRational(known["k"], "k");
    if (cmp(k, ZERO) <= 0) throw new Error("k > 0");
    const k2 = mul(k, k);
    const k3 = mul(k2, k);
    return {
      values: [exactOf(k2), exactOf(k3)],
      labels: ["k² (pola)", "k³ (objętości)"],
      steps: [
        {
          title: "1. Stosunek pól",
          body: `\\frac{P_2}{P_1} = k^2 = ${L(k2)} \\Rightarrow P_2 = P_1 \\cdot ${show(exactOf(k2), places)}`,
        },
        {
          title: "2. Stosunek objętości",
          body: `\\frac{V_2}{V_1} = k^3 = ${L(k3)} \\Rightarrow V_2 = V_1 \\cdot ${show(exactOf(k3), places)}`,
        },
      ],
    };
  },
};

export const MATH_PLANIMETRIA2: FormulaDef[] = [
  poleTrojkataPromienie,
  poleCzworokataSinus,
  czworokatOkrag,
  podobneSkale,
];
