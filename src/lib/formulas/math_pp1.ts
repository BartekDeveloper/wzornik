import {
  ONE,
  ZERO,
  add,
  binom,
  cmp,
  div,
  factorial,
  fromString,
  gcd,
  isIntegerR,
  isZero,
  mul,
  neg,
  of,
  pow,
  sub,
} from "../exact/rational";
import type { Rational } from "../exact/rational";
import {
  approx,
  approxOnly,
  cbrtRational,
  exactOf,
  logExact,
  rootRational,
  solveQuadratic,
  sqrtRational,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

function intVal(r: Rational, label: string): number {
  if (!isIntegerR(r) || r.p > 1000000n || r.p < -1000000n) {
    throw new Error(`${label} musi być liczbą całkowitą`);
  }
  return Number(r.p);
}

const potega: FormulaDef = {
  id: "potega",
  subject: "matematyka",
  topic: "Potęgi i pierwiastki",
  name: "Potęga liczby",
  latex: "w = p^n",
  vars: [
    { id: "p", label: "p (podstawa)" },
    { id: "n", label: "n (wykładnik całkowity)" },
    { id: "w", label: "w (wynik)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "p") {
      const w = asRational(known["w"], "w");
      const n = intVal(asRational(known["n"], "n"), "n");
      if (n === 0) {
        if (cmp(w, ONE) === 0) throw new Error("p^0 = 1 — podstawa dowolna niezerowa");
        throw new Error("sprzeczność — żadne p nie spełnia równania");
      }
      const k = Math.abs(n);
      let value: Exact;
      let note: string | undefined;
      try {
        const r = rootRational(w, k);
        value = n < 0 ? exactOf(div(ONE, r.rat)) : r;
      } catch {
        const wf = approx(exactOf(w));
        if (!(wf > 0)) throw new Error("podstawa rzeczywista wymaga w > 0");
        value = approxOnly(wf ** (1 / n));
        note = "wynik tylko przybliżony";
      }
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: `p = \\sqrt[${k}]{w}` },
          { title: "2. Podstawienie danych", body: `p = \\sqrt[${k}]{${L(w)}}` },
          { title: "3. Wynik", body: resultLatex("p", value, places), note },
        ],
      };
    }
    if (unknown === "n") {
      const p = asRational(known["p"], "p");
      const w = asRational(known["w"], "w");
      if (cmp(p, ZERO) <= 0 || cmp(sub(p, ONE), ZERO) === 0 || cmp(w, ZERO) <= 0) {
        throw new Error("wykładnik wyznaczam dla p > 0, p ≠ 1 i w > 0");
      }
      const lg = logExact(p, w);
      const nf = Math.round(approx(lg));
      if (!Number.isInteger(nf) || cmp(pow(p, nf), w) !== 0) {
        throw new Error("te dane nie dają całkowitego n — sprawdź liczby");
      }
      const value = exactOf(of(nf));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\log_p w" },
          { title: "2. Podstawienie danych", body: `n = \\log_{${L(p)}} ${L(w)}` },
          { title: "3. Logarytm", body: `\\log_p w = ${formatLatex(lg)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const p = asRational(known["p"], "p");
    const n = intVal(asRational(known["n"], "n"), "n");
    const value = exactOf(pow(p, n));
    const steps: FormulaSolution["steps"] = [
      { title: "1. Przekształcenie wzoru", body: "w = p^n" },
      { title: "2. Podstawienie danych", body: `w = ${L(p)}^{${n}}` },
    ];
    if (n >= 2 && n <= 6) {
      steps.push({
        title: "3. Rozpisanie",
        body: `w = ${Array(n).fill(L(p)).join(" \\cdot ")}`,
      });
    } else if (n <= -2 && n >= -6) {
      steps.push({
        title: "3. Rozpisanie",
        body: `w = \\frac{1}{${Array(-n).fill(L(p)).join(" \\cdot ")}}`,
      });
    } else if (n === 0) {
      steps.push({ title: "3. Reguła", body: "p^0 = 1 \\; (p \\ne 0)" });
    }
    steps.push({ title: `${steps.length + 1}. Wynik`, body: resultLatex("w", value, places) });
    return { values: [value], steps };
  },
};

const pierwiastek: FormulaDef = {
  id: "pierwiastek",
  subject: "matematyka",
  topic: "Potęgi i pierwiastki",
  name: "Pierwiastek n-tego stopnia",
  latex: "w = \\sqrt[n]{m}",
  vars: [
    { id: "m", label: "m (liczba podpierwiastkowa)" },
    { id: "n", label: "n (stopień)" },
    { id: "w", label: "w (wynik)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "n") {
      const m = asRational(known["m"], "m");
      const w = asRational(known["w"], "w");
      if (cmp(m, ZERO) <= 0 || cmp(w, ZERO) <= 0 || cmp(sub(w, ONE), ZERO) === 0) {
        throw new Error("stopień wyznaczam dla m > 0 i w > 0, w ≠ 1");
      }
      const lg = logExact(w, m);
      const nf = Math.round(approx(lg));
      if (!Number.isInteger(nf) || nf < 1 || cmp(pow(w, nf), m) !== 0) {
        throw new Error("te dane nie dają naturalnego stopnia — sprawdź liczby");
      }
      const value = exactOf(of(nf));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\log_w m" },
          { title: "2. Podstawienie danych", body: `n = \\log_{${L(w)}} ${L(m)}` },
          { title: "3. Logarytm", body: `\\log_w m = ${formatLatex(lg)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    if (unknown === "m") {
      const w = asRational(known["w"], "w");
      const n = requireNatural(known["n"], "n");
      const value = exactOf(pow(w, n));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "m = w^n" },
          { title: "2. Podstawienie danych", body: `m = ${L(w)}^{${n}}` },
          { title: "3. Sprawdzenie", body: `\\sqrt[${n}]{${formatLatex(value)}} = ${L(w)}` },
          { title: "4. Wynik", body: resultLatex("m", value, places) },
        ],
      };
    }
    const m = asRational(known["m"], "m");
    const n = requireNatural(known["n"], "n");
    if (n === 1) {
      const value = exactOf(m);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "w = m" },
          { title: "2. Podstawienie danych", body: `w = ${L(m)}` },
          {
            title: "3. Wynik",
            body: resultLatex("w", value, places),
            note: "pierwiastek 1. stopnia to ta sama liczba",
          },
        ],
      };
    }
    if (n === 2) {
      if (cmp(m, ZERO) < 0)
        throw new Error("pierwiastek kwadratowy z ujemnej nie istnieje (na rzeczywistych)");
      const value = sqrtRational(m);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "w = \\sqrt{m}" },
          { title: "2. Podstawienie danych", body: `w = \\sqrt{${L(m)}}` },
          { title: "3. Sprawdzenie", body: `(${formatLatex(value)})^2 = ${L(m)}` },
          { title: "4. Wynik", body: resultLatex("w", value, places) },
        ],
      };
    }
    let value: Exact;
    let note: string | undefined;
    try {
      if (n === 3) {
        value = cbrtRational(m);
      } else {
        throw new Error("no-exact");
      }
    } catch (e) {
      if (e instanceof Error && e.message !== "no-exact" && !e.message.includes("dokładnie"))
        throw e;
      if (cmp(m, ZERO) < 0 && n % 2 === 0)
        throw new Error("parzysty pierwiastek z ujemnej nie istnieje");
      const negM = cmp(m, ZERO) < 0;
      const v = Math.pow(Math.abs(approx(exactOf(m))), 1 / n);
      value = approxOnly(negM ? -v : v);
      note = "wynik tylko przybliżony";
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "w = \\sqrt[n]{m}" },
        { title: "2. Podstawienie danych", body: `w = \\sqrt[${n}]{${L(m)}}` },
        { title: "3. Wynik", body: resultLatex("w", value, places), note },
      ],
    };
  },
};

