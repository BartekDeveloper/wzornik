import {
  ONE,
  ZERO,
  add,
  binom,
  cmp,
  div,
  factorial,
  isIntegerR,
  isZero,
  mul,
  neg,
  of,
  pow,
  sub,
} from "../exact/rational";
import type { Rational } from "../exact/rational";
import { approx, approxOnly, exactOf, logExact, trigExact } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const newton: FormulaDef = {
  id: "newton",
  subject: "matematyka",
  topic: "Dwumian Newtona · ROZSZ",
  name: "Rozwinięcie (a + b)ⁿ",
  latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
  vars: [{ id: "n", label: "n" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "rozwinięcie",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const n = requireNatural(known["n"], "n");
    if (n > 12) throw new Error("rozwinięcie: n ≤ 12 (dalej za długie)");
    const N = BigInt(n);
    const terms: string[] = [];
    for (let k = 0; k <= n; k++) {
      const c = binom(N, BigInt(k));
      const pa = n - k;
      const pb = k;
      const cs = c === 1n && (pa > 0 || pb > 0) ? "" : `${c}`;
      const sa = pa === 0 ? "" : pa === 1 ? "a" : `a^{${pa}}`;
      const sb = pb === 0 ? "" : pb === 1 ? "b" : `b^{${pb}}`;
      terms.push(`${cs}${sa}${sb}`);
    }
    return {
      values: [],
      steps: [
        { title: "1. Wzór", body: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k" },
        { title: "2. Współczynniki", body: `n = ${n}` },
        { title: "3. Wynik", body: `(a + b)^{${n}} = ${terms.join(" + ")}` },
      ],
    };
  },
};

const silnia: FormulaDef = {
  id: "silnia",
  subject: "matematyka",
  topic: "Kombinatoryka · ROZSZ",
  name: "Silnia",
  latex: "n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n",
  vars: [{ id: "n", label: "n" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "n!",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    if (n > 1000) throw new Error("silnia: n ≤ 1000");
    const value = exactOf({ p: factorial(BigInt(n)), q: 1n });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n" },
        { title: "2. Podstawienie danych", body: `${n}!` },
        { title: "3. Wynik", body: resultLatex(`${n}!`, value, places) },
      ],
    };
  },
};

const szesciany: FormulaDef = {
  id: "szesciany",
  subject: "matematyka",
  topic: "Wzory skróconego mnożenia · ROZSZ",
  name: "Sześciany (a ± b)³, a³ ± b³",
  latex: "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "wyniki",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const a2 = mul(a, a);
    const b2 = mul(b, b);
    const a3 = mul(a2, a);
    const b3 = mul(b2, b);
    const s1 = exactOf(add(add(add(a3, mul(mul(of(3), a2), b)), mul(mul(of(3), a), b2)), b3));
    const s2 = exactOf(sub(sub(add(a3, b3), mul(mul(of(3), a2), b)), mul(mul(of(3), a), b2)));
    const d1 = exactOf(add(a3, b3));
    const d2 = exactOf(sub(a3, b3));
    const show = (e: ReturnType<typeof exactOf>): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [s1, s2, d1, d2],
      labels: ["(a+b)³", "(a−b)³", "a³+b³", "a³−b³"],
      steps: [
        {
          title: "1. Wzory",
          body: "(a+b)^3 = a^3+3a^2b+3ab^2+b^3, \\; a^3+b^3 = (a+b)(a^2-ab+b^2), \\; a^3-b^3 = (a-b)(a^2+ab+b^2)",
        },
        {
          title: "2. Podstawienie danych",
          body: `a = ${L(a)}, \\; b = ${L(b)}`,
        },
        {
          title: "3. Wynik",
          body: `(a+b)^3 = ${show(s1)}, \\; (a-b)^3 = ${show(s2)}, \\; a^3+b^3 = ${show(d1)}, \\; a^3-b^3 = ${show(d2)}`,
        },
      ],
    };
  },
};

