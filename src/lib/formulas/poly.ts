import { ONE, ZERO, add, cmp, gcd, isIntegerR, isZero, mul, neg, of, pow } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { solveQuadratic } from "../exact/exact";
import { formatLatex, formatRatLatex } from "../exact/format";
import type { SolveStep } from "./types";

const L = formatRatLatex;

export interface PolyFactorResult {
  steps: SolveStep[];
  finalLatex: string;
  irreducible?: string;
}

export interface HornerTable {
  results: Rational[];
  prods: Rational[];
}

export function hornerRow(coeffs: Rational[], x0: Rational): HornerTable {
  const results: Rational[] = [coeffs[0]];
  const prods: Rational[] = [{ p: 0n, q: 1n }];
  for (let i = 1; i < coeffs.length; i++) {
    const prod = mul(results[i - 1], x0);
    prods.push(prod);
    results.push(add(coeffs[i], prod));
  }
  return { results, prods };
}

export function hornerTableLatex(coeffs: Rational[], x0: Rational): string {
  const { results, prods } = hornerRow(coeffs, x0);
  const n = coeffs.length;
  const spec = `c|${"r".repeat(n)}`;
  const head = [L(x0), ...coeffs.map(L)].join(" & ");
  const mid = ["", ...prods.slice(1).map(L)].join(" & ");
  const bot = ["", ...results.map(L)].join(" & ");
  return `\\begin{array}{${spec}} ${head} \\\\ ${mid} \\\\ \\hline ${bot} \\end{array}`;
}

export function hornerColumnSteps(coeffs: Rational[], x0: Rational): SolveStep[] {
  const { results, prods } = hornerRow(coeffs, x0);
  const n = coeffs.length;
  return coeffs.slice(1).map((c, k) => {
    const i = k + 1;
    return {
      title: `Kolumna ${i + 1} z ${n}`,
      body: `${L(results[i - 1])} \\cdot ${L(x0)} = ${L(prods[i])}, \\; ${L(c)} + ${L(prods[i])} = ${L(results[i])}`,
    };
  });
}

function intDivisors(n: bigint): bigint[] {
  const divs: bigint[] = [];
  if (n === 0n) return divs;
  const absN = n < 0n ? -n : n;
  for (let d = 1n; d * d <= absN; d++) {
    if (absN % d === 0n) {
      divs.push(d);
      if (d * d !== absN) divs.push(absN / d);
    }
  }
  divs.sort((a, b) => (a < b ? -1 : 1));
  return divs;
}

