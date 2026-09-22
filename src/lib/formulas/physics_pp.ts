import { ONE, ZERO, add, cmp, div, mul, of, sub } from "../exact/rational";
import { approx, approxOnly, exactOf, mulRat, sqrtRational, stripPi } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const G10 = of(10);
const L = formatRatLatex;
const APPROX_NOTE = "wynik przybliżony (stałe i funkcje liczę numerycznie)";

const moc: FormulaDef = {
  id: "moc",
  subject: "fizyka",
  topic: "Praca i moc",
  name: "Moc",
  latex: "P = \\frac{W}{t}",
  vars: [
    { id: "P", label: "P (moc)", unit: "W" },
    { id: "W", label: "W (praca)", unit: "J" },
    { id: "t", label: "t (czas)", unit: "s" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const W = asRational(known["W"], "W");
      const t = asRational(known["t"], "t");
      const value = exactOf(div(W, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\frac{W}{t}" },
          { title: "2. Podstawienie danych", body: `P = \\frac{${L(W)}}{${L(t)}}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    if (unknown === "W") {
      const P = asRational(known["P"], "P");
      const t = asRational(known["t"], "t");
      const value = exactOf(mul(P, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = P \\cdot t" },
          { title: "2. Podstawienie danych", body: `W = ${L(P)} \\cdot ${L(t)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const W = asRational(known["W"], "W");
    const value = exactOf(div(W, P));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "t = \\frac{W}{P}" },
        { title: "2. Podstawienie danych", body: `t = \\frac{${L(W)}}{${L(P)}}` },
        { title: "3. Wynik", body: resultLatex("t", value, places) },
      ],
    };
  },
};

const sprawnosc: FormulaDef = {
  id: "sprawnosc",
  subject: "fizyka",
  topic: "Praca i moc",
  name: "Sprawność",
  latex: "\\eta = \\frac{W_{uż}}{W_{d}}",
  vars: [
    { id: "eta", label: "η (0–1)" },
    { id: "Wu", label: "W użyteczna [J]" },
    { id: "Wd", label: "W dostarczona [J]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "eta") {
      const Wu = asRational(known["Wu"], "Wu");
      const Wd = asRational(known["Wd"], "Wd");
      const value = exactOf(div(Wu, Wd));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\eta = \\frac{W_{uż}}{W_{d}}" },
          { title: "2. Podstawienie danych", body: `\\eta = \\frac{${L(Wu)}}{${L(Wd)}}` },
          {
            title: "3. Wynik",
            body: resultLatex("\\eta", value, places),
            note: "ułamek dziesiętny × 100% to procenty",
          },
        ],
      };
    }
    if (unknown === "Wu") {
      const eta = asRational(known["eta"], "η");
      const Wd = asRational(known["Wd"], "Wd");
      const value = exactOf(mul(eta, Wd));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W_{uż} = \\eta \\cdot W_{d}" },
          { title: "2. Podstawienie danych", body: `W_{uż} = ${L(eta)} \\cdot ${L(Wd)}` },
          { title: "3. Wynik", body: resultLatex("W_{uż}", value, places) },
        ],
      };
    }
    const eta = asRational(known["eta"], "η");
    const Wu = asRational(known["Wu"], "Wu");
    const value = exactOf(div(Wu, eta));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "W_{d} = \\frac{W_{uż}}{\\eta}" },
        { title: "2. Podstawienie danych", body: `W_{d} = \\frac{${L(Wu)}}{${L(eta)}}` },
        { title: "3. Wynik", body: resultLatex("W_{d}", value, places) },
      ],
    };
  },
};

const ped: FormulaDef = {
  id: "ped",
  subject: "fizyka",
  topic: "Pęd",
  name: "Pęd ciała",
  latex: "p = m \\cdot v",
  vars: [
    { id: "p", label: "p (pęd)", unit: "kg·m/s" },
    { id: "m", label: "m (masa)", unit: "kg" },
    { id: "v", label: "v (prędkość)", unit: "m/s" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "p") {
      const m = asRational(known["m"], "m");
      const v = asRational(known["v"], "v");
      const value = exactOf(mul(m, v));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "p = m \\cdot v" },
          { title: "2. Podstawienie danych", body: `p = ${L(m)} \\cdot ${L(v)}` },
          { title: "3. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const p = asRational(known["p"], "p");
      const v = asRational(known["v"], "v");
      const value = exactOf(div(p, v));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{p}{v}" },
          { title: "2. Podstawienie danych", body: `m = \\frac{${L(p)}}{${L(v)}}` },
          { title: "3. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const p = asRational(known["p"], "p");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(p, m));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "v = \\frac{p}{m}" },
        { title: "2. Podstawienie danych", body: `v = \\frac{${L(p)}}{${L(m)}}` },
        { title: "3. Wynik", body: resultLatex("v", value, places) },
      ],
    };
  },
};

const zderzenia: FormulaDef = {
  id: "zderzenia",
  subject: "fizyka",
  topic: "Pęd",
  name: "Zderzenie niesprężyste",
  latex: "u = \\frac{m_1v_1 + m_2v_2}{m_1 + m_2}",
  vars: [
    { id: "m1", label: "m₁ [kg]" },
    { id: "v1", label: "v₁ [m/s]" },
    { id: "m2", label: "m₂ [kg]" },
    { id: "v2", label: "v₂ [m/s]" },
  ],
  mode: "fixed",
  outputId: "u",
  outputLabel: "u",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const p1 = mul(g("m1"), g("v1"));
    const p2 = mul(g("m2"), g("v2"));
    const M = add(g("m1"), g("m2"));
    const value = exactOf(div(add(p1, p2), M));
    return {
      values: [value],
      steps: [
        { title: "1. Zachowanie pędu", body: "u = \\frac{m_1v_1 + m_2v_2}{m_1 + m_2}" },
        {
          title: "2. Podstawienie danych",
          body: `u = \\frac{${L(g("m1"))} \\cdot ${L(g("v1"))} + ${L(g("m2"))} \\cdot ${L(g("v2"))}}{${L(g("m1"))} + ${L(g("m2"))}}`,
        },
        {
          title: "3. Pędy i masa",
          body: `m_1v_1 = ${L(p1)}, \\; m_2v_2 = ${L(p2)}, \\; M = ${L(M)}`,
        },
        { title: "4. Wynik", body: resultLatex("u", value, places) },
      ],
    };
  },
};

const ruchOkrag: FormulaDef = {
  id: "ruch-okrag",
  subject: "fizyka",
  topic: "Ruch po okręgu",
  name: "Prędkość w ruchu po okręgu",
  latex: "v = \\frac{2\\pi r}{T}, \\; a_r = \\frac{v^2}{r}",
  vars: [
    { id: "v", label: "v [m/s]" },
    { id: "r", label: "r [m]" },
    { id: "T", label: "T (okres) [s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
    if (unknown === "v") {
      const r = asRational(known["r"], "r");
      const T = asRational(known["T"], "T");
      const twoR = mul(of(2), r);
      const value = mulRat(PI, div(twoR, T));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "v = \\frac{2\\pi r}{T}" },
          { title: "2. Podstawienie danych", body: `v = \\frac{2\\pi \\cdot ${L(r)}}{${L(T)}}` },
          { title: "3. Licznik bez π", body: `2r = 2 \\cdot ${L(r)} = ${L(twoR)}` },
          {
            title: "4. Wynik",
            body: resultLatex("v", value, places),
            note: "a także: f = 1/T, ar = v²/r",
          },
        ],
      };
    }
    if (unknown === "r") {
      const v = known["v"];
      const T = asRational(known["T"], "T");
      let value: Exact;
      let note: string | undefined;
      try {
        const inner = div(mul(stripPi(v), T), of(2));
        value = exactOf(inner);
        return {
          values: [value],
          steps: [
            { title: "1. Przekształcenie wzoru", body: "r = \\frac{vT}{2\\pi}" },
            {
              title: "2. Podstawienie danych",
              body: `r = \\frac{${formatLatex(v)} \\cdot ${L(T)}}{2\\pi}`,
            },
            { title: "3. Skrócenie π", body: `r = ${L(inner)}` },
            { title: "4. Wynik", body: resultLatex("r", value, places) },
          ],
        };
      } catch {
        value = approxOnly((approx(v) * approx(exactOf(T))) / (2 * Math.PI));
        note = APPROX_NOTE;
      }
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "r = \\frac{vT}{2\\pi}" },
          {
            title: "2. Podstawienie danych",
            body: `r = \\frac{${formatLatex(v)} \\cdot ${L(T)}}{2\\pi}`,
          },
          { title: "3. Wynik", body: resultLatex("r", value, places), note },
        ],
      };
    }
    const v = known["v"];
    const r = asRational(known["r"], "r");
    let valueT: Exact;
    let noteT: string | undefined;
    try {
      valueT = mulRat(PI, div(mul(of(2), r), asRational(v, "v")));
    } catch {
      valueT = approxOnly((2 * Math.PI * approx(exactOf(r))) / approx(v));
      noteT = APPROX_NOTE;
    }
    return {
      values: [valueT],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "T = \\frac{2\\pi r}{v}" },
        {
          title: "2. Podstawienie danych",
          body: `T = \\frac{2\\pi \\cdot ${L(r)}}{${formatLatex(v)}}`,
        },
        { title: "3. Wynik", body: resultLatex("T", valueT, places), note: noteT },
      ],
    };
  },
};