const logarytm: FormulaDef = {
  id: "logarytm",
  subject: "matematyka",
  topic: "Logarytmy",
  name: "Logarytm",
  latex: "\\log_a b = c \\iff a^c = b",
  vars: [
    { id: "a", label: "a (podstawa)" },
    { id: "b", label: "b (liczba)" },
    { id: "c", label: "c (wynik)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "c") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const value = logExact(a, b);
      const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
      const steps: FormulaSolution["steps"] = [
        { title: "1. Przekształcenie wzoru", body: "c = \\log_a b" },
        { title: "2. Podstawienie danych", body: `c = \\log_{${L(a)}} ${L(b)}` },
      ];
      if (!value.irr) {
        const k = Number(value.rat.p / value.rat.q);
        steps.push({
          title: "3. Sprawdzenie",
          body: `${L(a)}^{${L(value.rat)}} = ${L(b)}`,
          note: `bo ${L(a)} do potęgi ${k} daje ${L(b)}`,
        });
      }
      steps.push({
        title: `${steps.length + 1}. Wynik`,
        body: resultLatex("c", value, places),
        note,
      });
      return { values: [value], steps };
    }
    if (unknown === "b") {
      const a = asRational(known["a"], "a");
      const c = asRational(known["c"], "c");
      if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0) {
        throw new Error("podstawa dodatnia i różna od 1");
      }
      let value: Exact;
      let note: string | undefined;
      if (isIntegerR(c)) {
        value = exactOf(pow(a, Number(c.p)));
      } else {
        value = approxOnly(Math.pow(approx(exactOf(a)), approx(exactOf(c))));
        note = "wynik tylko przybliżony";
      }
      const steps: FormulaSolution["steps"] = [
        { title: "1. Przekształcenie wzoru", body: "b = a^c" },
        { title: "2. Podstawienie danych", body: `b = ${L(a)}^{${L(c)}}` },
      ];
      if (isIntegerR(c) && Number(c.p) >= 2 && Number(c.p) <= 6) {
        steps.push({
          title: "3. Rozpisanie",
          body: `b = ${Array(Number(c.p)).fill(L(a)).join(" \\cdot ")}`,
        });
      }
      steps.push({
        title: `${steps.length + 1}. Wynik`,
        body: resultLatex("b", value, places),
        note,
      });
      return { values: [value], steps };
    }
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (cmp(b, ZERO) <= 0) throw new Error("podstawę wyznaczam dla b > 0");
    let value: Exact;
    let note: string | undefined;
    if (isIntegerR(c) && c.p !== 0n) {
      const k = Number(c.p < 0n ? -c.p : c.p);
      try {
        const r = rootRational(b, k);
        value = c.p < 0n ? exactOf(div(ONE, r.rat)) : r;
      } catch {
        value = approxOnly(approx(exactOf(b)) ** (1 / Number(c.p)));
        note = "wynik tylko przybliżony";
      }
    } else if (!isIntegerR(c)) {
      value = approxOnly(approx(exactOf(b)) ** (1 / approx(exactOf(c))));
      note = "wynik tylko przybliżony";
    } else {
      throw new Error("c = 0: wtedy b = 1, a podstawa dowolna");
    }
    if (cmp(value.rat, ZERO) <= 0 && !value.irr) throw new Error("podstawa musi być dodatnia");
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "a = \\sqrt[c]{b}" },
        { title: "2. Podstawienie danych", body: `a = \\sqrt[${L(c)}]{${L(b)}}` },
        { title: "3. Wynik", body: resultLatex("a", value, places), note },
      ],
    };
  },
};