function rationalRoots(coeffs: Rational[]): Rational[] {
  const A = coeffs[0];
  const D = coeffs[coeffs.length - 1];
  if (isZero(D)) return [];
  const roots: Rational[] = [];
  const seen = new Set<string>();
  for (const p of intDivisors(D.p)) {
    for (const q of intDivisors(A.p)) {
      for (const s of [1n, -1n]) {
        const rp = s * p;
        const key = `${rp}/${q}`;
        if (seen.has(key)) continue;
        seen.add(key);
        let num = ZERO;
        for (let i = 0; i < coeffs.length; i++) {
          const c = coeffs[i];
          const term = mul(c, pow({ p: rp, q: 1n }, coeffs.length - 1 - i));
          num = add(num, mul(term, pow({ p: q, q: 1n }, i)));
        }
        if (isZero(num)) {
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

function polyToLatex(coeffs: Rational[], varName = "x"): string {
  const terms: string[] = [];
  const deg = coeffs.length - 1;
  for (let i = 0; i < coeffs.length; i++) {
    const c = coeffs[i];
    if (isZero(c)) continue;
    const power = deg - i;
    const coefStr = L(c);
    if (power === 0) {
      terms.push(coefStr);
    } else if (power === 1) {
      terms.push(coefStr === "1" ? varName : `${coefStr}${varName}`);
    } else {
      terms.push(coefStr === "1" ? `${varName}^{${power}}` : `${coefStr}${varName}^{${power}}`);
    }
  }
  if (terms.length === 0) return "0";
  return terms.join(" + ").replace(/ \+ -/g, " - ");
}

function factorOutCommonInt(coeffs: Rational[]): { factor: Rational; rest: Rational[] } {
  const allInt = coeffs.every((c) => c.q === 1n);
  if (!allInt) {
    const lcd = coeffs.reduce((acc, c) => (acc * c.q) / gcd(acc, c.q), 1n);
    const intCoeffs = coeffs.map((c) => ({ p: c.p * (lcd / c.q), q: 1n }));
    const g = intCoeffs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
    if (g > 1n) {
      const factor = { p: g, q: lcd };
      const rest = intCoeffs.map((c) => ({ p: c.p / g, q: 1n }));
      return { factor, rest };
    }
    return { factor: { p: 1n, q: 1n }, rest: coeffs };
  }
  const g = coeffs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
  if (g > 1n) {
    const factor = { p: g, q: 1n };
    const rest = coeffs.map((c) => ({ p: c.p / g, q: 1n }));
    return { factor, rest };
  }
  return { factor: { p: 1n, q: 1n }, rest: coeffs };
}

function factorOutXPower(coeffs: Rational[]): { power: number; rest: Rational[] } {
  let power = 0;
  for (let i = coeffs.length - 1; i >= 0; i--) {
    if (isZero(coeffs[i])) power++;
    else break;
  }
  if (power === 0) return { power: 0, rest: coeffs };
  const rest = coeffs.slice(0, coeffs.length - power);
  return { power, rest };
}

function tryDifferenceOfSquares(
  coeffs: Rational[],
): { factored: string; remainder: Rational[] } | null {
  if (coeffs.length !== 3) return null;
  const [a, b, c] = coeffs;
  if (!isZero(b)) return null;
  const aIsSquare = isIntegerR(a) && a.p > 0n;
  const cIsSquare = isIntegerR(c) && c.p < 0n;
  if (!aIsSquare || !cIsSquare) return null;
  const aRoot = Math.sqrt(Number(a.p));
  const cRoot = Math.sqrt(Number(-c.p));
  if (!Number.isInteger(aRoot) || !Number.isInteger(cRoot)) return null;
  const A = of(aRoot);
  const B = of(cRoot);
  const factored = `(${L(A)}x - ${L(B)})(${L(A)}x + ${L(B)})`;
  return { factored, remainder: [] };
}

export function factorPolynomial(coeffs: Rational[]): PolyFactorResult {
  const steps: SolveStep[] = [];
  const varName = "x";
  let current = [...coeffs];
  const factors: string[] = [];

  function pushStep(title: string, body: string, note?: string) {
    steps.push({ title, body, note });
  }

  const origLatex = polyToLatex(current);
  pushStep("1. Wielomian wyjściowy", `W(${varName}) = ${origLatex}`);

  const { factor: intFactor, rest: afterInt } = factorOutCommonInt(current);
  if (!isOne(intFactor)) {
    const factored = `${L(intFactor)}(${polyToLatex(afterInt)})`;
    pushStep("2. Wyłączenie wspólnego czynnika liczbowego", `W(${varName}) = ${factored}`);
    factors.push(L(intFactor));
    current = afterInt;
  }

  const { power, rest: afterX } = factorOutXPower(current);
  if (power > 0) {
    const xPart = power === 1 ? varName : `${varName}^{${power}}`;
    const factored = `${xPart}(${polyToLatex(afterX)})`;
    pushStep(
      `${intFactor !== ONE ? "3" : "2"}. Wyłączenie wspólnego czynnika ${varName}`,
      `W(${varName}) = ${factored}`,
    );
    factors.push(xPart);
    current = afterX;
  }

  if (current.length <= 1) {
    pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
    return { steps, finalLatex: factors.join(" \\cdot ") };
  }

  const diffSq = tryDifferenceOfSquares(current);
  if (diffSq) {
    pushStep(
      `${factors.length > 0 ? "4" : "2"}. Różnica kwadratów`,
      `W(${varName}) = ${diffSq.factored}`,
    );
    if (diffSq.remainder.length === 0) {
      factors.push(diffSq.factored);
      pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
      return { steps, finalLatex: factors.join(" \\cdot ") };
    }
    current = diffSq.remainder;
  }

  if (current.length === 4) {
    const [a, b, c, d] = current;
    const abs = (v: bigint): bigint => (v < 0n ? -v : v);
    const g1 = gcd(abs(a.p), abs(b.p));
    const g2 = gcd(abs(c.p), abs(d.p));
    if (g1 > 0n && g2 > 0n) {
      const P = { p: a.p / g1, q: a.q };
      const Q = { p: b.p / g1, q: b.q };
      const P2 = { p: c.p / g2, q: c.q };
      const Q2 = { p: d.p / g2, q: d.q };
      if (cmp(P, P2) === 0 && cmp(Q, Q2) === 0) {
        const t1 = g1 === 1n ? `${varName}^2` : `${L({ p: g1, q: 1n })}${varName}^2`;
        const outer = `(${t1} + ${L({ p: g2, q: 1n })})`.replace("+ -", "- ");
        const pt =
          cmp(P, ONE) === 0
            ? varName
            : cmp(P, neg(ONE)) === 0
              ? `-${varName}`
              : `${L(P)}${varName}`;
        const inner = `(${pt} + ${L(Q)})`.replace("+ -", "- ");
        const factored = `${outer}${inner}`;
        pushStep(
          `${factors.length > 0 ? "4" : "2"}. Grupowanie wyrazów`,
          `W(${varName}) = ${factored}`,
        );
        factors.push(outer);
        factors.push(inner);
        pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
        return { steps, finalLatex: factors.join(" \\cdot ") };
      }
    }
  }

  const roots = rationalRoots(current);
  if (roots.length > 0) {
    pushStep(
      `${factors.length > 0 ? "4" : "2"}. Schemat Hornera — pierwiastki wymierne`,
      `W(${varName}) = ${polyToLatex(current)}, \\; x = \\pm p/q`,
    );
    let remainder = [...current];
    for (const r of roots) {
      if (remainder.length > 1 && isZero(evalPoly(remainder, r))) {
        pushStep(`Horner dla x = ${L(r)}`, hornerTableLatex(remainder, r));
        for (const s of hornerColumnSteps(remainder, r)) pushStep(s.title, s.body);
      }
      while (remainder.length > 1 && isZero(evalPoly(remainder, r))) {
        const lin =
          cmp(r, ZERO) === 0
            ? varName
            : cmp(r, ZERO) > 0
              ? `(${varName} - ${L(r)})`
              : `(${varName} + ${L(neg(r))})`;
        factors.push(lin);
        remainder = deflate(remainder, r);
      }
    }
    const factoredSoFar = factors.join(" \\cdot ");
    if (remainder.length === 1) {
      pushStep("Koniec", factoredSoFar, "wielomian rozłożony całkowicie");
      return { steps, finalLatex: factoredSoFar };
    }
    if (remainder.length === 3) {
      pushStep("5. Pozostały trójmian — delta", `P(${varName}) = ${polyToLatex(remainder)}`);
      const q = solveQuadratic(remainder[0], remainder[1], remainder[2]);
      if (q.kind === "none") {
        pushStep("Delta < 0", `\\Delta = ${formatLatex(q.delta)}`, "trójmian nierozkładalny nad ℝ");
        return {
          steps,
          finalLatex: factoredSoFar + " \\cdot (" + polyToLatex(remainder) + ")",
          irreducible: polyToLatex(remainder),
        };
      }
      for (const root of q.roots) {
        if (!root.irr) {
          const lin =
            cmp(root.rat, ZERO) === 0
              ? varName
              : cmp(root.rat, ZERO) > 0
                ? `(${varName} - ${L(root.rat)})`
                : `(${varName} + ${L(neg(root.rat))})`;
          factors.push(lin);
        } else {
          const rLatex = formatLatex(root);
          factors.push(`(${varName} - ${rLatex})`);
        }
      }
      pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony");
      return { steps, finalLatex: factors.join(" \\cdot ") };
    }
    if (remainder.length > 1) {
      pushStep(
        "Pozostały wielomian",
        `P(${varName}) = ${polyToLatex(remainder)}`,
        "brak dalszych pierwiastków wymiernych",
      );
      return {
        steps,
        finalLatex: factoredSoFar + " \\cdot (" + polyToLatex(remainder) + ")",
        irreducible: polyToLatex(remainder),
      };
    }
  }

  if (current.length === 3) {
    const q = solveQuadratic(current[0], current[1], current[2]);
    if (q.kind === "none") {
      pushStep(`${factors.length > 0 ? "4" : "2"}. Delta`, `\\Delta = ${formatLatex(q.delta)} < 0`);
      pushStep("Wynik", polyToLatex(current), "trójmian nierozkładalny nad ℝ");
      return {
        steps,
        finalLatex: factors.join(" \\cdot ") + " \\cdot " + polyToLatex(current),
        irreducible: polyToLatex(current),
      };
    }
    for (const root of q.roots) {
      const lin = root.irr
        ? `(${varName} - ${formatLatex(root)})`
        : cmp(root.rat, ZERO) === 0
          ? varName
          : cmp(root.rat, ZERO) > 0
            ? `(${varName} - ${L(root.rat)})`
            : `(${varName} + ${L(neg(root.rat))})`;
      factors.push(lin);
    }
    pushStep(
      `${factors.length > 0 ? "4" : "2"}. Postać iloczynowa (Δ ≥ 0)`,
      `W(${varName}) = ${factors.join(" \\cdot ")}`,
    );
    pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
    return { steps, finalLatex: factors.join(" \\cdot ") };
  }

  pushStep(
    "Koniec",
    factors.join(" \\cdot ") + (factors.length > 0 ? " \\cdot " : "") + polyToLatex(current),
    "brak znalezionych pierwiastków wymiernych",
  );
  return {
    steps,
    finalLatex:
      factors.join(" \\cdot ") + (factors.length > 0 ? " \\cdot " : "") + polyToLatex(current),
    irreducible: polyToLatex(current),
  };
}

function isOne(r: Rational): boolean {
  return r.p === r.q;
}
