export interface Rational {
  p: bigint;
  q: bigint;
}

export function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

export function norm(p: bigint, q: bigint): Rational {
  if (q === 0n) throw new Error("wymierna: mianownik nie może być zerem");
  if (q < 0n) {
    p = -p;
    q = -q;
  }
  if (p === 0n) return { p: 0n, q: 1n };
  const g = gcd(p, q);
  return { p: p / g, q: q / g };
}

export const ZERO: Rational = { p: 0n, q: 1n };
export const ONE: Rational = { p: 1n, q: 1n };

export function of(p: bigint | number, q: bigint | number = 1): Rational {
  return norm(BigInt(p), BigInt(q));
}

const FRAC_RE = /^(-?\d+)\s*\/\s*(-?\d+)$/;
const DEC_RE = /^(-?)(\d+)(?:\.(\d+))?$/;

export function fromString(s: string): Rational {
  const t = s.trim().replace(",", ".");
  if (t === "") throw new Error("wymierna: puste wejście");
  const f = FRAC_RE.exec(t);
  if (f) return norm(BigInt(f[1]), BigInt(f[2]));
  const d = DEC_RE.exec(t);
  if (!d) throw new Error(`wymierna: nie umiem sparsować "${s}"`);
  const neg = d[1] === "-";
  const head = BigInt(d[2]);
  const tail = d[3] ?? "";
  if (tail === "") return { p: neg ? -head : head, q: 1n };
  const den = 10n ** BigInt(tail.length);
  const num = head * den + BigInt(tail);
  return norm(neg ? -num : num, den);
}

export function add(a: Rational, b: Rational): Rational {
  return norm(a.p * b.q + b.p * a.q, a.q * b.q);
}

export function sub(a: Rational, b: Rational): Rational {
  return norm(a.p * b.q - b.p * a.q, a.q * b.q);
}

export function mul(a: Rational, b: Rational): Rational {
  return norm(a.p * b.p, a.q * b.q);
}

export function div(a: Rational, b: Rational): Rational {
  if (b.p === 0n) throw new Error("wymierna: dzielenie przez zero");
  return norm(a.p * b.q, a.q * b.p);
}

export function neg(a: Rational): Rational {
  return { p: -a.p, q: a.q };
}

export function cmp(a: Rational, b: Rational): number {
  const d = a.p * b.q - b.p * a.q;
  return d < 0n ? -1 : d > 0n ? 1 : 0;
}

export function isZero(a: Rational): boolean {
  return a.p === 0n;
}

export function toNumber(a: Rational): number {
  return Number(a.p) / Number(a.q);
}

export function isIntegerR(a: Rational): boolean {
  return a.q === 1n;
}

export function pow(base: Rational, exp: number): Rational {
  if (!Number.isInteger(exp)) throw new Error("wymierna: potęga musi być całkowita");
  if (exp === 0) return ONE;
  if (exp < 0) return div(ONE, pow(base, -exp));
  let r = ONE;
  let b = base;
  let k = exp;
  while (k > 0) {
    if (k % 2 === 1) r = mul(r, b);
    b = mul(b, b);
    k = Math.floor(k / 2);
  }
  return r;
}

export function factorial(n: bigint): bigint {
  if (n < 0n) throw new Error("silnia: tylko dla n ≥ 0");
  if (n > 1000n) throw new Error("silnia: za duże n (limit 1000)");
  let r = 1n;
  for (let i = 2n; i <= n; i++) r *= i;
  return r;
}

export function binom(n: bigint, k: bigint): bigint {
  if (n < 0n || k < 0n || k > n) throw new Error("kombinacje: wymagane 0 ≤ k ≤ n");
  if (n > 1000n) throw new Error("kombinacje: za duże n (limit 1000)");
  const kk = k > n - k ? n - k : k;
  let r = 1n;
  for (let i = 1n; i <= kk; i++) {
    r = (r * (n - kk + i)) / i;
  }
  return r;
}
