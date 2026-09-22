import type { FormulaDef } from "./types";
import { MATH_FORMULAS } from "./math";
import { PHYSICS_FORMULAS } from "./physics";
import { MATH_PP1 } from "./math_pp1";
import { MATH_PP2 } from "./math_pp2";
import { MATH_KATY } from "./math_katy";
import { MATH_PR } from "./math_pr";
import { PHYSICS_PP } from "./physics_pp";
import { PHYSICS_PR } from "./physics_pr";
import { CHEMIA_FORMULAS } from "./chemia";
import { CHEMIA_PR_FORMULAS } from "./chemia_pr";
import { GEOGRAFIA_FORMULAS } from "./geografia";
import { GEOGRAFIA_PR_FORMULAS } from "./geografia_pr";
import { MATH_DELTA } from "./math_delta";
import { MATH_KWADRATOWE } from "./math_kwadratowe";
import { MATH_WZORY_SKROCONEGO } from "./math_wzory_skrocone";
import { MATH_HERON } from "./math_heron";
import { MATH_WYODREBNIA_GRUP } from "./math_wyodrebnia_grup";
import { MATH_POLY } from "./math_poly";
import { MATH_DZIEL_HORNER } from "./math_dziel_horner";
import { MATH_PISEMNE } from "./math_pisemne";
import { MATH_SUMY } from "./math_sumy";
import { MATH_TROJKATY } from "./math_trojkaty";

export const FORMULAS: FormulaDef[] = [
  ...MATH_FORMULAS,
  ...MATH_PP1,
  ...MATH_PP2,
  ...MATH_KATY,
  ...MATH_PR,
  ...MATH_DELTA,
  ...MATH_KWADRATOWE,
  ...MATH_WZORY_SKROCONEGO,
  ...MATH_HERON,
  ...MATH_WYODREBNIA_GRUP,
  ...MATH_POLY,
  ...MATH_DZIEL_HORNER,
  ...MATH_PISEMNE,
  ...MATH_SUMY,
  ...MATH_TROJKATY,
  ...PHYSICS_FORMULAS,
  ...PHYSICS_PP,
  ...PHYSICS_PR,
  ...CHEMIA_FORMULAS,
  ...CHEMIA_PR_FORMULAS,
  ...GEOGRAFIA_FORMULAS,
  ...GEOGRAFIA_PR_FORMULAS,
];

export const SUBJECTS = [
  { id: "matematyka", label: "Matematyka" },
  { id: "fizyka", label: "Fizyka" },
  { id: "chemia", label: "Chemia" },
  { id: "geografia", label: "Geografia" },
];

export function getFormula(subject: string, id: string): FormulaDef | undefined {
  return FORMULAS.find((f) => f.subject === subject && f.id === id);
}

export function formulasBySubject(subject: string): FormulaDef[] {
  return FORMULAS.filter((f) => f.subject === subject);
}