const granicaQn: FormulaDef = {
  id: "granica-qn",
  subject: "matematyka",
  topic: "Granice · ROZSZ",
  name: "Granica qⁿ przy n → ∞",
  latex: "\\lim_{n \\to \\infty} q^n",
  vars: [{ id: "q", label: "q" }],
  mode: "fixed",
  outputId: "g",
  outputLabel: "granica",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const q = asRational(known["q"], "q");
    const aq = cmp(q, ZERO) < 0 ? neg(q) : q;
    const less1 = cmp(aq, ONE) < 0;
    const eq1 = cmp(aq, ONE) === 0;
    if (less1) {
      return {
        values: [exactOf(ZERO)],
        steps: [
          { title: "1. Reguła", body: "|q| < 1 \\Rightarrow \\lim q^n = 0" },
          { title: "2. Podstawienie danych", body: `|${L(q)}| < 1` },
          { title: "3. Wynik", body: "0" },
        ],
      };
    }
    if (eq1) {
      if (cmp(q, ZERO) > 0) {
        return {
          values: [exactOf(ONE)],
          steps: [
            { title: "1. Reguła", body: "q = 1 \\Rightarrow \\lim q^n = 1" },
            { title: "2. Podstawienie danych", body: `q = ${L(q)}` },
            { title: "3. Wynik", body: "1" },
          ],
        };
      }
      return {
        values: [],
        steps: [
          { title: "1. Reguła", body: "q = -1" },
          { title: "2. Podstawienie danych", body: `q = ${L(q)}` },
          {
            title: "3. Wynik",
            body: "-1, 1, -1, \\ldots",
            note: "granica nie istnieje — ciąg oscyluje",
          },
        ],
      };
    }
    return {
      values: [],
      steps: [
        { title: "1. Reguła", body: "|q| > 1 \\Rightarrow |q^n| \\to +\\infty" },
        { title: "2. Podstawienie danych", body: `|${L(q)}| > 1` },
        {
          title: "3. Wynik",
          body: cmp(q, ZERO) > 0 ? "+\\infty" : "-\\infty, +\\infty, \\ldots",
          note:
            cmp(q, ZERO) > 0 ? "rozbieżny do +∞" : "rozbieżny co do wartości (znak na przemian)",
        },
      ],
    };
  },
};

const pochodnaWielomianu: FormulaDef = {
  id: "pochodna-wielomianu",
  subject: "matematyka",
  topic: "Pochodne · ROZSZ",
  name: "Pochodna wielomianu 3. stopnia",
  latex: "(ax^3 + bx^2 + cx + d)' = 3ax^2 + 2bx + c",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
    { id: "d", label: "d" },
  ],
  mode: "fixed",
  outputId: "p",
  outputLabel: "f'",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const g = (id: string) => asRational(known[id], id);
    const [a, b, c] = [g("a"), g("b"), g("c")];
    const A = mul(a, of(3));
    const B = mul(b, of(2));
    const term = (coef: Rational, pw: string, first: boolean): string => {
      if (isZero(coef)) return "";
      const s = first ? (cmp(coef, ZERO) < 0 ? "-" : "") : cmp(coef, ZERO) < 0 ? " - " : " + ";
      const abs = cmp(coef, ZERO) < 0 ? neg(coef) : coef;
      const cs = abs.p === 1n && abs.q === 1n && pw !== "" ? "" : L(abs);
      return `${s}${cs}${pw}`;
    };
    const body =
      `${term(A, "x^2", true)}${term(B, "x", A.p === 0n)}${term(c, "", A.p === 0n && B.p === 0n)}`.trim() ||
      "0";
    return {
      values: [exactOf(A), exactOf(B), exactOf(c)],
      labels: ["3a", "2b", "c"],
      steps: [
        { title: "1. Reguła", body: "(x^n)' = nx^{n-1}, \\; (f + g)' = f' + g'" },
        {
          title: "2. Podstawienie danych",
          body: `f(x) = ${L(a)}x^3 + ${L(b)}x^2 + ${L(c)}x + ${L(g("d"))}`,
        },
        { title: "3. Wynik", body: `f'(x) = ${body}` },
      ],
    };
  },
};

