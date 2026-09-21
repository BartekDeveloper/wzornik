import { ONE, ZERO, add, cmp, div, mul, of, sub } from "../exact/rational";
import { approx, approxOnly, exactOf, mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;
const G10 = of(10);
const APPROX_NOTE = "wynik przybliżony (stałe fizyczne liczę numerycznie)";
const K_COULOMB = 8.99e9;
const C_LIGHT = 3e8;

function num(e: Exact): number {
  return approx(e);
}

const rzutPoziomy: FormulaDef = {
  id: "rzut-poziomy",
  subject: "fizyka",
  topic: "Rzut poziomy · ROZSZ",
  name: "Rzut poziomy (zasięg i czas)",
  latex: "Z = v_0t, \\; t = \\sqrt{\\frac{2h}{g}}",
  vars: [
    { id: "Z", label: "Z (zasięg) [m]" },
    { id: "v0", label: "v₀ [m/s]" },
    { id: "h", label: "h [m]" },
    { id: "t", label: "t [s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "t") {
      const h = asRational(known["h"], "h");
      if (cmp(h, ZERO) < 0) throw new Error("wysokość nieujemna");
      const inner = div(mul(h, of(2)), G10);
      const value = sqrtRational(inner);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "t = \\sqrt{\\frac{2h}{g}}" },
          { title: "2. Podstawienie danych", body: `t = \\sqrt{\\frac{2 \\cdot ${L(h)}}{10}}` },
          { title: "3. Ułamek pod pierwiastkiem", body: `\\frac{2h}{g} = ${L(inner)}` },
          { title: "4. Wynik", body: resultLatex("t", value, places) },
        ],
      };
    }
    if (unknown === "Z") {
      const v0 = asRational(known["v0"], "v₀");
      const h = asRational(known["h"], "h");
      const t = sqrtRational(div(mul(h, of(2)), G10));
      const value = mulRat(t, v0);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "Z = v_0t, \\; t = \\sqrt{2h/g}" },
          {
            title: "2. Podstawienie danych",
            body: `Z = ${L(v0)} \\cdot \\sqrt{2 \\cdot ${L(h)}/10}`,
          },
          { title: "3. Czas lotu", body: `t = ${formatLatex(t)}` },
          { title: "4. Wynik", body: resultLatex("Z", value, places) },
        ],
      };
    }
    if (unknown === "v0") {
      const Z = asRational(known["Z"], "Z");
      const t = asRational(known["t"], "t");
      const value = exactOf(div(Z, t));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "v_0 = \\frac{Z}{t}" },
          { title: "2. Podstawienie danych", body: `v_0 = \\frac{${L(Z)}}{${L(t)}}` },
          { title: "3. Wynik", body: resultLatex("v_0", value, places) },
        ],
      };
    }
    const t = asRational(known["t"], "t");
    const t2 = mul(t, t);
    const value = exactOf(div(mul(G10, t2), of(2)));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "h = \\frac{gt^2}{2}" },
        { title: "2. Podstawienie danych", body: `h = \\frac{10 \\cdot ${L(t)}^2}{2}` },
        { title: "3. Kwadrat czasu", body: `t^2 = ${L(t2)}` },
        { title: "4. Wynik", body: resultLatex("h", value, places) },
      ],
    };
  },
};

const momentSily: FormulaDef = {
  id: "moment-sily",
  subject: "fizyka",
  topic: "Ruch obrotowy · ROZSZ",
  name: "Moment siły",
  latex: "M = F \\cdot r",
  vars: [
    { id: "M", label: "M [N·m]" },
    { id: "F", label: "F [N]" },
    { id: "r", label: "r [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "M") {
      const F = asRational(known["F"], "F");
      const r = asRational(known["r"], "r");
      const value = exactOf(mul(F, r));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "M = F \\cdot r" },
          { title: "2. Podstawienie danych", body: `M = ${L(F)} \\cdot ${L(r)}` },
          { title: "3. Wynik", body: resultLatex("M", value, places) },
        ],
      };
    }
    if (unknown === "F") {
      const M = asRational(known["M"], "M");
      const r = asRational(known["r"], "r");
      const value = exactOf(div(M, r));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F = \\frac{M}{r}" },
          { title: "2. Podstawienie danych", body: `F = \\frac{${L(M)}}{${L(r)}}` },
          { title: "3. Wynik", body: resultLatex("F", value, places) },
        ],
      };
    }
    const M = asRational(known["M"], "M");
    const F = asRational(known["F"], "F");
    const value = exactOf(div(M, F));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\frac{M}{F}" },
        { title: "2. Podstawienie danych", body: `r = \\frac{${L(M)}}{${L(F)}}` },
        { title: "3. Wynik", body: resultLatex("r", value, places) },
      ],
    };
  },
};

