import type { FormulaDef } from './types'
import { MATH_FORMULAS } from './math'
import { PHYSICS_FORMULAS } from './physics'

export const FORMULAS: FormulaDef[] = [...MATH_FORMULAS, ...PHYSICS_FORMULAS]

export const SUBJECTS = [
  { id: 'matematyka', label: 'Matematyka' },
  { id: 'fizyka', label: 'Fizyka' },
]

export function getFormula(subject: string, id: string): FormulaDef | undefined {
  return FORMULAS.find((f) => f.subject === subject && f.id === id)
}

export function formulasBySubject(subject: string): FormulaDef[] {
  return FORMULAS.filter((f) => f.subject === subject)
}
