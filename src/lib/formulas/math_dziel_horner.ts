import { add, div, isZero, mul, neg } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const dzielenieWielomianow: FormulaDef = {
  id: "dzielenie-wielomianow",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Dzielenie wielomianów (pisemne)",
  latex: "W(x) : P(x) = Q(x) \\text{ reszta } R",
  vars: [
    { id: "degW", label: "stopień W (1–5)", kind: "select", options: ["1", "2", "3", "4", "5"] },
    { id: "w5", label: "w₅" },
    { id: "w4", label: "w₄" },
    { id: "w3", label: "w₃" },
    { id: "w2", label: "w₂" },
    { id: "w1", label: "w₁" },
    { id: "w0", label: "w₀" },
    { id: "p1", label: "p (x¹)" },
    { id: "p0", label: "q (x⁰)" },
  ],
  mode: "fixed",
  outputId: "q",
  outputLabel: "iloraz + reszta",
  solve(_unknown, known, _places, selects): FormulaSolution {
    const degW = Number(selects?.["degW"] ?? "1");
    if (![1, 2, 3, 4, 5].includes(degW)) throw new Error("stopień W musi być 1–5");
    const wIds = ["w5", "w4", "w3", "w2", "w1", "w0"];
    const start = 5 - degW;
    const W: Rational[] = [];
    for (let i = start; i <= 5; i++) {
      const id = wIds[i];
      const val = known[id];
      W.push(val ? asRational(val, id) : { p: 0n, q: 1n });
    }
    if (isZero(W[0])) throw new Error("współczynnik wiodący W nie może być 0");
    const p = asRational(known["p1"], "p");
    const q0 = asRational(known["p0"], "q");
    if (isZero(p) && isZero(q0)) throw new Error("dzielnik nie może być zerowy");
    if (isZero(p)) throw new Error("dzielenie przez stałą: podziel każdy współczynnik");
    const steps: FormulaSolution["steps"] = [];
    const n = W.length;
    const quotient: Rational[] = [];
    let rem: Rational[] = [W[0]];
    for (let i = 1; i < n; i++) {
      const qi = div(rem[rem.length - 1], p);
      quotient.push(qi);
      const next = add(W[i], mul(neg(qi), q0));
      rem.push(next);
    }
    const remainder = rem[rem.length - 1];
    const term = (c: Rational, pw: number): string => {
      if (isZero(c)) return "";
      const cs = L(c);
      if (pw === 0) return cs;
      if (pw === 1) return cs === "1" ? "x" : cs === "-1" ? "-x" : `${cs}x`;
      return cs === "1" ? `x^{${pw}}` : cs === "-1" ? `-x^{${pw}}` : `${cs}x^{${pw}}`;
    };
    const join = (ts: string[]): string => {
      const nz = ts.filter((t) => t !== "");
      if (nz.length === 0) return "0";
      return nz.join(" + ").replace(/\+ -/g, "- ");
    };
    const qPoly = join(quotient.map((c, i) => term(c, n - 2 - i)));
    const wPoly = join(W.map((c, i) => term(c, n - 1 - i)));
    const pPoly = isZero(q0)
      ? `${L(p) === "1" ? "" : L(p) === "-1" ? "-" : L(p)}x`
      : `${L(p) === "1" ? "" : L(p) === "-1" ? "-" : L(p)}x ${q0.p >= 0 ? "+" : ""}${L(q0)}`;
    steps.push({ title: "1. Wielomiany", body: `W(x) = ${wPoly}, \\; P(x) = ${pPoly}` });
    steps.push({
      title: "2. Dzielenie długie (schemat)",
      body: `\\begin{aligned} W &: [${W.map(L).join(", ")}] \\\\ P &: [${L(p)}, ${L(q0)}] \\\\ Q &: [${quotient.map(L).join(", ")}] \\\\ R &: ${L(remainder)} \\end{aligned}`,
    });
    steps.push({
      title: "3. Wynik",
      body: `W(x) = (${pPoly})(${qPoly})${isZero(remainder) ? "" : ` + ${L(remainder)}`}`,
    });
    return { values: [], steps };
  },
};

const schematHornera: FormulaDef = {
  id: "schemat-hornera",
  subject: "matematyka",
  topic: "Wielomiany · ROZSZ",
  name: "Schemat Hornera",
  latex: "W(x_0) = a_n x_0^n + \\dots + a_1 x_0 + a_0",
  vars: [
    { id: "deg", label: "stopień (1–6)", kind: "select", options: ["1", "2", "3", "4", "5", "6"] },
    { id: "a6", label: "a₆" },
    { id: "a5", label: "a₅" },
    { id: "a4", label: "a₄" },
    { id: "a3", label: "a₃" },
    { id: "a2", label: "a₂" },
    { id: "a1", label: "a₁" },
    { id: "a0", label: "a₀" },
    { id: "x0", label: "x₀" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "W(x₀), iloraz",
  solve(_unknown, known, _places, selects): FormulaSolution {
    const deg = Number(selects?.["deg"] ?? "1");
    if (![1, 2, 3, 4, 5, 6].includes(deg)) throw new Error("stopień musi być 1–6");
    const coeffIds = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
    const start = 6 - deg;
    const coeffs: Rational[] = [];
    for (let i = start; i <= 6; i++) {
      const id = coeffIds[i];
      const val = known[id];
      coeffs.push(val ? asRational(val, id) : { p: 0n, q: 1n });
    }
    if (isZero(coeffs[0])) throw new Error("współczynnik wiodący nie może być 0");
    const x0 = asRational(known["x0"], "x₀");
    const steps: FormulaSolution["steps"] = [];
    const n = coeffs.length;
    const result: Rational[] = [coeffs[0]];
    for (let i = 1; i < n; i++) {
      result.push(add(coeffs[i], mul(result[i - 1], x0)));
    }
    const remainder = result[n - 1];
    const quotient = result.slice(0, -1);
    steps.push({
      title: "1. Schemat Hornera",
      body: `\\begin{aligned} x_0 &= ${L(x0)} \\\\ a &= ${coeffs.map(L).join(" & ")} \\\\ wiersz &= ${result.map(L).join(" & ")} \\end{aligned}`,
    });
    steps.push({
      title: "2. Wynik",
      body: `W(${L(x0)}) = ${L(remainder)}, \\; Q = [${quotient.map(L).join(", ")}]`,
    });
    return { values: [], steps };
  },
};

export const MATH_DZIEL_HORNER: FormulaDef[] = [dzielenieWielomianow, schematHornera];
