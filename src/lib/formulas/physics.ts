import { ZERO, add, cmp, div, mul, neg, of, sub } from "../exact/rational";
import { approx, exactOf, solveQuadratic, sqrtRational } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef } from "./types";
import { asRational, stdSteps } from "./types";

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
        steps: stdSteps("v = \\frac{s}{t}", `v = \\frac{${L(s)}}{${L(t)}}`, value, places),
      };
    }
    if (unknown === "s") {
      const v = asRational(known["v"], "v");
      const t = asRational(known["t"], "t");
      const value = exactOf(mul(v, t));
      return {
        values: [value],
        steps: stdSteps("s = v \\cdot t", `s = ${L(v)} \\cdot ${L(t)}`, value, places),
      };
    }
    const v = asRational(known["v"], "v");
    const s = asRational(known["s"], "s");
    const value = exactOf(div(s, v));
    return {
      values: [value],
      steps: stdSteps("t = \\frac{s}{v}", `t = \\frac{${L(s)}}{${L(v)}}`, value, places),
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
      const value = exactOf(add(mul(v0, t!), div(mul(a, mul(t!, t!)), of(2))));
      return {
        values: [value],
        steps: stdSteps(
          "s = v_0 t + \\frac{at^2}{2}",
          `s = ${L(v0)} \\cdot ${L(t!)} + \\frac{${L(a)} \\cdot ${L(t!)}^2}{2}`,
          value,
          places,
        ),
      };
    }
    if (unknown === "v0") {
      const s = asRational(known["s"], "s");
      const a = asRational(known["a"], "a");
      const value = exactOf(div(sub(s, div(mul(a, mul(t!, t!)), of(2))), t!));
      return {
        values: [value],
        steps: stdSteps(
          "v_0 = \\frac{s - at^2/2}{t}",
          `v_0 = \\frac{${L(s)} - ${L(a)} \\cdot ${L(t!)}^2/2}{${L(t!)}}`,
          value,
          places,
        ),
      };
    }
    if (unknown === "a") {
      const s = asRational(known["s"], "s");
      const v0 = asRational(known["v0"], "v₀");
      const value = exactOf(div(mul(sub(s, mul(v0, t!)), of(2)), mul(t!, t!)));
      return {
        values: [value],
        steps: stdSteps(
          "a = \\frac{2(s - v_0 t)}{t^2}",
          `a = \\frac{2(${L(s)} - ${L(v0)} \\cdot ${L(t!)})}{${L(t!)}^2}`,
          value,
          places,
        ),
      };
    }
    const s = asRational(known["s"], "s");
    const v0 = asRational(known["v0"], "v₀");
    const a = asRational(known["a"], "a");
    const q = solveQuadratic(div(a, of(2)), v0, neg(s));
    if (q.kind !== "two" && q.kind !== "one")
      throw new Error("brak rozwiązania dla czasu (Δ < 0) — sprawdź dane");
    const pick = q.roots.find((r) => approx(r) > 0) ?? null;
    if (!pick) throw new Error("żaden pierwiastek nie jest dodatni — sprawdź dane");
    return {
      values: [pick],
      steps: stdSteps(
        "\\frac{a}{2}t^2 + v_0 t - s = 0",
        `\\frac{${L(a)}}{2}t^2 + ${L(v0)}t - ${L(s)} = 0 \\quad (\\text{wybieram } t > 0)`,
        pick,
        places,
      ),
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
        steps: stdSteps("F = m \\cdot a", `F = ${L(m)} \\cdot ${L(a)}`, value, places),
      };
    }
    if (unknown === "m") {
      const F = asRational(known["F"], "F");
      const a = asRational(known["a"], "a");
      const value = exactOf(div(F, a));
      return {
        values: [value],
        steps: stdSteps("m = \\frac{F}{a}", `m = \\frac{${L(F)}}{${L(a)}}`, value, places),
      };
    }
    const F = asRational(known["F"], "F");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(F, m));
    return {
      values: [value],
      steps: stdSteps("a = \\frac{F}{m}", `a = \\frac{${L(F)}}{${L(m)}}`, value, places),
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
      const value = exactOf(div(mul(m, mul(v, v)), of(2)));
      return {
        values: [value],
        steps: stdSteps(
          "E_k = \\frac{mv^2}{2}",
          `E_k = \\frac{${L(m)} \\cdot ${L(v)}^2}{2}`,
          value,
          places,
        ),
      };
    }
    if (unknown === "m") {
      const Ek = asRational(known["Ek"], "Eₖ");
      const v = asRational(known["v"], "v");
      if (cmp(Ek, ZERO) < 0) throw new Error("energia kinetyczna nie jest ujemna");
      const value = exactOf(div(mul(Ek, of(2)), mul(v, v)));
      return {
        values: [value],
        steps: stdSteps(
          "m = \\frac{2E_k}{v^2}",
          `m = \\frac{2 \\cdot ${L(Ek)}}{${L(v)}^2}`,
          value,
          places,
        ),
      };
    }
    const Ek = asRational(known["Ek"], "Eₖ");
    const m = asRational(known["m"], "m");
    if (cmp(Ek, ZERO) < 0) throw new Error("energia kinetyczna nie jest ujemna");
    if (cmp(m, ZERO) <= 0) throw new Error("masa musi być dodatnia");
    const value = sqrtRational(div(mul(Ek, of(2)), m));
    return {
      values: [value],
      steps: stdSteps(
        "v = \\sqrt{\\frac{2E_k}{m}}",
        `v = \\sqrt{\\frac{2 \\cdot ${L(Ek)}}{${L(m)}}}`,
        value,
        places,
      ),
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
      const value = exactOf(mul(mul(g, m), h));
      return {
        values: [value],
        steps: stdSteps("E_p = mgh", `E_p = 10 \\cdot ${L(m)} \\cdot ${L(h)}`, value, places),
      };
    }
    if (unknown === "m") {
      const Ep = asRational(known["Ep"], "Eₚ");
      const h = asRational(known["h"], "h");
      const value = exactOf(div(Ep, mul(g, h)));
      return {
        values: [value],
        steps: stdSteps(
          "m = \\frac{E_p}{gh}",
          `m = \\frac{${L(Ep)}}{10 \\cdot ${L(h)}}`,
          value,
          places,
        ),
      };
    }
    const Ep = asRational(known["Ep"], "Eₚ");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(Ep, mul(g, m)));
    return {
      values: [value],
      steps: stdSteps(
        "h = \\frac{E_p}{gm}",
        `h = \\frac{${L(Ep)}}{10 \\cdot ${L(m)}}`,
        value,
        places,
      ),
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
        steps: stdSteps("\\rho = \\frac{m}{V}", `\\rho = \\frac{${L(m)}}{${L(V)}}`, value, places),
      };
    }
    if (unknown === "m") {
      const ro = asRational(known["ro"], "ρ");
      const V = asRational(known["V"], "V");
      const value = exactOf(mul(ro, V));
      return {
        values: [value],
        steps: stdSteps("m = \\rho \\cdot V", `m = ${L(ro)} \\cdot ${L(V)}`, value, places),
      };
    }
    const ro = asRational(known["ro"], "ρ");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(m, ro));
    return {
      values: [value],
      steps: stdSteps("V = \\frac{m}{\\rho}", `V = \\frac{${L(m)}}{${L(ro)}}`, value, places),
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
        steps: stdSteps("p = \\frac{F}{S}", `p = \\frac{${L(F)}}{${L(S)}}`, value, places),
      };
    }
    if (unknown === "F") {
      const p = asRational(known["p"], "p");
      const S = asRational(known["S"], "S");
      const value = exactOf(mul(p, S));
      return {
        values: [value],
        steps: stdSteps("F = p \\cdot S", `F = ${L(p)} \\cdot ${L(S)}`, value, places),
      };
    }
    const p = asRational(known["p"], "p");
    const F = asRational(known["F"], "F");
    const value = exactOf(div(F, p));
    return {
      values: [value],
      steps: stdSteps("S = \\frac{F}{p}", `S = \\frac{${L(F)}}{${L(p)}}`, value, places),
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
        steps: stdSteps("W = F \\cdot s", `W = ${L(F)} \\cdot ${L(s)}`, value, places),
      };
    }
    const W = asRational(known["W"], "W");
    const other = unknown === "F" ? "s" : "F";
    const o = asRational(known[other], other);
    const value = exactOf(div(W, o));
    return {
      values: [value],
      steps: stdSteps(
        `${unknown} = \\frac{W}{${other}}`,
        `${unknown} = \\frac{${L(W)}}{${L(o)}}`,
        value,
        places,
      ),
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
