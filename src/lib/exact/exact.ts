import { Rational, ZERO, add, cmp, div, isZero, mul, neg, norm, of, sub, toNumber } from './rational'

export type Irr =
  | { type: 'sqrt'; coef: Rational; radicand: bigint }
  | { type: 'pi'; coef: Rational }

export interface Exact {
  rat: Rational
  irr: Irr | null
}

export function exactOf(r: Rational): Exact {
  return { rat: r, irr: null }
}

export function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error('dokładne: pierwiastek z liczby ujemnej')
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

export function splitSquareFactor(n: bigint): { outside: bigint; inside: bigint } {
  if (n < 0n) throw new Error('dokładne: ujemna liczba pod pierwiastkiem')
  if (n === 0n) return { outside: 0n, inside: 1n }
  if (n > 1_000_000_000_000n) return { outside: 1n, inside: n }
  let rest = Number(n)
  let outside = 1
  let inside = 1
  for (let f = 2; f * f <= rest; f++) {
    let e = 0
    while (rest % f === 0) {
      rest /= f
      e++
    }
    if (e > 0) {
      outside *= f ** Math.floor(e / 2)
      if (e % 2 === 1) inside *= f
    }
  }
  inside *= rest
  return { outside: BigInt(outside), inside: BigInt(inside) }
}

export function sqrtRational(r: Rational): Exact {
  if (cmp(r, ZERO) < 0) throw new Error('dokładne: pierwiastek z ujemnej (liczymy na rzeczywistych)')
  if (isZero(r)) return { rat: ZERO, irr: null }
  const m = r.p * r.q
  const { outside, inside } = splitSquareFactor(m)
  const coef = norm(outside, r.q)
  if (inside === 1n) return { rat: coef, irr: null }
  return { rat: ZERO, irr: { type: 'sqrt', coef, radicand: inside } }
}

function addIrr(x: Irr | null, y: Irr | null): Irr | null {
  if (!x) return y
  if (!y) return x
  if (x.type === 'sqrt' && y.type === 'sqrt') {
    if (x.radicand !== y.radicand) throw new Error('dokładne: różne liczby pod pierwiastkiem')
    const coef = add(x.coef, y.coef)
    return isZero(coef) ? null : { type: 'sqrt', coef, radicand: x.radicand }
  }
  if (x.type === 'pi' && y.type === 'pi') {
    const coef = add(x.coef, y.coef)
    return isZero(coef) ? null : { type: 'pi', coef }
  }
  throw new Error('dokładne: nie mieszam pierwiastków z π')
}

function negIrr(x: Irr | null): Irr | null {
  if (!x) return null
  return { ...x, coef: neg(x.coef) }
}

export function addExact(a: Exact, b: Exact): Exact {
  return { rat: add(a.rat, b.rat), irr: addIrr(a.irr, b.irr) }
}

export function subExact(a: Exact, b: Exact): Exact {
  return { rat: sub(a.rat, b.rat), irr: addIrr(a.irr, negIrr(b.irr)) }
}

export function mulRat(e: Exact, r: Rational): Exact {
  if (isZero(r)) return { rat: ZERO, irr: null }
  return {
    rat: mul(e.rat, r),
    irr: e.irr ? { ...e.irr, coef: mul(e.irr.coef, r) } : null,
  }
}

export function divRat(e: Exact, r: Rational): Exact {
  if (isZero(r)) throw new Error('dokładne: dzielenie przez zero')
  return {
    rat: div(e.rat, r),
    irr: e.irr ? { ...e.irr, coef: div(e.irr.coef, r) } : null,
  }
}

export function approx(e: Exact): number {
  let v = toNumber(e.rat)
  if (e.irr) {
    if (e.irr.type === 'sqrt') v += toNumber(e.irr.coef) * Math.sqrt(Number(e.irr.radicand))
    else v += toNumber(e.irr.coef) * Math.PI
  }
  return v
}

export type BestForm = 'int' | 'frac' | 'sqrt' | 'pi'

export function bestForm(e: Exact): BestForm {
  if (!e.irr) return e.rat.q === 1n ? 'int' : 'frac'
  return e.irr.type
}

export type Quadratic =
  | { kind: 'two'; delta: Exact; roots: [Exact, Exact] }
  | { kind: 'one'; delta: Exact; roots: [Exact] }
  | { kind: 'none'; delta: Exact; roots: [] }
  | { kind: 'linear'; roots: [Exact] }

export function solveQuadratic(a: Rational, b: Rational, c: Rational): Quadratic {
  if (isZero(a)) {
    if (isZero(b)) throw new Error('kwadratowe: a i b są zerami — to nie jest równanie')
    return { kind: 'linear', roots: [{ rat: div(neg(c), b), irr: null }] }
  }
  const twoA = mul(of(2), a)
  const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c))
  const s = cmp(deltaRat, ZERO)
  const delta: Exact = { rat: deltaRat, irr: null }
  if (s < 0) return { kind: 'none', delta, roots: [] }
  const u: Exact = { rat: div(neg(b), twoA), irr: null }
  if (s === 0) return { kind: 'one', delta, roots: [u] }
  const w = divRat(sqrtRational(deltaRat), twoA)
  return { kind: 'two', delta, roots: [subExact(u, w), addExact(u, w)] }
}