const energiaObrotowa: FormulaDef = {
  id: "energia-obrotowa",
  subject: "fizyka",
  topic: "Ruch obrotowy · ROZSZ",
  name: "Energia kinetyczna ruchu obrotowego",
  latex: "E = \\frac{I\\omega^2}{2}",
  vars: [
    { id: "E", label: "E [J]" },
    { id: "I", label: "I [kg·m²]" },
    { id: "w", label: "ω [rad/s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "E") {
      const I = asRational(known["I"], "I");
      const w = asRational(known["w"], "ω");
      const w2 = mul(w, w);
      const value = exactOf(div(mul(I, w2), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E = \\frac{I\\omega^2}{2}" },
          { title: "2. Podstawienie danych", body: `E = \\frac{${L(I)} \\cdot ${L(w)}^2}{2}` },
          { title: "3. Kwadrat prędkości kątowej", body: `\\omega^2 = ${L(w2)}` },
          { title: "4. Wynik", body: resultLatex("E", value, places) },
        ],
      };
    }
    if (unknown === "I") {
      const E = asRational(known["E"], "E");
      const w = asRational(known["w"], "ω");
      const w2 = mul(w, w);
      const num = mul(E, of(2));
      const value = exactOf(div(num, w2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "I = \\frac{2E}{\\omega^2}" },
          { title: "2. Podstawienie danych", body: `I = \\frac{2 \\cdot ${L(E)}}{${L(w)}^2}` },
          { title: "3. Licznik i kwadrat", body: `2E = ${L(num)}, \\; \\omega^2 = ${L(w2)}` },
          { title: "4. Wynik", body: resultLatex("I", value, places) },
        ],
      };
    }
    const E = asRational(known["E"], "E");
    const I = asRational(known["I"], "I");
    if (cmp(E, ZERO) < 0 || cmp(I, ZERO) <= 0) throw new Error("E ≥ 0 i I > 0");
    const inner = div(mul(E, of(2)), I);
    const value = sqrtRational(inner);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "\\omega = \\sqrt{\\frac{2E}{I}}" },
        {
          title: "2. Podstawienie danych",
          body: `\\omega = \\sqrt{\\frac{2 \\cdot ${L(E)}}{${L(I)}}}`,
        },
        { title: "3. Ułamek pod pierwiastkiem", body: `\\frac{2E}{I} = ${L(inner)}` },
        { title: "4. Wynik", body: resultLatex("\\omega", value, places) },
      ],
    };
  },
};

const bernoulli: FormulaDef = {
  id: "bernoulli",
  subject: "fizyka",
  topic: "Hydrodynamika · ROZSZ",
  name: "Równanie Bernoulliego",
  latex: "p_2 = p_1 + \\rho g(h_1 - h_2) + \\frac{\\rho}{2}(v_1^2 - v_2^2)",
  vars: [
    { id: "p1", label: "p₁ [Pa]" },
    { id: "ro", label: "ρ [kg/m³]" },
    { id: "h1", label: "h₁ [m]" },
    { id: "v1", label: "v₁ [m/s]" },
    { id: "h2", label: "h₂ [m]" },
    { id: "v2", label: "v₂ [m/s]" },
  ],
  mode: "fixed",
  outputId: "p2",
  outputLabel: "p₂",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const dh = sub(g("h1"), g("h2"));
    const dv2 = sub(mul(g("v1"), g("v1")), mul(g("v2"), g("v2")));
    const termH = mul(mul(g("ro"), G10), dh);
    const termV = div(mul(g("ro"), dv2), of(2));
    const value = exactOf(add(add(g("p1"), termH), termV));
    return {
      values: [value],
      steps: [
        {
          title: "1. Równanie",
          body: "p_2 = p_1 + \\rho g(h_1 - h_2) + \\frac{\\rho}{2}(v_1^2 - v_2^2)",
        },
        {
          title: "2. Podstawienie danych",
          body: `p_2 = ${L(g("p1"))} + ${L(g("ro"))} \\cdot 10(${L(g("h1"))} - ${L(g("h2"))}) + \\frac{${L(g("ro"))}}{2}(${L(g("v1"))}^2 - ${L(g("v2"))}^2)`,
        },
        {
          title: "3. Człony",
          body: `\\rho g\\Delta h = ${L(termH)}, \\; \\frac{\\rho}{2}\\Delta(v^2) = ${L(termV)}`,
        },
        { title: "4. Wynik", body: resultLatex("p_2", value, places) },
      ],
    };
  },
};

