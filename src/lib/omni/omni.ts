import {
  ONE,
  ZERO,
  cmp,
  div,
  fromString,
  isZero,
  mul,
  neg,
  of,
  pow,
  sub,
  toNumber,
} from "../exact/rational";
import type { Rational } from "../exact/rational";
import {
  approx,
  isApproxOnly,
  logExact,
  mulRat,
  solveQuadratic,
  sqrtRational,
  trigExact,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import {
  formatDecimal,
  formatLatex,
  formatRatLatex,
  formatRatText,
  trimNum,
} from "../exact/format";
import { parseEquation } from "../parse-formula";
import { getFormula } from "../formulas/index";
import { solveFormula } from "../solver/solver";
import { linearPlot, polyPlot, quadraticPlot } from "../plots/plot";
import type { PlotData } from "../plots/plot";
import { rationalRootsOf } from "../plots/plot";

const L = formatRatLatex;

export interface OmniRow {
  label: string;
  tex: string;
}

export interface OmniSection {
  title: string;
  rows: OmniRow[];
  note?: string;
}

export interface OmniValue {
  label: string;
  tex: string;
  dec: string;
  approx: boolean;
}

export interface OmniStep {
  title: string;
  body: string;
  note?: string;
}

export interface OmniLink {
  subject: string;
  id: string;
  query: Record<string, string>;
  name: string;
}

export interface OmniResult {
  title: string;
  sections: OmniSection[];
  values: OmniValue[];
  steps: OmniStep[];
  plot: PlotData | null;
  link: OmniLink | null;
  error?: string;
}

const eTex = (e: Exact): string => formatLatex(e);
const eNeg = (e: Exact): Exact => mulRat(e, of(-1));
const signParenExact = (x: Exact): string =>
  approx(x) >= 0 ? `(x-${eTex(x)})` : `(x+${eTex(eNeg(x))})`;
const signParen = (x: Rational): string => (cmp(x, ZERO) >= 0 ? `(x-${L(x)})` : `(x+${L(neg(x))})`);
const ratOf = (e: Exact): Exact => ({ rat: e.rat, irr: null });

function polyTex(parts: { c: Rational; b: string }[]): string {
  const chunks: string[] = [];
  for (const { c, b } of parts) {
    if (isZero(c)) continue;
    const sgn = cmp(c, ZERO) < 0 ? "-" : "+";
    const a = sgn === "-" ? neg(c) : c;
    const coef = cmp(a, ONE) === 0 ? "" : L(a);
    chunks.push(sgn + coef + b);
  }
  const out = chunks.join("");
  if (out === "") return "0";
  return out.startsWith("+") ? out.slice(1) : out;
}

const omniValue = (label: string, e: Exact, places: number): OmniValue => ({
  label,
  tex: formatLatex(e),
  dec: formatDecimal(e, places),
  approx: isApproxOnly(e),
});

const rat = (s: string | undefined): Rational => fromString(s ?? "0");

function quadOmni(a: Rational, b: Rational, c: Rational, places: number, op?: string): OmniResult {
  const general = polyTex([
    { c: a, b: "x^2" },
    { c: b, b: "x" },
    { c, b: "" },
  ]);
  const title = op
    ? `Nierówność kwadratowa ${general} ${op} 0`
    : `Funkcja kwadratowa f(x) = ${general}`;
  const q0 = solveQuadratic(a, b, c);
  if (q0.kind === "linear") {
    return linearOmni(b, c, places);
  }
  const q = q0;
  const delta = q.delta;
  const p = div(neg(b), mul(of(2), a));
  const qv = div(neg(delta.rat), mul(of(4), a));
  const canonical = `${L(a)}${signParen(p)}^2${cmp(qv, ZERO) >= 0 ? `+${L(qv)}` : `-${L(neg(qv))}`}`;
  const sections: OmniSection[] = [];
  const values: OmniValue[] = [];
  const steps: OmniStep[] = [];
  const rising = cmp(a, ZERO) > 0;

  sections.push({
    title: "Postać ogólna",
    rows: [{ label: "f(x)", tex: `${general}${op ? ` ${op} 0` : ""}` }],
  });

  sections.push({
    title: "Wyróżnik",
    rows: [
      { label: "Δ", tex: `\\Delta = ${L(delta.rat)}` },
      ...(cmp(delta.rat, ZERO) >= 0
        ? [{ label: "√Δ", tex: `\\sqrt{\\Delta} = ${eTex(sqrtRational(delta.rat))}` }]
        : []),
    ],
    note: cmp(delta.rat, ZERO) < 0 ? "Δ < 0 — brak miejsc zerowych w ℝ." : undefined,
  });
  values.push(omniValue("Δ", delta, places));
  steps.push({
    title: "1. Wyróżnik",
    body: `\\Delta = (${L(b)})^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)} = ${L(delta.rat)}`,
  });

  const twoRoots = q.kind === "two";
  const oneRoot = q.kind === "one";
  const ordered =
    twoRoots && approx(q.roots[0]!) > approx(q.roots[1]!) ? [q.roots[1]!, q.roots[0]!] : q.roots;
  const [r1, r2] = [ordered[0], ordered[1]];

  if (twoRoots && r1 && r2) {
    sections.push({
      title: "Miejsca zerowe",
      rows: [
        { label: "x₁", tex: `x_1 = ${eTex(r1)}` },
        { label: "x₂", tex: `x_2 = ${eTex(r2)}` },
      ],
    });
    values.push(omniValue("x₁", r1, places), omniValue("x₂", r2, places));
    steps.push({
      title: "2. Miejsca zerowe",
      body: `x = \\frac{${L(neg(b))} \\pm \\sqrt{\\Delta}}{2 \\cdot ${L(a)}} \\Rightarrow x_1 = ${eTex(r1)}, \\; x_2 = ${eTex(r2)}`,
    });
  } else if (oneRoot) {
    const x0 = q.roots[0]!;
    sections.push({
      title: "Miejsce zerowe",
      rows: [{ label: "x₀", tex: `x_0 = ${eTex(x0)}` }],
      note: "Δ = 0 — jedno miejsce zerowe.",
    });
    values.push(omniValue("x₀", x0, places));
    steps.push({ title: "2. Miejsce zerowe", body: `\\Delta = 0 \\Rightarrow x_0 = ${eTex(x0)}` });
  } else {
    steps.push({
      title: "2. Miejsca zerowe",
      body: `\\Delta < 0 \\Rightarrow brak miejsc zerowych \\w \\mathbb{R}`,
    });
  }

  sections.push({
    title: "Postać kanoniczna",
    rows: [
      { label: "p", tex: `p = -\\frac{b}{2a} = ${L(p)}` },
      { label: "q", tex: `q = -\\frac{\\Delta}{4a} = ${L(qv)}` },
      { label: "f(x)", tex: canonical },
    ],
  });
  values.push(
    omniValue("p", ratOf({ rat: p, irr: null }), places),
    omniValue("q", ratOf({ rat: qv, irr: null }), places),
  );
  steps.push({
    title: "3. Wierzchołek i postać kanoniczna",
    body: `W = (${L(p)}, ${L(qv)}), \\; f(x) = ${canonical}`,
  });

  if (twoRoots && r1 && r2) {
    const sum = div(neg(b), a);
    const prod = div(c, a);
    const s2 = sub(pow(sum, 2), mul(of(2), prod));
    const product = `${L(a)}${signParenExact(r1)}${signParenExact(r2)}`;
    const rows: OmniRow[] = [
      { label: "iloczynowa", tex: product },
      { label: "Viète", tex: `x_1 + x_2 = ${L(sum)}, \\; x_1 x_2 = ${L(prod)}` },
      { label: "x₁²+x₂²", tex: `x_1^2 + x_2^2 = ${L(s2)}` },
    ];
    if (!isZero(c)) {
      rows.push({
        label: "1/x₁+1/x₂",
        tex: `\\frac{1}{x_1} + \\frac{1}{x_2} = ${L(div(neg(b), c))}`,
      });
    }
    sections.push({ title: "Postać iloczynowa i wzory Viète'a", rows });
    steps.push({ title: "4. Postać iloczynowa", body: `f(x) = ${product}` });
  } else if (oneRoot) {
    const x0 = q.roots[0]!;
    sections.push({
      title: "Postać iloczynowa",
      rows: [{ label: "iloczynowa", tex: `${L(a)}${signParenExact(x0)}^2` }],
    });
  }

  const zw = rising ? `[${L(qv)}, +\\infty)` : `(-\\infty, ${L(qv)}]`;
  const mono1 = rising ? "\\text{malejąca}" : "\\text{rosnąca}";
  const mono2 = rising ? "\\text{rosnąca}" : "\\text{malejąca}";
  sections.push({
    title: "Własności",
    rows: [
      {
        label: "monotoniczność",
        tex: `${mono1} \\text{ na } (-\\infty, ${L(p)}], \\; ${mono2} \\text{ na } [${L(p)}, +\\infty)`,
      },
      { label: "ZW", tex: `f(\\mathbb{R}) = ${zw}` },
      { label: "oś symetrii", tex: `x = ${L(p)}` },
      {
        label: rising ? "minimum" : "maximum",
        tex: rising ? `f_{\\min} = ${L(qv)}` : `f_{\\max} = ${L(qv)}`,
      },
    ],
  });

  if (twoRoots && r1 && r2) {
    const pos = rising
      ? `x \\in (-\\infty, ${eTex(r1)}) \\cup (${eTex(r2)}, +\\infty)`
      : `x \\in (${eTex(r1)}, ${eTex(r2)})`;
    const negSide = rising
      ? `x \\in (${eTex(r1)}, ${eTex(r2)})`
      : `x \\in (-\\infty, ${eTex(r1)}) \\cup (${eTex(r2)}, +\\infty)`;
    sections.push({
      title: "Znak f(x)",
      rows: [
        { label: "f(x) > 0", tex: pos },
        { label: "f(x) < 0", tex: negSide },
        { label: "f(x) = 0", tex: `x = ${eTex(r1)} \\vee x = ${eTex(r2)}` },
      ],
      note: op
        ? `Nierówność f(x) ${op} 0: ${
            op === ">" || op === "≥"
              ? "zbiór rozwiązań z wiersza f(x) > 0"
              : "zbiór rozwiązań z wiersza f(x) < 0"
          }.`
        : undefined,
    });
  } else if (cmp(delta.rat, ZERO) < 0) {
    const always =
      (rising && (op === ">" || op === "≥")) || (!rising && (op === "<" || op === "≤"));
    sections.push({
      title: "Znak f(x)",
      rows: [
        {
          label: "stały znak",
          tex: `f(x) ${rising ? ">" : "<"} 0 \\text{ dla każdego } x \\in \\mathbb{R}`,
        },
      ],
      note: op
        ? always
          ? "Nierówność spełniają wszystkie x ∈ ℝ."
          : "Nierówność nie ma rozwiązań."
        : undefined,
    });
  }

  return {
    title,
    sections,
    values,
    steps,
    plot: quadraticPlot(toNumber(a), toNumber(b), toNumber(c)),
    link: {
      subject: "matematyka",
      id: "postacie-kwadratowej",
      query: { v_a: formatRatText(a), v_b: formatRatText(b), v_c: formatRatText(c) },
      name: "Postacie funkcji kwadratowej",
    },
  };
}

function linearOmni(a: Rational, b: Rational, places: number): OmniResult {
  const general = polyTex([
    { c: a, b: "x" },
    { c: b, b: "" },
  ]);
  const x0 = div(neg(b), a);
  return {
    title: `Funkcja liniowa f(x) = ${general}`,
    sections: [
      {
        title: "Postać i własności",
        rows: [
          { label: "f(x)", tex: general },
          { label: "miejsce zerowe", tex: `x = -\\frac{b}{a} = ${L(x0)}` },
          {
            label: "monotoniczność",
            tex: cmp(a, ZERO) > 0 ? "\\text{rosnąca}" : "\\text{malejąca}",
          },
          { label: "przecięcie z OY", tex: `(0, ${L(b)})` },
        ],
      },
    ],
    values: [omniValue("x (miejsce zerowe)", ratOf({ rat: x0, irr: null }), places)],
    steps: [
      {
        title: "1. Miejsce zerowe",
        body: `${L(a)}x ${cmp(b, ZERO) >= 0 ? "+" : "-"} ${L(cmp(b, ZERO) >= 0 ? b : neg(b))} = 0 \\Rightarrow x = ${L(x0)}`,
      },
    ],
    plot: linearPlot(toNumber(a), toNumber(b)),
    link: {
      subject: "matematyka",
      id: "funkcja-liniowa",
      query: { v_a: formatRatText(a), v_b: formatRatText(b) },
      name: "Funkcja liniowa",
    },
  };
}

function polyOmni(
  values: Record<string, string>,
  selects: Record<string, string> | undefined,
  places: number,
): OmniResult | null {
  const deg = selects?.deg ?? "3";
  const def = getFormula("matematyka", "rozklad-wielomianu");
  if (!def) return null;
  const r = solveFormula(def, { ...values, deg }, places);
  if (!r.ok) return null;
  const ids = deg === "4" ? ["a4", "a3", "a2", "a1", "a0"] : ["a3", "a2", "a1", "a0"];
  const coefs = ids.map((id) => Number(values[id] ?? 0));
  const steps = [...r.steps];
  if (deg === "3") {
    const mono = getFormula("matematyka", "monotonicznosc-ekstrema-wielomianu");
    if (mono) {
      const r2 = solveFormula(
        mono,
        { a: values.a3 ?? "0", b: values.a2 ?? "0", c: values.a1 ?? "0", d: values.a0 ?? "0" },
        places,
      );
      if (r2.ok) steps.push(...r2.steps);
    }
  }
  const parts = coefs.map((c, i) => ({
    c: fromString(String(c)),
    b: coefs.length - 1 - i === 0 ? "" : `x^{${coefs.length - 1 - i}}`,
  }));
  const query: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) {
    if (/^a\d$/.test(k) && v !== "0") query[`v_${k}`] = v;
  }
  return {
    title: `Wielomian ${deg}. stopnia W(x) = ${polyTex(parts)}`,
    sections: [],
    values: [],
    steps,
    plot: polyPlot(coefs, rationalRootsOf(coefs)),
    link: {
      subject: "matematyka",
      id: "rozklad-wielomianu",
      query,
      name: "Rozkład wielomianu",
    },
  };
}

