import type { FormulaDef } from "./types";
import { MATH_FORMULAS } from "./math";
import { PHYSICS_FORMULAS } from "./physics";
import { MATH_PP1 } from "./math_pp1";
import { MATH_PP2 } from "./math_pp2";
import { MATH_PR } from "./math_pr";
import { PHYSICS_PP } from "./physics_pp";
import { PHYSICS_PR } from "./physics_pr";

export const FORMULAS: FormulaDef[] = [
  ...MATH_FORMULAS,
  ...MATH_PP1,
  ...MATH_PP2,
  ...MATH_PR,
  ...PHYSICS_FORMULAS,
  ...PHYSICS_PP,
  ...PHYSICS_PR,
];

export const SUBJECTS = [
  { id: "matematyka", label: "Matematyka" },
  { id: "fizyka", label: "Fizyka" },
];

export function getFormula(subject: string, id: string): FormulaDef | undefined {
  return FORMULAS.find((f) => f.subject === subject && f.id === id);
}

export function formulasBySubject(subject: string): FormulaDef[] {
  return FORMULAS.filter((f) => f.subject === subject);
}