const clapeyron: FormulaDef = {
  id: "clapeyron",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "Równanie Clapeyrona",
  latex: "pV = nRT",
  vars: [
    { id: "p", label: "p [Pa]" },
    { id: "V", label: "V [m³]" },
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
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`);
      return v;
    };
    let value: Exact;
    let transform = "";
    let subst = "";
    let mid = "";
    if (unknown === "p") {
      const num = g("n") * R * g("T");
      value = approxOnly(num / g("V"));
      transform = "p = nRT/V";
      subst = `p = ${g("n")} \\cdot 8{,}31 \\cdot ${g("T")} / ${g("V")}`;
      mid = `nRT = ${trimNum(num)}`;
    } else if (unknown === "V") {
      const num = g("n") * R * g("T");
      value = approxOnly(num / g("p"));
      transform = "V = nRT/p";
      subst = `V = ${g("n")} \\cdot 8{,}31 \\cdot ${g("T")} / ${g("p")}`;
      mid = `nRT = ${trimNum(num)}`;
    } else if (unknown === "n") {
      const num = g("p") * g("V");
      const den = R * g("T");
      value = approxOnly(num / den);
      transform = "n = pV/(RT)";
      subst = `n = ${g("p")} \\cdot ${g("V")} / (8{,}31 \\cdot ${g("T")})`;
      mid = `pV = ${trimNum(num)}, \\; RT = ${trimNum(den)}`;
    } else {
      const num = g("p") * g("V");
      const den = R * g("n");
      value = approxOnly(num / den);
      transform = "T = pV/(nR)";
      subst = `T = ${g("p")} \\cdot ${g("V")} / (${g("n")} \\cdot 8{,}31)`;
      mid = `pV = ${trimNum(num)}, \\; nR = ${trimNum(den)}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Licznik i mianownik", body: mid },
        { title: "4. Wynik", body: resultLatex(unknown, value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const pierwszaZasada: FormulaDef = {
  id: "pierwsza-zasada",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "I zasada termodynamiki",
  latex: "\\Delta U = W + Q",
  vars: [
    { id: "dU", label: "ΔU [J]" },
    { id: "W", label: "W (nad gazem) [J]" },
    { id: "Q", label: "Q (ciepło) [J]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "dU") {
      const W = asRational(known["W"], "W");
      const Q = asRational(known["Q"], "Q");
      const value = exactOf(add(W, Q));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\Delta U = W + Q" },
          { title: "2. Podstawienie danych", body: `\\Delta U = ${L(W)} + ${L(Q)}` },
          { title: "3. Wynik", body: resultLatex("\\Delta U", value, places) },
        ],
      };
    }
    if (unknown === "W") {
      const dU = asRational(known["dU"], "ΔU");
      const Q = asRational(known["Q"], "Q");
      const value = exactOf(sub(dU, Q));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = \\Delta U - Q" },
          { title: "2. Podstawienie danych", body: `W = ${L(dU)} - ${L(Q)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    const dU = asRational(known["dU"], "ΔU");
    const W = asRational(known["W"], "W");
    const value = exactOf(sub(dU, W));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "Q = \\Delta U - W" },
        { title: "2. Podstawienie danych", body: `Q = ${L(dU)} - ${L(W)}` },
        { title: "3. Wynik", body: resultLatex("Q", value, places) },
      ],
    };
  },
};

const izobaryczna: FormulaDef = {
  id: "izobaryczna",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "Praca w przemianie izobarycznej",
  latex: "W = p(V_2 - V_1)",
  vars: [
    { id: "W", label: "W [J]" },
    { id: "p", label: "p [Pa]" },
    { id: "V1", label: "V₁ [m³]" },
    { id: "V2", label: "V₂ [m³]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "W") {
      const dV = sub(g("V2"), g("V1"));
      const value = exactOf(mul(g("p"), dV));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = p(V_2 - V_1)" },
          {
            title: "2. Podstawienie danych",
            body: `W = ${L(g("p"))}(${L(g("V2"))} - ${L(g("V1"))})`,
          },
          { title: "3. Przyrost objętości", body: `V_2 - V_1 = ${L(dV)}` },
          { title: "4. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    if (unknown === "p") {
      const dV = sub(g("V2"), g("V1"));
      const value = exactOf(div(g("W"), dV));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "p = \\frac{W}{V_2 - V_1}" },
          {
            title: "2. Podstawienie danych",
            body: `p = \\frac{${L(g("W"))}}{${L(g("V2"))} - ${L(g("V1"))}}`,
          },
          { title: "3. Mianownik", body: `V_2 - V_1 = ${L(dV)}` },
          { title: "4. Wynik", body: resultLatex("p", value, places) },
        ],
      };
    }
    if (unknown === "V2") {
      const frac = div(g("W"), g("p"));
      const value = exactOf(add(g("V1"), frac));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V_2 = V_1 + \\frac{W}{p}" },
          {
            title: "2. Podstawienie danych",
            body: `V_2 = ${L(g("V1"))} + \\frac{${L(g("W"))}}{${L(g("p"))}}`,
          },
          { title: "3. Ułamek", body: `\\frac{W}{p} = ${L(frac)}` },
          { title: "4. Wynik", body: resultLatex("V_2", value, places) },
        ],
      };
    }
    const frac = div(g("W"), g("p"));
    const value = exactOf(sub(g("V2"), frac));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "V_1 = V_2 - \\frac{W}{p}" },
        {
          title: "2. Podstawienie danych",
          body: `V_1 = ${L(g("V2"))} - \\frac{${L(g("W"))}}{${L(g("p"))}}`,
        },
        { title: "3. Ułamek", body: `\\frac{W}{p} = ${L(frac)}` },
        { title: "4. Wynik", body: resultLatex("V_1", value, places) },
      ],
    };
  },
};

const carnot: FormulaDef = {
  id: "carnot",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "Sprawność cyklu Carnota",
  latex: "\\eta = \\frac{T_1 - T_2}{T_1}",
  vars: [
    { id: "eta", label: "η (0–1)" },
    { id: "T1", label: "T₁ (grzejnica) [K]" },
    { id: "T2", label: "T₂ (chłodnica) [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "eta") {
      const T1 = asRational(known["T1"], "T₁");
      const T2 = asRational(known["T2"], "T₂");
      const diff = sub(T1, T2);
      const value = exactOf(div(diff, T1));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\eta = \\frac{T_1 - T_2}{T_1}" },
          {
            title: "2. Podstawienie danych",
            body: `\\eta = \\frac{${L(T1)} - ${L(T2)}}{${L(T1)}}`,
          },
          { title: "3. Licznik", body: `T_1 - T_2 = ${L(diff)}` },
          {
            title: "4. Wynik",
            body: resultLatex("\\eta", value, places),
            note: "ułamek × 100% to procenty",
          },
        ],
      };
    }
    if (unknown === "T1") {
      const eta = asRational(known["eta"], "η");
      const T2 = asRational(known["T2"], "T₂");
      const den = sub(ONE, eta);
      const value = exactOf(div(T2, den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "T_1 = \\frac{T_2}{1 - \\eta}" },
          { title: "2. Podstawienie danych", body: `T_1 = \\frac{${L(T2)}}{1 - ${L(eta)}}` },
          { title: "3. Mianownik", body: `1 - \\eta = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("T_1", value, places) },
        ],
      };
    }
    const eta = asRational(known["eta"], "η");
    const T1 = asRational(known["T1"], "T₁");
    const den = sub(ONE, eta);
    const value = exactOf(mul(T1, den));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "T_2 = T_1(1 - \\eta)" },
        { title: "2. Podstawienie danych", body: `T_2 = ${L(T1)}(1 - ${L(eta)})` },
        { title: "3. Nawias", body: `1 - \\eta = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex("T_2", value, places) },
      ],
    };
  },
};

const rozszerzalnosc: FormulaDef = {
  id: "rozszerzalnosc",
  subject: "fizyka",
  topic: "Termodynamika · ROZSZ",
  name: "Rozszerzalność liniowa",
  latex: "\\Delta l = \\alpha l \\Delta T",
  vars: [
    { id: "dl", label: "Δl [m]" },
    { id: "alfa", label: "α [1/K]" },
    { id: "l", label: "l [m]" },
    { id: "dT", label: "ΔT [K]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "dl") {
      const al = mul(g("alfa"), g("l"));
      const value = exactOf(mul(al, g("dT")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\Delta l = \\alpha l \\Delta T" },
          {
            title: "2. Podstawienie danych",
            body: `\\Delta l = ${L(g("alfa"))} \\cdot ${L(g("l"))} \\cdot ${L(g("dT"))}`,
          },
          { title: "3. Iloczyn αl", body: `\\alpha l = ${L(al)}` },
          { title: "4. Wynik", body: resultLatex("\\Delta l", value, places) },
        ],
      };
    }
    const rest = ["alfa", "l", "dT"].filter((id) => id !== unknown);
    const o = rest.map(g);
    const dl = g("dl");
    const den = mul(o[0], o[1]);
    const value = exactOf(div(dl, den));
    const names: Record<string, string> = { alfa: "\\alpha", l: "l", dT: "\\Delta T" };
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: `${names[unknown]} = \\frac{\\Delta l}{${rest.map((r) => names[r]).join("")}}`,
        },
        {
          title: "2. Podstawienie danych",
          body: `${names[unknown]} = \\frac{${L(dl)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        },
        { title: "3. Mianownik", body: `${L(o[0])} \\cdot ${L(o[1])} = ${L(den)}` },
        { title: "4. Wynik", body: resultLatex(names[unknown] ?? unknown, value, places) },
      ],
    };
  },
};