const G_CONST = 6.67e-11;
const C_LIGHT = 3e8;

function num(e: Exact): number {
  return approx(e);
}

const grawitacja: FormulaDef = {
  id: "grawitacja",
  subject: "fizyka",
  topic: "Grawitacja",
  name: "Prawo powszechnego ciążenia",
  latex: "F = G\\frac{mM}{r^2}",
  vars: [
    { id: "F", label: "F [N]" },
    { id: "m", label: "m [kg]" },
    { id: "M", label: "M [kg]" },
    { id: "r", label: "r [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`);
      return v;
    };
    let value: Exact;
    let transform = "";
    let subst = "";
    let mid = "";
    if (unknown === "F") {
      const r2 = g("r") ** 2;
      value = approxOnly((G_CONST * g("m") * g("M")) / r2);
      transform = "F = G\\frac{mM}{r^2}";
      subst = `F = 6{,}67 \\cdot 10^{-11} \\cdot ${g("m")} \\cdot ${g("M")} / ${g("r")}^2`;
      mid = `r^2 = ${g("r")}^2 = ${r2}`;
    } else if (unknown === "m") {
      const r2 = g("r") ** 2;
      value = approxOnly((g("F") * r2) / (G_CONST * g("M")));
      transform = "m = \\frac{Fr^2}{GM}";
      subst = `m = ${g("F")} \\cdot ${g("r")}^2 / (G \\cdot ${g("M")})`;
      mid = `r^2 = ${g("r")}^2 = ${r2}`;
    } else if (unknown === "M") {
      const r2 = g("r") ** 2;
      value = approxOnly((g("F") * r2) / (G_CONST * g("m")));
      transform = "M = \\frac{Fr^2}{Gm}";
      subst = `M = ${g("F")} \\cdot ${g("r")}^2 / (G \\cdot ${g("m")})`;
      mid = `r^2 = ${g("r")}^2 = ${r2}`;
    } else {
      const num = G_CONST * g("m") * g("M");
      value = approxOnly(Math.sqrt(num / g("F")));
      transform = "r = \\sqrt{\\frac{GmM}{F}}";
      subst = `r = \\sqrt{G \\cdot ${g("m")} \\cdot ${g("M")} / ${g("F")}}`;
      mid = `GmM = 6{,}67 \\cdot 10^{-11} \\cdot ${g("m")} \\cdot ${g("M")} = ${num}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Pośredni rachunek", body: mid },
        { title: "4. Wynik", body: resultLatex(unknown, value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const kepler: FormulaDef = {
  id: "kepler",
  subject: "fizyka",
  topic: "Grawitacja",
  name: "III prawo Keplera",
  latex: "\\frac{T_1^2}{r_1^3} = \\frac{T_2^2}{r_2^3}",
  vars: [
    { id: "T1", label: "T₁ [s]" },
    { id: "r1", label: "r₁ [m]" },
    { id: "T2", label: "T₂ [s]" },
    { id: "r2", label: "r₂ [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v) || v <= 0) throw new Error(`${id}: wpisz dodatnią liczbę`);
      return v;
    };
    let value: Exact;
    let transform = "";
    let subst = "";
    let mid = "";
    if (unknown === "T1") {
      const ratio = g("r1") / g("r2");
      value = approxOnly(g("T2") * ratio ** 1.5);
      transform = "T_1 = T_2(r_1/r_2)^{3/2}";
      subst = `T_1 = ${g("T2")} \\cdot (${g("r1")}/${g("r2")})^{3/2}`;
      mid = `r_1/r_2 = ${ratio}`;
    } else if (unknown === "T2") {
      const ratio = g("r2") / g("r1");
      value = approxOnly(g("T1") * ratio ** 1.5);
      transform = "T_2 = T_1(r_2/r_1)^{3/2}";
      subst = `T_2 = ${g("T1")} \\cdot (${g("r2")}/${g("r1")})^{3/2}`;
      mid = `r_2/r_1 = ${ratio}`;
    } else if (unknown === "r1") {
      const ratio = g("T1") / g("T2");
      value = approxOnly(g("r2") * ratio ** (2 / 3));
      transform = "r_1 = r_2(T_1/T_2)^{2/3}";
      subst = `r_1 = ${g("r2")} \\cdot (${g("T1")}/${g("T2")})^{2/3}`;
      mid = `T_1/T_2 = ${ratio}`;
    } else {
      const ratio = g("T2") / g("T1");
      value = approxOnly(g("r1") * ratio ** (2 / 3));
      transform = "r_2 = r_1(T_2/T_1)^{2/3}";
      subst = `r_2 = ${g("r1")} \\cdot (${g("T2")}/${g("T1")})^{2/3}`;
      mid = `T_2/T_1 = ${ratio}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Stosunek", body: mid },
        { title: "4. Wynik", body: resultLatex(unknown, value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const archimedes: FormulaDef = {
  id: "archimedes",
  subject: "fizyka",
  topic: "Hydrostatyka",
  name: "Siła wyporu (Archimedes)",
  latex: "F_w = \\rho g V",
  vars: [
    { id: "Fw", label: "F_w [N]" },
    { id: "ro", label: "ρ [kg/m³]" },
    { id: "V", label: "V [m³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Fw") {
      const ro = asRational(known["ro"], "ρ");
      const V = asRational(known["V"], "V");
      const roV = mul(ro, V);
      const value = exactOf(mul(roV, G10));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F_w = \\rho g V" },
          { title: "2. Podstawienie danych", body: `F_w = ${L(ro)} \\cdot 10 \\cdot ${L(V)}` },
          { title: "3. Iloczyn ρV", body: `\\rho V = ${L(ro)} \\cdot ${L(V)} = ${L(roV)}` },
          { title: "4. Wynik", body: resultLatex("F_w", value, places) },
        ],
      };
    }
    if (unknown === "ro") {
      const Fw = asRational(known["Fw"], "Fw");
      const V = asRational(known["V"], "V");
      const gV = mul(G10, V);
      const value = exactOf(div(Fw, gV));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\rho = \\frac{F_w}{gV}" },
          { title: "2. Podstawienie danych", body: `\\rho = \\frac{${L(Fw)}}{10 \\cdot ${L(V)}}` },
          { title: "3. Mianownik", body: `gV = 10 \\cdot ${L(V)} = ${L(gV)}` },
          { title: "4. Wynik", body: resultLatex("\\rho", value, places) },
        ],
      };
    }
    const Fw = asRational(known["Fw"], "Fw");
    const ro = asRational(known["ro"], "ρ");
    const roG = mul(ro, G10);
    const value = exactOf(div(Fw, roG));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "V = \\frac{F_w}{\\rho g}" },
        { title: "2. Podstawienie danych", body: `V = \\frac{${L(Fw)}}{${L(ro)} \\cdot 10}` },
        { title: "3. Mianownik", body: `\\rho g = ${L(ro)} \\cdot 10 = ${L(roG)}` },
        { title: "4. Wynik", body: resultLatex("V", value, places) },
      ],
    };
  },
};

