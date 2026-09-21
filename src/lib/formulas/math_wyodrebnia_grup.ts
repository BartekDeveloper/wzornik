import { ONE, cmp, gcd, neg } from "../exact/rational";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural } from "./types";

const L = formatRatLatex;

const wyodrebnianie: FormulaDef = {
  id: "wyodrebnianie-czynnika",
  subject: "matematyka",
  topic: "Wielomiany",
  name: "Wyodrębnianie wspólnego czynnika",
  latex: "a_1 x^{k_1} + a_2 x^{k_2} + a_3 x^{k_3} = x^m \\cdot (\\dots)",
  vars: [
    { id: "c1", label: "wsp. 1" },
    { id: "k1", label: "wykładnik 1" },
    { id: "c2", label: "wsp. 2" },
    { id: "k2", label: "wykładnik 2" },
    { id: "c3", label: "wsp. 3" },
    { id: "k3", label: "wykładnik 3" },
  ],
  mode: "fixed",
  outputId: "f",
  outputLabel: "rozłożenie",
  solve(_unknown, known, _places): FormulaSolution {
    const c1 = asRational(known["c1"], "wsp. 1");
    const c2 = asRational(known["c2"], "wsp. 2");
    const c3 = asRational(known["c3"], "wsp. 3");
    const k1 = requireNatural(known["k1"], "wykładnik 1");
    const k2 = requireNatural(known["k2"], "wykładnik 2");
    const k3 = requireNatural(known["k3"], "wykładnik 3");
    const ks = [k1, k2, k3];
    const cs = [c1, c2, c3];
    const m = Math.min(...ks);
    const g = cs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
    const inside = cs
      .map((c, i) => {
        const coef = { p: c.p / g, q: c.q };
        const exp = ks[i] - m;
        if (exp === 0) return L(coef);
        if (exp === 1) return `${L(coef) === "1" ? "" : L(coef)}x`;
        return `${L(coef) === "1" ? "" : L(coef)}x^{${exp}}`;
      })
      .join(" + ");
    const xPart = m === 0 ? "" : m === 1 ? "x" : `x^{${m}}`;
    const gPart = g === 1n ? "" : L({ p: g, q: c1.q });
    const factored = `${gPart}${xPart}(${inside})`;
    const orig = cs
      .map((c, i) => {
        if (ks[i] === 0) return L(c);
        if (ks[i] === 1) return `${L(c) === "1" ? "" : L(c)}x`;
        return `${L(c) === "1" ? "" : L(c)}x^{${ks[i]}}`;
      })
      .join(" + ");
    return {
      values: [],
      steps: [
        { title: "1. Wyrazy wielomianu", body: `W(x) = ${orig}` },
        {
          title: "2. Wspólny czynnik liczbowy",
          body: g === 1n ? "brak (NWD = 1)" : `NWD = ${L({ p: g, q: c1.q })}`,
        },
        {
          title: "3. Wspólny czynnik zmienny",
          body: m === 0 ? "brak (wykładnik min = 0)" : `min wykładnik = ${m} \\Rightarrow x^{${m}}`,
        },
        { title: "4. Wynik", body: `W(x) = ${factored}` },
      ],
    };
  },
};

const grupowanie: FormulaDef = {
  id: "grupowanie",
  subject: "matematyka",
  topic: "Wielomiany",
  name: "Grupowanie wyrazów",
  latex: "ax^3+bx^2+cx+d = (ax^2+b)(x+d/b) \\text{ itd.}",
  vars: [
    { id: "a", label: "a (x³)" },
    { id: "b", label: "b (x²)" },
    { id: "c", label: "c (x¹)" },
    { id: "d", label: "d (wyraz wolny)" },
  ],
  mode: "fixed",
  outputId: "f",
  outputLabel: "rozłożenie",
  solve(_unknown, known, _places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const d = asRational(known["d"], "d");
    const orig = `${L(a)}x^3 ${b.p >= 0 ? "+" : ""}${L(b)}x^2 ${c.p >= 0 ? "+" : ""}${L(c)}x ${d.p >= 0 ? "+" : ""}${L(d)}`;
    const g1 = gcd(a.p < 0n ? -a.p : a.p, b.p < 0n ? -b.p : b.p);
    const g2 = gcd(c.p < 0n ? -c.p : c.p, d.p < 0n ? -d.p : d.p);
    const steps: FormulaSolution["steps"] = [{ title: "1. Wielomian", body: `W(x) = ${orig}` }];
    if (g1 > 0n && g2 > 0n) {
      const P = { p: a.p / g1, q: a.q };
      const Q = { p: b.p / g1, q: b.q };
      const P2 = { p: c.p / g2, q: c.q };
      const Q2 = { p: d.p / g2, q: d.q };
      if (cmp(P, P2) === 0 && cmp(Q, Q2) === 0) {
        const t1 = g1 === 1n ? "x^2" : `${L({ p: g1, q: 1n })}x^2`;
        const outer = `(${t1} + ${L({ p: g2, q: 1n })})`.replace("+ -", "- ");
        const pt = cmp(P, ONE) === 0 ? "x" : cmp(P, neg(ONE)) === 0 ? "-x" : `${L(P)}x`;
        const inner = `(${pt} + ${L(Q)})`.replace("+ -", "- ");
        const factored = `${outer}${inner}`;
        steps.push({
          title: "2. Grupowanie (1,2) i (3,4)",
          body: `W(x) = ${L(a)}x^3+${L(b)}x^2+${L(c)}x+${L(d)} = x^2(${L(P)}x+${L(Q)}) + (${L(P2)}x+${L(Q2)})`,
        });
        steps.push({
          title: "3. Wspólny nawias",
          body: `W(x) = ${outer}${inner}`,
        });
        steps.push({ title: "4. Wynik", body: `W(x) = ${factored}` });
        return { values: [], steps };
      }
    }
    steps.push({
      title: "2. Próba grupowania",
      body: "brak wspólnych czynników w parach (1,2) i (3,4)",
    });
    steps.push({
      title: "3. Wynik",
      body: "nie da się rozłożyć metodą grupowania",
      note: "spróbuj innej metody",
    });
    return { values: [], steps };
  },
};

export const MATH_WYODREBNIA_GRUP: FormulaDef[] = [wyodrebnianie, grupowanie];
