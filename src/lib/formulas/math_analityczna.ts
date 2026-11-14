import { ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import { exactOf, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const wektory: FormulaDef = {
  id: "wektory-analityczna",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Wektory: długość, iloczyn skalarny, ⊥ i ∥",
  latex:
    "|\\\\vec{u}| = \\\\sqrt{x^2+y^2}, \\\\; \\\\vec{u}\\\\cdot\\\\vec{v} = x_1x_2+y_1y_2, \\\\; \\\\bot: \\\\vec{u}\\\\cdot\\\\vec{v} = 0, \\\\; \\\\parallel: x_1y_2 - x_2y_1 = 0",
  vars: [
    { id: "x1", label: "u = (x₁, y₁) → x₁" },
    { id: "y1", label: "u → y₁" },
    { id: "x2", label: "v = (x₂, y₂) → x₂" },
    { id: "y2", label: "v → y₂" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "|u|, |v|, u·v",
  solve(_unknown, known, places): FormulaSolution {
    const x1 = asRational(known["x1"], "x₁");
    const y1 = asRational(known["y1"], "y₁");
    const x2 = asRational(known["x2"], "x₂");
    const y2 = asRational(known["y2"], "y₂");
    const lu = sqrtRational(add(mul(x1, x1), mul(y1, y1)));
    const lv = sqrtRational(add(mul(x2, x2), mul(y2, y2)));
    const dot = add(mul(x1, x2), mul(y1, y2));
    const cross = sub(mul(x1, y2), mul(x2, y1));
    const perp = isZero(dot);
    const par = isZero(cross);
    const sum = `${isZero(dot) ? "0" : show(exactOf(dot), places)}`;
    return {
      values: [lu, lv, exactOf(dot)],
      labels: ["|u|", "|v|", "u·v"],
      steps: [
        {
          title: "1. Długości",
          body: `|\\\\vec{u}| = \\\\sqrt{${L(x1)}^2+${L(y1)}^2} = ${show(lu, places)}, \\\\; |\\\\vec{v}| = \\\\sqrt{${L(x2)}^2+${L(y2)}^2} = ${show(lv, places)}`,
        },
        {
          title: "2. Iloczyn skalarny",
          body: `\\\\vec{u}\\\\cdot\\\\vec{v} = ${L(x1)}\\\\cdot${L(x2)} + ${L(y1)}\\\\cdot${L(y2)} = ${sum}`,
        },
        {
          title: "3. Prostopadłość i równoległość",
          body: perp
            ? "\\\\vec{u}\\\\cdot\\\\vec{v} = 0 \\\\Rightarrow \\\\vec{u}\\\\perp\\\\vec{v}"
            : `\\\\vec{u}\\\\cdot\\\\vec{v} = ${sum} \\\\neq 0 \\\\Rightarrow \\\\vec{u}\\\\not\\\\perp\\\\vec{v}`,
          note: par
            ? "x₁y₂−x₂y₁ = 0 — wektory równoległe"
            : `x₁y₂−x₂y₁ = ${show(exactOf(cross), places)} — wektory nie są równoległe`,
        },
      ],
    };
  },
};

const poleTrojkataPunkty: FormulaDef = {
  id: "pole-trojkata-analitycznie",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Pole trójkąta z współrzędnych wierzchołków",
  latex: "P = \\\\frac{1}{2}|x_A(y_B-y_C) + x_B(y_C-y_A) + x_C(y_A-y_B)|",
  vars: [
    { id: "xA", label: "A → x" },
    { id: "yA", label: "A → y" },
    { id: "xB", label: "B → x" },
    { id: "yB", label: "B → y" },
    { id: "xC", label: "C → x" },
    { id: "yC", label: "C → y" },
  ],
  mode: "fixed",
  outputId: "P",
  outputLabel: "P",
  solve(_unknown, known, places): FormulaSolution {
    const xA = asRational(known["xA"], "x_A");
    const yA = asRational(known["yA"], "y_A");
    const xB = asRational(known["xB"], "x_B");
    const yB = asRational(known["yB"], "y_B");
    const xC = asRational(known["xC"], "x_C");
    const yC = asRational(known["yC"], "y_C");
    const w = add(add(mul(xA, sub(yB, yC)), mul(xB, sub(yC, yA))), mul(xC, sub(yA, yB)));
    if (isZero(w)) throw new Error("punkty są współliniowe — pole = 0");
    const P = cmp(w, ZERO) > 0 ? w : neg(w);
    const Pval = div(P, of(2));
    return {
      values: [exactOf(Pval)],
      steps: [
        { title: "1. Wyznacznik", body: `x_A(y_B-y_C)+x_B(y_C-y_A)+x_C(y_A-y_B) = ${L(P)}` },
        {
          title: "2. Pole",
          body: `P = \\\\frac{1}{2}\\\\left|${L(P)}\\\\right| = ${show(exactOf(Pval), places)}`,
          note: isZero(w) ? undefined : "punkty nie są współliniowe",
        },
      ],
    };
  },
};

const srodekCiezkosci: FormulaDef = {
  id: "srodek-ciezkosci-trojkata",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Środek ciężkości trójkąta",
  latex: "S = \\\\left(\\\\frac{x_A+x_B+x_C}{3}, \\\\; \\\\frac{y_A+y_B+y_C}{3}\\\\right)",
  vars: [
    { id: "xA", label: "A → x" },
    { id: "yA", label: "A → y" },
    { id: "xB", label: "B → x" },
    { id: "yB", label: "B → y" },
    { id: "xC", label: "C → x" },
    { id: "yC", label: "C → y" },
  ],
  mode: "fixed",
  outputId: "S",
  outputLabel: "S = (sx, sy)",
  solve(_unknown, known, places): FormulaSolution {
    const xA = asRational(known["xA"], "x_A");
    const yA = asRational(known["yA"], "y_A");
    const xB = asRational(known["xB"], "x_B");
    const yB = asRational(known["yB"], "y_B");
    const xC = asRational(known["xC"], "x_C");
    const yC = asRational(known["yC"], "y_C");
    const sx = div(add(add(xA, xB), xC), of(3));
    const sy = div(add(add(yA, yB), yC), of(3));
    return {
      values: [exactOf(sx), exactOf(sy)],
      labels: ["Sₓ", "S_y"],
      steps: [
        {
          title: "1. Współrzędna x",
          body: `S_x = \\\\frac{${L(xA)}+${L(xB)}+${L(xC)}}{3} = ${show(exactOf(sx), places)}`,
        },
        {
          title: "2. Współrzędna y",
          body: `S_y = \\\\frac{${L(yA)}+${L(yB)}+${L(yC)}}{3} = ${show(exactOf(sy), places)}`,
        },
        {
          title: "3. Wynik",
          body: `S = \\\\left(${show(exactOf(sx), places)}, \\\\; ${show(exactOf(sy), places)}\\\\right)`,
        },
      ],
    };
  },
};

const przeksztalcenia: FormulaDef = {
  id: "przeksztalcenia-geometryczne",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Przekształcenia punktu (przesunięcie, symetrie)",
  latex: "(x,y) \\\\to (x+a, y+b), \\\\; s_X: (x,-y), \\\\; s_Y: (-x,y), \\\\; s_O: (-x,-y)",
  vars: [
    {
      id: "typ",
      label: "transformacja",
      kind: "select",
      options: ["przesuniecie", "symetria os X", "symetria os Y", "symetria srodek"],
    },
    { id: "x", label: "x" },
    { id: "y", label: "y" },
    { id: "a", label: "a (przesunięcie x)" },
    { id: "b", label: "b (przesunięcie y)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "punkt po transformacji",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const typ = selects?.["typ"] ?? "przesuniecie";
    const x = asRational(known["x"], "x");
    const y = asRational(known["y"], "y");
    let nx: string;
    let ny: string;
    if (typ === "przesuniecie") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      nx = `(${L(x)}+${L(a)}) = ${L(add(x, a))}`;
      ny = `(${L(y)}+${L(b)}) = ${L(add(y, b))}`;
    } else if (typ === "symetria os X") {
      nx = `${L(x)}`;
      ny = `-(${L(y)}) = ${L(neg(y))}`;
    } else if (typ === "symetria os Y") {
      nx = `-(${L(x)}) = ${L(neg(x))}`;
      ny = `${L(y)}`;
    } else {
      nx = `-(${L(x)}) = ${L(neg(x))}`;
      ny = `-(${L(y)}) = ${L(neg(y))}`;
    }
    return {
      values: [],
      steps: [
        {
          title: "1. Przekształcenie",
          body:
            typ === "przesuniecie"
              ? "(x, y) \\\\to (x+a, \\\\; y+b)"
              : typ === "symetria os X"
                ? "s_X: \\\\; (x, y) \\\\to (x, \\\\; -y)"
                : typ === "symetria os Y"
                  ? "s_Y: \\\\; (x, y) \\\\to (-x, \\\\; y)"
                  : "s_O: \\\\; (x, y) \\\\to (-x, \\\\; -y)",
        },
        { title: "2. Wynik", body: `(x', y') = \\\\left(${nx}, \\\\; ${ny}\\\\right)` },
      ],
    };
  },
};

const prostaFormy: FormulaDef = {
  id: "prosta-przeksztalcenia",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Prosta: postać ogólna ↔ kierunkowa i przecięcia",
  latex:
    "Ax+By+C = 0 \\\\Rightarrow y = -\\\\frac{A}{B}x - \\\\frac{C}{B}, \\\\; x_0 = -\\\\frac{C}{A}, \\\\; y_0 = -\\\\frac{C}{B}",
  vars: [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "m, x₀, y₀",
  solve(_unknown, known, places): FormulaSolution {
    const A = asRational(known["A"], "A");
    const B = asRational(known["B"], "B");
    const C = asRational(known["C"], "C");
    if (isZero(A) && isZero(B)) throw new Error("A i B nie mogą być jednocześnie zerami");
    const values: Exact[] = [];
    const labels: string[] = [];
    const results: string[] = [];
    if (!isZero(B)) {
      const m = div(neg(A), B);
      const y0 = div(neg(C), B);
      values.push(exactOf(m), exactOf(y0));
      labels.push("m", "y₀");
      results.push(`y = ${show(exactOf(m), places)}x + ${show(exactOf(y0), places)}`);
    }
    if (!isZero(A)) {
      const x0 = div(neg(C), A);
      values.push(exactOf(x0));
      labels.push("x₀");
      results.push(`x_0 = ${show(exactOf(x0), places)}`);
    }
    return {
      values,
      labels,
      steps: [
        { title: "1. Postać ogólna", body: `${L(A)}x + ${L(B)}y + ${L(C)} = 0` },
        {
          title: "2. Kierunkowa",
          body: isZero(B)
            ? "B = 0 — prosta pionowa x = " + show(exactOf(div(neg(C), A)), places)
            : `y = -\\\\frac{${L(A)}}{${L(B)}}x - \\\\frac{${L(C)}}{${L(B)}} = ${results[0]}`,
        },
        {
          title: "3. Przecięcia z osiami",
          body: results.slice(1).join(", \\\\; ") || "brak (prosta równoległa do OX)",
        },
      ],
    };
  },
};

const okragOgolna: FormulaDef = {
  id: "okrag-postac-ogolna",
  subject: "matematyka",
  topic: "Geometria analityczna",
  name: "Okrąg: postać ogólna ↔ kanoniczna",
  latex:
    "x^2+y^2+Dx+Ey+F = 0 \\\\Rightarrow (x+\\\\frac{D}{2})^2 + (y+\\\\frac{E}{2})^2 = \\\\frac{D^2+E^2}{4} - F",
  vars: [
    { id: "D", label: "D" },
    { id: "E", label: "E" },
    { id: "F", label: "F" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "S, R",
  solve(_unknown, known, places): FormulaSolution {
    const D = asRational(known["D"], "D");
    const E = asRational(known["E"], "E");
    const F = asRational(known["F"], "F");
    const a = div(neg(D), of(2));
    const b = div(neg(E), of(2));
    const R2 = sub(div(add(mul(D, D), mul(E, E)), of(4)), F);
    if (cmp(R2, ZERO) < 0) throw new Error("D² + E² − 4F < 0 — nie istnieje okrąg");
    const R = sqrtRational(R2);
    return {
      values: [exactOf(a), exactOf(b), R],
      labels: ["Sₓ", "S_y", "R"],
      steps: [
        {
          title: "1. Środek",
          body: `S = \\\\left(-\\\\frac{D}{2}, -\\\\frac{E}{2}\\\\right) = \\\\left(${show(exactOf(a), places)}, \\\\; ${show(exactOf(b), places)}\\\\right)`,
        },
        {
          title: "2. Promień",
          body: `R = \\\\sqrt{\\\\frac{D^2+E^2}{4} - F} = \\\\sqrt{${show(exactOf(R2), places)}} = ${show(R, places)}`,
        },
        {
          title: "3. Postać kanoniczna",
          body: `(x ${cmp(a, ZERO) >= 0 ? "-" : "+"} ${show(exactOf(cmp(a, ZERO) >= 0 ? a : neg(a)), places)})^2 + (y ${cmp(b, ZERO) >= 0 ? "-" : "+"} ${show(exactOf(cmp(b, ZERO) >= 0 ? b : neg(b)), places)})^2 = ${show(exactOf(R2), places)}`,
        },
      ],
    };
  },
};

export const MATH_ANALITYCZNA: FormulaDef[] = [
  wektory,
  poleTrojkataPunkty,
  srodekCiezkosci,
  przeksztalcenia,
  prostaFormy,
  okragOgolna,
];