const wartoscBezwzgledna: FormulaDef = {
  id: "wartosc-bezwzgledna",
  subject: "matematyka",
  topic: "Wartość bezwzględna",
  name: "Wartość bezwzględna",
  latex: "w = |x - a|",
  vars: [
    { id: "x", label: "x" },
    { id: "a", label: "a (przesunięcie)" },
    { id: "w", label: "w (wynik)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "w") {
      const x = asRational(known["x"], "x");
      const a = asRational(known["a"], "a");
      const d = sub(x, a);
      const value = exactOf(cmp(d, ZERO) < 0 ? neg(d) : d);
      return {
        values: [value],
        steps: [
          { title: "1. Definicja", body: "w = |x - a|" },
          { title: "2. Podstawienie danych", body: `w = |${L(x)} - ${L(a)}|` },
          { title: "3. Różnica", body: `x - a = ${L(d)}` },
          { title: "4. Wynik", body: resultLatex("w", value, places) },
        ],
      };
    }
    if (unknown === "x") {
      const a = asRational(known["a"], "a");
      const w = asRational(known["w"], "w");
      if (cmp(w, ZERO) < 0) throw new Error("wartość bezwzględna nie jest ujemna");
      const x1 = exactOf(add(a, w));
      const x2 = exactOf(sub(a, w));
      if (isZero(w)) {
        return {
          values: [x1],
          steps: [
            { title: "1. Definicja", body: "x = a \\pm w" },
            { title: "2. Podstawienie danych", body: `x = ${L(a)} \\pm ${L(w)}` },
            { title: "3. Wynik", body: resultLatex("x", x1, places), note: "pierwiastek podwójny" },
          ],
        };
      }
      return {
        values: [x1, x2],
        labels: ["x₁", "x₂"],
        steps: [
          { title: "1. Definicja", body: "x = a \\pm w" },
          { title: "2. Podstawienie danych", body: `x = ${L(a)} \\pm ${L(w)}` },
          {
            title: "3. Wynik",
            body: `${resultLatex("x_1", x1, places)}, \\; ${resultLatex("x_2", x2, places)}`,
          },
        ],
      };
    }
    const x = asRational(known["x"], "x");
    const w = asRational(known["w"], "w");
    if (cmp(w, ZERO) < 0) throw new Error("wartość bezwzględna nie jest ujemna");
    const a1 = exactOf(add(x, w));
    const a2 = exactOf(sub(x, w));
    if (isZero(w)) {
      return {
        values: [a1],
        steps: [
          { title: "1. Definicja", body: "a = x \\mp w" },
          { title: "2. Podstawienie danych", body: `a = ${L(x)} \\mp ${L(w)}` },
          { title: "3. Wynik", body: resultLatex("a", a1, places) },
        ],
      };
    }
    return {
      values: [a1, a2],
      labels: ["a₁", "a₂"],
      steps: [
        { title: "1. Definicja", body: "a = x \\mp w" },
        { title: "2. Podstawienie danych", body: `a = ${L(x)} \\mp ${L(w)}` },
        {
          title: "3. Wynik",
          body: `${resultLatex("a_1", a1, places)}, \\; ${resultLatex("a_2", a2, places)}`,
        },
      ],
    };
  },
};

const procentSkladany: FormulaDef = {
  id: "procent-skladany",
  subject: "matematyka",
  topic: "Procenty",
  name: "Procent składany",
  latex: "K = K_0\\left(1 + \\frac{p}{100}\\right)^n",
  vars: [
    { id: "K", label: "K (kapitał końcowy)" },
    { id: "K0", label: "K₀ (kapitał początkowy)" },
    { id: "p", label: "p [%]" },
    { id: "n", label: "n (liczba okresów)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "n") {
      const K = asRational(known["K"], "K");
      const K0 = asRational(known["K0"], "K₀");
      const p = asRational(known["p"], "p");
      const base = add(ONE, div(p, of(100)));
      const ratio = div(K, K0);
      if (cmp(ratio, ZERO) <= 0 || cmp(base, ZERO) <= 0 || cmp(sub(base, ONE), ZERO) === 0) {
        throw new Error("okresy wyznaczam dla K/K₀ > 0 i podstawy dodatniej ≠ 1");
      }
      const lg = logExact(base, ratio);
      const nf = Math.round(approx(lg));
      if (!Number.isInteger(nf) || nf < 1 || cmp(pow(base, nf), ratio) !== 0) {
        throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
      }
      const value = exactOf(of(nf));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "n = \\log_{1+p/100}(K/K_0)" },
          {
            title: "2. Podstawienie danych",
            body: `n = \\log_{${L(base)}}(${L(K)}/${L(K0)})`,
          },
          { title: "3. Logarytm", body: `\\log = ${formatLatex(lg)}` },
          { title: "4. Wynik", body: resultLatex("n", value, places) },
        ],
      };
    }
    const n = requireNatural(known["n"], "n");
    const base_of = (p: Rational): Rational => add(ONE, div(p, of(100)));
    if (unknown === "K") {
      const K0 = asRational(known["K0"], "K₀");
      const p = asRational(known["p"], "p");
      const base = base_of(p);
      const pw = pow(base, n);
      const value = exactOf(mul(K0, pw));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "K = K_0\\left(1 + \\frac{p}{100}\\right)^n" },
          {
            title: "2. Podstawienie danych",
            body: `K = ${L(K0)}\\left(1 + \\frac{${L(p)}}{100}\\right)^{${n}}`,
          },
          { title: "3. Czynnik procentowy", body: `1 + \\frac{${L(p)}}{100} = ${L(base)}` },
          { title: "4. Potęga czynnika", body: `${L(base)}^{${n}} = ${L(pw)}` },
          { title: "5. Wynik", body: resultLatex("K", value, places) },
        ],
      };
    }
    if (unknown === "K0") {
      const K = asRational(known["K"], "K");
      const p = asRational(known["p"], "p");
      const base = base_of(p);
      const pw = pow(base, n);
      const value = exactOf(div(K, pw));
      return {
        values: [value],
        steps: [
          {
            title: "1. Przekształcenie wzoru",
            body: "K_0 = \\frac{K}{\\left(1 + p/100\\right)^n}",
          },
          {
            title: "2. Podstawienie danych",
            body: `K_0 = \\frac{${L(K)}}{\\left(1 + ${L(p)}/100\\right)^{${n}}}`,
          },
          { title: "3. Czynnik procentowy", body: `1 + \\frac{${L(p)}}{100} = ${L(base)}` },
          { title: "4. Potęga czynnika", body: `${L(base)}^{${n}} = ${L(pw)}` },
          { title: "5. Wynik", body: resultLatex("K_0", value, places) },
        ],
      };
    }
    const K = asRational(known["K"], "K");
    const K0 = asRational(known["K0"], "K₀");
    const ratio = approx(exactOf(div(K, K0)));
    const value = approxOnly(100 * (Math.pow(ratio, 1 / n) - 1));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "p = 100\\left(\\sqrt[n]{K/K_0} - 1\\right)" },
        {
          title: "2. Podstawienie danych",
          body: `p = 100\\left(\\sqrt[${n}]{${L(K)}/${L(K0)}} - 1\\right)`,
        },
        {
          title: "3. Iloraz kapitałów",
          body: `\\frac{K}{K_0} = \\frac{${L(K)}}{${L(K0)}} = ${trimNum(ratio)}`,
        },
        {
          title: "4. Wynik",
          body: resultLatex("p", value, places),
          note: "wynik tylko przybliżony",
        },
      ],
    };
  },
};