const coulomb: FormulaDef = {
  id: "coulomb",
  subject: "fizyka",
  topic: "Elektrostatyka · ROZSZ",
  name: "Prawo Coulomba",
  latex: "F = k\\frac{qQ}{r^2}",
  vars: [
    { id: "F", label: "F [N]" },
    { id: "q", label: "q [C]" },
    { id: "Q", label: "Q [C]" },
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
      const num = K_COULOMB * g("q") * g("Q");
      value = approxOnly(num / r2);
      transform = "F = kqQ/r^2";
      subst = `F = 8{,}99 \\cdot 10^9 \\cdot ${g("q")} \\cdot ${g("Q")} / ${g("r")}^2`;
      mid = `r^2 = ${trimNum(r2)}, \\; kqQ = ${trimNum(num)}`;
    } else if (unknown === "r") {
      const num = K_COULOMB * g("q") * g("Q");
      value = approxOnly(Math.sqrt(num / g("F")));
      transform = "r = \\sqrt{kqQ/F}";
      subst = `r = \\sqrt{k \\cdot ${g("q")} \\cdot ${g("Q")} / ${g("F")}}`;
      mid = `kqQ = ${trimNum(num)}`;
    } else {
      const other = unknown === "q" ? "Q" : "q";
      const r2 = g("r") ** 2;
      const num = g("F") * r2;
      value = approxOnly(num / (K_COULOMB * g(other)));
      transform = `${unknown} = Fr^2/(k${other})`;
      subst = `${unknown} = ${g("F")} \\cdot ${g("r")}^2 / (k \\cdot ${g(other)})`;
      mid = `Fr^2 = ${trimNum(num)}`;
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

const natezenie: FormulaDef = {
  id: "natezenie",
  subject: "fizyka",
  topic: "Elektrostatyka · ROZSZ",
  name: "Natężenie pola ładunku punktowego",
  latex: "E = k\\frac{Q}{r^2}",
  vars: [
    { id: "E", label: "E [N/C]" },
    { id: "Q", label: "Q [C]" },
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
    if (unknown === "E") {
      const r2 = g("r") ** 2;
      const num = K_COULOMB * g("Q");
      value = approxOnly(num / r2);
      transform = "E = kQ/r^2";
      subst = `E = k \\cdot ${g("Q")} / ${g("r")}^2`;
      mid = `r^2 = ${trimNum(r2)}, \\; kQ = ${trimNum(num)}`;
    } else if (unknown === "Q") {
      const r2 = g("r") ** 2;
      const num = g("E") * r2;
      value = approxOnly(num / K_COULOMB);
      transform = "Q = Er^2/k";
      subst = `Q = ${g("E")} \\cdot ${g("r")}^2 / k`;
      mid = `Er^2 = ${trimNum(num)}`;
    } else {
      const num = K_COULOMB * g("Q");
      value = approxOnly(Math.sqrt(num / g("E")));
      transform = "r = \\sqrt{kQ/E}";
      subst = `r = \\sqrt{k \\cdot ${g("Q")} / ${g("E")}}`;
      mid = `kQ = ${trimNum(num)}`;
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

const potencjal: FormulaDef = {
  id: "potencjal",
  subject: "fizyka",
  topic: "Elektrostatyka · ROZSZ",
  name: "Potencjał elektryczny",
  latex: "V = \\frac{W}{q}",
  vars: [
    { id: "V", label: "V [V]" },
    { id: "W", label: "W [J]" },
    { id: "q", label: "q [C]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "V") {
      const W = asRational(known["W"], "W");
      const q = asRational(known["q"], "q");
      const value = exactOf(div(W, q));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "V = \\frac{W}{q}" },
          { title: "2. Podstawienie danych", body: `V = \\frac{${L(W)}}{${L(q)}}` },
          { title: "3. Wynik", body: resultLatex("V", value, places) },
        ],
      };
    }
    if (unknown === "W") {
      const V = asRational(known["V"], "V");
      const q = asRational(known["q"], "q");
      const value = exactOf(mul(V, q));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "W = V \\cdot q" },
          { title: "2. Podstawienie danych", body: `W = ${L(V)} \\cdot ${L(q)}` },
          { title: "3. Wynik", body: resultLatex("W", value, places) },
        ],
      };
    }
    const V = asRational(known["V"], "V");
    const W = asRational(known["W"], "W");
    const value = exactOf(div(W, V));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "q = \\frac{W}{V}" },
        { title: "2. Podstawienie danych", body: `q = \\frac{${L(W)}}{${L(V)}}` },
        { title: "3. Wynik", body: resultLatex("q", value, places) },
      ],
    };
  },
};