const hydrostatyczne: FormulaDef = {
  id: "hydrostatyczne",
  subject: "fizyka",
  topic: "Hydrostatyka",
  name: "Ciśnienie hydrostatyczne",
  latex: "p = \\rho g h",
  vars: [
    { id: "p", label: "p [Pa]" },
    { id: "ro", label: "ρ [kg/m³]" },
    { id: "h", label: "h [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "p") {
      const ro = asRational(known["ro"], "ρ");
      const h = asRational(known["h"], "h");
      const roH = mul(ro, h);
      const value = exactOf(mul(roH, G10));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "p = \\rho g h" },
          { title: "2. Podstawienie danych", body: `p = ${L(ro)} \\cdot 10 \\cdot ${L(h)}` },
          { title: "3. Iloczyn ρh", body: `\\rho h = ${L(ro)} \\cdot ${L(h)} = ${L(roH)}` },
          { title: "4. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    if (unknown === "ro") {
      const p = asRational(known["p"], "p");
      const h = asRational(known["h"], "h");
      const gh = mul(G10, h);
      const value = exactOf(div(p, gh));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\rho = \\frac{p}{gh}" },
          { title: "2. Podstawienie danych", body: `\\rho = \\frac{${L(p)}}{10 \\cdot ${L(h)}}` },
          { title: "3. Mianownik", body: `gh = 10 \\cdot ${L(h)} = ${L(gh)}` },
          { title: "4. Wynik", body: resultLatex("\\rho", value, places) },
        ],
      };
    }
    const p = asRational(known["p"], "p");
    const ro = asRational(known["ro"], "ρ");
    const roG = mul(ro, G10);
    const value = exactOf(div(p, roG));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "h = \\frac{p}{\\rho g}" },
        { title: "2. Podstawienie danych", body: `h = \\frac{${L(p)}}{${L(ro)} \\cdot 10}` },
        { title: "3. Mianownik", body: `\\rho g = ${L(ro)} \\cdot 10 = ${L(roG)}` },
        { title: "4. Wynik", body: resultLatex("h", value, places) },
      ],
    };
  },
};

