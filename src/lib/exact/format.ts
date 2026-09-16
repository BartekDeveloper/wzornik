import type { Rational } from './rational'
import { cmp, isZero, ZERO } from './rational'
import type { Exact } from './exact'
import { approx } from './exact'

export function trimNum(v: number): string {
  if (!Number.isFinite(v)) return '—'
  const s = v.toFixed(6)
  const t = s.includes('.') ? s.replace(/\.?0+$/, '') : s
  return t === '-0' ? '0' : t
}

export function formatRatText(r: Rational): string {
  return r.q === 1n ? r.p.toString() : `${r.p.toString()}/${r.q.toString()}`
}

export function formatRatLatex(r: Rational): string {
  return r.q === 1n ? r.p.toString() : `\\frac{${r.p.toString()}}{${r.q.toString()}}`
}

function irrUnitText(e: Exact): string {
  if (!e.irr || e.irr.type === 'approx') return ''
  return e.irr.type === 'sqrt' ? `√${e.irr.radicand.toString()}` : 'π'
}

function irrUnitLatex(e: Exact): string {
  if (!e.irr || e.irr.type === 'approx') return ''
  return e.irr.type === 'sqrt' ? `\\sqrt{${e.irr.radicand.toString()}}` : '\\pi'
}

function coefText(coef: Rational, unit: string): string {
  if (coef.p === 1n && coef.q === 1n) return unit
  if (coef.p === -1n && coef.q === 1n) return `−${unit}`
  if (coef.q === 1n) return `${coef.p.toString()}${unit}`
  return `(${formatRatText(coef)}·${unit})`
}

function coefLatex(coef: Rational, unit: string): string {
  if (coef.p === 1n && coef.q === 1n) return unit
  if (coef.p === -1n && coef.q === 1n) return `-${unit}`
  if (coef.q === 1n) return `${coef.p.toString()}${unit}`
  return `${formatRatLatex(coef)}\\cdot ${unit}`
}

export function formatExactText(e: Exact): string {
  if (e.irr?.type === 'approx') return `≈ ${trimNum(e.irr.value)}`
  const ratZero = isZero(e.rat)
  if (!e.irr) return formatRatText(e.rat)
  const unit = irrUnitText(e)
  const coef = e.irr.coef
  if (ratZero) return coefText(coef, unit)
  const neg = cmp(coef, ZERO) < 0
  const abs: Rational = neg ? { p: -coef.p, q: coef.q } : coef
  return `${formatRatText(e.rat)} ${neg ? '−' : '+'} ${coefText(abs, unit)}`
}

export function formatLatex(e: Exact): string {
  if (e.irr?.type === 'approx') return `\\approx ${trimNum(e.irr.value)}`
  const ratZero = isZero(e.rat)
  if (!e.irr) return formatRatLatex(e.rat)
  const unit = irrUnitLatex(e)
  const coef = e.irr.coef
  if (ratZero) return coefLatex(coef, unit)
  const neg = cmp(coef, ZERO) < 0
  const abs: Rational = neg ? { p: -coef.p, q: coef.q } : coef
  return `${formatRatLatex(e.rat)}${neg ? '-' : '+'}${coefLatex(abs, unit)}`
}

export function formatDecimal(e: Exact, places: number): string {
  const v = approx(e)
  const fixed = v.toFixed(Math.max(0, Math.min(12, places)))
  const trimmed = fixed.includes('.') ? fixed.replace(/\.?0+$/, '') : fixed
  return trimmed === '-0' ? '0' : trimmed
}