const kondensatorQ: FormulaDef = {
  id: "kondensator-q",
  subject: "fizyka",
  topic: "Elektrostatyka · ROZSZ",
  name: "Pojemność kondensatora",
  latex: "C = \\frac{Q}{U}",
  vars: [
    { id: "C", label: "C [F]" },
    { id: "Q", label: "Q [C]" },
    { id: "U", label: "U [V]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "C") {
      const Q = asRational(known["Q"], "Q");
      const U = asRational(known["U"], "U");
      const value = exactOf(div(Q, U));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "C = \\frac{Q}{U}" },
          { title: "2. Podstawienie danych", body: `C = \\frac{${L(Q)}}{${L(U)}}` },
          { title: "3. Wynik", body: resultLatex("C", value, places) },
        ],
      };
    }
    if (unknown === "Q") {
      const C = asRational(known["C"], "C");
      const U = asRational(known["U"], "U");
      const value = exactOf(mul(C, U));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "Q = C \\cdot U" },
          { title: "2. Podstawienie danych", body: `Q = ${L(C)} \\cdot ${L(U)}` },
          { title: "3. Wynik", body: resultLatex("Q", value, places) },
        ],
      };
    }
    const C = asRational(known["C"], "C");
    const Q = asRational(known["Q"], "Q");
    const value = exactOf(div(Q, C));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "U = \\frac{Q}{C}" },
        { title: "2. Podstawienie danych", body: `U = \\frac{${L(Q)}}{${L(C)}}` },
        { title: "3. Wynik", body: resultLatex("U", value, places) },
      ],
    };
  },
};

const kondensatorE: FormulaDef = {
  id: "kondensator-e",
  subject: "fizyka",
  topic: "Elektrostatyka · ROZSZ",
  name: "Energia kondensatora",
  latex: "E = \\frac{CU^2}{2}",
  vars: [
    { id: "E", label: "E [J]" },
    { id: "C", label: "C [F]" },
    { id: "U", label: "U [V]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "E") {
      const C = asRational(known["C"], "C");
      const U = asRational(known["U"], "U");
      const U2 = mul(U, U);
      const value = exactOf(div(mul(C, U2), of(2)));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E = \\frac{CU^2}{2}" },
          { title: "2. Podstawienie danych", body: `E = \\frac{${L(C)} \\cdot ${L(U)}^2}{2}` },
          { title: "3. Kwadrat napięcia", body: `U^2 = ${L(U2)}` },
          { title: "4. Wynik", body: resultLatex("E", value, places) },
        ],
      };
    }
    if (unknown === "C") {
      const E = asRational(known["E"], "E");
      const U = asRational(known["U"], "U");
      const U2 = mul(U, U);
      const num = mul(E, of(2));
      const value = exactOf(div(num, U2));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "C = \\frac{2E}{U^2}" },
          { title: "2. Podstawienie danych", body: `C = \\frac{2 \\cdot ${L(E)}}{${L(U)}^2}` },
          { title: "3. Licznik i kwadrat", body: `2E = ${L(num)}, \\; U^2 = ${L(U2)}` },
          { title: "4. Wynik", body: resultLatex("C", value, places) },
        ],
      };
    }
    const E = asRational(known["E"], "E");
    const C = asRational(known["C"], "C");
    if (cmp(E, ZERO) < 0 || cmp(C, ZERO) <= 0) throw new Error("E ≥ 0 i C > 0");
    const inner = div(mul(E, of(2)), C);
    const value = sqrtRational(inner);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "U = \\sqrt{\\frac{2E}{C}}" },
        { title: "2. Podstawienie danych", body: `U = \\sqrt{\\frac{2 \\cdot ${L(E)}}{${L(C)}}}` },
        { title: "3. Ułamek pod pierwiastkiem", body: `\\frac{2E}{C} = ${L(inner)}` },
        { title: "4. Wynik", body: resultLatex("U", value, places) },
      ],
    };
  },
};

