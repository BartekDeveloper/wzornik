import { ONE, ZERO, add, cmp, div, mul, of, pow, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { approx, approxOnly, exactOf, rootRational, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { binom, fromString } from "../exact/rational";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, requireNatural, resultLatex } from "./types";

const L = formatRatLatex;

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const wariacjeZPowtorzeniami: FormulaDef = {
  id: "wariacje-z-powtorzeniami",
  subject: "matematyka",
  topic: "Kombinatoryka",
  name: "Wariacje z powtórzeniami",
  latex: "V_n^k = n^k",
  vars: [
    { id: "n", label: "n (klasa)" },
    { id: "k", label: "k (wyróżniane)" },
  ],
  mode: "fixed",
  outputId: "V",
  outputLabel: "V",
  solve(_unknown, known, places): FormulaSolution {
    const n = asRational(known["n"], "n");
    const k = requireNatural(known["k"], "k");
    if (cmp(n, ZERO) < 0) throw new Error("n ≥ 0");
    if (k > 4096) throw new Error("za duża wartość");
    const value = exactOf(pow(n, k));
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "V_n^k = n^k" },
        { title: "2. Podstawienie danych", body: `V_{${L(n)}}^{${k}} = ${L(n)}^{${k}}` },
        { title: "3. Wynik", body: resultLatex("V", value, places) },
      ],
    };
  },
};

const kombinacjeZPowtorzeniami: FormulaDef = {
  id: "kombinacje-z-powtorzeniami",
  subject: "matematyka",
  topic: "Kombinatoryka",
  name: "Kombinacje z powtórzeniami",
  latex: "\\bar{C}_n^k = \\binom{n+k-1}{k}",
  vars: [
    { id: "n", label: "n" },
    { id: "k", label: "k" },
  ],
  mode: "fixed",
  outputId: "C",
  outputLabel: "C̄",
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known["n"], "n");
    const k = requireNatural(known["k"], "k");
    if (n + k > 4096) throw new Error("za duża wartość");
    const value = exactOf({ p: binom(BigInt(n + k - 1), BigInt(k)), q: 1n });
    return {
      values: [value],
      steps: [
        { title: "1. Wzór", body: "\\bar{C}_n^k = \\binom{n+k-1}{k}" },
        {
          title: "2. Podstawienie danych",
          body: `\\bar{C}_{${n}}^{${k}} = \\binom{${n + k - 1}}{${k}}`,
        },
        { title: "3. Wynik", body: resultLatex("\\bar{C}", value, places) },
      ],
    };
  },
};

