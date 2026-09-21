import { ZERO, add, cmp, div, mul, neg, of, sub } from "../exact/rational";
import { approx, exactOf, solveQuadratic, sqrtRational } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const predkosc: FormulaDef = {
  id: "predkosc",
  subject: "fizyka",
  topic: "Kinematyka",
  name: "Prędkość w ruchu jednostajnym",
  latex: "v = \\frac{s}{t}",
  vars: [
    { id: "v", label: "v (prędkość)", unit: "m/s" },
    { id: "s", label: "s (droga)", unit: "m" },
    { id: "t", label: "t (czas)", unit: "s" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "v") {
      const s = asRational(known["s"], "s");
      const t = asRational(known["t"], "t");
      const value = exactOf(div(s, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "v = \\frac{s}{t}" },
          { title: "2. Podstawienie danych", body: `v = \\frac{${L(s)}}{${L(t)}}` },
          { title: "3. Wynik", body: resultLatex("v", value, places) },
        ],
      };
    }
    if (unknown === "s") {
      const v = asRational(known["v"], "v");
      const t = asRational(known["t"], "t");
      const value = exactOf(mul(v, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "s = v \\cdot t" },
          { title: "2. Podstawienie danych", body: `s = ${L(v)} \\cdot ${L(t)}` },
          { title: "3. Wynik", body: resultLatex("s", value, places) },
        ],
      };
    }
    const v = asRational(known["v"], "v");
    const s = asRational(known["s"], "s");
    const value = exactOf(div(s, v));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "t = \\frac{s}{v}" },
        { title: "2. Podstawienie danych", body: `t = \\frac{${L(s)}}{${L(v)}}` },
        { title: "3. Wynik", body: resultLatex("t", value, places) },
      ],
    };
  },
};

const ruchJednostajniePrzyspieszony: FormulaDef = {
  id: "droga-jednostajnie-przyspieszona",
  subject: "fizyka",
  topic: "Kinematyka",
  name: "Droga w ruchu jednostajnie przyspieszonym",
  latex: "s = v_0 t + \\frac{at^2}{2}",
  vars: [
    { id: "s", label: "s (droga)", unit: "m" },
    { id: "v0", label: "v₀ (prędkość początkowa)", unit: "m/s" },
    { id: "a", label: "a (przyspieszenie)", unit: "m/s²" },
    { id: "t", label: "t (czas)", unit: "s" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    const t = unknown === "t" ? null : asRational(known["t"], "t");
    if (unknown === "s") {
      const v0 = asRational(known["v0"], "v₀");
      const a = asRational(known["a"], "a");
      const t2 = mul(t!, t!);
      const term1 = mul(v0, t!);
      const term2 = div(mul(a, t2), of(2));
      const value = exactOf(add(term1, term2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "s = v_0 t + \\frac{at^2}{2}" },
          {
            title: "2. Podstawienie danych",
            body: `s = ${L(v0)} \\cdot ${L(t!)} + \\frac{${L(a)} \\cdot ${L(t!)}^2}{2}`,
          },
          { title: "3. Składniki", body: `v_0t = ${L(term1)}, \\; \\frac{at^2}{2} = ${L(term2)}` },
          { title: "4. Wynik", body: resultLatex("s", value, places) },
        ],
      };
    }
    if (unknown === "v0") {
      const s = asRational(known["s"], "s");
      const a = asRational(known["a"], "a");
      const t2 = mul(t!, t!);
      const term2 = div(mul(a, t2), of(2));
      const value = exactOf(div(sub(s, term2), t!));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "v_0 = \\frac{s - at^2/2}{t}" },
          {
            title: "2. Podstawienie danych",
            body: `v_0 = \\frac{${L(s)} - ${L(a)} \\cdot ${L(t!)}^2/2}{${L(t!)}}`,
          },
          { title: "3. Człon z przyspieszeniem", body: `\\frac{at^2}{2} = ${L(term2)}` },
          { title: "4. Wynik", body: resultLatex("v_0", value, places) },
        ],
      };
    }
    if (unknown === "a") {
      const s = asRational(known["s"], "s");
      const v0 = asRational(known["v0"], "v₀");
      const vt = mul(v0, t!);
      const t2 = mul(t!, t!);
      const value = exactOf(div(mul(sub(s, vt), of(2)), t2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "a = \\frac{2(s - v_0 t)}{t^2}" },
          {
            title: "2. Podstawienie danych",
            body: `a = \\frac{2(${L(s)} - ${L(v0)} \\cdot ${L(t!)})}{${L(t!)}^2}`,
          },
          { title: "3. Nawias", body: `s - v_0t = ${L(s)} - ${L(vt)} = ${L(sub(s, vt))}` },
          { title: "4. Wynik", body: resultLatex("a", value, places) },
        ],
      };
    }
    const s = asRational(known["s"], "s");
    const v0 = asRational(known["v0"], "v₀");
    const a = asRational(known["a"], "a");
    const qa = div(a, of(2));
    const q = solveQuadratic(qa, v0, neg(s));
    if (q.kind !== "two" && q.kind !== "one")
      throw new Error("brak rozwiązania dla czasu (Δ < 0) — sprawdź dane");
    const pick = q.roots.find((r) => approx(r) > 0) ?? null;
    if (!pick) throw new Error("żaden pierwiastek nie jest dodatni — sprawdź dane");
    return {
      values: [pick],
      steps: [
        { title: "1. Równanie kwadratowe", body: "\\frac{a}{2}t^2 + v_0 t - s = 0" },
        {
          title: "2. Podstawienie danych",
          body: `\\frac{${L(a)}}{2}t^2 + ${L(v0)}t - ${L(s)} = 0`,
        },
        { title: "3. Delta", body: `\\Delta = ${formatLatex(q.delta)}` },
        {
          title: "4. Wynik",
          body: resultLatex("t", pick, places),
          note: "wybieram pierwiastek dodatni (t > 0)",
        },
      ],
    };
  },
};