const ukladRownan: FormulaDef = {
  id: "uklad-rownan",
  subject: "matematyka",
  topic: "Równania",
  name: "Układ 2 równań liniowych",
  latex: "\\begin{cases}a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2\\end{cases}",
  vars: [
    { id: "a1", label: "a₁" },
    { id: "b1", label: "b₁" },
    { id: "c1", label: "c₁" },
    { id: "a2", label: "a₂" },
    { id: "b2", label: "b₂" },
    { id: "c2", label: "c₂" },
  ],
  mode: "fixed",
  outputId: "xy",
  outputLabel: "x, y",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string): Rational => asRational(known[id], id);
    const [a1, b1, c1, a2, b2, c2] = [g("a1"), g("b1"), g("c1"), g("a2"), g("b2"), g("c2")];
    const W = sub(mul(a1, b2), mul(a2, b1));
    if (isZero(W)) throw new Error("wyznacznik W = 0 — układ sprzeczny albo nieoznaczony");
    const Wx = sub(mul(c1, b2), mul(c2, b1));
    const Wy = sub(mul(a1, c2), mul(a2, c1));
    const x = exactOf(div(Wx, W));
    const y = exactOf(div(Wy, W));
    return {
      values: [x, y],
      labels: ["x", "y"],
      steps: [
        {
          title: "1. Wyznaczniki (Cramer)",
          body: "W = a_1b_2 - a_2b_1, \\; W_x = c_1b_2 - c_2b_1, \\; W_y = a_1c_2 - a_2c_1",
        },
        {
          title: "2. Wyznacznik główny",
          body: `W = ${L(a1)} \\cdot ${L(b2)} - ${L(a2)} \\cdot ${L(b1)} = ${formatLatex({ rat: W, irr: null })}`,
        },
        {
          title: "3. Wyznaczniki pomocnicze",
          body: `W_x = ${L(c1)} \\cdot ${L(b2)} - ${L(c2)} \\cdot ${L(b1)} = ${formatLatex({ rat: Wx, irr: null })}, \\; W_y = ${L(a1)} \\cdot ${L(c2)} - ${L(a2)} \\cdot ${L(c1)} = ${formatLatex({ rat: Wy, irr: null })}`,
        },
        {
          title: "4. Wynik",
          body: `${resultLatex("x", x, places)}, \\; ${resultLatex("y", y, places)}`,
        },
      ],
    };
  },
};

const nierownoscKwadratowa: FormulaDef = {
  id: "nierownosc-kwadratowa",
  subject: "matematyka",
  topic: "Nierówności",
  name: "Nierówność kwadratowa",
  latex: "ax^2 + bx + c \\;\\; (>, \\ge, <, \\le, \\ne \\; 0)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    {
      id: "op",
      label: "znak",
      kind: "select",
      options: [">", "≥", "<", "≤", "≠"],
    },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const op = selects?.["op"] ?? ">";
    const opLatex = op === "≥" ? "\\ge" : op === "≤" ? "\\le" : op === "≠" ? "\\ne" : op;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const head = [
      { title: "1. Miejsca zerowe", body: "\\Delta = b^2 - 4ac" },
      {
        title: "2. Podstawienie danych",
        body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}, \\; ax^2+bx+c ${opLatex} 0`,
      },
    ];
    const interval = (body: string, note?: string): FormulaSolution => ({
      values: [],
      steps: [...head, { title: `${head.length + 1}. Wynik`, body, note }],
    });
    const constCase = (holds: boolean): FormulaSolution =>
      holds
        ? interval("x \\in \\mathbb{R}", "nierówność zawsze prawdziwa")
        : interval("\\varnothing", "nierówność nigdy nie zachodzi");
    if (isZero(a)) {
      if (isZero(b)) {
        const v = cmp(c, ZERO);
        return constCase(
          op === ">"
            ? v > 0
            : op === "≥"
              ? v >= 0
              : op === "<"
                ? v < 0
                : op === "≤"
                  ? v <= 0
                  : v !== 0,
        );
      }
      const x0 = exactOf(div(neg(c), b));
      const Lx = formatLatex(x0);
      const asc = cmp(b, ZERO) > 0;
      if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${Lx}\\}`);
      if (op === ">")
        return asc ? interval(`x \\in (${Lx}, +\\infty)`) : interval(`x \\in (-\\infty, ${Lx})`);
      if (op === "≥")
        return asc ? interval(`x \\in [${Lx}, +\\infty)`) : interval(`x \\in (-\\infty, ${Lx}]`);
      if (op === "<")
        return asc ? interval(`x \\in (-\\infty, ${Lx})`) : interval(`x \\in (${Lx}, +\\infty)`);
      return asc ? interval(`x \\in (-\\infty, ${Lx}]`) : interval(`x \\in [${Lx}, +\\infty)`);
    }
    const q = solveQuadratic(a, b, c);
    const up = cmp(a, ZERO) > 0;
    if (q.kind === "none") {
      const holds = up
        ? op === ">" || op === "≥" || op === "≠"
        : op === "<" || op === "≤" || op === "≠";
      head.push({ title: "3. Delta", body: `\\Delta = ${formatLatex(q.delta)} < 0` });
      return holds
        ? interval("x \\in \\mathbb{R}", "znak stały (Δ < 0)")
        : interval("\\varnothing", "znak stały, przeciwny do znaku (Δ < 0)");
    }
    if (q.kind === "one" || q.kind === "linear") {
      const x0 = formatLatex(q.roots[0]);
      if (q.kind === "one") {
        head.push({
          title: "3. Delta i pierwiastek",
          body: `\\Delta = ${formatLatex(q.delta)} = 0, \\; x_0 = ${x0}`,
        });
      }
      if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
      if (up) {
        if (op === ">") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
        if (op === "≥") return interval("x \\in \\mathbb{R}", "zero w jednym punkcie się liczy");
        if (op === "<") return interval("\\varnothing");
        return interval(`x \\in \\{${x0}\\}`, "tylko pierwiastek podwójny");
      }
      if (op === ">") return interval("\\varnothing");
      if (op === "≥") return interval(`x \\in \\{${x0}\\}`, "tylko pierwiastek podwójny");
      if (op === "<") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
      return interval("x \\in \\mathbb{R}", "zero w jednym punkcie się liczy");
    }
    const [x1, x2] = q.roots.map(formatLatex);
    head.push({
      title: "3. Delta i pierwiastki",
      body: `\\Delta = ${formatLatex(q.delta)}, \\; x_1 = ${x1}, \\; x_2 = ${x2}`,
    });
    const outside = (closed: boolean): string =>
      closed
        ? `x \\in (-\\infty, ${x1}] \\cup [${x2}, +\\infty)`
        : `x \\in (-\\infty, ${x1}) \\cup (${x2}, +\\infty)`;
    const inside = (closed: boolean): string =>
      closed ? `x \\in [${x1}, ${x2}]` : `x \\in (${x1}, ${x2})`;
    if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${x1}, ${x2}\\}`);
    if (up) {
      if (op === ">") return interval(outside(false));
      if (op === "≥") return interval(outside(true));
      if (op === "<") return interval(inside(false));
      return interval(inside(true));
    }
    if (op === ">") return interval(inside(false));
    if (op === "≥") return interval(inside(true));
    if (op === "<") return interval(outside(false));
    return interval(outside(true));
  },
};

function intDivisors(n: bigint): bigint[] {
  const a = n < 0n ? -n : n;
  const out: bigint[] = [];
  for (let d = 1n; d * d <= a && out.length < 2000; d++) {
    if (a % d === 0n) {
      out.push(d);
      if (d * d !== a) out.push(a / d);
    }
  }
  return out;
}

function rationalRoots(A: bigint, B: bigint, C: bigint, D: bigint): Rational[] {
  const roots: Rational[] = [];
  const seen = new Set<string>();
  for (const p of intDivisors(D)) {
    for (const q of intDivisors(A)) {
      for (const s of [1n, -1n]) {
        const rp = s * p;
        const key = `${rp}/${q}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const num = A * rp * rp * rp + B * rp * rp * q + C * rp * q * q + D * q * q * q;
        if (num === 0n) {
          const ap = rp < 0n ? -rp : rp;
          const g0 = gcd(ap, q);
          roots.push({ p: rp / g0, q: q / g0 });
        }
      }
    }
  }
  return roots;
}