const cieplo: FormulaDef = {
  id: "cieplo",
  subject: "fizyka",
  topic: "Ciepło",
  name: "Ciepło właściwe",
  latex: "Q = mc\\Delta T",
  vars: [
    { id: "Q", label: "Q [J]" },
    { id: "m", label: "m [kg]" },
    { id: "c", label: "c [J/(kg·K)]" },
    { id: "dT", label: "ΔT [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "Q") {
      const mc = mul(g("m"), g("c"));
      const value = exactOf(mul(mc, g("dT")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "Q = mc\\Delta T" },
          {
            title: "2. Podstawienie danych",
            body: `Q = ${L(g("m"))} \\cdot ${L(g("c"))} \\cdot ${L(g("dT"))}`,
          },
          { title: "3. Iloczyn mc", body: `mc = ${L(g("m"))} \\cdot ${L(g("c"))} = ${L(mc)}` },
          { title: "4. Wynik", body: resultLatex("Q", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const den = mul(g("c"), g("dT"));
      const value = exactOf(div(g("Q"), den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{Q}{c\\Delta T}" },
          {
            title: "2. Podstawienie danych",
            body: `m = \\frac{${L(g("Q"))}}{${L(g("c"))} \\cdot ${L(g("dT"))}}`,
          },
          {
            title: "3. Mianownik",
            body: `c\\Delta T = ${L(g("c"))} \\cdot ${L(g("dT"))} = ${L(den)}`,
          },
          { title: "4. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    if (unknown === "c") {
      const den = mul(g("m"), g("dT"));
      const value = exactOf(div(g("Q"), den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "c = \\frac{Q}{m\\Delta T}" },
          {
            title: "2. Podstawienie danych",
            body: `c = \\frac{${L(g("Q"))}}{${L(g("m"))} \\cdot ${L(g("dT"))}}`,
          },
          {
            title: "3. Mianownik",
            body: `m\\Delta T = ${L(g("m"))} \\cdot ${L(g("dT"))} = ${L(den)}`,
          },
          { title: "4. Wynik", body: resultLatex("c", value, places) },
        ],
      };
    }
    const den = mul(g("m"), g("c"));
    const value = exactOf(div(g("Q"), den));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "\\Delta T = \\frac{Q}{mc}" },
        {
          title: "2. Podstawienie danych",
          body: `\\Delta T = \\frac{${L(g("Q"))}}{${L(g("m"))} \\cdot ${L(g("c"))}}`,
        },
        { title: "3. Mianownik", body: `mc = ${L(g("m"))} \\cdot ${L(g("c"))} = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex("\\Delta T", value, places) },
      ],
    };
  },
};

const cieploPrzemiany: FormulaDef = {
  id: "cieplo-przemiany",
  subject: "fizyka",
  topic: "Ciepło",
  name: "Ciepło przemiany (topnienie/parowanie)",
  latex: "Q = m \\cdot R",
  vars: [
    { id: "Q", label: "Q [J]" },
    { id: "m", label: "m [kg]" },
    { id: "R", label: "R [J/kg]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Q") {
      const m = asRational(known["m"], "m");
      const R = asRational(known["R"], "R");
      const value = exactOf(mul(m, R));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "Q = m \\cdot R" },
          { title: "2. Podstawienie danych", body: `Q = ${L(m)} \\cdot ${L(R)}` },
          { title: "3. Wynik", body: resultLatex("Q", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const Q = asRational(known["Q"], "Q");
      const R = asRational(known["R"], "R");
      const value = exactOf(div(Q, R));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = \\frac{Q}{R}" },
          { title: "2. Podstawienie danych", body: `m = \\frac{${L(Q)}}{${L(R)}}` },
          { title: "3. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const Q = asRational(known["Q"], "Q");
    const m = asRational(known["m"], "m");
    const value = exactOf(div(Q, m));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "R = \\frac{Q}{m}" },
        { title: "2. Podstawienie danych", body: `R = \\frac{${L(Q)}}{${L(m)}}` },
        { title: "3. Wynik", body: resultLatex("R", value, places) },
      ],
    };
  },
};

const ohm: FormulaDef = {
  id: "ohm",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Prawo Ohma",
  latex: "I = \\frac{U}{R}",
  vars: [
    { id: "I", label: "I [A]" },
    { id: "U", label: "U [V]" },
    { id: "R", label: "R [Ω]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "I") {
      const U = asRational(known["U"], "U");
      const R = asRational(known["R"], "R");
      const value = exactOf(div(U, R));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "I = \\frac{U}{R}" },
          { title: "2. Podstawienie danych", body: `I = \\frac{${L(U)}}{${L(R)}}` },
          { title: "3. Wynik", body: resultLatex("I", value, places) },
        ],
      };
    }
    if (unknown === "U") {
      const I = asRational(known["I"], "I");
      const R = asRational(known["R"], "R");
      const value = exactOf(mul(I, R));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "U = I \\cdot R" },
          { title: "2. Podstawienie danych", body: `U = ${L(I)} \\cdot ${L(R)}` },
          { title: "3. Wynik", body: resultLatex("U", value, places) },
        ],
      };
    }
    const I = asRational(known["I"], "I");
    const U = asRational(known["U"], "U");
    const value = exactOf(div(U, I));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "R = \\frac{U}{I}" },
        { title: "2. Podstawienie danych", body: `R = \\frac{${L(U)}}{${L(I)}}` },
        { title: "3. Wynik", body: resultLatex("R", value, places) },
      ],
    };
  },
};

const opor: FormulaDef = {
  id: "opor",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Opór przewodnika",
  latex: "R = \\rho\\frac{l}{S}",
  vars: [
    { id: "R", label: "R [Ω]" },
    { id: "ro", label: "ρ [Ω·m]" },
    { id: "l", label: "l [m]" },
    { id: "S", label: "S [m²]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "R") {
      const num = mul(g("ro"), g("l"));
      const value = exactOf(div(num, g("S")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "R = \\rho\\frac{l}{S}" },
          {
            title: "2. Podstawienie danych",
            body: `R = ${L(g("ro"))} \\cdot \\frac{${L(g("l"))}}{${L(g("S"))}}`,
          },
          { title: "3. Licznik", body: `\\rho l = ${L(g("ro"))} \\cdot ${L(g("l"))} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("R", value, places) },
        ],
      };
    }
    if (unknown === "ro") {
      const num = mul(g("R"), g("S"));
      const value = exactOf(div(num, g("l")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\rho = \\frac{RS}{l}" },
          {
            title: "2. Podstawienie danych",
            body: `\\rho = \\frac{${L(g("R"))} \\cdot ${L(g("S"))}}{${L(g("l"))}}`,
          },
          { title: "3. Licznik", body: `RS = ${L(g("R"))} \\cdot ${L(g("S"))} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("\\rho", value, places) },
        ],
      };
    }
    if (unknown === "l") {
      const num = mul(g("R"), g("S"));
      const value = exactOf(div(num, g("ro")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "l = \\frac{RS}{\\rho}" },
          {
            title: "2. Podstawienie danych",
            body: `l = \\frac{${L(g("R"))} \\cdot ${L(g("S"))}}{${L(g("ro"))}}`,
          },
          { title: "3. Licznik", body: `RS = ${L(g("R"))} \\cdot ${L(g("S"))} = ${L(num)}` },
          { title: "4. Wynik", body: resultLatex("l", value, places) },
        ],
      };
    }
    const num = mul(g("ro"), g("l"));
    const value = exactOf(div(num, g("R")));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "S = \\frac{\\rho l}{R}" },
        {
          title: "2. Podstawienie danych",
          body: `S = \\frac{${L(g("ro"))} \\cdot ${L(g("l"))}}{${L(g("R"))}}`,
        },
        { title: "3. Licznik", body: `\\rho l = ${L(g("ro"))} \\cdot ${L(g("l"))} = ${L(num)}` },
        { title: "4. Wynik", body: resultLatex("S", value, places) },
      ],
    };
  },
};

const mocPradu: FormulaDef = {
  id: "moc-pradu",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Moc prądu elektrycznego",
  latex: "P = U \\cdot I",
  vars: [
    { id: "P", label: "P [W]" },
    { id: "U", label: "U [V]" },
    { id: "I", label: "I [A]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const U = asRational(known["U"], "U");
      const I = asRational(known["I"], "I");
      const value = exactOf(mul(U, I));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = U \\cdot I" },
          { title: "2. Podstawienie danych", body: `P = ${L(U)} \\cdot ${L(I)}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    if (unknown === "U") {
      const P = asRational(known["P"], "P");
      const I = asRational(known["I"], "I");
      const value = exactOf(div(P, I));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "U = \\frac{P}{I}" },
          { title: "2. Podstawienie danych", body: `U = \\frac{${L(P)}}{${L(I)}}` },
          { title: "3. Wynik", body: resultLatex("U", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P");
    const U = asRational(known["U"], "U");
    const value = exactOf(div(P, U));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "I = \\frac{P}{U}" },
        { title: "2. Podstawienie danych", body: `I = \\frac{${L(P)}}{${L(U)}}` },
        { title: "3. Wynik", body: resultLatex("I", value, places) },
      ],
    };
  },
};

const energiaPradu: FormulaDef = {
  id: "energia-pradu",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Praca prądu (energia)",
  latex: "W = P \\cdot t",
  vars: [
    { id: "W", label: "W [J]" },
    { id: "P", label: "P [W]" },
    { id: "t", label: "t [s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "W") {
      const P = asRational(known["P"], "P");
      const t = asRational(known["t"], "t");
      const value = exactOf(mul(P, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = P \\cdot t" },
          { title: "2. Podstawienie danych", body: `W = ${L(P)} \\cdot ${L(t)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    if (unknown === "P") {
      const W = asRational(known["W"], "W");
      const t = asRational(known["t"], "t");
      const value = exactOf(div(W, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P = \\frac{W}{t}" },
          { title: "2. Podstawienie danych", body: `P = \\frac{${L(W)}}{${L(t)}}` },
          { title: "3. Wynik", body: resultLatex("P", value, places) },
        ],
      };
    }
    const W = asRational(known["W"], "W");
    const P = asRational(known["P"], "P");
    const value = exactOf(div(W, P));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "t = \\frac{W}{P}" },
        { title: "2. Podstawienie danych", body: `t = \\frac{${L(W)}}{${L(P)}}` },
        { title: "3. Wynik", body: resultLatex("t", value, places) },
      ],
    };
  },
};

const lorentz: FormulaDef = {
  id: "lorentz",
  subject: "fizyka",
  topic: "Magnetyzm",
  name: "Siła Lorentza (v ⊥ B)",
  latex: "F = qvB",
  vars: [
    { id: "F", label: "F [N]" },
    { id: "q", label: "q [C]" },
    { id: "v", label: "v [m/s]" },
    { id: "B", label: "B [T]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "F") {
      const qv = mul(g("q"), g("v"));
      const value = exactOf(mul(qv, g("B")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F = qvB" },
          {
            title: "2. Podstawienie danych",
            body: `F = ${L(g("q"))} \\cdot ${L(g("v"))} \\cdot ${L(g("B"))}`,
          },
          { title: "3. Iloczyn qv", body: `qv = ${L(g("q"))} \\cdot ${L(g("v"))} = ${L(qv)}` },
          { title: "4. Wynik", body: resultLatex("F", value, places) },
        ],
      };
    }
    const others = ["q", "v", "B"].filter((id) => id !== unknown);
    const o = others.map(g);
    const F = g("F");
    const den = mul(o[0], o[1]);
    const value = exactOf(div(F, den));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = F/(${others[0]}${others[1]})` },
        {
          title: "2. Podstawienie danych",
          body: `${unknown} = \\frac{${L(F)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        },
        { title: "3. Mianownik", body: `${L(o[0])} \\cdot ${L(o[1])} = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const snell: FormulaDef = {
  id: "snell",
  subject: "fizyka",
  topic: "Optyka",
  name: "Prawo załamania (Snellius)",
  latex: "n = \\frac{\\sin\\alpha}{\\sin\\beta}",
  vars: [
    { id: "n", label: "n" },
    { id: "alfa", label: "α (padania) [°]" },
    { id: "beta", label: "β (załamania) [°]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const rad = (d: number): number => (d * Math.PI) / 180;
    const deg = (r: number): number => (r * 180) / Math.PI;
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`);
      return v;
    };
    if (unknown === "n") {
      const sa = Math.sin(rad(g("alfa")));
      const sb = Math.sin(rad(g("beta")));
      const value = approxOnly(sa / sb);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\sin\\alpha/\\sin\\beta" },
          {
            title: "2. Podstawienie danych",
            body: `n = \\sin ${g("alfa")}^\\circ / \\sin ${g("beta")}^\\circ`,
          },
          {
            title: "3. Sinusy",
            body: `\\sin ${g("alfa")}^\\circ = ${trimNum(sa)}, \\; \\sin ${g("beta")}^\\circ = ${trimNum(sb)}`,
          },
          { title: "4. Wynik", body: resultLatex("n", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "alfa") {
      const sb = Math.sin(rad(g("beta")));
      const s = g("n") * sb;
      if (Math.abs(s) > 1) throw new Error("sin α > 1 — sprawdź dane (całkowite odbicie?)");
      const value = approxOnly(deg(Math.asin(s)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\alpha = \\arcsin(n \\sin\\beta)" },
          {
            title: "2. Podstawienie danych",
            body: `\\alpha = \\arcsin(${g("n")} \\cdot \\sin ${g("beta")}^\\circ)`,
          },
          {
            title: "3. Iloczyn",
            body: `n \\sin\\beta = ${g("n")} \\cdot ${trimNum(sb)} = ${trimNum(s)}`,
          },
          { title: "4. Wynik", body: resultLatex("\\alpha", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const sa = Math.sin(rad(g("alfa")));
    const s = sa / g("n");
    if (Math.abs(s) > 1) throw new Error("sin β > 1 — sprawdź dane");
    const value = approxOnly(deg(Math.asin(s)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "\\beta = \\arcsin(\\sin\\alpha/n)" },
        {
          title: "2. Podstawienie danych",
          body: `\\beta = \\arcsin(\\sin ${g("alfa")}^\\circ / ${g("n")})`,
        },
        { title: "3. Iloraz", body: `\\sin\\alpha/n = ${trimNum(sa)} / ${g("n")} = ${trimNum(s)}` },
        { title: "4. Wynik", body: resultLatex("\\beta", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const soczewki: FormulaDef = {
  id: "soczewki",
  subject: "fizyka",
  topic: "Optyka",
  name: "Równanie soczewki",
  latex: "\\frac{1}{f} = \\frac{1}{x} + \\frac{1}{y}",
  vars: [
    { id: "f", label: "f (ogniskowa)" },
    { id: "x", label: "x (przedmiot)" },
    { id: "y", label: "y (obraz)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "f") {
      const x = g("x");
      const y = g("y");
      const num = mul(x, y);
      const den = add(x, y);
      const value = exactOf(div(num, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "f = \\frac{xy}{x + y}" },
          {
            title: "2. Podstawienie danych",
            body: `f = \\frac{${L(x)} \\cdot ${L(y)}}{${L(x)} + ${L(y)}}`,
          },
          { title: "3. Licznik i mianownik", body: `xy = ${L(num)}, \\; x + y = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("f", value, places) },
        ],
      };
    }
    if (unknown === "x") {
      const f = g("f");
      const y = g("y");
      const num = mul(f, y);
      const den = sub(y, f);
      const value = exactOf(div(num, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "x = \\frac{fy}{y - f}" },
          {
            title: "2. Podstawienie danych",
            body: `x = \\frac{${L(f)} \\cdot ${L(y)}}{${L(y)} - ${L(f)}}`,
          },
          { title: "3. Licznik i mianownik", body: `fy = ${L(num)}, \\; y - f = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("x", value, places) },
        ],
      };
    }
    const f = g("f");
    const x = g("x");
    const num = mul(f, x);
    const den = sub(x, f);
    const value = exactOf(div(num, den));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "y = \\frac{fx}{x - f}" },
        {
          title: "2. Podstawienie danych",
          body: `y = \\frac{${L(f)} \\cdot ${L(x)}}{${L(x)} - ${L(f)}}`,
        },
        { title: "3. Licznik i mianownik", body: `fx = ${L(num)}, \\; x - f = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex("y", value, places) },
      ],
    };
  },
};

const powiekszenie: FormulaDef = {
  id: "powiekszenie",
  subject: "fizyka",
  topic: "Optyka",
  name: "Powiększenie soczewki",
  latex: "p = \\frac{y}{x}",
  vars: [
    { id: "x", label: "x (przedmiot)" },
    { id: "y", label: "y (obraz)" },
  ],
  mode: "fixed",
  outputId: "p",
  outputLabel: "p",
  solve(_unknown, known, places): FormulaSolution {
    const x = asRational(known["x"], "x");
    const y = asRational(known["y"], "y");
    const value = exactOf(div(y, x));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "p = \\frac{y}{x}" },
        { title: "2. Podstawienie danych", body: `p = \\frac{${L(y)}}{${L(x)}}` },
        { title: "3. Wynik", body: resultLatex("p", value, places) },
      ],
    };
  },
};

const siatka: FormulaDef = {
  id: "siatka",
  subject: "fizyka",
  topic: "Optyka",
  name: "Siatka dyfrakcyjna",
  latex: "d\\sin\\alpha = n\\lambda",
  vars: [
    { id: "d", label: "d (stała siatki) [m]" },
    { id: "alfa", label: "α [°]" },
    { id: "n", label: "n (rząd, całkowite)" },
    { id: "lambda", label: "λ [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const rad = (x: number): number => (x * Math.PI) / 180;
    const deg = (x: number): number => (x * 180) / Math.PI;
    if (unknown === "n") {
      const d = num(known["d"]);
      const alfa = num(known["alfa"]);
      const lambda = num(known["lambda"]);
      const s = Math.sin(rad(alfa));
      const nFloat = (d * s) / lambda;
      const n = Math.round(nFloat);
      if (!Number.isFinite(nFloat) || Math.abs(nFloat - n) > 1e-6 || n < 0) {
        throw new Error("rząd nie wychodzi całkowity — sprawdź dane");
      }
      const value = exactOf({ p: BigInt(n), q: 1n });
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = d\\sin\\alpha/\\lambda" },
          {
            title: "2. Podstawienie danych",
            body: `n = ${d} \\cdot \\sin ${alfa}^\\circ / ${lambda}`,
          },
          {
            title: "3. Sinus i iloczyn",
            body: `\\sin ${alfa}^\\circ = ${trimNum(s)}, \\; d\\sin\\alpha = ${trimNum(d * s)}`,
          },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const gn = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`);
      return v;
    };
    if (unknown === "d") {
      const numV = gn("n") * gn("lambda");
      const den = Math.sin(rad(gn("alfa")));
      const value = approxOnly(numV / den);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "d = n\\lambda/\\sin\\alpha" },
          {
            title: "2. Podstawienie danych",
            body: `d = ${gn("n")} \\cdot ${gn("lambda")} / \\sin ${gn("alfa")}^\\circ`,
          },
          {
            title: "3. Licznik i sinus",
            body: `n\\lambda = ${trimNum(numV)}, \\; \\sin\\alpha = ${trimNum(den)}`,
          },
          { title: "4. Wynik", body: resultLatex("d", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "lambda") {
      const numV = gn("d") * Math.sin(rad(gn("alfa")));
      const value = approxOnly(numV / gn("n"));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\lambda = d\\sin\\alpha/n" },
          {
            title: "2. Podstawienie danych",
            body: `\\lambda = ${gn("d")} \\cdot \\sin ${gn("alfa")}^\\circ / ${gn("n")}`,
          },
          { title: "3. Licznik", body: `d\\sin\\alpha = ${trimNum(numV)}` },
          { title: "4. Wynik", body: resultLatex("\\lambda", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const numV = gn("n") * gn("lambda");
    const s = numV / gn("d");
    if (Math.abs(s) > 1) throw new Error("sin α > 1 — sprawdź dane");
    const value = approxOnly(deg(Math.asin(s)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "\\alpha = \\arcsin(n\\lambda/d)" },
        {
          title: "2. Podstawienie danych",
          body: `\\alpha = \\arcsin(${gn("n")} \\cdot ${gn("lambda")} / ${gn("d")})`,
        },
        { title: "3. Argument", body: `n\\lambda/d = ${trimNum(s)}` },
        { title: "4. Wynik", body: resultLatex("\\alpha", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const fale: FormulaDef = {
  id: "fale",
  subject: "fizyka",
  topic: "Fale",
  name: "Prędkość fali",
  latex: "v = \\lambda f",
  vars: [
    { id: "v", label: "v [m/s]" },
    { id: "lambda", label: "λ [m]" },
    { id: "f", label: "f [Hz]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "v") {
      const lambda = asRational(known["lambda"], "λ");
      const f = asRational(known["f"], "f");
      const value = exactOf(mul(lambda, f));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "v = \\lambda f" },
          { title: "2. Podstawienie danych", body: `v = ${L(lambda)} \\cdot ${L(f)}` },
          { title: "3. Wynik", body: resultLatex("v", value, places) },
        ],
      };
    }
    if (unknown === "lambda") {
      const v = asRational(known["v"], "v");
      const f = asRational(known["f"], "f");
      const value = exactOf(div(v, f));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\lambda = v/f" },
          { title: "2. Podstawienie danych", body: `\\lambda = \\frac{${L(v)}}{${L(f)}}` },
          { title: "3. Wynik", body: resultLatex("\\lambda", value, places) },
        ],
      };
    }
    const v = asRational(known["v"], "v");
    const lambda = asRational(known["lambda"], "λ");
    const value = exactOf(div(v, lambda));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "f = v/\\lambda" },
        { title: "2. Podstawienie danych", body: `f = \\frac{${L(v)}}{${L(lambda)}}` },
        { title: "3. Wynik", body: resultLatex("f", value, places) },
      ],
    };
  },
};

const wahadloMat: FormulaDef = {
  id: "wahadlo-mat",
  subject: "fizyka",
  topic: "Drgania",
  name: "Wahadło matematyczne",
  latex: "T = 2\\pi\\sqrt{l/g}",
  vars: [
    { id: "T", label: "T (okres) [s]" },
    { id: "l", label: "l (długość) [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "T") {
      const l = asRational(known["l"], "l");
      if (cmp(l, ZERO) <= 0) throw new Error("długość dodatnia");
      const ratio = num(exactOf(l)) / 10;
      const out = approxOnly(2 * Math.PI * Math.sqrt(ratio));
      return {
        values: [out],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "T = 2\\pi\\sqrt{l/g}" },
          { title: "2. Podstawienie danych", body: `T = 2\\pi\\sqrt{${L(l)}/10}` },
          { title: "3. Ułamek pod pierwiastkiem", body: `l/g = ${trimNum(ratio)}` },
          { title: "4. Wynik", body: resultLatex("T", out, places), note: APPROX_NOTE },
        ],
      };
    }
    const T = known["T"];
    const tNum = num(T);
    const t2 = tNum * tNum;
    const value = approxOnly((10 * t2) / (4 * Math.PI * Math.PI));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "l = gT^2/(4\\pi^2)" },
        { title: "2. Podstawienie danych", body: `l = 10 \\cdot ${formatLatex(T)}^2 / (4\\pi^2)` },
        { title: "3. Kwadrat okresu", body: `T^2 = ${trimNum(t2)}` },
        { title: "4. Wynik", body: resultLatex("l", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

function mulExactNum(e: Exact, k: number): Exact {
  if (e.irr) return approxOnly(approx(e) * k);
  return exactOf(mul(e.rat, of(k)));
}

function mulPiNum(e: Exact): Exact {
  return approxOnly(Math.PI * approx(e));
}

const wahadloSprezyna: FormulaDef = {
  id: "wahadlo-sprezyna",
  subject: "fizyka",
  topic: "Drgania",
  name: "Wahadło sprężynowe",
  latex: "T = 2\\pi\\sqrt{m/k}",
  vars: [
    { id: "T", label: "T (okres) [s]" },
    { id: "m", label: "m (masa) [kg]" },
    { id: "k", label: "k (sprężystość) [N/m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "T") {
      const m = asRational(known["m"], "m");
      const k = asRational(known["k"], "k");
      if (cmp(m, ZERO) <= 0 || cmp(k, ZERO) <= 0) throw new Error("m i k dodatnie");
      const ratio = num(exactOf(m)) / num(exactOf(k));
      const out = mulPiNum(mulExactNum(sqrtRational(div(m, k)), 2));
      return {
        values: [out],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "T = 2\\pi\\sqrt{m/k}" },
          { title: "2. Podstawienie danych", body: `T = 2\\pi\\sqrt{${L(m)}/${L(k)}}` },
          { title: "3. Ułamek pod pierwiastkiem", body: `m/k = ${trimNum(ratio)}` },
          { title: "4. Wynik", body: resultLatex("T", out, places) },
        ],
      };
    }
    const T = known["T"];
    const tNum = num(T);
    if (unknown === "m") {
      const k = asRational(known["k"], "k");
      const t2 = tNum * tNum;
      const value = approxOnly((num(exactOf(k)) * t2) / (4 * Math.PI * Math.PI));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = kT^2/(4\\pi^2)" },
          {
            title: "2. Podstawienie danych",
            body: `m = ${L(k)} \\cdot ${formatLatex(T)}^2 / (4\\pi^2)`,
          },
          { title: "3. Kwadrat okresu", body: `T^2 = ${trimNum(t2)}` },
          { title: "4. Wynik", body: resultLatex("m", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const m = asRational(known["m"], "m");
    const t2 = tNum * tNum;
    const value = approxOnly((4 * Math.PI * Math.PI * num(exactOf(m))) / t2);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "k = 4\\pi^2m/T^2" },
        {
          title: "2. Podstawienie danych",
          body: `k = 4\\pi^2 \\cdot ${L(m)} / ${formatLatex(T)}^2`,
        },
        { title: "3. Kwadrat okresu", body: `T^2 = ${trimNum(t2)}` },
        { title: "4. Wynik", body: resultLatex("k", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const foto: FormulaDef = {
  id: "foto",
  subject: "fizyka",
  topic: "Fizyka atomowa",
  name: "Zjawisko fotoelektryczne",
  latex: "E_f = W + E_k",
  vars: [
    { id: "Ef", label: "E_f (foton) [eV]" },
    { id: "W", label: "W (praca wyjścia) [eV]" },
    { id: "Ek", label: "E_k (kinetyczna) [eV]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Ef") {
      const W = asRational(known["W"], "W");
      const Ek = asRational(known["Ek"], "Ek");
      const value = exactOf(add(W, Ek));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E_f = W + E_k" },
          { title: "2. Podstawienie danych", body: `E_f = ${L(W)} + ${L(Ek)}` },
          { title: "3. Wynik", body: resultLatex("E_f", value, places) },
        ],
      };
    }
    if (unknown === "W") {
      const Ef = asRational(known["Ef"], "Ef");
      const Ek = asRational(known["Ek"], "Ek");
      const value = exactOf(sub(Ef, Ek));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = E_f - E_k" },
          { title: "2. Podstawienie danych", body: `W = ${L(Ef)} - ${L(Ek)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    const Ef = asRational(known["Ef"], "Ef");
    const W = asRational(known["W"], "W");
    const value = exactOf(sub(Ef, W));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "E_k = E_f - W" },
        { title: "2. Podstawienie danych", body: `E_k = ${L(Ef)} - ${L(W)}` },
        { title: "3. Wynik", body: resultLatex("E_k", value, places) },
      ],
    };
  },
};

const emc2: FormulaDef = {
  id: "emc2",
  subject: "fizyka",
  topic: "Fizyka atomowa",
  name: "Równoważność masy i energii",
  latex: "E = mc^2",
  vars: [
    { id: "E", label: "E [J]" },
    { id: "m", label: "m [kg]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "E") {
      const m = num(known["m"]);
      const c2 = C_LIGHT * C_LIGHT;
      const value = approxOnly(m * c2);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E = mc^2" },
          { title: "2. Podstawienie danych", body: `E = ${m}c^2` },
          { title: "3. Kwadrat prędkości światła", body: `c^2 = (3 \\cdot 10^8)^2 = ${c2}` },
          { title: "4. Wynik", body: resultLatex("E", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const E = num(known["E"]);
    const c2 = C_LIGHT * C_LIGHT;
    const value = approxOnly(E / c2);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "m = E/c^2" },
        { title: "2. Podstawienie danych", body: `m = ${E}/c^2` },
        { title: "3. Kwadrat prędkości światła", body: `c^2 = (3 \\cdot 10^8)^2 = ${c2}` },
        { title: "4. Wynik", body: resultLatex("m", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const rozpad: FormulaDef = {
  id: "rozpad",
  subject: "fizyka",
  topic: "Fizyka atomowa",
  name: "Prawo rozpadu promieniotwórczego",
  latex: "N = N_0(1/2)^{t/T}",
  vars: [
    { id: "N", label: "N (pozostałe jądra)" },
    { id: "N0", label: "N₀ (początkowe)" },
    { id: "t", label: "t (czas)" },
    { id: "T", label: "T (okres połowicznego zaniku)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v) || v < 0) throw new Error(`${id}: wpisz nieujemną liczbę`);
      return v;
    };
    if (unknown === "N") {
      const ratio = g("t") / g("T");
      const pw = 0.5 ** ratio;
      const value = approxOnly(g("N0") * pw);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "N = N_0(1/2)^{t/T}" },
          { title: "2. Podstawienie danych", body: `N = ${g("N0")}(1/2)^{${g("t")}/${g("T")}}` },
          {
            title: "3. Wykładnik i potęga",
            body: `t/T = ${trimNum(ratio)}, \\; (1/2)^{${trimNum(ratio)}} = ${trimNum(pw)}`,
          },
          { title: "4. Wynik", body: resultLatex("N", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "N0") {
      const ratio = g("t") / g("T");
      const pw = 2 ** ratio;
      const value = approxOnly(g("N") * pw);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "N_0 = N 2^{t/T}" },
          { title: "2. Podstawienie danych", body: `N_0 = ${g("N")} 2^{${g("t")}/${g("T")}}` },
          {
            title: "3. Wykładnik i potęga",
            body: `t/T = ${trimNum(ratio)}, \\; 2^{${trimNum(ratio)}} = ${trimNum(pw)}`,
          },
          { title: "4. Wynik", body: resultLatex("N_0", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (g("N0") <= 0 || g("N") <= 0 || g("N") > g("N0")) {
      throw new Error("wymagane 0 < N ≤ N₀");
    }
    const log2 = Math.log2(g("N0") / g("N"));
    if (unknown === "t") {
      const value = approxOnly(g("T") * log2);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "t = T log_2(N_0/N)" },
          { title: "2. Podstawienie danych", body: `t = ${g("T")} log_2(${g("N0")}/${g("N")})` },
          { title: "3. Logarytm", body: `\\log_2(${g("N0")}/${g("N")}) = ${trimNum(log2)}` },
          { title: "4. Wynik", body: resultLatex("t", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (log2 === 0) throw new Error("N = N₀ — czas nieokreślony");
    const value = approxOnly(g("t") / log2);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "T = t/log_2(N_0/N)" },
        { title: "2. Podstawienie danych", body: `T = ${g("t")}/log_2(${g("N0")}/${g("N")})` },
        { title: "3. Logarytm", body: `\\log_2(${g("N0")}/${g("N")}) = ${trimNum(log2)}` },
        { title: "4. Wynik", body: resultLatex("T", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const energiaWewnetrzna: FormulaDef = {
  id: "energia-wewnetrzna",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "Energia wewnętrzna gazu doskonałego",
  latex: "U = \\frac{3}{2}nRT",
  vars: [
    { id: "U", label: "U [J]" },
    { id: "n", label: "n [mol]" },
    { id: "T", label: "T [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const R = 8.31;
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v) || v < 0) throw new Error(`${id}: wpisz nieujemną liczbę`);
      return v;
    };
    if (unknown === "U") {
      const nRT = g("n") * R * g("T");
      const value = approxOnly((3 * nRT) / 2);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "U = \\frac{3}{2}nRT" },
          {
            title: "2. Podstawienie danych",
            body: `U = \\frac{3}{2} \\cdot ${g("n")} \\cdot 8{,}31 \\cdot ${g("T")}`,
          },
          { title: "3. Iloczyn nRT", body: `nRT = ${trimNum(nRT)}` },
          { title: "4. Wynik", body: resultLatex("U", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "n") {
      const den = R * g("T");
      const value = approxOnly((2 * g("U")) / (3 * den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\frac{2U}{3RT}" },
          {
            title: "2. Podstawienie danych",
            body: `n = \\frac{2 \\cdot ${g("U")}}{3 \\cdot 8{,}31 \\cdot ${g("T")}}`,
          },
          { title: "3. Mianownik", body: `3RT = ${trimNum(3 * den)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const den = R * g("n");
    const value = approxOnly((2 * g("U")) / (3 * den));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "T = \\frac{2U}{3nR}" },
        {
          title: "2. Podstawienie danych",
          body: `T = \\frac{2 \\cdot ${g("U")}}{3 \\cdot ${g("n")} \\cdot 8{,}31}`,
        },
        { title: "3. Mianownik", body: `3nR = ${trimNum(3 * den)}` },
        { title: "4. Wynik", body: resultLatex("T", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const opornikiSzeregowo: FormulaDef = {
  id: "oporniki-szeregowo",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Oporniki szeregowo",
  latex: "R_z = R_1 + R_2",
  vars: [
    { id: "Rz", label: "Rz [Ω]" },
    { id: "R1", label: "R₁ [Ω]" },
    { id: "R2", label: "R₂ [Ω]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Rz") {
      const R1 = asRational(known["R1"], "R₁");
      const R2 = asRational(known["R2"], "R₂");
      const value = exactOf(add(R1, R2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "R_z = R_1 + R_2" },
          { title: "2. Podstawienie danych", body: `R_z = ${L(R1)} + ${L(R2)}` },
          { title: "3. Wynik", body: resultLatex("R_z", value, places) },
        ],
      };
    }
    const Rz = asRational(known["Rz"], "Rz");
    const other = unknown === "R1" ? "R2" : "R1";
    const o = asRational(known[other], other);
    const value = exactOf(sub(Rz, o));
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${other} = R_z - ${other === "R2" ? "R_2" : "R_1"}`,
        },
        { title: "2. Podstawienie danych", body: `${unknown} = ${L(Rz)} - ${L(o)}` },
        { title: "3. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const opornikiRownolegle: FormulaDef = {
  id: "oporniki-rownolegle",
  subject: "fizyka",
  topic: "Prąd stały",
  name: "Oporniki równolegle",
  latex: "\\frac{1}{R_z} = \\frac{1}{R_1} + \\frac{1}{R_2}",
  vars: [
    { id: "Rz", label: "Rz [Ω]" },
    { id: "R1", label: "R₁ [Ω]" },
    { id: "R2", label: "R₂ [Ω]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "Rz") {
      const sum = add(div(ONE, g("R1")), div(ONE, g("R2")));
      const value = exactOf(div(ONE, sum));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\frac{1}{R_z} = \\frac{1}{R_1} + \\frac{1}{R_2}",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\frac{1}{R_z} = \\frac{1}{${L(g("R1"))}} + \\frac{1}{${L(g("R2"))}}`,
          },
          { title: "3. Suma odwrotności", body: `\\frac{1}{R_z} = ${L(sum)}` },
          { title: "4. Wynik", body: resultLatex("R_z", value, places) },
        ],
      };
    }
    const other = unknown === "R1" ? "R2" : "R1";
    const inv = sub(div(ONE, g("Rz")), div(ONE, g(other)));
    const value = exactOf(div(ONE, inv));
    const sym = unknown === "R1" ? "R_1" : "R_2";
    const so = unknown === "R1" ? "R_2" : "R_1";
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `\\frac{1}{${sym}} = \\frac{1}{R_z} - \\frac{1}{${so}}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `\\frac{1}{${sym}} = \\frac{1}{${L(g("Rz"))}} - \\frac{1}{${L(g(other))}}`,
        },
        { title: "3. Różnica odwrotności", body: `\\frac{1}{${sym}} = ${L(inv)}` },
        { title: "4. Wynik", body: resultLatex(sym, value, places) },
      ],
    };
  },
};

const doppler: FormulaDef = {
  id: "doppler",
  subject: "fizyka",
  topic: "Fale · ROZSZ",
  name: "Efekt Dopplera (źródło zbliża się)",
  latex: "f' = f\\frac{V}{V - v_s}",
  vars: [
    { id: "fp", label: "f' [Hz]" },
    { id: "f", label: "f [Hz]" },
    { id: "vs", label: "v_s [m/s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const V = 340;
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v) || v < 0) throw new Error(`${id}: wpisz nieujemną liczbę`);
      return v;
    };
    if (unknown === "fp") {
      const den = V - g("vs");
      if (den <= 0) throw new Error("v_s < V — źródło wolniejsze od dźwięku");
      const ratio = V / den;
      const value = approxOnly(g("f") * ratio);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "f' = f\\frac{V}{V - v_s}, \\; V = 340 m/s" },
          {
            title: "2. Podstawienie danych",
            body: `f' = ${g("f")} \\cdot \\frac{340}{340 - ${g("vs")}}`,
          },
          {
            title: "3. Mianownik i stosunek",
            body: `V - v_s = ${trimNum(den)}, \\; V/(V-v_s) = ${trimNum(ratio)}`,
          },
          { title: "4. Wynik", body: resultLatex("f'", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "f") {
      const den = V - g("vs");
      if (den <= 0) throw new Error("v_s < V — źródło wolniejsze od dźwięku");
      const value = approxOnly((g("fp") * den) / V);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "f = f'\\frac{V - v_s}{V}" },
          {
            title: "2. Podstawienie danych",
            body: `f = ${g("fp")} \\cdot \\frac{340 - ${g("vs")}}{340}`,
          },
          { title: "3. Licznik", body: `V - v_s = ${trimNum(den)}` },
          { title: "4. Wynik", body: resultLatex("f", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const ratio = g("fp") / g("f");
    const value = approxOnly(V * (1 - 1 / ratio));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "v_s = V(1 - f/f')" },
        {
          title: "2. Podstawienie danych",
          body: `v_s = 340(1 - ${g("f")}/${g("fp")})`,
        },
        { title: "3. Stosunek", body: `f/f' = ${trimNum(1 / ratio)}` },
        { title: "4. Wynik", body: resultLatex("v_s", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const katGraniczny: FormulaDef = {
  id: "kat-graniczny",
  subject: "fizyka",
  topic: "Optyka",
  name: "Kąt graniczny",
  latex: "\\sin\\alpha_{gr} = \\frac{1}{n}",
  vars: [
    { id: "alfa", label: "α_gr [°]" },
    { id: "n", label: "n" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const deg = (r: number): number => (r * 180) / Math.PI;
    if (unknown === "alfa") {
      const n = asRational(known["n"], "n");
      if (cmp(n, ONE) < 0) throw new Error("całkowite odbicie wymaga n ≥ 1");
      const s = 1 / approx(exactOf(n));
      const value = approxOnly(deg(Math.asin(s)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\sin\\alpha_{gr} = \\frac{1}{n}" },
          { title: "2. Podstawienie danych", body: `\\sin\\alpha_{gr} = \\frac{1}{${L(n)}}` },
          { title: "3. Sinus", body: `\\sin\\alpha_{gr} = ${trimNum(s)}` },
          {
            title: "4. Wynik",
            body: resultLatex("\\alpha_{gr}", value, places),
            note: APPROX_NOTE,
          },
        ],
      };
    }
    const alfa = num(known["alfa"]);
    const s = Math.sin((alfa * Math.PI) / 180);
    if (!(s > 0)) throw new Error("sin α > 0 — kąt ostry");
    const value = approxOnly(1 / s);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "n = \\frac{1}{\\sin\\alpha_{gr}}" },
        { title: "2. Podstawienie danych", body: `n = \\frac{1}{\\sin ${alfa}^\\circ}` },
        { title: "3. Sinus", body: `\\sin\\alpha_{gr} = ${trimNum(s)}` },
        { title: "4. Wynik", body: resultLatex("n", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const boyle: FormulaDef = {
  id: "boyle",
  subject: "fizyka",
  topic: "Termodynamika",
  name: "Prawo Boyle'a-Mariotte'a (izoterma)",
  latex: "p_1V_1 = p_2V_2",
  vars: [
    { id: "p1", label: "p₁ [Pa]" },
    { id: "V1", label: "V₁ [m³]" },
    { id: "p2", label: "p₂ [Pa]" },
    { id: "V2", label: "V₂ [m³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const side = (a: string, b: string) => mul(g(a), g(b));
    if (unknown === "p1" || unknown === "p2") {
      const other = unknown === "p1" ? "p2" : "p1";
      const vThis = unknown === "p1" ? "V1" : "V2";
      const vOther = unknown === "p1" ? "V2" : "V1";
      const num = side(other, vOther);
      const value = exactOf(div(num, g(vThis)));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: `${unknown} = \\frac{${other} \\cdot ${vOther}}{${vThis}}`,
          },
          {
            title: "2. Podstawienie danych",
            body: `${unknown} = \\frac{${L(g(other))} \\cdot ${L(g(vOther))}}{${L(g(vThis))}}`,
          },
          { title: "3. Licznik", body: `${L(num)}` },
          { title: "4. Wynik", body: resultLatex(unknown, value, places) },
        ],
      };
    }
    const num = unknown === "V1" ? "p2" : "p1";
    const numV = unknown === "V1" ? "V2" : "V1";
    const den = unknown === "V1" ? "p1" : "p2";
    const prod = side(num, numV);
    const value = exactOf(div(prod, g(den)));
    const lab = unknown === "V1" ? "V_1" : "V_2";
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${lab} = \\frac{${num} \\cdot ${numV}}{${den}}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${lab} = \\frac{${L(g(num))} \\cdot ${L(g(numV))}}{${L(g(den))}}`,
        },
        { title: "3. Licznik", body: `${L(prod)}` },
        { title: "4. Wynik", body: resultLatex(lab, value, places) },
      ],
    };
  },
};

const gaylussac: FormulaDef = {
  id: "gaylussac",
  subject: "fizyka",
  topic: "Termodynamika",
  name: "Prawo Gay-Lussaca (izobara)",
  latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
  vars: [
    { id: "V1", label: "V₁ [m³]" },
    { id: "T1", label: "T₁ [K]" },
    { id: "V2", label: "V₂ [m³]" },
    { id: "T2", label: "T₂ [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const pair = (a: string, b: string) => mul(g(a), g(b));
    if (unknown === "V1" || unknown === "V2") {
      const other = unknown === "V1" ? "V2" : "V1";
      const tThis = unknown === "V1" ? "T1" : "T2";
      const tOther = unknown === "V1" ? "T2" : "T1";
      const num = pair(other, tThis);
      const value = exactOf(div(num, g(tOther)));
      const lab = unknown === "V1" ? "V_1" : "V_2";
      const lo = unknown === "V1" ? "V_2" : "V_1";
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: `${lab} = ${lo}\\frac{${tThis}}{${tOther}}` },
          {
            title: "2. Podstawienie danych",
            body: `${lab} = ${L(g(other))} \\cdot \\frac{${L(g(tThis))}}{${L(g(tOther))}}`,
          },
          { title: "3. Licznik", body: `${L(num)}` },
          { title: "4. Wynik", body: resultLatex(lab, value, places) },
        ],
      };
    }
    const numV = unknown === "T1" ? "V1" : "V2";
    const denV = unknown === "T1" ? "V2" : "V1";
    const tO = unknown === "T1" ? "T2" : "T1";
    const numerator = mul(g(numV), g(tO));
    const value = exactOf(div(numerator, g(denV)));
    const lab = unknown === "T1" ? "T_1" : "T_2";
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${lab} = ${tO}\\frac{${numV}}{${denV}}` },
        {
          title: "2. Podstawienie danych",
          body: `${lab} = ${L(g(tO))} \\cdot \\frac{${L(g(numV))}}{${L(g(denV))}}`,
        },
        { title: "3. Licznik", body: `${L(numerator)}` },
        { title: "4. Wynik", body: resultLatex(lab, value, places) },
      ],
    };
  },
};

const charles: FormulaDef = {
  id: "charles",
  subject: "fizyka",
  topic: "Termodynamika",
  name: "Prawo Charlesa (izochora)",
  latex: "\\frac{p_1}{T_1} = \\frac{p_2}{T_2}",
  vars: [
    { id: "p1", label: "p₁ [Pa]" },
    { id: "T1", label: "T₁ [K]" },
    { id: "p2", label: "p₂ [Pa]" },
    { id: "T2", label: "T₂ [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const pair = (a: string, b: string) => mul(g(a), g(b));
    if (unknown === "p1" || unknown === "p2") {
      const other = unknown === "p1" ? "p2" : "p1";
      const tThis = unknown === "p1" ? "T1" : "T2";
      const tOther = unknown === "p1" ? "T2" : "T1";
      const num = pair(other, tThis);
      const value = exactOf(div(num, g(tOther)));
      const lab = unknown === "p1" ? "p_1" : "p_2";
      const lo = unknown === "p1" ? "p_2" : "p_1";
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: `${lab} = ${lo}\\frac{${tThis}}{${tOther}}` },
          {
            title: "2. Podstawienie danych",
            body: `${lab} = ${L(g(other))} \\cdot \\frac{${L(g(tThis))}}{${L(g(tOther))}}`,
          },
          { title: "3. Licznik", body: `${L(num)}` },
          { title: "4. Wynik", body: resultLatex(lab, value, places) },
        ],
      };
    }
    const numV = unknown === "T1" ? "p1" : "p2";
    const denV = unknown === "T1" ? "p2" : "p1";
    const tO = unknown === "T1" ? "T2" : "T1";
    const numerator = mul(g(numV), g(tO));
    const value = exactOf(div(numerator, g(denV)));
    const lab = unknown === "T1" ? "T_1" : "T_2";
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${lab} = ${tO}\\frac{${numV}}{${denV}}` },
        {
          title: "2. Podstawienie danych",
          body: `${lab} = ${L(g(tO))} \\cdot \\frac{${L(g(numV))}}{${L(g(denV))}}`,
        },
        { title: "3. Licznik", body: `${L(numerator)}` },
        { title: "4. Wynik", body: resultLatex(lab, value, places) },
      ],
    };
  },
};

export const PHYSICS_PP: FormulaDef[] = [
  moc,
  sprawnosc,
  ped,
  zderzenia,
  ruchOkrag,
  grawitacja,
  kepler,
  archimedes,
  hydrostatyczne,
  cieplo,
  cieploPrzemiany,
  ohm,
  opor,
  mocPradu,
  energiaPradu,
  lorentz,
  snell,
  soczewki,
  powiekszenie,
  siatka,
  fale,
  wahadloMat,
  wahadloSprezyna,
  foto,
  emc2,
  rozpad,
  energiaWewnetrzna,
  opornikiSzeregowo,
  opornikiRownolegle,
  doppler,
  katGraniczny,
  boyle,
  gaylussac,
  charles,
];