const sila: FormulaDef = {
  id: "sila",
  subject: "fizyka",
  topic: "Dynamika",
  name: "Druga zasada dynamiki",
  latex: "F = m \\cdot a",
  vars: [
    { id: "F", label: "F (siła)", unit: "N" },
    { id: "m", label: "m (masa)", unit: "kg" },
    { id: "a", label: "a (przyspieszenie)", unit: "m/s²" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "F") {
      const m = asRational(known["m"], "m");
      const a = asRational(known["a"], "a");
      const value = exactOf(mul(m, a));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F = m \\cdot a" },
          { title: "2. Podstawienie danych", body: `F = ${L(m)} \\cdot ${L(a)}` },
          { title: "3. Wynik", body: resultLatex("F", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const F = asRational(known["F"], "F");
      const a = asRational(known["a"], "a");
      const value = exactOf(div(F, a));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{F}{a}" },
          { title: "2. Podstawienie danych", body: `m = \\frac{${L(F)}}{${L(a)}}` },
          { title: "3. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const F = asRational(known["F"], "F");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(F, m));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "a = \\frac{F}{m}" },
        { title: "2. Podstawienie danych", body: `a = \\frac{${L(F)}}{${L(m)}}` },
        { title: "3. Wynik", body: resultLatex("a", value, places) },
      ],
    };
  },
};

const energiaKinetyczna: FormulaDef = {
  id: "energia-kinetyczna",
  subject: "fizyka",
  topic: "Energia",
  name: "Energia kinetyczna",
  latex: "E_k = \\frac{mv^2}{2}",
  vars: [
    { id: "Ek", label: "Eₖ (energia)", unit: "J" },
    { id: "m", label: "m (masa)", unit: "kg" },
    { id: "v", label: "v (prędkość)", unit: "m/s" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "Ek") {
      const m = asRational(known["m"], "m");
      const v = asRational(known["v"], "v");
      if (cmp(m, ZERO) < 0) throw new Error("masa nie jest ujemna");
      const v2 = mul(v, v);
      const value = exactOf(div(mul(m, v2), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E_k = \\frac{mv^2}{2}" },
          { title: "2. Podstawienie danych", body: `E_k = \\frac{${L(m)} \\cdot ${L(v)}^2}{2}` },
          { title: "3. Kwadrat prędkości", body: `v^2 = ${L(v)}^2 = ${L(v2)}` },
          { title: "4. Wynik", body: resultLatex("E_k", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const Ek = asRational(known["Ek"], "Eₖ");
      const v = asRational(known["v"], "v");
      if (cmp(Ek, ZERO) < 0) throw new Error("energia kinetyczna nie jest ujemna");
      const v2 = mul(v, v);
      const num = mul(Ek, of(2));
      const value = exactOf(div(num, v2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{2E_k}{v^2}" },
          { title: "2. Podstawienie danych", body: `m = \\frac{2 \\cdot ${L(Ek)}}{${L(v)}^2}` },
          { title: "3. Licznik i mianownik", body: `2E_k = ${L(num)}, \\; v^2 = ${L(v2)}` },
          { title: "4. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const Ek = asRational(known["Ek"], "Eₖ");
    const m = asRational(known["m"], "m");
    if (cmp(Ek, ZERO) < 0) throw new Error("energia kinetyczna nie jest ujemna");
    if (cmp(m, ZERO) <= 0) throw new Error("masa musi być dodatnia");
    const inner = div(mul(Ek, of(2)), m);
    const value = sqrtRational(inner);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "v = \\sqrt{\\frac{2E_k}{m}}" },
        { title: "2. Podstawienie danych", body: `v = \\sqrt{\\frac{2 \\cdot ${L(Ek)}}{${L(m)}}}` },
        { title: "3. Ułamek pod pierwiastkiem", body: `\\frac{2E_k}{m} = ${L(inner)}` },
        { title: "4. Wynik", body: resultLatex("v", value, places) },
      ],
    };
  },
};

const energiaPotencjalna: FormulaDef = {
  id: "energia-potencjalna",
  subject: "fizyka",
  topic: "Energia",
  name: "Energia potencjalna (g = 10 m/s²)",
  latex: "E_p = mgh",
  vars: [
    { id: "Ep", label: "Eₚ (energia)", unit: "J" },
    { id: "m", label: "m (masa)", unit: "kg" },
    { id: "h", label: "h (wysokość)", unit: "m" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    const g = of(10);
    if (unknown === "Ep") {
      const m = asRational(known["m"], "m");
      const h = asRational(known["h"], "h");
      const mh = mul(m, h);
      const value = exactOf(mul(mul(g, m), h));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E_p = mgh" },
          { title: "2. Podstawienie danych", body: `E_p = 10 \\cdot ${L(m)} \\cdot ${L(h)}` },
          {
            title: "3. Iloczyn masy i wysokości",
            body: `m \\cdot h = ${L(m)} \\cdot ${L(h)} = ${L(mh)}`,
          },
          { title: "4. Wynik", body: resultLatex("E_p", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const Ep = asRational(known["Ep"], "Eₚ");
      const h = asRational(known["h"], "h");
      const gh = mul(g, h);
      const value = exactOf(div(Ep, gh));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{E_p}{gh}" },
          { title: "2. Podstawienie danych", body: `m = \\frac{${L(Ep)}}{10 \\cdot ${L(h)}}` },
          { title: "3. Mianownik", body: `gh = 10 \\cdot ${L(h)} = ${L(gh)}` },
          { title: "4. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const Ep = asRational(known["Ep"], "Eₚ");
    const m = asRational(known["m"], "m");
    const gm = mul(g, m);
    const value = exactOf(div(Ep, gm));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "h = \\frac{E_p}{gm}" },
        { title: "2. Podstawienie danych", body: `h = \\frac{${L(Ep)}}{10 \\cdot ${L(m)}}` },
        { title: "3. Mianownik", body: `gm = 10 \\cdot ${L(m)} = ${L(gm)}` },
        { title: "4. Wynik", body: resultLatex("h", value, places) },
      ],
    };
  },
};

const gestosc: FormulaDef = {
  id: "gestosc",
  subject: "fizyka",
  topic: "Właściwości materii",
  name: "Gęstość",
  latex: "\\rho = \\frac{m}{V}",
  vars: [
    { id: "ro", label: "ρ (gęstość)", unit: "kg/m³" },
    { id: "m", label: "m (masa)", unit: "kg" },
    { id: "V", label: "V (objętość)", unit: "m³" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "ro") {
      const m = asRational(known["m"], "m");
      const V = asRational(known["V"], "V");
      const value = exactOf(div(m, V));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\rho = \\frac{m}{V}" },
          { title: "2. Podstawienie danych", body: `\\rho = \\frac{${L(m)}}{${L(V)}}` },
          { title: "3. Wynik", body: resultLatex("\\rho", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const ro = asRational(known["ro"], "ρ");
      const V = asRational(known["V"], "V");
      const value = exactOf(mul(ro, V));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\rho \\cdot V" },
          { title: "2. Podstawienie danych", body: `m = ${L(ro)} \\cdot ${L(V)}` },
          { title: "3. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const ro = asRational(known["ro"], "ρ");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(m, ro));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "V = \\frac{m}{\\rho}" },
        { title: "2. Podstawienie danych", body: `V = \\frac{${L(m)}}{${L(ro)}}` },
        { title: "3. Wynik", body: resultLatex("V", value, places) },
      ],
    };
  },
};

const cisnienie: FormulaDef = {
  id: "cisnienie",
  subject: "fizyka",
  topic: "Właściwości materii",
  name: "Ciśnienie",
  latex: "p = \\frac{F}{S}",
  vars: [
    { id: "p", label: "p (ciśnienie)", unit: "Pa" },
    { id: "F", label: "F (siła)", unit: "N" },
    { id: "S", label: "S (powierzchnia)", unit: "m²" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "p") {
      const F = asRational(known["F"], "F");
      const S = asRational(known["S"], "S");
      const value = exactOf(div(F, S));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "p = \\frac{F}{S}" },
          { title: "2. Podstawienie danych", body: `p = \\frac{${L(F)}}{${L(S)}}` },
          { title: "3. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    if (unknown === "F") {
      const p = asRational(known["p"], "p");
      const S = asRational(known["S"], "S");
      const value = exactOf(mul(p, S));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F = p \\cdot S" },
          { title: "2. Podstawienie danych", body: `F = ${L(p)} \\cdot ${L(S)}` },
          { title: "3. Wynik", body: resultLatex("F", value, places) },
        ],
      };
    }
    const p = asRational(known["p"], "p");
    const F = asRational(known["F"], "F");
    const value = exactOf(div(F, p));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "S = \\frac{F}{p}" },
        { title: "2. Podstawienie danych", body: `S = \\frac{${L(F)}}{${L(p)}}` },
        { title: "3. Wynik", body: resultLatex("S", value, places) },
      ],
    };
  },
};

const praca: FormulaDef = {
  id: "praca",
  subject: "fizyka",
  topic: "Energia",
  name: "Praca mechaniczna",
  latex: "W = F \\cdot s",
  vars: [
    { id: "W", label: "W (praca)", unit: "J" },
    { id: "F", label: "F (siła)", unit: "N" },
    { id: "s", label: "s (droga)", unit: "m" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places) {
    if (unknown === "W") {
      const F = asRational(known["F"], "F");
      const s = asRational(known["s"], "s");
      const value = exactOf(mul(F, s));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = F \\cdot s" },
          { title: "2. Podstawienie danych", body: `W = ${L(F)} \\cdot ${L(s)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    const W = asRational(known["W"], "W");
    const other = unknown === "F" ? "s" : "F";
    const o = asRational(known[other], other);
    const value = exactOf(div(W, o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{W}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(W)}}{${L(o)}}` },
        { title: "3. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

export const PHYSICS_FORMULAS: FormulaDef[] = [
  predkosc,
  ruchJednostajniePrzyspieszony,
  sila,
  energiaKinetyczna,
  energiaPotencjalna,
  gestosc,
  cisnienie,
  praca,
];