function evalPoly(coeffs: Rational[], r: Rational): Rational {
  let v: Rational = { p: 0n, q: 1n };
  for (const c of coeffs) v = add(mul(v, r), c);
  return v;
}

function deflate(coeffs: Rational[], r: Rational): Rational[] {
  const out: Rational[] = [coeffs[0]];
  for (let i = 1; i < coeffs.length - 1; i++) {
    out.push(add(coeffs[i], mul(out[i - 1], r)));
  }
  return out;
}

const hornerPierwiastki: FormulaDef = {
  id: "horner-pierwiastki",
  subject: "matematyka",
  topic: "Wielomiany",
  name: "Pierwiastki wymierne wielomianu 3. stopnia",
  latex: "ax^3 + bx^2 + cx + d = 0",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const g = (id: string): Rational => asRational(known[id], id);
    const [a, b, c, d] = [g("a"), g("b"), g("c"), g("d")];
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
    const Lcm = [a.q, b.q, c.q, d.q].reduce((x, y) => (x / gcd(x, y)) * y, 1n);
    const A = a.p * (Lcm / a.q);
    const B = b.p * (Lcm / b.q);
    const C = c.p * (Lcm / c.q);
    const D = d.p * (Lcm / d.q);
    if (D === 0n) {
      const q = solveQuadratic(a, b, c);
      if (q.kind === "linear") throw new Error("horner: nieoczekiwany przypadek liniowy");
      const zero = exactOf({ p: 0n, q: 1n });
      const steps: FormulaSolution["steps"] = [
        {
          title: "1. Wyłączenie x",
          body: `W(x) = x(${L(a)}x^2 + ${L(b)}x + ${L(c)})`,
        },
        {
          title: "2. Delta trójmianu",
          body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)} = ${formatLatex(q.delta)}`,
        },
      ];
      if (q.kind === "none") {
        steps.push({
          title: "3. Wynik",
          body: "x_1 = 0",
          note: "trójmian w nawiasie bez pierwiastków rzeczywistych",
        });
        return { values: [zero], steps };
      }
      const vals = [zero, ...q.roots];
      steps.push({
        title: "3. Wynik",
        body: vals.map((v, i) => `x_{${i + 1}} = ${formatLatex(v)}`).join(", \\; "),
      });
      return { values: vals, steps };
    }
    if (D > 100000n || D < -100000n || A > 100000n || A < -100000n) {
      throw new Error("za duże współczynniki do szukania pierwiastków");
    }
    const roots = rationalRoots(A, B, C, D);
    const head = [
      {
        title: "1. Kandydaci (tw. o pierwiastkach wymiernych)",
        body: "x = \\pm\\frac{p}{q}, \\; p \\mid d, \\; q \\mid a",
      },
      {
        title: "2. Sprawdzenie",
        body: `W(x) = ${L(a)}x^3 + ${L(b)}x^2 + ${L(c)}x + ${L(d)}`,
      },
    ];
    if (roots.length === 0) {
      return {
        values: [],
        steps: [
          ...head,
          { title: "3. Wynik", body: "\\varnothing", note: "brak pierwiastków wymiernych" },
        ],
      };
    }
    const vals = roots.map(exactOf);
    const factored =
      roots.length === 3
        ? `${L(a)}(x ${roots
            .map((r) =>
              r.p < 0n
                ? `+ ${formatLatex({ rat: neg(r), irr: null })}`
                : `- ${formatLatex({ rat: r, irr: null })}`,
            )
            .join("")})`
        : null;
    return {
      values: vals,
      steps: [
        ...head,
        {
          title: "3. Wynik",
          body: roots
            .map((r, i) => `x_{${i + 1}} = ${formatLatex({ rat: r, irr: null })}`)
            .join(", \\; "),
          note: factored ? `postać iloczynowa: ${factored}` : undefined,
        },
      ],
    };
  },
};

const postacKanoniczna: FormulaDef = {
  id: "postac-kanoniczna",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Postać kanoniczna i wierzchołek",
  latex: "f(x) = a(x - p)^2 + q",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "pq",
  outputLabel: "p, q",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const p = exactOf(div(neg(b), mul(of(2), a)));
    const delta = sub(mul(b, b), mul(mul(of(4), a), c));
    const q = exactOf(div(neg(delta), mul(of(4), a)));
    const v = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [p, q],
      labels: ["p", "q"],
      steps: [
        { title: "1. Wzory", body: "p = \\frac{-b}{2a}, \\; q = \\frac{-\\Delta}{4a}" },
        {
          title: "2. Podstawienie danych",
          body: `p = \\frac{${L(neg(b))}}{2 \\cdot ${L(a)}}, \\; q = \\frac{-(${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)})}{4 \\cdot ${L(a)}}`,
        },
        {
          title: "3. Wynik",
          body: `W = (${v(p)}, ${v(q)}), \\; f(x) = ${L(a)}(x - ${v(p)})^2 + ${v(q)}`,
        },
      ],
    };
  },
};

const prawdoKlasyczne: FormulaDef = {
  id: "prawdo-klasyczne",
  subject: "matematyka",
  topic: "Prawdopodobieństwo",
  name: "Prawdopodobieństwo klasyczne",
  latex: "P(A) = \\frac{|A|}{|\\Omega|}",
  vars: [
    { id: "A", label: "|A| (zdarzenia sprzyjające)" },
    { id: "O", label: "|Ω| (wszystkie zdarzenia)" },
  ],
  mode: "fixed",
  outputId: "P",
  outputLabel: "P(A)",
  solve(_unknown, known, places): FormulaSolution {
    const A = requireNatural(known["A"], "|A|");
    const O = requireNatural(known["O"], "|Ω|");
    if (A > O) throw new Error("zdarzeń sprzyjających nie może być więcej niż wszystkich");
    const value = exactOf({ p: BigInt(A), q: BigInt(O) });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "P(A) = \\frac{|A|}{|\\Omega|}" },
        { title: "2. Podstawienie danych", body: `P(A) = \\frac{${A}}{${O}}` },
        {
          title: "3. Wynik",
          body: resultLatex("P(A)", value, places),
          note: `czyli ${formatDecimal(value, 4)} (${trimPct(value)})`,
        },
      ],
    };
  },
};

function trimPct(v: Exact): string {
  const p = approx(v) * 100;
  return `${trimNum(p)}%`;
}

const permutacje: FormulaDef = {
  id: "permutacje",
  subject: "matematyka",
  topic: "Kombinatoryka",
  name: "Permutacje",
  latex: "P_n = n!",
  vars: [{ id: "n", label: "n" }],
  mode: "fixed",
  outputId: "P",
  outputLabel: "Pₙ",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
    const value = exactOf({ p: factorial(BigInt(n)), q: 1n });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "P_n = n!" },
        { title: "2. Podstawienie danych", body: `P_{${n}} = ${n}!` },
        { title: "3. Wynik", body: resultLatex(`P_{${n}}`, value, places) },
      ],
    };
  },
};

const kombinacje: FormulaDef = {
  id: "kombinacje",
  subject: "matematyka",
  topic: "Kombinatoryka",
  name: "Kombinacje (bez powtórzeń)",
  latex: "C^k_n = \\binom{n}{k}",
  vars: [
    { id: "n", label: "n" },
    { id: "k", label: "k" },
  ],
  mode: "fixed",
  outputId: "C",
  outputLabel: "C(n,k)",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    const k = requireNatural(known["k"], "k");
    if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
    const value = exactOf({ p: binom(BigInt(n), BigInt(k)), q: 1n });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "C^k_n = \\frac{n!}{k!(n-k)!}" },
        {
          title: "2. Podstawienie danych",
          body: `C^{${k}}_{${n}} = \\frac{${n}!}{${k}!(${n}-${k})!}`,
        },
        { title: "3. Wynik", body: resultLatex(`C^{${k}}_{${n}}`, value, places) },
      ],
    };
  },
};

const wariacje: FormulaDef = {
  id: "wariacje",
  subject: "matematyka",
  topic: "Kombinatoryka",
  name: "Wariacje bez powtórzeń",
  latex: "V^k_n = \\frac{n!}{(n-k)!}",
  vars: [
    { id: "n", label: "n" },
    { id: "k", label: "k" },
  ],
  mode: "fixed",
  outputId: "V",
  outputLabel: "V(n,k)",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    const k = requireNatural(known["k"], "k");
    if (k > n) throw new Error("wariacje: wymagane k ≤ n");
    if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
    const value = exactOf({ p: factorial(BigInt(n)) / factorial(BigInt(n - k)), q: 1n });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "V^k_n = \\frac{n!}{(n-k)!}" },
        { title: "2. Podstawienie danych", body: `V^{${k}}_{${n}} = \\frac{${n}!}{(${n}-${k})!}` },
        { title: "3. Wynik", body: resultLatex(`V^{${k}}_{${n}}`, value, places) },
      ],
    };
  },
};

const tales: FormulaDef = {
  id: "tales",
  subject: "matematyka",
  topic: "Podobieństwo",
  name: "Twierdzenie Talesa (proporcja)",
  latex: "\\frac{a}{b} = \\frac{c}{d}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): Rational => {
      if (id === unknown) throw new Error("solver: brak danej");
      return asRational(known[id], id);
    };
    let value: Exact;
    let transform = "";
    let subst = "";
    let num = "";
    if (unknown === "a") {
      const b = g("b");
      const c = g("c");
      const d = g("d");
      const prod = mul(b, c);
      value = exactOf(div(prod, d));
      transform = "a = \\frac{bc}{d}";
      subst = `a = \\frac{${L(b)} \\cdot ${L(c)}}{${L(d)}}`;
      num = `bc = ${L(b)} \\cdot ${L(c)} = ${L(prod)}`;
    } else if (unknown === "b") {
      const a = g("a");
      const c = g("c");
      const d = g("d");
      const prod = mul(a, d);
      value = exactOf(div(prod, c));
      transform = "b = \\frac{ad}{c}";
      subst = `b = \\frac{${L(a)} \\cdot ${L(d)}}{${L(c)}}`;
      num = `ad = ${L(a)} \\cdot ${L(d)} = ${L(prod)}`;
    } else if (unknown === "c") {
      const a = g("a");
      const b = g("b");
      const d = g("d");
      const prod = mul(a, d);
      value = exactOf(div(prod, b));
      transform = "c = \\frac{ad}{b}";
      subst = `c = \\frac{${L(a)} \\cdot ${L(d)}}{${L(b)}}`;
      num = `ad = ${L(a)} \\cdot ${L(d)} = ${L(prod)}`;
    } else {
      const a = g("a");
      const b = g("b");
      const c = g("c");
      const prod = mul(b, c);
      value = exactOf(div(prod, a));
      transform = "d = \\frac{bc}{a}";
      subst = `d = \\frac{${L(b)} \\cdot ${L(c)}}{${L(a)}}`;
      num = `bc = ${L(b)} \\cdot ${L(c)} = ${L(prod)}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Licznik", body: num },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const postacieKwadratowej: FormulaDef = {
  id: "postacie-kwadratowej",
  subject: "matematyka",
  topic: "Funkcja kwadratowa",
  name: "Wszystkie postacie funkcji kwadratowej",
  latex: "ax^2+bx+c = a(x-p)^2+q = a(x-x_1)(x-x_2)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "f",
  outputLabel: "postacie",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const p = exactOf(div(neg(b), mul(of(2), a)));
    const delta = sub(mul(b, b), mul(mul(of(4), a), c));
    const q = exactOf(div(neg(delta), mul(of(4), a)));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    const sgn = (v: Rational, name: string): string =>
      isZero(v) ? "" : cmp(v, ZERO) > 0 ? `+${L(v)}${name}` : `-${L(neg(v))}${name}`;
    const ogolna = `${L(a)}x^2${sgn(b, "x")}${sgn(c, "")}`;
    const kanoniczna = `${L(a)}(x-${show(p)})^2+${show(q)}`;
    const steps: FormulaSolution["steps"] = [
      { title: "1. Postać ogólna", body: `f(x) = ${ogolna}` },
      {
        title: "2. Postać kanoniczna",
        body: `f(x) = ${kanoniczna}, \\; W = (${show(p)}, ${show(q)})`,
      },
    ];
    const s = cmp(delta, ZERO);
    if (s < 0) {
      steps.push({
        title: "3. Postać iloczynowa",
        body: "\\Delta < 0",
        note: "brak postaci iloczynowej nad rzeczywistymi (Δ < 0)",
      });
      return { values: [p, q], labels: ["p", "w"], steps };
    }
    const qq = solveQuadratic(a, b, c);
    const roots = qq.roots;
    const r0 = roots[0];
    const r1 = roots[1];
    const iloczynowa =
      roots.length === 1 && r0
        ? `${L(a)}(x-${show(r0)})^2`
        : r0 && r1
          ? `${L(a)}(x-${show(r0)})(x-${show(r1)})`
          : "";
    steps.push({ title: "3. Postać iloczynowa", body: `f(x) = ${iloczynowa}` });
    return {
      values: [...roots, p, q],
      labels: [...roots.map((_, i) => `x${["₁", "₂"][i] ?? i + 1}`), "p", "w"],
      steps,
    };
  },
};