const sem: FormulaDef = {
  id: "sem",
  subject: "fizyka",
  topic: "Prąd stały · ROZSZ",
  name: "SEM i opór wewnętrzny",
  latex: "I = \\frac{\\varepsilon}{R + r}",
  vars: [
    { id: "I", label: "I [A]" },
    { id: "E", label: "ε [V]" },
    { id: "R", label: "R [Ω]" },
    { id: "r", label: "r [Ω]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "I") {
      const den = add(g("R"), g("r"));
      const value = exactOf(div(g("E"), den));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "I = \\frac{\\varepsilon}{R + r}" },
          {
            title: "2. Podstawienie danych",
            body: `I = \\frac{${L(g("E"))}}{${L(g("R"))} + ${L(g("r"))}}`,
          },
          { title: "3. Mianownik", body: `R + r = ${L(den)}` },
          { title: "4. Wynik", body: resultLatex("I", value, places) },
        ],
      };
    }
    if (unknown === "E") {
      const sum = add(g("R"), g("r"));
      const value = exactOf(mul(g("I"), sum));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\varepsilon = I(R + r)" },
          {
            title: "2. Podstawienie danych",
            body: `\\varepsilon = ${L(g("I"))}(${L(g("R"))} + ${L(g("r"))})`,
          },
          { title: "3. Nawias", body: `R + r = ${L(sum)}` },
          { title: "4. Wynik", body: resultLatex("\\varepsilon", value, places) },
        ],
      };
    }
    if (unknown === "R") {
      const frac = div(g("E"), g("I"));
      const value = exactOf(sub(frac, g("r")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "R = \\frac{\\varepsilon}{I} - r" },
          {
            title: "2. Podstawienie danych",
            body: `R = \\frac{${L(g("E"))}}{${L(g("I"))}} - ${L(g("r"))}`,
          },
          { title: "3. Ułamek", body: `\\frac{\\varepsilon}{I} = ${L(frac)}` },
          { title: "4. Wynik", body: resultLatex("R", value, places) },
        ],
      };
    }
    const frac = div(g("E"), g("I"));
    const value = exactOf(sub(frac, g("R")));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "r = \\frac{\\varepsilon}{I} - R" },
        {
          title: "2. Podstawienie danych",
          body: `r = \\frac{${L(g("E"))}}{${L(g("I"))}} - ${L(g("R"))}`,
        },
        { title: "3. Ułamek", body: `\\frac{\\varepsilon}{I} = ${L(frac)}` },
        { title: "4. Wynik", body: resultLatex("r", value, places) },
      ],
    };
  },
};

const strumien: FormulaDef = {
  id: "strumien",
  subject: "fizyka",
  topic: "Magnetyzm · ROZSZ",
  name: "Strumień magnetyczny",
  latex: "\\Phi = B \\cdot S",
  vars: [
    { id: "Phi", label: "Φ [Wb]" },
    { id: "B", label: "B [T]" },
    { id: "S", label: "S [m²]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "Phi") {
      const B = asRational(known["B"], "B");
      const S = asRational(known["S"], "S");
      const value = exactOf(mul(B, S));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\Phi = B \\cdot S" },
          { title: "2. Podstawienie danych", body: `\\Phi = ${L(B)} \\cdot ${L(S)}` },
          { title: "3. Wynik", body: resultLatex("\\Phi", value, places) },
        ],
      };
    }
    if (unknown === "B") {
      const Phi = asRational(known["Phi"], "Φ");
      const S = asRational(known["S"], "S");
      const value = exactOf(div(Phi, S));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "B = \\frac{\\Phi}{S}" },
          { title: "2. Podstawienie danych", body: `B = \\frac{${L(Phi)}}{${L(S)}}` },
          { title: "3. Wynik", body: resultLatex("B", value, places) },
        ],
      };
    }
    const Phi = asRational(known["Phi"], "Φ");
    const B = asRational(known["B"], "B");
    const value = exactOf(div(Phi, B));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "S = \\frac{\\Phi}{B}" },
        { title: "2. Podstawienie danych", body: `S = \\frac{${L(Phi)}}{${L(B)}}` },
        { title: "3. Wynik", body: resultLatex("S", value, places) },
      ],
    };
  },
};

