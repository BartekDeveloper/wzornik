import {
  ONE,
  ZERO,
  add,
  binom,
  cmp,
  div,
  factorial,
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
  solveQuadratic,
  sqrtRational,
} from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex, stdSteps } from "./types";

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
    if (unknown !== "w") {
      throw new Error("ten kalkulator liczy tylko wynik — odwrotności to pierwiastki i logarytmy");
    }
    const p = asRational(known["p"], "p");
    const n = intVal(asRational(known["n"], "n"), "n");
    const value = exactOf(pow(p, n));
    return {
      values: [value],
      steps: stdSteps("w = p^n", `w = ${L(p)}^{${n}}`, value, places),
    };
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
    if (unknown === "n") throw new Error("stopień policz logarytmem");
    if (unknown === "m") {
      const w = asRational(known["w"], "w");
      const n = requireNatural(known["n"], "n");
      const value = exactOf(pow(w, n));
      return {
        values: [value],
        steps: stdSteps("m = w^n", `m = ${L(w)}^{${n}}`, value, places),
      };
    }
    const m = asRational(known["m"], "m");
    const n = requireNatural(known["n"], "n");
    if (n === 1) {
      const value = exactOf(m);
      return { values: [value], steps: stdSteps("w = m", `w = ${L(m)}`, value, places) };
    }
    if (n === 2) {
      if (cmp(m, ZERO) < 0)
        throw new Error("pierwiastek kwadratowy z ujemnej nie istnieje (na rzeczywistych)");
      const value = sqrtRational(m);
      return {
        values: [value],
        steps: stdSteps("w = \\sqrt{m}", `w = \\sqrt{${L(m)}}`, value, places),
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
      steps: stdSteps("w = \\sqrt[n]{m}", `w = \\sqrt[${n}]{${L(m)}}`, value, places, note),
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
      return {
        values: [value],
        steps: stdSteps("c = \\log_a b", `c = \\log_{${L(a)}} ${L(b)}`, value, places, note),
      };
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
      return {
        values: [value],
        steps: stdSteps("b = a^c", `b = ${L(a)}^{${L(c)}}`, value, places, note),
      };
    }
    throw new Error("podstawę policz pierwiastkiem odpowiedniego stopnia");
  },
};

