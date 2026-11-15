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
import { MATH_TROJKAT_ROWNOBOCZNY } from "./math_trojkat_rownoboczny";
import { MATH_TRYGONOMETRIA } from "./math_trygonometria";
import { MATH_FUNKCJE } from "./math_funkcje";
import { MATH_PLANIMETRIA } from "./math_planimetria";
import { MATH_KWADRATOWA_ROZSZERZENIE } from "./math_kwadratowa_rozszerzenie";
import { MATH_DODATKOWE } from "./math_dodatkowe";
import { MATH_LICZBY } from "./math_liczby";
import { MATH_LOGARYTMY } from "./math_logarytmy";
import { MATH_TWIERDZENIA } from "./math_twierdzenia";
import { MATH_POTEGI } from "./math_potegi";
import { MATH_WIELOMIANY2 } from "./math_wielomiany2";
import { MATH_CIAGI } from "./math_ciagi";
import { MATH_TRYGONOMETRIA2 } from "./math_trygonometria2";
import { MATH_PLANIMETRIA2 } from "./math_planimetria2";
import { MATH_ANALITYCZNA } from "./math_analityczna";
import { MATH_STEREOMETRIA } from "./math_stereometria";
import { MATH_DZIAL9 } from "./math_dzial9";
import { MATH_POCHODNE } from "./math_pochodne";

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
  ...MATH_TROJKAT_ROWNOBOCZNY,
  ...MATH_TRYGONOMETRIA,
  ...MATH_FUNKCJE,
  ...MATH_PLANIMETRIA,
  ...MATH_KWADRATOWA_ROZSZERZENIE,
  ...MATH_DODATKOWE,
  ...MATH_LICZBY,
  ...MATH_LOGARYTMY,
  ...MATH_TWIERDZENIA,
  ...MATH_POTEGI,
  ...MATH_WIELOMIANY2,
  ...MATH_CIAGI,
  ...MATH_TRYGONOMETRIA2,
  ...MATH_PLANIMETRIA2,
  ...MATH_ANALITYCZNA,
  ...MATH_STEREOMETRIA,
  ...MATH_DZIAL9,
  ...MATH_POCHODNE,
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

const BY_KEY = new Map(FORMULAS.map((f) => [`${f.subject}/${f.id}`, f]));

export function getFormula(subject: string, id: string): FormulaDef | undefined {
  return BY_KEY.get(`${subject}/${id}`);
}

export function formulasBySubject(subject: string): FormulaDef[] {
  return FORMULAS.filter((f) => f.subject === subject);
}