const rozkladLiczby: FormulaDef = {
  id: "rozklad-liczby",
  subject: "matematyka",
  topic: "Liczby całkowite",
  name: "Rozkład na czynniki pierwsze",
  latex: "n = p_1^{e_1} \\cdot p_2^{e_2} \\cdots",
  vars: [{ id: "n", label: "n (≥ 2)" }],
  mode: "fixed",
  outputId: "r",
  outputLabel: "rozkład",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const n = requireNatural(known["n"], "n");
    if (n < 2) throw new Error("rozkład: n ≥ 2");
    if (n > 1e12) throw new Error("rozkład: n ≤ 10¹²");
    let rest = n;
    const fac: [number, number][] = [];
    for (let d = 2; d * d <= rest; d++) {
      if (rest % d !== 0) continue;
      let e = 0;
      while (rest % d === 0) {
        rest /= d;
        e++;
      }
      fac.push([d, e]);
    }
    if (rest > 1) fac.push([rest, 1]);
    const body =
      fac.length === 1 && fac[0][1] === 1
        ? `${n}`
        : `${n} = ${fac.map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(" \\cdot ")}`;
    return {
      values: [],
      steps: [
        { title: "1. Metoda", body: "dzielenie przez kolejne liczby pierwsze" },
        { title: "2. Dzielniki", body: `n = ${n}` },
        {
          title: "3. Wynik",
          body,
          note: fac.length === 1 && fac[0][1] === 1 ? "liczba pierwsza" : undefined,
        },
      ],
    };
  },
};