function fractionOmni(
  num: Record<number, number>,
  den: Record<number, number>,
  raw: string,
  places: number,
): OmniResult | null {
  const dDeg = Math.max(0, ...Object.keys(den).map(Number));
  const nDeg = Math.max(0, ...Object.keys(num).map(Number));
  if (dDeg === 0 || dDeg > 2 || nDeg > 1) return null;
  const defD = getFormula("matematyka", "dziedzina-ulamka-wymiernego");
  if (!defD) return null;
  const ns = (v: number): string => trimNum(v);
  const dvals =
    dDeg === 1
      ? { deg: "1", q2: "0", q1: ns(den[1] ?? 0), q0: ns(den[0] ?? 0) }
      : { deg: "2", q2: ns(den[2] ?? 0), q1: ns(den[1] ?? 0), q0: ns(den[0] ?? 0) };
  const rd = solveFormula(defD, dvals, places);
  if (!rd.ok) return null;
  const steps = [...rd.steps];
  if (nDeg === 1 && (num[1] ?? 0) !== 0) {
    const a = num[1]!;
    const b = num[0] ?? 0;
    steps.push({
      title: "Miejsce zerowe licznika",
      body: `${ns(a)}x ${b >= 0 ? "+" : "-"} ${ns(Math.abs(b))} = 0 \\Rightarrow x = ${ns(-b / a)}`,
    });
    const defR = getFormula("matematyka", "pochodna-ilorazu-iloczynu");
    if (defR) {
      const rr = solveFormula(
        defR,
        { typ: "iloraz", a: ns(a), b: ns(b), c: ns(den[1] ?? 0), d: ns(den[0] ?? 0) },
        places,
      );
      if (rr.ok) steps.push(...rr.steps);
    }
  }
  return {
    title: "Funkcja wymierna (ułamek homograficzny)",
    sections: [],
    values: [],
    steps,
    plot: null,
    link: {
      subject: "matematyka",
      id: "dziedzina-ulamka-wymiernego",
      query: { fill: raw },
      name: "Dziedzina ułamka wymiernego",
    },
  };
}

