import {
  Rational,
  ONE,
  ZERO,
  add,
  cmp,
  div,
  fromString,
  isZero,
  mul,
  neg,
  norm,
  of,
  pow,
  sub,
  toNumber,
} from "./rational";

export type Irr =
  | { type: "sqrt"; coef: Rational; radicand: bigint }
  | { type: "pi"; coef: Rational }
  | { type: "approx"; value: number };

export interface Exact {
  rat: Rational;
  irr: Irr | null;
}

export function exactOf(r: Rational): Exact {
  return { rat: r, irr: null };
}

export function approxOnly(v: number): Exact {
  if (!Number.isFinite(v)) throw new Error("dokładne: wynik nie jest liczbą");
  return { rat: ZERO, irr: { type: "approx", value: v } };
}

export function isApproxOnly(e: Exact): boolean {
  return e.irr?.type === "approx";
}

export function parseExact(s: string): Exact {
  const t = s.trim().replace(",", ".").replace(/\s+/g, "").toLowerCase().replace("π", "pi");
  if (t === "") throw new Error("dokładne: puste wejście");
  const m = /^(.*?)pi$/.exec(t);
  if (m) {
    const raw = m[1].replace(/\*$/, "");
    const coef = raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw);
    return { rat: ZERO, irr: { type: "pi", coef } };
  }
  return { rat: fromString(s), irr: null };
}

export function stripPi(e: Exact): Rational {
  if (!isZero(e.rat) || !e.irr || e.irr.type !== "pi") {
    throw new Error("π nie skraca się z danymi");
  }
  return e.irr.coef;
}

export function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("dokładne: pierwiastek z liczby ujemnej");
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

export function splitSquareFactor(n: bigint): { outside: bigint; inside: bigint } {
  if (n < 0n) throw new Error("dokładne: ujemna liczba pod pierwiastkiem");
  if (n === 0n) return { outside: 0n, inside: 1n };
  if (n > 1_000_000_000_000n) return { outside: 1n, inside: n };
  let rest = Number(n);
  let outside = 1;
  let inside = 1;
  for (let f = 2; f * f <= rest; f++) {
    let e = 0;
    while (rest % f === 0) {
      rest /= f;
      e++;
    }
    if (e > 0) {
      outside *= f ** Math.floor(e / 2);
      if (e % 2 === 1) inside *= f;
    }
  }
  inside *= rest;
  return { outside: BigInt(outside), inside: BigInt(inside) };
}

export function sqrtRational(r: Rational): Exact {
  if (cmp(r, ZERO) < 0)
    throw new Error("dokładne: pierwiastek z ujemnej (liczymy na rzeczywistych)");
  if (isZero(r)) return { rat: ZERO, irr: null };
  const m = r.p * r.q;
  const { outside, inside } = splitSquareFactor(m);
  const coef = norm(outside, r.q);
  if (inside === 1n) return { rat: coef, irr: null };
  return { rat: ZERO, irr: { type: "sqrt", coef, radicand: inside } };
}

function icbrt(n: bigint): bigint | null {
  if (n === 0n) return 0n;
  const neg = n < 0n;
  const a = neg ? -n : n;
  if (a > 1_000_000_000_000_000n) return null;
  const c = BigInt(Math.round(Math.cbrt(Number(a))));
  for (const d of [c - 2n, c - 1n, c, c + 1n, c + 2n]) {
    if (d >= 0n && d * d * d === a) return neg ? -d : d;
  }
  return null;
}

export function cbrtRational(r: Rational): Exact {
  const cn = icbrt(r.p);
  const cd = icbrt(r.q);
  if (cn === null || cd === null || cd === 0n) {
    throw new Error("pierwiastek sześcienny nie wychodzi dokładnie");
  }
  return { rat: norm(cn, cd), irr: null };
}

function irrValue(x: Irr | null): number {
  if (!x) return 0;
  if (x.type === "sqrt") return toNumber(x.coef) * Math.sqrt(Number(x.radicand));
  if (x.type === "pi") return toNumber(x.coef) * Math.PI;
  return x.value;
}