const znakWielomianu: FormulaDef = {
  id: "znak-wielomianu",
  subject: "matematyka",
  topic: "Nierówności",
  name: "Znak wielomianu 3. stopnia",
  latex: "ax^3+bx^2+cx+d \\;\\; (>, \\ge, <, \\le, \\ne \\; 0)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
    {
      id: "op",
      label: "znak",
      kind: "select",
      options: [">", "≥", "<", "≤", "≠"],
    },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places, selects): FormulaSolution {
    void places;
    const op = selects?.["op"] ?? ">";
    const g = (id: string): Rational => asRational(known[id], id);
    const [a, b, c, d] = [g("a"), g("b"), g("c"), g("d")];
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
    const Lcm = [a.q, b.q, c.q, d.q].reduce((x, y) => (x / gcd(x, y)) * y, 1n);
    const A = a.p * (Lcm / a.q);
    const B = b.p * (Lcm / b.q);
    const C = c.p * (Lcm / c.q);
    const D = d.p * (Lcm / d.q);
    if (D === 0n) throw new Error("d = 0 — wyłącz x przed nawias");
    let coeffs: Rational[] = [
      { p: A, q: 1n },
      { p: B, q: 1n },
      { p: C, q: 1n },
      { p: D, q: 1n },
    ];
    const mult = new Map<string, { r: Rational; k: number }>();
    for (const r of rationalRoots(A, B, C, D)) {
      while (coeffs.length > 1 && cmp(evalPoly(coeffs, r), ZERO) === 0) {
        const key = `${r.p}/${r.q}`;
        const prev = mult.get(key);
        mult.set(key, { r, k: (prev?.k ?? 0) + 1 });
        coeffs = deflate(coeffs, r);
      }
    }
    if (mult.size === 0)
      throw new Error("brak pierwiastków wymiernych — nie umiem wyznaczyć znaku");
    let restSign: 1 | -1 = 1;
    if (coeffs.length === 3) {
      const A2 = coeffs[0];
      const B2 = coeffs[1];
      const C2 = coeffs[2];
      if (A2 === undefined || B2 === undefined || C2 === undefined)
        throw new Error("błąd wewnętrzny");
      const q = solveQuadratic(A2, B2, C2);
      if (q.kind !== "none" && q.roots.some((r) => !r.irr))
        throw new Error("reszta ma pierwiastki niewymierne — znak niejednoznaczny");
      restSign = cmp(A2, ZERO) > 0 ? 1 : -1;
    } else if (coeffs.length !== 1) {
      throw new Error("nieoczekiwana reszta z dzielenia");
    } else {
      const c0 = coeffs[0];
      if (c0 === undefined) throw new Error("błąd wewnętrzny");
      restSign = c0.p > 0n ? 1 : -1;
    }
    const dir: 1 | -1 = A > 0n ? 1 : -1;
    const distinct = [...mult.values()].sort((p, q) => cmp(sub(p.r, q.r), ZERO));
    const pts = distinct.map(({ r }) => formatLatex({ rat: r, irr: null }));
    const bounds: string[] = ["-\\infty", ...pts, "+\\infty"];
    const parts: string[] = [];
    const closed = op === "≥" || op === "≤";
    const wantPos = op === ">" || op === "≥";
    const wantNeg = op === "<" || op === "≤";
    for (let i = 0; i <= distinct.length; i++) {
      let s = dir * restSign;
      for (let j = i; j < distinct.length; j++) {
        const dj = distinct[j];
        if (dj && dj.k % 2 === 1) s *= -1;
      }
      const take = op === "≠" ? true : wantPos ? s > 0 : wantNeg ? s < 0 : false;
      if (!take) continue;
      const lo = bounds[i] ?? "";
      const hi = bounds[i + 1] ?? "";
      const loClosed = closed && lo !== "-\\infty";
      const hiClosed = closed && hi !== "+\\infty";
      parts.push(`${loClosed ? "[" : "("}${lo}, ${hi}${hiClosed ? "]" : ")"}`);
    }
    const rootsList = distinct.map(({ r }) => formatLatex({ rat: r, irr: null })).join(", ");
    let body: string;
    let note: string | undefined;
    if (op === "≠") {
      body = `x \\in \\mathbb{R} \\setminus \\{${rootsList}\\}`;
    } else if (parts.length === 0) {
      body = "\\varnothing";
      note = "żaden przedział nie spełnia znaku";
    } else {
      body = `x \\in ${parts.join(" \\cup ")}`;
      note = `pierwiastki: ${rootsList}`;
    }
    return {
      values: [],
      steps: [
        { title: "1. Pierwiastki i krotności", body: `W(x) = 0 \\Rightarrow ${rootsList}` },
        { title: "2. Tabela znaków", body: `wsp. wiodący ${A > 0n ? "dodatni" : "ujemny"}` },
        { title: "3. Wynik", body, note },
      ],
    };
  },
};

