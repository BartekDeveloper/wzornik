import { ONE, ZERO, add, cmp, div, isIntegerR, isZero, mul, neg, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import {
  approx,
  approxOnly,
  exactOf,
  mulRat,
  rootRational,
  solveQuadratic,
  sqrtRational,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const nonnegInt = (r: Rational, label: string): number => {
  if (!isIntegerR(r) || r.p < 0n) throw new Error(`${label} musi być liczbą całkowitą nieujemną`);
  return Number(r.p);
};

const sumaArytmetycznegoR: FormulaDef = {
  id: "suma-arytmetycznego-r",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Suma ciągu arytmetycznego (z r)",
  latex: "S_n = \\frac{2a_1 + (n-1)r}{2} \\cdot n",
  vars: [
    { id: "Sn", label: "Sₙ" },
    { id: "a1", label: "a₁" },
    { id: "r", label: "r (różnica)" },
    { id: "n", label: "n" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Sn") {
      const a1 = asRational(known["a1"], "a₁");
      const r = asRational(known["r"], "r");
      const n = requireNatural(known["n"], "n");
      const value = exactOf(div(mul(add(mul(of(2), a1), mul(of(n - 1), r)), of(n)), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Wzór", body: "S_n = \\frac{2a_1 + (n-1)r}{2} \\cdot n" },
          {
            title: "2. Podstawienie danych",
            body: `S_{${n}} = \\frac{2 \\cdot ${L(a1)} + ${n - 1} \\cdot ${L(r)}}{2} \\cdot ${n}`,
          },
          { title: "3. Wynik", body: resultLatex(`S_{${n}}`, value, places) },
        ],
      };
    }
    if (unknown === "a1") {
      const Sn = asRational(known["Sn"], "Sₙ");
      const r = asRational(known["r"], "r");
      const n = requireNatural(known["n"], "n");
      const value = exactOf(sub(div(Sn, of(n)), div(mul(of(n - 1), r), of(2))));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_1 = \\frac{S_n}{n} - \\frac{(n-1)r}{2}" },
          {
            title: "2. Podstawienie danych",
            body: `a_1 = \\frac{${L(Sn)}}{${n}} - \\frac{${n - 1} \\cdot ${L(r)}}{2}`,
          },
          { title: "3. Wynik", body: resultLatex("a_1", value, places) },
        ],
      };
    }
    if (unknown === "r") {
      const Sn = asRational(known["Sn"], "Sₙ");
      const a1 = asRational(known["a1"], "a₁");
      const n = requireNatural(known["n"], "n");
      if (n === 1) throw new Error("dla n = 1 różnica r jest dowolna");
      const value = exactOf(div(sub(div(mul(Sn, of(2)), of(n)), mul(of(2), a1)), of(n - 1)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\frac{2S_n/n - 2a_1}{n-1}" },
          {
            title: "2. Podstawienie danych",
            body: `r = \\frac{2 \\cdot ${L(Sn)}/${n} - 2 \\cdot ${L(a1)}}{${n - 1}}`,
          },
          { title: "3. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    }
    const Sn = asRational(known["Sn"], "Sₙ");
    const a1 = asRational(known["a1"], "a₁");
    const r = asRational(known["r"], "r");
    const A = r;
    const B = sub(mul(of(2), a1), r);
    const C = neg(mul(of(2), Sn));
    const q = solveQuadratic(A, B, C);
    if (q.kind === "none")
      return {
        values: [],
        steps: [
          { title: "1. Równanie", body: `r n^2 + (2a_1 - r) n - 2S_n = 0` },
          { title: "2. Wynik", body: "\\varnothing", note: "brak naturalnego n" },
        ],
      };
    if (q.kind === "linear") {
      const n = q.roots[0];
      if (!n.irr && n.rat.q === 1n && n.rat.p > 0n) {
        return {
          values: [n],
          steps: [
            { title: "1. Równanie liniowe", body: `2a_1 n = 2S_n` },
            { title: "2. Wynik", body: resultLatex("n", n, places) },
          ],
        };
      }
      return {
        values: [],
        steps: [{ title: "1. Wynik", body: "\\varnothing", note: "brak naturalnego n" }],
      };
    }
    const roots = q.roots.filter((n) => !n.irr && n.rat.q === 1n && n.rat.p > 0n);
    if (roots.length === 0) {
      return {
        values: [],
        steps: [
          { title: "1. Równanie kwadratowe", body: `r n^2 + (2a_1 - r) n - 2S_n = 0` },
          { title: "2. Wynik", body: "\\varnothing", note: "brak naturalnego n" },
        ],
      };
    }
    return {
      values: roots,
      labels: roots.map((_, i) => `n${i + 1}`),
      steps: [
        { title: "1. Równanie kwadratowe", body: `r n^2 + (2a_1 - r) n - 2S_n = 0` },
        {
          title: "2. Pierwiastki",
          body: roots.map((n, i) => `n_{${i + 1}} = ${show(n, places)}`).join(", \\; "),
        },
        {
          title: "3. Wynik",
          body: roots.map((n, i) => resultLatex(`n_{${i + 1}}`, n, places)).join(", \\; "),
        },
      ],
    };
  },
};

const sasiednieArytmetyczny: FormulaDef = {
  id: "sasiednie-arytmetyczny",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Trzy kolejne wyrazy ciągu arytmetycznego",
  latex: "a_n = \\frac{a_{n-1} + a_{n+1}}{2}",
  vars: [
    { id: "anm1", label: "a_{n−1}" },
    { id: "an", label: "a_n" },
    { id: "anp1", label: "a_{n+1}" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "an") {
      const anm1 = asRational(known["anm1"], "a_{n−1}");
      const anp1 = asRational(known["anp1"], "a_{n+1}");
      const value = exactOf(div(add(anm1, anp1), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_n = \\frac{a_{n-1} + a_{n+1}}{2}" },
          { title: "2. Podstawienie danych", body: `a_n = \\frac{${L(anm1)} + ${L(anp1)}}{2}` },
          { title: "3. Wynik", body: resultLatex("a_n", value, places) },
        ],
      };
    }
    const an = asRational(known["an"], "a_n");
    const other = unknown === "anm1" ? "anp1" : "anm1";
    const o = asRational(known[other], other);
    const value = exactOf(sub(mul(of(2), an), o));
    const sym = unknown === "anm1" ? "a_{n-1}" : "a_{n+1}";
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${sym} = 2a_n - a_{${unknown === "anm1" ? "n+1" : "n-1"}}`,
        },
        { title: "2. Podstawienie danych", body: `${sym} = 2 \\cdot ${L(an)} - ${L(o)}` },
        { title: "3. Wynik", body: resultLatex(sym, value, places) },
      ],
    };
  },
};

const sasiednieGeometryczny: FormulaDef = {
  id: "sasiednie-geometryczny",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Trzy kolejne wyrazy ciągu geometrycznego",
  latex: "a_n^2 = a_{n-1} \\cdot a_{n+1}",
  vars: [
    { id: "anm1", label: "a_{n−1}" },
    { id: "an", label: "a_n" },
    { id: "anp1", label: "a_{n+1}" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "an") {
      const anm1 = asRational(known["anm1"], "a_{n−1}");
      const anp1 = asRational(known["anp1"], "a_{n+1}");
      const prod = mul(anm1, anp1);
      if (cmp(prod, ZERO) < 0) throw new Error("iloczyn sąsiednich wyrazów nie może być ujemny");
      const sq = sqrtRational(prod);
      const minus = mulRat(sq, neg(ONE));
      return {
        values: [minus, sq],
        labels: ["aₙ (−)", "aₙ (+)"],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a_n = \\pm\\sqrt{a_{n-1} \\cdot a_{n+1}}" },
          { title: "2. Iloczyn", body: `a_{n-1} \\cdot a_{n+1} = ${L(prod)}` },
          {
            title: "3. Wynik",
            body: `${resultLatex("a_n", minus, places)}, \\; ${resultLatex("a_n", sq, places)}`,
            note: "dwa możliwe znaki",
          },
        ],
      };
    }
    const an = asRational(known["an"], "a_n");
    const other = unknown === "anm1" ? "anp1" : "anm1";
    const o = asRational(known[other], other);
    if (isZero(o)) throw new Error("dzielenie przez zero — sprawdź dane");
    const value = exactOf(div(mul(an, an), o));
    const sym = unknown === "anm1" ? "a_{n-1}" : "a_{n+1}";
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${sym} = \\frac{a_n^2}{a_{${unknown === "anm1" ? "n+1" : "n-1"}}}`,
        },
        { title: "2. Podstawienie danych", body: `${sym} = \\frac{${L(an)}^2}{${L(o)}}` },
        { title: "3. Wynik", body: resultLatex(sym, value, places) },
      ],
    };
  },
};

const ciagZDwochWyrazow: FormulaDef = {
  id: "ciag-z-dwoch-wyrazow",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Wyraz ciągu z dwóch danych wyrazów",
  latex: "a_n = a_k + (n-k)r, \\; a_n = a_k \\cdot q^{n-k}",
  vars: [
    { id: "typ", label: "rodzaj", kind: "select", options: ["arytmetyczny", "geometryczny"] },
    { id: "ak", label: "a_k" },
    { id: "an", label: "a_n" },
    { id: "k", label: "k" },
    { id: "n", label: "n" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "r / q",
  solve(_unknown, known, places, selects): FormulaSolution {
    const typ = selects?.["typ"] ?? "arytmetyczny";
    const ak = asRational(known["ak"], "a_k");
    const an = asRational(known["an"], "a_n");
    const k = nonnegInt(asRational(known["k"], "k"), "k");
    const n = requireNatural(known["n"], "n");
    if (n === k) throw new Error("n ≠ k");
    if (typ === "arytmetyczny") {
      const value = exactOf(div(sub(an, ak), of(n - k)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\frac{a_n - a_k}{n - k}" },
          { title: "2. Podstawienie danych", body: `r = \\frac{${L(an)} - ${L(ak)}}{${n} - ${k}}` },
          { title: "3. Wynik", body: resultLatex("r", value, places) },
        ],
      };
    }
    if (isZero(ak)) throw new Error("a_k ≠ 0 — inaczej iloraz nieokreślony");
    const ratio = div(an, ak);
    let value: Exact;
    let note: string | undefined;
    try {
      value = rootRational(ratio, n - k);
    } catch {
      const rf = approx(exactOf(ratio));
      if (!(rf > 0)) throw new Error("iloraz rzeczywisty wymaga a_n/a_k > 0");
      value = approxOnly(rf ** (1 / (n - k)));
      note = "wynik tylko przybliżony";
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `q = \\sqrt[${n - k}]{a_n/a_k}` },
        { title: "2. Podstawienie danych", body: `q = \\sqrt[${n - k}]{${L(an)}/${L(ak)}}` },
        { title: "3. Ułamek", body: `a_n/a_k = ${L(ratio)}` },
        { title: "4. Wynik", body: resultLatex("q", value, places), note },
      ],
    };
  },
};

const granicaWymierna: FormulaDef = {
  id: "granica-wymierna",
  subject: "matematyka",
  topic: "Granice · ROZSZ",
  name: "Granica ciągu wymiernego",
  latex: "\\lim_{n\\to\\infty} \\frac{a n^p}{b n^q}",
  vars: [
    { id: "a", label: "a (licznik)" },
    { id: "p", label: "p (stopień licznika)" },
    { id: "b", label: "b (mianownik)" },
    { id: "q", label: "q (stopień mianownika)" },
  ],
  mode: "fixed",
  outputId: "g",
  outputLabel: "granica",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const p = nonnegInt(asRational(known["p"], "p"), "p");
    const q = nonnegInt(asRational(known["q"], "q"), "q");
    if (isZero(a) || isZero(b)) throw new Error("współczynniki niezerowe");
    let body: string;
    let note: string | undefined;
    let values: Exact[] = [];
    if (p < q) {
      body = "0";
      note = "stopień licznika mniejszy od stopnia mianownika";
    } else if (p === q) {
      const v = exactOf(div(a, b));
      values = [v];
      body = `${L(a)}/${L(b)} = ${formatLatex(v)}`;
      note = "stopnie równe — granica to iloraz współczynników";
    } else {
      const up = cmp(mul(a, b), ZERO) > 0;
      body = up ? "+\\infty" : "-\\infty";
      note = "stopień licznika większy — rozbieżność";
    }
    return {
      values,
      steps: [
        { title: "1. Porównanie stopni", body: `p = ${p}, \\; q = ${q}` },
        {
          title: "2. Wynik",
          body: `\\lim_{n\\to\\infty} \\frac{${L(a)} n^{${p}}}{${L(b)} n^{${q}}} = ${body}`,
          note,
        },
      ],
    };
  },
};