const ekstremaKwadratowej: FormulaDef = {
  id: "ekstrema-kwadratowej",
  subject: "matematyka",
  topic: "Pochodne · ROZSZ",
  name: "Ekstremum funkcji kwadratowej",
  latex: "f'(x) = 0 \\iff x = -\\frac{b}{2a}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "e",
  outputLabel: "ekstremum",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
    const xw = exactOf(div(neg(b), mul(of(2), a)));
    const yw = exactOf(add(mul(a, mul(xw.rat, xw.rat)), add(mul(b, xw.rat), c)));
    const kind = cmp(a, ZERO) > 0 ? "minimum" : "maksimum";
    return {
      values: [xw, yw],
      labels: ["xw", "yw"],
      steps: [
        { title: "1. Warunek", body: "f'(x) = 2ax + b = 0" },
        {
          title: "2. Podstawienie danych",
          body: `2 \\cdot ${L(a)}x + ${L(b)} = 0`,
        },
        {
          title: "3. Wynik",
          body: `${resultLatex("x_w", xw, places)}, \\; ${resultLatex("y_w", yw, places)}`,
          note: `a ${cmp(a, ZERO) > 0 ? ">" : "<"} 0, więc to ${kind} (ramiona ${cmp(a, ZERO) > 0 ? "w górę" : "w dół"})`,
        },
      ],
    };
  },
};

const prawdoWarunkowe: FormulaDef = {
  id: "prawdo-warunkowe",
  subject: "matematyka",
  topic: "Prawdopodobieństwo · ROZSZ",
  name: "Prawdopodobieństwo warunkowe",
  latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
  vars: [
    { id: "PAB", label: "P(A∩B)" },
    { id: "PB", label: "P(B)" },
    { id: "P", label: "P(A|B)" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "P") {
      const PAB = asRational(known["PAB"], "P(A∩B)");
      const PB = asRational(known["PB"], "P(B)");
      const value = exactOf(div(PAB, PB));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}" },
          { title: "2. Podstawienie danych", body: `P(A|B) = \\frac{${L(PAB)}}{${L(PB)}}` },
          { title: "3. Wynik", body: resultLatex("P(A|B)", value, places) },
        ],
      };
    }
    if (unknown === "PAB") {
      const P = asRational(known["P"], "P(A|B)");
      const PB = asRational(known["PB"], "P(B)");
      const value = exactOf(mul(P, PB));
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "P(A \\cap B) = P(A|B) \\cdot P(B)" },
          { title: "2. Podstawienie danych", body: `P(A \\cap B) = ${L(P)} \\cdot ${L(PB)}` },
          { title: "3. Wynik", body: resultLatex("P(A \\cap B)", value, places) },
        ],
      };
    }
    const P = asRational(known["P"], "P(A|B)");
    const PAB = asRational(known["PAB"], "P(A∩B)");
    const value = exactOf(div(PAB, P));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: "P(B) = \\frac{P(A \\cap B)}{P(A|B)}" },
        { title: "2. Podstawienie danych", body: `P(B) = \\frac{${L(PAB)}}{${L(P)}}` },
        { title: "3. Wynik", body: resultLatex("P(B)", value, places) },
      ],
    };
  },
};

const prawdoCalkowite: FormulaDef = {
  id: "prawdo-calkowite",
  subject: "matematyka",
  topic: "Prawdopodobieństwo · ROZSZ",
  name: "Prawdopodobieństwo całkowite (2 hipotezy)",
  latex: "P(A) = P(B_1)P(A|B_1) + P(B_2)P(A|B_2)",
  vars: [
    { id: "PB1", label: "P(B₁)" },
    { id: "PAB1", label: "P(A|B₁)" },
    { id: "PB2", label: "P(B₂)" },
    { id: "PAB2", label: "P(A|B₂)" },
  ],
  mode: "fixed",
  outputId: "P",
  outputLabel: "P(A)",
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id);
    const value = exactOf(add(mul(g("PB1"), g("PAB1")), mul(g("PB2"), g("PAB2"))));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "P(A) = P(B_1)P(A|B_1) + P(B_2)P(A|B_2)" },
        {
          title: "2. Podstawienie danych",
          body: `P(A) = ${L(g("PB1"))} \\cdot ${L(g("PAB1"))} + ${L(g("PB2"))} \\cdot ${L(g("PAB2"))}`,
        },
        { title: "3. Wynik", body: resultLatex("P(A)", value, places) },
      ],
    };
  },
};