function formulaOmni(
  parsed: NonNullable<ReturnType<typeof parseEquation>>,
  raw: string,
  places: number,
): OmniResult | null {
  const def = getFormula(parsed.subject, parsed.id);
  if (!def) return null;
  const input: Record<string, string> = { ...parsed.values };
  if (parsed.selects) Object.assign(input, parsed.selects);
  const r = solveFormula(def, input, places);
  const link: OmniLink = {
    subject: parsed.subject,
    id: parsed.id,
    query: { fill: raw },
    name: def.name,
  };
  if (!r.ok) {
    return {
      title: parsed.label,
      sections: [],
      values: [],
      steps: [],
      plot: null,
      link,
      error: r.error,
    };
  }
  return {
    title: parsed.label,
    sections: [],
    values: r.values.map((v, i) => omniValue(r.labels[i] ?? def.outputLabel, v, places)),
    steps: r.steps,
    plot: null,
    link,
  };
}

function trigValueOmni(kind: string, deg: number, label: string, places: number): OmniResult {
  const e = trigExact(kind === "tan" || kind === "tg" ? "tan" : (kind as "sin" | "cos"), deg);
  const v = omniValue("wynik", e, places);
  return {
    title: `Wartość ${label}`,
    sections: [],
    values: [v],
    steps: [{ title: "1. Funkcja trygonometryczna", body: `${label} (kąt w stopniach)` }],
    plot: null,
    link: null,
  };
}