const faraday: FormulaDef = {
  id: "faraday",
  subject: "fizyka",
  topic: "Magnetyzm · ROZSZ",
  name: "Prawo Faradaya (moduł SEM)",
  latex: "|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}",
  vars: [
    { id: "E", label: "|ε| [V]" },
    { id: "dPhi", label: "ΔΦ [Wb]" },
    { id: "dt", label: "Δt [s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "E") {
      const dPhi = asRational(known["dPhi"], "ΔΦ");
      const dt = asRational(known["dt"], "Δt");
      const value = exactOf(div(dPhi, dt));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}",
          },
          {
            title: "2. Podstawienie danych",
            body: `|\\varepsilon| = \\frac{${L(dPhi)}}{${L(dt)}}`,
          },
          { title: "3. Wynik", body: resultLatex("|\\varepsilon|", value, places) },
        ],
      };
    }
    if (unknown === "dPhi") {
      const E = asRational(known["E"], "|ε|");
      const dt = asRational(known["dt"], "Δt");
      const value = exactOf(mul(E, dt));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "\\Delta\\Phi = |\\varepsilon| \\cdot \\Delta t",
          },
          {
            title: "2. Podstawienie danych",
            body: `\\Delta\\Phi = ${L(E)} \\cdot ${L(dt)}`,
          },
          { title: "3. Wynik", body: resultLatex("\\Delta\\Phi", value, places) },
        ],
      };
    }
    const E = asRational(known["E"], "|ε|");
    const dPhi = asRational(known["dPhi"], "ΔΦ");
    const value = exactOf(div(dPhi, E));
    return {
      values: [value],
      steps: [
        {
          title: "1. Przekształcenie wzoru",
          body: "\\Delta t = \\frac{\\Delta\\Phi}{|\\varepsilon|}",
        },
        {
          title: "2. Podstawienie danych",
          body: `\\Delta t = \\frac{${L(dPhi)}}{${L(E)}}`,
        },
        { title: "3. Wynik", body: resultLatex("\\Delta t", value, places) },
      ],
    };
  },
};