const statystyka: FormulaDef = {
  id: "statystyka",
  subject: "matematyka",
  topic: "Statystyka",
  name: "Średnia, mediana i odchylenie",
  latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
  vars: [{ id: "xs", label: "dane (po ; lub ,)", kind: "list" }],
  mode: "fixed",
  outputId: "stat",
  outputLabel: "statystyki",
  solve(_unknown, _known, places, selects): FormulaSolution {
    const raw = (selects?.["xs"] ?? "").trim();
    if (raw === "") throw new Error("wpisz liczby oddzielone średnikiem, przecinkiem albo spacją");
    let xs: Rational[];
    try {
      xs = raw
        .split(/[;,\s]+/)
        .filter((t) => t !== "")
        .map((t) => fromString(t));
    } catch {
      throw new Error("zły zapis liczby — dozwolone np. 2,5 albo 1/3");
    }
    if (xs.length === 0) throw new Error("wpisz co najmniej jedną liczbę");
    const n = xs.length;
    const sum = xs.reduce((acc, x) => add(acc, x), ZERO);
    const mean = div(sum, of(n));
    const sorted = [...xs].sort((a, b) => (cmp(a, b) < 0 ? -1 : cmp(a, b) > 0 ? 1 : 0));
    const mid = Math.floor(n / 2);
    const median = n % 2 === 1 ? sorted[mid]! : div(add(sorted[mid - 1]!, sorted[mid]!), of(2));
    const counts = new Map<string, { v: Rational; c: number }>();
    for (const x of xs) {
      const key = `${x.p}/${x.q}`;
      const e = counts.get(key);
      if (e) e.c++;
      else counts.set(key, { v: x, c: 1 });
    }
    let mode = sorted[0]!;
    let best = 0;
    for (const { v, c } of counts.values()) {
      if (c > best) {
        best = c;
        mode = v;
      }
    }
    const variance = div(
      xs.reduce((acc, x) => add(acc, mul(sub(x, mean), sub(x, mean))), ZERO),
      of(n),
    );
    let std: Exact;
    let note: string | undefined;
    try {
      std = sqrtRational(variance);
    } catch {
      std = approxOnly(Math.sqrt(approx(exactOf(variance))));
      note = "odchylenie tylko przybliżone";
    }
    const meanV = exactOf(mean);
    const medV = exactOf(median);
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [meanV, medV, std],
      labels: ["x̄", "Me", "σ"],
      steps: [
        { title: "1. Dane", body: `n = ${n}, \\; ${sorted.map(L).join(", \\; ")}` },
        {
          title: "2. Średnia",
          body: `\\bar{x} = \\frac{${sorted.map(L).join("+")}}{${n}} = ${show(meanV)}`,
        },
        {
          title: "3. Mediana",
          body:
            n % 2 === 1
              ? `Me = ${L(median)}`
              : `Me = \\frac{${L(sorted[mid - 1]!)} + ${L(sorted[mid]!)}}{2} = ${L(median)}`,
        },
        {
          title: "4. Odchylenie",
          body: `\\sigma = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n}} = ${show(std)}`,
        },
        {
          title: "5. Wynik",
          body: `${resultLatex("\\bar{x}", meanV, places)}, \\; ${resultLatex("Me", medV, places)}, \\; ${resultLatex("\\sigma", std, places)}`,
          note: `dominanta: ${L(mode)}${note ? `; ${note}` : ""}`,
        },
      ],
    };
  },
};

export const MATH_PP1: FormulaDef[] = [
  potega,
  pierwiastek,
  logarytm,
  wartoscBezwzgledna,
  procentSkladany,
  ukladRownan,
  nierownoscKwadratowa,
  hornerPierwiastki,
  postacKanoniczna,
  prawdoKlasyczne,
  permutacje,
  kombinacje,
  wariacje,
  tales,
  postacieKwadratowej,
  rozkladLiczby,
  znakWielomianu,
  statystyka,
];