function logValueOmni(base: number, x: number, places: number): OmniResult {
  const e = logExact(of(base), of(x));
  const v = omniValue("wynik", e, places);
  return {
    title: `Wartość logarytmu log_${trimNum(base)}(${trimNum(x)})`,
    sections: [],
    values: [v],
    steps: [{ title: "1. Logarytm", body: `\\log_{${trimNum(base)}}(${trimNum(x)}) = ${v.tex}` }],
    plot: null,
    link: null,
  };
}

function parsePolyLoose(expr: string): Record<number, number> | null {
  const coefs: Record<number, number> = {};
  const normalized = expr.startsWith("-") ? expr : "+" + expr;
  for (const t of normalized.split(/(?=[+-])/)) {
    if (t === "" || t === "+" || t === "-") continue;
    const m = /^(.*?)x(?:\^(\d+))?$/.exec(t);
    if (m && t.includes("x")) {
      if (/[a-z]/.test(m[1]!)) return null;
      const rawCoef = m[1] === "" || m[1] === "+" ? "1" : m[1] === "-" ? "-1" : m[1]!;
      const v = Number(rawCoef);
      if (!Number.isFinite(v)) return null;
      const pw = m[2] === undefined ? 1 : Number(m[2]);
      if (pw > 4) return null;
      coefs[pw] = (coefs[pw] ?? 0) + v;
    } else {
      if (/[a-z]/.test(t)) return null;
      const v = Number(t);
      if (!Number.isFinite(v)) return null;
      coefs[0] = (coefs[0] ?? 0) + v;
    }
  }
  return coefs;
}