const prawdoWlasnosci: FormulaDef = {
  id: "prawdo-wlasnosci",
  subject: "matematyka",
  topic: "Prawdopodobieństwo",
  name: "Własności prawdopodobieństwa",
  latex: "P(A\\cup B) = P(A)+P(B)-P(A\\cap B), \\; P(A') = 1-P(A)",
  vars: [
    { id: "PA", label: "P(A)" },
    { id: "PB", label: "P(B)" },
    { id: "PAB", label: "P(A∩B)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "P(A∪B), P(A'), niezależność",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const PA = asRational(known["PA"], "P(A)");
    const PB = asRational(known["PB"], "P(B)");
    const PAB = asRational(known["PAB"], "P(A∩B)");
    const check = (v: Rational, label: string): void => {
      if (cmp(v, ZERO) < 0 || cmp(v, ONE) > 0) throw new Error(`${label} ∈ [0, 1]`);
    };
    check(PA, "P(A)");
    check(PB, "P(B)");
    check(PAB, "P(A∩B)");
    const sum = sub(add(PA, PB), PAB);
    if (cmp(sum, ZERO) < 0 || cmp(sum, ONE) > 0) throw new Error("P(A∪B) musi leżeć w [0, 1]");
    const comp = sub(ONE, PA);
    const niezalezne = cmp(PAB, mul(PA, PB)) === 0;
    return {
      values: [exactOf(sum), exactOf(comp)],
      labels: ["P(A∪B)", "P(A′)"],
      steps: [
        {
          title: "1. Suma zdarzeń",
          body: `P(A\\cup B) = ${L(PA)} + ${L(PB)} - ${L(PAB)} = ${L(sum)}`,
        },
        { title: "2. Zdarzenie przeciwne", body: `P(A') = 1 - ${L(PA)} = ${L(comp)}` },
        {
          title: "3. Niezależność",
          body: niezalezne
            ? `P(A\\cap B) = P(A)\\cdot P(B) = ${L(mul(PA, PB))} — zdarzenia niezależne`
            : `P(A\\cap B) = ${L(PAB)} \\neq P(A)\\cdot P(B) = ${L(mul(PA, PB))} — zdarzenia zależne`,
        },
      ],
    };
  },
};

const twBayesa: FormulaDef = {
  id: "tw-bayesa",
  subject: "matematyka",
  topic: "Prawdopodobieństwo",
  name: "Twierdzenie Bayesa",
  latex: "P(A|B) = \\frac{P(B|A)\\,P(A)}{P(B|A)\\,P(A) + P(B|A')\\,P(A')}",
  vars: [
    { id: "PA", label: "P(A)" },
    { id: "PBA", label: "P(B|A)" },
    { id: "PBNA", label: "P(B|A′)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "P(A|B), P(B)",
  solve(_unknown, known, places): FormulaSolution {
    void places;
    const PA = asRational(known["PA"], "P(A)");
    const PBA = asRational(known["PBA"], "P(B|A)");
    const PBNA = asRational(known["PBNA"], "P(B|A′)");
    const check = (v: Rational, label: string): void => {
      if (cmp(v, ZERO) < 0 || cmp(v, ONE) > 0) throw new Error(`${label} ∈ [0, 1]`);
    };
    check(PA, "P(A)");
    check(PBA, "P(B|A)");
    check(PBNA, "P(B|A′)");
    const PAprim = sub(ONE, PA);
    const num = mul(PBA, PA);
    const den = add(num, mul(PBNA, PAprim));
    if (cmp(den, ZERO) === 0) throw new Error("mianownik = 0 — sprawdź dane");
    const PB = den;
    const PA_B = div(num, den);
    return {
      values: [exactOf(PA_B), exactOf(PB)],
      labels: ["P(A|B)", "P(B)"],
      steps: [
        {
          title: "1. Prawdopodobieństwo całkowite",
          body: `P(B) = P(B|A)P(A) + P(B|A')P(A') = ${L(num)} + ${L(mul(PBNA, PAprim))} = ${L(PB)}`,
        },
        { title: "2. Wzór Bayesa", body: `P(A|B) = \\frac{${L(num)}}{${L(PB)}} = ${L(PA_B)}` },
      ],
    };
  },
};

const wartoscOczekiwana: FormulaDef = {
  id: "wartosc-oczekiwana",
  subject: "matematyka",
  topic: "Statystyka",
  name: "Wartość oczekiwana i wariancja",
  latex: "E(X) = \\sum x_i p_i, \\; D^2(X) = \\sum x_i^2 p_i - E^2(X)",
  vars: [
    { id: "xs", label: "xᵢ (po ; lub ,)", kind: "list" },
    { id: "ps", label: "pᵢ (po ; lub ,)", kind: "list" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "E(X), D²(X)",
  solve(_unknown, _known, places, selects): FormulaSolution {
    const rawX = (selects?.["xs"] ?? "").trim();
    const rawP = (selects?.["ps"] ?? "").trim();
    if (rawX === "" || rawP === "")
      throw new Error("wpisz wartości xᵢ i prawdopodobieństwa pᵢ (oddzielone średnikiem)");
    let xs: Rational[];
    let ps: Rational[];
    try {
      xs = rawX
        .split(/[;,\s]+/)
        .filter((t) => t !== "")
        .map((t) => fromString(t));
      ps = rawP
        .split(/[;,\s]+/)
        .filter((t) => t !== "")
        .map((t) => fromString(t));
    } catch {
      throw new Error("zły zapis liczby — dozwolone np. 2,5 albo 1/3");
    }
    if (xs.length !== ps.length) throw new Error("liczba xᵢ musi być równa liczbie pᵢ");
    if (xs.length === 0) throw new Error("wpisz co najmniej jedną parę (xᵢ, pᵢ)");
    let EX = ZERO;
    let EX2 = ZERO;
    let sumP = ZERO;
    const terms: string[] = [];
    for (let i = 0; i < xs.length; i++) {
      const p = ps[i]!;
      if (cmp(p, ZERO) < 0 || cmp(p, ONE) > 0) throw new Error("pᵢ ∈ [0, 1]");
      const x = xs[i]!;
      EX = add(EX, mul(x, p));
      EX2 = add(EX2, mul(mul(x, x), p));
      sumP = add(sumP, p);
      terms.push(`${L(x)}\\cdot${L(p)}`);
    }
    if (cmp(sumP, ONE) !== 0) throw new Error(`suma pᵢ musi być 1 (jest ${L(sumP)})`);
    const varr = sub(EX2, mul(EX, EX));
    if (cmp(varr, ZERO) < 0) throw new Error("wariancja nie może być ujemna — sprawdź dane");
    return {
      values: [exactOf(EX), exactOf(varr)],
      labels: ["E(X)", "D²(X)"],
      steps: [
        {
          title: "1. Wartość oczekiwana",
          body: `E(X) = ${terms.join(" + ")} = ${show(exactOf(EX), places)}`,
        },
        { title: "2. Drugi moment", body: `\\sum x_i^2 p_i = ${show(exactOf(EX2), places)}` },
        {
          title: "3. Wariancja",
          body: `D^2(X) = \\sum x_i^2 p_i - E^2(X) = ${show(exactOf(varr), places)}`,
        },
      ],
    };
  },
};

const srednieStatystyczne: FormulaDef = {
  id: "srednie-statystyczne",
  subject: "matematyka",
  topic: "Statystyka",
  name: "Średnie: ważona, kwadratowa, geometryczna",
  latex:
    "\\bar{x}_w = \\frac{\\sum x_i w_i}{\\sum w_i}, \\; \\bar{x}_q = \\sqrt{\\frac{\\sum x_i^2}{n}}, \\; \\bar{x}_g = \\sqrt[n]{x_1\\cdots x_n}",
  vars: [
    { id: "xs", label: "xᵢ (po ; lub ,)", kind: "list" },
    { id: "ws", label: "wᵢ — wagi (po ; lub ,)", kind: "list" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "średnie",
  solve(_unknown, _known, places, selects): FormulaSolution {
    const rawX = (selects?.["xs"] ?? "").trim();
    const rawW = (selects?.["ws"] ?? "").trim();
    if (rawX === "") throw new Error("wpisz liczby oddzielone średnikiem");
    let xs: Rational[];
    let ws: Rational[];
    try {
      xs = rawX
        .split(/[;,\s]+/)
        .filter((t) => t !== "")
        .map((t) => fromString(t));
      ws =
        rawW === ""
          ? xs.map(() => ONE)
          : rawW
              .split(/[;,\s]+/)
              .filter((t) => t !== "")
              .map((t) => fromString(t));
    } catch {
      throw new Error("zły zapis liczby — dozwolone np. 2,5 albo 1/3");
    }
    const n = xs.length;
    if (n === 0) throw new Error("wpisz co najmniej jedną liczbę");
    if (ws.length !== n) throw new Error("liczba wag musi być równa liczbie xᵢ");
    let num = ZERO;
    let den = ZERO;
    let sumSq = ZERO;
    let prod = ONE;
    for (let i = 0; i < n; i++) {
      const w = ws[i]!;
      if (cmp(w, ZERO) < 0) throw new Error("wagi nieujemne");
      num = add(num, mul(xs[i]!, w));
      den = add(den, w);
      sumSq = add(sumSq, mul(xs[i]!, xs[i]!));
      if (cmp(xs[i]!, ZERO) <= 0) prod = ZERO;
      else prod = mul(prod, xs[i]!);
    }
    if (cmp(den, ZERO) === 0) throw new Error("suma wag ≠ 0");
    const weighted = exactOf(div(num, den));
    const quad = sqrtRational(div(sumSq, of(n)));
    let geo: Exact;
    let geoNote: string | undefined;
    try {
      geo = rootRational(prod, n);
    } catch {
      geo = approxOnly(Math.exp(approx(exactOf(prod)) / n) * (cmp(prod, ZERO) === 0 ? 0 : 1));
      geoNote = "wynik przybliżony";
    }
    return {
      values: [weighted, geo, quad],
      labels: ["x̄_w", "x̄_g", "x̄_q"],
      steps: [
        {
          title: "1. Średnia ważona",
          body: `\\bar{x}_w = \\frac{\\sum x_i w_i}{\\sum w_i} = ${show(weighted, places)}`,
        },
        {
          title: "2. Średnia kwadratowa",
          body: `\\bar{x}_q = \\sqrt{\\frac{\\sum x_i^2}{n}} = ${show(quad, places)}`,
        },
        {
          title: "3. Średnia geometryczna",
          body: `\\bar{x}_g = \\sqrt[${n}]{x_1\\cdots x_n} = ${show(geo, places)}`,
          note: geoNote,
        },
      ],
    };
  },
};

export const MATH_DZIAL9: FormulaDef[] = [
  wariacjeZPowtorzeniami,
  kombinacjeZPowtorzeniami,
  prawdoWlasnosci,
  twBayesa,
  wartoscOczekiwana,
  srednieStatystyczne,
];