function addIrr(x: Irr | null, y: Irr | null): Irr | null {
  if (!x) return y;
  if (!y) return x;
  if (x.type === "approx" || y.type === "approx") {
    return { type: "approx", value: irrValue(x) + irrValue(y) };
  }
  if (x.type === "sqrt" && y.type === "sqrt") {
    if (x.radicand !== y.radicand) throw new Error("dokładne: różne liczby pod pierwiastkiem");
    const coef = add(x.coef, y.coef);
    return isZero(coef) ? null : { type: "sqrt", coef, radicand: x.radicand };
  }
  if (x.type === "pi" && y.type === "pi") {
    const coef = add(x.coef, y.coef);
    return isZero(coef) ? null : { type: "pi", coef };
  }
  throw new Error("dokładne: nie mieszam pierwiastków z π");
}

function negIrr(x: Irr | null): Irr | null {
  if (!x) return null;
  if (x.type === "approx") return { type: "approx", value: -x.value };
  return { ...x, coef: neg(x.coef) };
}

export function addExact(a: Exact, b: Exact): Exact {
  return { rat: add(a.rat, b.rat), irr: addIrr(a.irr, b.irr) };
}

export function subExact(a: Exact, b: Exact): Exact {
  return { rat: sub(a.rat, b.rat), irr: addIrr(a.irr, negIrr(b.irr)) };
}

export function mulRat(e: Exact, r: Rational): Exact {
  if (isZero(r)) return { rat: ZERO, irr: null };
  const irr = e.irr;
  if (irr?.type === "approx") return approxOnly(irr.value * toNumber(r));
  return {
    rat: mul(e.rat, r),
    irr: irr ? { ...irr, coef: mul(irr.coef, r) } : null,
  };
}

export function divRat(e: Exact, r: Rational): Exact {
  if (isZero(r)) throw new Error("dokładne: dzielenie przez zero");
  const irr = e.irr;
  if (irr?.type === "approx") return approxOnly(irr.value / toNumber(r));
  return {
    rat: div(e.rat, r),
    irr: irr ? { ...irr, coef: div(irr.coef, r) } : null,
  };
}

export function approx(e: Exact): number {
  return toNumber(e.rat) + irrValue(e.irr);
}

export type BestForm = "int" | "frac" | "sqrt" | "pi";

export function bestForm(e: Exact): BestForm {
  if (!e.irr || e.irr.type === "approx") return e.rat.q === 1n ? "int" : "frac";
  return e.irr.type;
}

export type Quadratic =
  | { kind: "two"; delta: Exact; roots: [Exact, Exact] }
  | { kind: "one"; delta: Exact; roots: [Exact] }
  | { kind: "none"; delta: Exact; roots: [] }
  | { kind: "linear"; roots: [Exact] };

export function solveQuadratic(a: Rational, b: Rational, c: Rational): Quadratic {
  if (isZero(a)) {
    if (isZero(b)) throw new Error("kwadratowe: a i b są zerami — to nie jest równanie");
    return { kind: "linear", roots: [{ rat: div(neg(c), b), irr: null }] };
  }
  const twoA = mul(of(2), a);
  const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c));
  const s = cmp(deltaRat, ZERO);
  const delta: Exact = { rat: deltaRat, irr: null };
  if (s < 0) return { kind: "none", delta, roots: [] };
  const u: Exact = { rat: div(neg(b), twoA), irr: null };
  if (s === 0) return { kind: "one", delta, roots: [u] };
  const w = divRat(sqrtRational(deltaRat), twoA);
  return { kind: "two", delta, roots: [subExact(u, w), addExact(u, w)] };
}

const HALF: Rational = { p: 1n, q: 2n };
const SQRT2_2: Exact = { rat: ZERO, irr: { type: "sqrt", coef: HALF, radicand: 2n } };
const SQRT3_2: Exact = { rat: ZERO, irr: { type: "sqrt", coef: HALF, radicand: 3n } };
const SQRT3_3: Exact = { rat: ZERO, irr: { type: "sqrt", coef: { p: 1n, q: 3n }, radicand: 3n } };