const monotonicznoscCiagu: FormulaDef = {
  id: "monotonicznosc-ciagu",
  subject: "matematyka",
  topic: "Ciągi",
  name: "Monotoniczność ciągu",
  latex: "a_{n+1} - a_n",
  vars: [
    { id: "typ", label: "rodzaj", kind: "select", options: ["arytmetyczny", "geometryczny"] },
    { id: "a1", label: "a₁", showIf: { select: "typ", values: ["geometryczny"] } },
    { id: "q", label: "q", showIf: { select: "typ", values: ["geometryczny"] } },
    { id: "r", label: "r", showIf: { select: "typ", values: ["arytmetyczny"] } },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "werdykt",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const typ = selects?.["typ"] ?? "arytmetyczny";
    let body: string;
    let note: string | undefined;
    if (typ === "arytmetyczny") {
      const r = asRational(known["r"], "r");
      const c = cmp(r, ZERO);
      if (c > 0) {
        body = "r > 0";
        note = "ciąg rosnący";
      } else if (c < 0) {
        body = "r < 0";
        note = "ciąg malejący";
      } else {
        body = "r = 0";
        note = "ciąg stały";
      }
      return {
        values: [],
        steps: [
          { title: "1. Różnica", body: `a_{n+1} - a_n = r = ${L(r)}` },
          { title: "2. Wynik", body, note },
        ],
      };
    }
    const a1 = asRational(known["a1"], "a₁");
    const q = asRational(known["q"], "q");
    if (cmp(q, ZERO) === 0) {
      body = "q = 0";
      note = "od drugiego wyrazu same zera";
    } else if (cmp(q, ZERO) < 0) {
      body = "q < 0";
      note = "wyrazy naprzemienne — ciąg niemonotoniczny";
    } else if (cmp(sub(q, ONE), ZERO) === 0) {
      body = "q = 1";
      note = "ciąg stały";
    } else if (cmp(sub(q, ONE), ZERO) > 0) {
      body = `q > 1, \\; a_1 ${cmp(a1, ZERO) > 0 ? "> 0" : "< 0"}`;
      note = cmp(a1, ZERO) > 0 ? "ciąg rosnący" : "ciąg malejący";
    } else {
      body = `0 < q < 1, \\; a_1 ${cmp(a1, ZERO) > 0 ? "> 0" : "< 0"}`;
      note = cmp(a1, ZERO) > 0 ? "ciąg malejący" : "ciąg rosnący";
    }
    return {
      values: [],
      steps: [
        {
          title: "1. Iloraz",
          body: `\\frac{a_{n+1}}{a_n} = q = ${L(q)}`,
        },
        { title: "2. Wynik", body, note },
      ],
    };
  },
};

export const MATH_CIAGI: FormulaDef[] = [
  sumaArytmetycznegoR,
  sasiednieArytmetyczny,
  sasiednieGeometryczny,
  ciagZDwochWyrazow,
  granicaWymierna,
  monotonicznoscCiagu,
];