const rownanieWykladnicze: FormulaDef = {
  id: "rownanie-wykladnicze",
  subject: "matematyka",
  topic: "Równania · ROZSZ",
  name: "Równanie wykładnicze aˣ = b",
  latex: "a^x = b \\iff x = \\log_a b",
  vars: [
    { id: "a", label: "a (podstawa)" },
    { id: "b", label: "b" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0) {
      throw new Error("podstawa dodatnia i różna od 1");
    }
    if (cmp(b, ZERO) <= 0) throw new Error("b > 0 — inaczej brak rozwiązań");
    const value = logExact(a, b);
    const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
    const steps: FormulaSolution["steps"] = [
      { title: "1. Logarytmowanie", body: "x = \\log_a b" },
      { title: "2. Podstawienie danych", body: `x = \\log_{${L(a)}} ${L(b)}` },
    ];
    if (!value.irr) {
      steps.push({
        title: "3. Sprawdzenie",
        body: `${L(a)}^{${formatLatex(value)}} = ${L(b)}`,
      });
    }
    steps.push({
      title: `${steps.length + 1}. Wynik`,
      body: resultLatex("x", value, places),
      note,
    });
    return { values: [value], steps };
  },
};

const rownanieLogarytmiczne: FormulaDef = {
  id: "rownanie-logarytmiczne",
  subject: "matematyka",
  topic: "Równania · ROZSZ",
  name: "Równanie logarytmiczne log_a(x) = c",
  latex: "\\log_a x = c \\iff x = a^c",
  vars: [
    { id: "a", label: "a (podstawa)" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "x",
  outputLabel: "x",
  solve(_unknown, known, places): FormulaSolution {
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
      { title: "1. Definicja", body: "x = a^c" },
      { title: "2. Podstawienie danych", body: `x = ${L(a)}^{${L(c)}}` },
    ];
    if (isIntegerR(c) && Number(c.p) >= 2 && Number(c.p) <= 6 && c.p >= 0n) {
      steps.push({
        title: "3. Rozpisanie",
        body: `x = ${Array(Number(c.p)).fill(L(a)).join(" \\cdot ")}`,
      });
    }
    steps.push({
      title: `${steps.length + 1}. Wynik`,
      body: resultLatex("x", value, places),
      note,
    });
    return { values: [value], steps };
  },
};

const vieta: FormulaDef = {
  id: "vieta",
  subject: "matematyka",
  topic: "Równania · ROZSZ",
  name: "Wzory Viete’a",
  latex: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "s",
  outputLabel: "suma, iloczyn",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
    const s = exactOf(div(neg(b), a));
    const p = exactOf(div(c, a));
    return {
      values: [s, p],
      labels: ["x₁+x₂", "x₁·x₂"],
      steps: [
        { title: "1. Wzory", body: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}" },
        {
          title: "2. Podstawienie danych",
          body: `x_1 + x_2 = -\\frac{${L(b)}}{${L(a)}}, \\; x_1 x_2 = \\frac{${L(c)}}{${L(a)}}`,
        },
        {
          title: "3. Wynik",
          body: `${resultLatex("x_1 + x_2", s, places)}, \\; ${resultLatex("x_1 x_2", p, places)}`,
        },
      ],
    };
  },
};

const podwojonyKat: FormulaDef = {
  id: "podwojony-kat",
  subject: "matematyka",
  topic: "Trygonometria · ROZSZ",
  name: "Sinus i cosinus podwojonego kąta",
  latex: "\\sin 2x = 2\\sin x\\cos x, \\; \\cos 2x = \\cos^2 x - \\sin^2 x",
  vars: [{ id: "x", label: "x [°]" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "sin 2x, cos 2x",
  solve(_unknown, known, places): FormulaSolution {
    const raw = known["x"];
    const deg = isIntegerR(asRational(raw, "x")) ? Number(asRational(raw, "x").p) : approx(raw);
    const s = trigExact("sin", 2 * deg);
    const c = trigExact("cos", 2 * deg);
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [s, c],
      labels: ["sin 2x", "cos 2x"],
      steps: [
        {
          title: "1. Wzory",
          body: "\\sin 2x = 2\\sin x\\cos x, \\; \\cos 2x = \\cos^2 x - \\sin^2 x",
        },
        { title: "2. Podstawienie danych", body: `x = ${L(asRational(raw, "x"))}^\\circ` },
        {
          title: "3. Wynik",
          body: `\\sin ${2 * deg}^\\circ = ${show(s)}, \\; \\cos ${2 * deg}^\\circ = ${show(c)}`,
        },
      ],
    };
  },
};

export const MATH_PR: FormulaDef[] = [
  newton,
  silnia,
  szesciany,
  granicaQn,
  pochodnaWielomianu,
  ekstremaKwadratowej,
  prawdoWarunkowe,
  prawdoCalkowite,
  rownanieWykladnicze,
  rownanieLogarytmiczne,
  vieta,
  podwojonyKat,
];
