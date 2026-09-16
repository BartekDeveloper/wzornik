import { parseExact } from '../exact/exact'
import type { Exact } from '../exact/exact'
import type { FormulaDef, SolveStep } from '../formulas/types'

export type SolverResult =
  | { ok: true; unknown: string; unknownLabel: string; values: Exact[]; steps: SolveStep[] }
  | { ok: false; error: string }

function parseInput(label: string, raw: string): Exact {
  try {
    return parseExact(raw)
  } catch {
    throw new Error(`${label}: wpisz liczbę (np. 2,5 albo 1/3)`)
  }
}

export function solveFormula(def: FormulaDef, raw: Record<string, string>, places = 2): SolverResult {
  try {
    if (def.mode === 'fixed') {
      const known: Record<string, Exact> = {}
      for (const v of def.vars) {
        const s = (raw[v.id] ?? '').trim()
        if (s === '') return { ok: false, error: `uzupełnij pole ${v.label}` }
        known[v.id] = parseInput(v.label, s)
      }
      const sol = def.solve(def.outputId, known, places)
      return { ok: true, unknown: def.outputId, unknownLabel: def.outputLabel, values: sol.values, steps: sol.steps }
    }
    const empty = def.vars.filter((v) => (raw[v.id] ?? '').trim() === '')
    if (empty.length === 0) return { ok: false, error: 'zostaw jedno pole puste — to będzie niewiadoma' }
    if (empty.length > 1) return { ok: false, error: 'zostaw dokładnie jedno puste pole — resztę uzupełnij' }
    const unknown = empty[0]
    const known: Record<string, Exact> = {}
    for (const v of def.vars) {
      if (v.id === unknown.id) continue
      known[v.id] = parseInput(v.label, (raw[v.id] ?? '').trim())
    }
    const sol = def.solve(unknown.id, known, places)
    return { ok: true, unknown: unknown.id, unknownLabel: unknown.label, values: sol.values, steps: sol.steps }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Błąd obliczeń' }
  }
}
