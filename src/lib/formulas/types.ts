import type { Exact, Irr } from '../exact/exact'
import type { Rational } from '../exact/rational'
import { isZero } from '../exact/rational'
import { formatDecimal, formatLatex } from '../exact/format'

export interface FormulaVar {
  id: string
  label: string
  unit?: string
}

export interface SolveStep {
  title: string
  body: string
  note?: string
}

export interface FormulaSolution {
  values: Exact[]
  steps: SolveStep[]
}

export interface FormulaDef {
  id: string
  subject: 'matematyka' | 'fizyka'
  topic: string
  name: string
  latex: string
  vars: FormulaVar[]
  mode: 'nvar' | 'fixed'
  outputId: string
  outputLabel: string
  solve(unknown: string, known: Record<string, Exact>, places: number): FormulaSolution
}

export const APPROX_PI_NOTE = 'wynik tylko przybliżony — dokładny wychodzi dla danych z π (np. 25π)'

export function asRational(e: Exact, label: string): Rational {
  if (e.irr) throw new Error(`${label}: ten wariant liczę tylko dla zwykłych liczb`)
  return e.rat
}

export function requireNatural(e: Exact, label: string): number {
  const r = asRational(e, label)
  if (r.q !== 1n || r.p < 1n || r.p > 1_000_000n) {
    throw new Error(`${label} musi być liczbą naturalną dodatnią`)
  }
  return Number(r.p)
}

export function nonzeroIrr(e: Exact): Irr | null {
  if (!e.irr) return null
  if (e.irr.type === 'approx') return e.irr
  return isZero(e.irr.coef) ? null : e.irr
}

export function resultLatex(prefix: string, value: Exact, places: number): string {
  const latex = formatLatex(value)
  const dec = formatDecimal(value, places)
  return latex === dec ? `${prefix} = ${latex}` : `${prefix} = ${latex} \\approx ${dec}`
}

export function stdSteps(transform: string, substitution: string, value: Exact, places: number, note?: string): SolveStep[] {
  const latex = formatLatex(value)
  const dec = formatDecimal(value, places)
  const body = latex === dec ? latex : `${latex} \\approx ${dec}`
  return [
    { title: '1. Przekształcenie wzoru', body: transform },
    { title: '2. Podstawienie danych', body: substitution },
    { title: '3. Wynik', body, note },
  ]
}