const solenoid: FormulaDef = {
  id: "solenoid",
  subject: "fizyka",
  topic: "Magnetyzm · ROZSZ",
  name: "Pole solenoidu",
  latex: "B = \\mu_0\\frac{NI}{l}",
  vars: [
    { id: "B", label: "B [T]" },
    { id: "N", label: "N (zwoje)" },
    { id: "I", label: "I [A]" },
    { id: "l", label: "l [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const MU = 4 * Math.PI * 1e-7;
    const g = (id: string): number => {
      const v = num(known[id]);
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`);
      return v;
    };
    let value: Exact;
    let transform = "";
    let subst = "";
    let mid = "";
    if (unknown === "B") {
      const num = MU * g("N") * g("I");
      value = approxOnly(num / g("l"));
      transform = "B = \\mu_0NI/l";
      subst = `B = \\mu_0 \\cdot ${g("N")} \\cdot ${g("I")} / ${g("l")}`;
      mid = `\\mu_0NI = ${trimNum(num)}`;
    } else if (unknown === "N") {
      const num = g("B") * g("l");
      const den = MU * g("I");
      value = approxOnly(num / den);
      transform = "N = Bl/(\\mu_0I)";
      subst = `N = ${g("B")} \\cdot ${g("l")} / (\\mu_0 \\cdot ${g("I")})`;
      mid = `Bl = ${trimNum(num)}, \\; \\mu_0I = ${trimNum(den)}`;
    } else if (unknown === "I") {
      const num = g("B") * g("l");
      const den = MU * g("N");
      value = approxOnly(num / den);
      transform = "I = Bl/(\\mu_0N)";
      subst = `I = ${g("B")} \\cdot ${g("l")} / (\\mu_0 \\cdot ${g("N")})`;
      mid = `Bl = ${trimNum(num)}, \\; \\mu_0N = ${trimNum(den)}`;
    } else {
      const num = MU * g("N") * g("I");
      value = approxOnly(num / g("B"));
      transform = "l = \\mu_0NI/B";
      subst = `l = \\mu_0 \\cdot ${g("N")} \\cdot ${g("I")} / ${g("B")}`;
      mid = `\\mu_0NI = ${trimNum(num)}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Licznik i mianownik", body: mid },
        { title: "4. Wynik", body: resultLatex(unknown, value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const silaElektrodynamiczna: FormulaDef = {
  id: "sila-elektrodynamiczna",
  subject: "fizyka",
  topic: "Magnetyzm · ROZSZ",
  name: "Siła elektrodynamiczna",
  latex: "F = BIl",
  vars: [
    { id: "F", label: "F [N]" },
    { id: "B", label: "B [T]" },
    { id: "I", label: "I [A]" },
    { id: "l", label: "l [m]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    if (unknown === "F") {
      const BI = mul(g("B"), g("I"));
      const value = exactOf(mul(BI, g("l")));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "F = BIl" },
          {
            title: "2. Podstawienie danych",
            body: `F = ${L(g("B"))} \\cdot ${L(g("I"))} \\cdot ${L(g("l"))}`,
          },
          { title: "3. Iloczyn BI", body: `BI = ${L(BI)}` },
          { title: "4. Wynik", body: resultLatex("F", value, places) },
        ],
      };
    }
    const others = ["B", "I", "l"].filter((id) => id !== unknown);
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

const bohr: FormulaDef = {
  id: "bohr",
  subject: "fizyka",
  topic: "Atom · ROZSZ",
  name: "Poziomy energetyczne Bohra",
  latex: "E_n = \\frac{-13{,}6}{n^2} \\text{ eV}",
  vars: [{ id: "n", label: "n (powłoka)" }],
  mode: "fixed",
  outputId: "E",
  outputLabel: "Eₙ",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    const n2 = n * n;
    const value = exactOf(div(of(-136), mul(of(10), of(n2))));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "E_n = \\frac{-13{,}6}{n^2} \\text{ eV}" },
        { title: "2. Podstawienie danych", body: `E_{${n}} = \\frac{-13{,}6}{${n}^2}` },
        { title: "3. Kwadrat powłoki", body: `n^2 = ${n2}` },
        { title: "4. Wynik", body: `${resultLatex(`E_{${n}}`, value, places)} \\text{ eV}` },
      ],
    };
  },
};

const debroglie: FormulaDef = {
  id: "debroglie",
  subject: "fizyka",
  topic: "Atom · ROZSZ",
  name: "Fala de Broglie’a",
  latex: "\\lambda = \\frac{h}{p}",
  vars: [
    { id: "lambda", label: "λ [m]" },
    { id: "p", label: "p [kg·m/s]" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const H = 6.63e-34;
    if (unknown === "lambda") {
      const p = num(known["p"]);
      const value = approxOnly(H / p);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "\\lambda = h/p" },
          { title: "2. Podstawienie danych", body: `\\lambda = 6{,}63 \\cdot 10^{-34} / ${p}` },
          { title: "3. Wynik", body: resultLatex("\\lambda", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const lambda = num(known["lambda"]);
    const value = approxOnly(H / lambda);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "p = h/\\lambda" },
        { title: "2. Podstawienie danych", body: `p = 6{,}63 \\cdot 10^{-34} / ${lambda}` },
        { title: "3. Wynik", body: resultLatex("p", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

const energiaRel: FormulaDef = {
  id: "energia-rel",
  subject: "fizyka",
  topic: "Relatywistyka · ROZSZ",
  name: "Energia całkowita (relatywistyka)",
  latex: "E = \\frac{mc^2}{\\sqrt{1 - v^2/c^2}}",
  vars: [
    { id: "E", label: "E [J]" },
    { id: "m", label: "m [kg]" },
    { id: "v", label: "v [m/s]" },
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
    const gamma = (v: number): number => {
      if (v < 0 || v >= C_LIGHT) throw new Error("wymagane 0 ≤ v < c");
      return 1 / Math.sqrt(1 - (v / C_LIGHT) ** 2);
    };
    if (unknown === "E") {
      const gm = gamma(g("v"));
      const rest = g("m") * C_LIGHT * C_LIGHT;
      const value = approxOnly(rest * gm);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "E = \\gamma mc^2" },
          { title: "2. Podstawienie danych", body: `E = ${trimNum(gm)} \\cdot ${g("m")}c^2` },
          {
            title: "3. Czynnik Lorentza i energia spoczynkowa",
            body: `\\gamma = ${trimNum(gm)}, \\; mc^2 = ${trimNum(rest)}`,
          },
          { title: "4. Wynik", body: resultLatex("E", value, places), note: APPROX_NOTE },
        ],
      };
    }
    if (unknown === "m") {
      const gm = gamma(g("v"));
      const den = C_LIGHT * C_LIGHT * gm;
      const value = approxOnly(g("E") / den);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = E/(\\gamma c^2)" },
          { title: "2. Podstawienie danych", body: `m = ${g("E")}/(\\gamma c^2)` },
          {
            title: "3. Mianownik",
            body: `\\gamma c^2 = ${trimNum(gm)} \\cdot c^2 = ${trimNum(den)}`,
          },
          { title: "4. Wynik", body: resultLatex("m", value, places), note: APPROX_NOTE },
        ],
      };
    }
    const rest = g("m") * C_LIGHT * C_LIGHT;
    const ratio = (g("E") / rest) ** 2;
    if (!(ratio > 1)) throw new Error("E musi być większe od energii spoczynkowej");
    const root = Math.sqrt(1 - 1 / ratio);
    const value = approxOnly(C_LIGHT * root);
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "v = c\\sqrt{1 - (mc^2/E)^2}" },
        { title: "2. Podstawienie danych", body: `v = c\\sqrt{1 - (${g("m")}c^2/${g("E")})^2}` },
        {
          title: "3. Energia spoczynkowa i pierwiastek",
          body: `mc^2 = ${trimNum(rest)}, \\; \\sqrt{\\ldots} = ${trimNum(root)}`,
        },
        { title: "4. Wynik", body: resultLatex("v", value, places), note: APPROX_NOTE },
      ],
    };
  },
};

export const PHYSICS_PR: FormulaDef[] = [
  rzutPoziomy,
  momentSily,
  energiaObrotowa,
  bernoulli,
  clapeyron,
  pierwszaZasada,
  izobaryczna,
  carnot,
  rozszerzalnosc,
  coulomb,
  natezenie,
  potencjal,
  kondensatorQ,
  kondensatorE,
  sem,
  strumien,
  faraday,
  solenoid,
  silaElektrodynamiczna,
  bohr,
  debroglie,
  energiaRel,
];