const wartoscBezwzgledna: FormulaDef = {
  id: "wartosc-bezwzgledna",
  subject: "matematyka",
  topic: "Wartość bezwzględna",
  name: "Wartość bezwzględna",
  latex: "w = |x|",
  vars: [{ id: "x", label: "x" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "w",
  solve(_unknown, known, places): FormulaSolution {
    const x = asRational(known["x"], "x");
    const ax = cmp(x, ZERO) < 0 ? neg(x) : x;
    const value = exactOf(ax);
    return {
      values: [value],
      steps: stdSteps("w = |x|", `w = |${L(x)}|`, value, places),
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
    if (unknown === "n") throw new Error("liczbę okresów policz logarytmem");
    const n = requireNatural(known["n"], "n");
    const base_of = (p: Rational): Rational => add(ONE, div(p, of(100)));
    if (unknown === "K") {
      const K0 = asRational(known["K0"], "K₀");
      const p = asRational(known["p"], "p");
      const value = exactOf(mul(K0, pow(base_of(p), n)));
      return {
        values: [value],
        steps: stdSteps(
          "K = K_0\\left(1 + \\frac{p}{100}\\right)^n",
          `K = ${L(K0)}\\left(1 + \\frac{${L(p)}}{100}\\right)^{${n}}`,
          value,
          places,
        ),
      };
    }
    if (unknown === "K0") {
      const K = asRational(known["K"], "K");
      const p = asRational(known["p"], "p");
      const value = exactOf(div(K, pow(base_of(p), n)));
      return {
        values: [value],
        steps: stdSteps(
          "K_0 = \\frac{K}{\\left(1 + p/100\\right)^n}",
          `K_0 = \\frac{${L(K)}}{\\left(1 + ${L(p)}/100\\right)^{${n}}}`,
          value,
          places,
        ),
      };
    }
    const K = asRational(known["K"], "K");
    const K0 = asRational(known["K0"], "K₀");
    const ratio = approx(exactOf(div(K, K0)));
    const value = approxOnly(100 * (Math.pow(ratio, 1 / n) - 1));
    return {
      values: [value],
      steps: stdSteps(
        "p = 100\\left(\\sqrt[n]{K/K_0} - 1\\right)",
        `p = 100\\left(\\sqrt[${n}]{${L(K)}/${L(K0)}} - 1\\right)`,
        value,
        places,
        "wynik tylko przybliżony",
      ),
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
    const x = exactOf(div(sub(mul(c1, b2), mul(c2, b1)), W));
    const y = exactOf(div(sub(mul(a1, c2), mul(a2, c1)), W));
    return {
      values: [x, y],
      labels: ["x", "y"],
      steps: [
        {
          title: "1. Wyznaczniki (Cramer)",
          body: "W = a_1b_2 - a_2b_1, \\; x = \\frac{W_x}{W}, \\; y = \\frac{W_y}{W}",
        },
        {
          title: "2. Podstawienie danych",
          body: `W = ${L(a1)} \\cdot ${L(b2)} - ${L(a2)} \\cdot ${L(b1)} = ${formatLatex({ rat: W, irr: null })}`,
        },
        {
          title: "3. Wynik",
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
  name: "Nierówność kwadratowa (ax²+bx+c > 0)",
  latex: "ax^2 + bx + c > 0",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    const head = [
      { title: "1. Miejsca zerowe", body: "\\Delta = b^2 - 4ac" },
      {
        title: "2. Podstawienie danych",
        body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`,
      },
    ];
    const interval = (body: string, note?: string): FormulaSolution => ({
      values: [],
      steps: [...head, { title: "3. Wynik", body, note }],
    });
    if (isZero(a)) {
      if (isZero(b)) {
        return cmp(c, ZERO) > 0
          ? interval("x \\in \\mathbb{R}", "nierówność zawsze prawdziwa")
          : interval("\\varnothing", "nierówność nigdy nie zachodzi");
      }
      const x0 = exactOf(div(neg(c), b));
      const Lx = formatLatex(x0);
      return cmp(b, ZERO) > 0
        ? interval(`x \\in (${Lx}, +\\infty)`)
        : interval(`x \\in (-\\infty, ${Lx})`);
    }
    const q = solveQuadratic(a, b, c);
    const up = cmp(a, ZERO) > 0;
    if (q.kind === "none") {
      return up
        ? interval("x \\in \\mathbb{R}", "parabola cała nad osią (Δ < 0, a > 0)")
        : interval("\\varnothing", "parabola cała pod osią (Δ < 0, a < 0)");
    }
    if (q.kind === "one" || q.kind === "linear") {
      const x0 = formatLatex(q.roots[0]);
      return up
        ? interval(
            `x \\in \\mathbb{R} \\setminus \\{${x0}\\}`,
            "pierwiastek podwójny nie spełnia >",
          )
        : interval("\\varnothing", "wartości niedodatnie (Δ = 0, a < 0)");
    }
    const [x1, x2] = q.roots.map(formatLatex);
    return up
      ? interval(`x \\in (-\\infty, ${x1}) \\cup (${x2}, +\\infty)`)
      : interval(`x \\in (${x1}, ${x2})`);
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
    if (D === 0n) throw new Error("d = 0 — wyłącz x przed nawias i rozwiąż równanie kwadratowe");
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
    if (unknown === "a") {
      const b = g("b");
      const c = g("c");
      const d = g("d");
      value = exactOf(div(mul(b, c), d));
      transform = "a = \\frac{bc}{d}";
      subst = `a = \\frac{${L(b)} \\cdot ${L(c)}}{${L(d)}}`;
    } else if (unknown === "b") {
      const a = g("a");
      const c = g("c");
      const d = g("d");
      value = exactOf(div(mul(a, d), c));
      transform = "b = \\frac{ad}{c}";
      subst = `b = \\frac{${L(a)} \\cdot ${L(d)}}{${L(c)}}`;
    } else if (unknown === "c") {
      const a = g("a");
      const b = g("b");
      const d = g("d");
      value = exactOf(div(mul(a, d), b));
      transform = "c = \\frac{ad}{b}";
      subst = `c = \\frac{${L(a)} \\cdot ${L(d)}}{${L(b)}}`;
    } else {
      const a = g("a");
      const b = g("b");
      const c = g("c");
      value = exactOf(div(mul(b, c), a));
      transform = "d = \\frac{bc}{a}";
      subst = `d = \\frac{${L(b)} \\cdot ${L(c)}}{${L(a)}}`;
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places) };
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

const rozkladWielomianu: FormulaDef = {
  id: "rozklad-wielomianu",
  subject: "matematyka",
  topic: "Wielomiany",
  name: "Rozkład wielomianu na czynniki",
  latex: "W(x) = a(x-x_1)(x-x_2)(x-x_3)",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "rozkład",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const g = (id: string): Rational => asRational(known[id], id);
    const [a, b, c, d] = [g("a"), g("b"), g("c"), g("d")];
    const show = (e: Exact): string => formatLatex(e);
    const lin = (r: Rational): string =>
      cmp(r, ZERO) === 0
        ? "x"
        : cmp(r, ZERO) > 0
          ? `(x-${show({ rat: r, irr: null })})`
          : `(x+${show({ rat: neg(r), irr: null })})`;
    if (isZero(a)) {
      if (isZero(b)) throw new Error("a = b = 0 — to nie jest wielomian 2. ani 3. stopnia");
      const q = solveQuadratic(b, c, d);
      if (q.kind === "linear") throw new Error("rozklad: nieoczekiwany przypadek liniowy");
      if (q.kind === "none") {
        return {
          values: [],
          steps: [
            { title: "1. Stopień", body: "a = 0 — trójmian kwadratowy" },
            { title: "2. Delta", body: `\\Delta = ${formatLatex(q.delta)} < 0` },
            {
              title: "3. Wynik",
              body: `${L(b)}x^2+${L(c)}x+${L(d)}`,
              note: "nierozkładalny nad ℝ (Δ < 0)",
            },
          ],
        };
      }
      const roots = q.roots;
      const body =
        roots.length === 1
          ? `${L(b)}(x-${show(roots[0])})^2`
          : `${L(b)}(x-${show(roots[0])})(x-${show(roots[1])})`;
      return {
        values: roots,
        labels: roots.map((_, i) => `x${["₁", "₂"][i] ?? i + 1}`),
        steps: [
          { title: "1. Stopień", body: "a = 0 — trójmian kwadratowy" },
          { title: "2. Miejsca zerowe", body: `\\Delta = ${formatLatex(q.delta)}` },
          { title: "3. Wynik", body },
        ],
      };
    }
    const Lcm = [a.q, b.q, c.q, d.q].reduce((x, y) => (x / gcd(x, y)) * y, 1n);
    const A = a.p * (Lcm / a.q);
    const B = b.p * (Lcm / b.q);
    const C = c.p * (Lcm / c.q);
    const D = d.p * (Lcm / d.q);
    if (D === 0n) {
      return {
        values: [],
        steps: [
          { title: "1. Sprawdzenie", body: "d = 0" },
          { title: "2. Wyłączenie x", body: `W(x) = x(${L(a)}x^2+${L(b)}x+${L(c)})` },
          {
            title: "3. Wynik",
            body: `W(x) = x(${L(a)}x^2+${L(b)}x+${L(c)})`,
            note: "dalej rozłóż trójmian (delta)",
          },
        ],
      };
    }
    let coeffs: Rational[] = [
      { p: A, q: 1n },
      { p: B, q: 1n },
      { p: C, q: 1n },
      { p: D, q: 1n },
    ];
    const linears: Rational[] = [];
    for (const r of rationalRoots(A, B, C, D)) {
      while (coeffs.length > 1 && cmp(evalPoly(coeffs, r), ZERO) === 0) {
        linears.push(r);
        coeffs = deflate(coeffs, r);
      }
    }
    const head = [
      { title: "1. Kandydaci wymierne", body: "x = \\pm p/q, \\; p \\mid d, \\; q \\mid a" },
      { title: "2. Dzielenie (Horner)", body: `W(x) = ${L(a)}x^3+${L(b)}x^2+${L(c)}x+${L(d)}` },
    ];
    if (linears.length === 0) {
      return {
        values: [],
        steps: [
          ...head,
          { title: "3. Wynik", body: "\\varnothing", note: "brak pierwiastków wymiernych" },
        ],
      };
    }
    let body = `${L(a)}${linears.map(lin).join("")}`;
    let note: string | undefined;
    if (coeffs.length === 3) {
      const [A2, B2, C2] = coeffs;
      const q = solveQuadratic(A2, B2, C2);
      if (q.kind === "none" || q.roots.some((r) => r.irr)) {
        body += `(${formatLatex({ rat: A2, irr: null })}x^2+${formatLatex({ rat: B2, irr: null })}x+${formatLatex({ rat: C2, irr: null })})`;
        note = "trójmian reszty bez pierwiastków wymiernych";
      } else {
        for (const r of q.roots) {
          if (!r.irr) {
            body += lin(r.rat);
            linears.push(r.rat);
          }
        }
      }
    }
    const vals = linears.map((r) => ({ rat: r, irr: null }) as Exact);
    return {
      values: vals,
      labels: vals.map((_, i) => `x${["₁", "₂", "₃"][i] ?? i + 1}`),
      steps: [...head, { title: "3. Wynik", body, note }],
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
  rozkladWielomianu,
];