function baseTrig(kind: "sin" | "cos" | "tan", deg0306090: number): Exact {
  const one = exactOf(ONE);
  const half = exactOf(HALF);
  switch (deg0306090) {
    case 0:
      if (kind === "sin") return exactOf(ZERO);
      if (kind === "cos") return one;
      return exactOf(ZERO);
    case 30:
      if (kind === "sin") return half;
      if (kind === "cos") return SQRT3_2;
      return SQRT3_3;
    case 45:
      if (kind === "tan") return one;
      return SQRT2_2;
    case 60:
      if (kind === "sin") return SQRT3_2;
      if (kind === "cos") return half;
      return { rat: ZERO, irr: { type: "sqrt", coef: ONE, radicand: 3n } };
    case 90:
      if (kind === "sin") return one;
      if (kind === "cos") return exactOf(ZERO);
      throw new Error("tangens nieokreślony dla 90° + k·180°");
    default:
      throw new Error("trygonometria: nieobsługiwany kąt bazowy");
  }
}

export function trigExact(kind: "sin" | "cos" | "tan", deg: number): Exact {
  if (!Number.isFinite(deg)) throw new Error("trygonometria: zły kąt");
  const d = ((deg % 360) + 360) % 360;
  const ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
  if (![0, 30, 45, 60, 90].includes(ref)) {
    const rad = (deg * Math.PI) / 180;
    const v = kind === "sin" ? Math.sin(rad) : kind === "cos" ? Math.cos(rad) : Math.tan(rad);
    return approxOnly(v);
  }
  if (kind === "tan" && (ref === 90 || d === 90 || d === 270)) {
    throw new Error("tangens nieokreślony dla 90° + k·180°");
  }
  const sSin = d <= 180 ? 1 : -1;
  const sCos = d <= 90 || d >= 270 ? 1 : -1;
  if (kind === "sin") {
    const b = baseTrig("sin", ref);
    return sSin === 1 ? b : negExact(b);
  }
  if (kind === "cos") {
    const b = baseTrig("cos", ref);
    return sCos === 1 ? b : negExact(b);
  }
  const s = baseTrig("sin", ref);
  const c = baseTrig("cos", ref);
  const t = divExact(s, c);
  const sign = sSin * sCos;
  return sign === 1 ? t : negExact(t);
}

function negExact(e: Exact): Exact {
  return { rat: neg(e.rat), irr: negIrr(e.irr) };
}

export function divExact(a: Exact, b: Exact): Exact {
  if (!b.irr) return divRat(a, b.rat);
  if (b.irr.type === "approx" || b.irr.type === "pi") return approxOnly(approx(a) / approx(b));
  if (a.irr?.type === "approx") return approxOnly(approx(a) / approx(b));
  const r = b.irr.radicand;
  const c2 = b.irr.coef;
  if (!isZero(b.rat)) return approxOnly(approx(a) / approx(b));
  if (!a.irr) {
    const coef = div(a.rat, mul(c2, { p: r, q: 1n }));
    return { rat: ZERO, irr: { type: "sqrt", coef, radicand: r } };
  }
  if (a.irr.type !== "sqrt" || a.irr.radicand !== r || !isZero(a.rat)) {
    return approxOnly(approx(a) / approx(b));
  }
  return exactOf(div(a.irr.coef, c2));
}

export function logExact(base: Rational, x: Rational): Exact {
  if (cmp(base, ZERO) <= 0 || cmp(x, ZERO) <= 0)
    throw new Error("logarytm: podstawa i liczba dodatnie");
  if (base.p === 1n && base.q === 1n) throw new Error("logarytm: podstawa różna od 1");
  if (isZero(sub(x, ONE))) return exactOf(ZERO);
  if (cmp(sub(x, base), ZERO) === 0) return exactOf(ONE);
  const est = Math.round(Math.log(toNumber(x)) / Math.log(toNumber(base)));
  if (Number.isInteger(est) && Math.abs(est) <= 1000) {
    if (cmp(pow(base, est), x) === 0) return exactOf(of(est));
  }
  return approxOnly(Math.log(toNumber(x)) / Math.log(toNumber(base)));
}