function detectFraction(
  s: string,
): { num: Record<number, number>; den: Record<number, number> } | null {
  if (s.includes("=") || !s.startsWith("(") || !s.includes(")/(")) return null;
  const cut = s.indexOf(")/(");
  const numS = s.slice(1, cut);
  let denS = s.slice(cut + 3);
  if (denS.endsWith(")")) denS = denS.slice(0, -1);
  const n = parsePolyLoose(numS);
  const d = parsePolyLoose(denS);
  return n && d ? { num: n, den: d } : null;
}

export function analyzeOmni(raw: string, places = 2): OmniResult | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const s = trimmed.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".").replace(/·/g, "");

  const trigVal = /^(sin|cos|tan|tg)\(((?:\d+(?:\.\d+)?)?)(π(?:\/(\d+(?:\.\d+)?))?)?\)$/.exec(s);
  if (trigVal && (trigVal[2] !== "" || trigVal[3] !== undefined)) {
    const den = trigVal[4] === undefined ? 1 : Number(trigVal[4]!);
    const deg =
      trigVal[3] !== undefined
        ? (Number(trigVal[2] === "" ? "1" : trigVal[2]!) * 180) / den
        : Number(trigVal[2]!);
    return trigValueOmni(trigVal[1]!, deg, s, places);
  }

  const logVal = /^log(?:_?(\d+(?:\.\d+)?))?\((\d+(?:\.\d+)?)\)$/.exec(s);
  if (logVal) {
    try {
      return logValueOmni(Number(logVal[1] ?? "10"), Number(logVal[2]!), places);
    } catch {
      return null;
    }
  }

  const frac = detectFraction(s);
  if (frac) return fractionOmni(frac.num, frac.den, trimmed, places);

  const parsed = parseEquation(trimmed);
  if (!parsed) return null;

  if (
    parsed.id === "rownanie-kwadratowe" ||
    parsed.id === "postacie-kwadratowej" ||
    parsed.id === "nierownosc-kwadratowa"
  ) {
    const A = rat(parsed.values.a);
    if (isZero(A) && parsed.id !== "nierownosc-kwadratowa") {
      return linearOmni(rat(parsed.values.b), rat(parsed.values.c), places);
    }
    return quadOmni(A, rat(parsed.values.b), rat(parsed.values.c), places, parsed.selects?.op);
  }
  if (parsed.id === "funkcja-liniowa") {
    return linearOmni(rat(parsed.values.a), rat(parsed.values.b), places);
  }
  if (parsed.id === "rozklad-wielomianu") {
    return polyOmni(parsed.values, parsed.selects, places);
  }
  return formulaOmni(parsed, trimmed, places);
}
