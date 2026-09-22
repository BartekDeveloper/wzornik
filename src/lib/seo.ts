import { DESCRIPTIONS } from "./descriptions";
import { FORMULAS, SUBJECTS, getFormula } from "./formulas/index";

export const BASE_URL = "https://bartekdeveloper.github.io/wzornik";

const CORE_PATHS = ["/", "/wzornik", "/zadanie", "/historia", "/konwerter", "/ustawienia"];

export function siteUrls(): string[] {
  const paths = [...CORE_PATHS];
  for (const s of SUBJECTS) paths.push(`/wzornik/${s.id}`);
  for (const f of FORMULAS) paths.push(`/wzornik/${f.subject}/${f.id}`);
  return paths.map((p) => `${BASE_URL}${p === "/" ? "/" : p}`);
}

const SUBJECT_BLURBS: Record<string, string> = {
  matematyka:
    "Wzory i kalkulatory z matematyki: algebra, geometria, ciągi, trygonometria i prawdopodobieństwo.",
  fizyka: "Wzory i kalkulatory z fizyki: kinematyka, dynamika, prąd, optyka i fizyka współczesna.",
  chemia: "Wzory i kalkulatory z chemii: mole, stężenia, pH, elektrochemia i równowagi.",
  geografia: "Wzory i kalkulatory z geografii: skala mapy, demografia, klimat i wskaźniki.",
};

export interface PageMeta {
  title: string;
  description: string;
  url: string;
}

const HOME_META: PageMeta = {
  title: "Wzornik Maturalny — wzory i kalkulatory maturalne offline",
  description: "Wzory i kalkulatory maturalne — działa offline, dokładność szkolna.",
  url: `${BASE_URL}/`,
};

const STATIC_META: Record<string, PageMeta> = {
  wzornik: {
    title: "Wzornik — wszystkie wzory | Wzornik Maturalny",
    description:
      "Wszystkie wzory maturalne w jednym miejscu: matematyka, fizyka, chemia i geografia. Szukaj, wklej zadanie, licz z krokami.",
    url: `${BASE_URL}/wzornik`,
  },
  zadanie: {
    title: "Wklej zadanie | Wzornik Maturalny",
    description:
      "Wklej treść zadania, a aplikacja rozpozna wzór i podstawi dane. Równania, procenty, ciągi i geometria.",
    url: `${BASE_URL}/zadanie`,
  },
  historia: {
    title: "Historia i ulubione | Wzornik Maturalny",
    description:
      "Ostatnie obliczenia i zapisane ulubione wzory. Wszystko lokalnie, na Twoim urządzeniu.",
    url: `${BASE_URL}/historia`,
  },
  konwerter: {
    title: "Konwerter jednostek | Wzornik Maturalny",
    description:
      "Przeliczanie jednostek: długość, masa, czas, prędkość, pole, objętość, ciśnienie, energia, moc, temperatura i kąt.",
    url: `${BASE_URL}/konwerter`,
  },
  ustawienia: {
    title: "Ustawienia | Wzornik Maturalny",
    description: "Motyw, liczba miejsc po przecinku i czyszczenie historii. Wzornik Maturalny.",
    url: `${BASE_URL}/ustawienia`,
  },
};

export function metaFor(
  name: string | symbol | null | undefined,
  params: Record<string, string | string[]>,
): PageMeta {
  if (name === "home") return HOME_META;
  const subject = typeof params.subject === "string" ? params.subject : undefined;
  const subjectEntry = SUBJECTS.find((s) => s.id === subject);
  if (name === "wzornik" && subjectEntry) {
    return {
      title: `Wzornik — ${subjectEntry.label} | Wzornik Maturalny`,
      description: SUBJECT_BLURBS[subjectEntry.id] ?? HOME_META.description,
      url: `${BASE_URL}/wzornik/${subjectEntry.id}`,
    };
  }
  const staticMeta = typeof name === "string" ? STATIC_META[name] : undefined;
  if (staticMeta) return staticMeta;
  if (name === "solver" && subject && typeof params.formula === "string") {
    const formula = getFormula(subject, params.formula);
    if (formula) {
      return {
        title: `${formula.name} | Wzornik Maturalny`,
        description: DESCRIPTIONS[formula.id] ?? HOME_META.description,
        url: `${BASE_URL}/wzornik/${subject}/${formula.id}`,
      };
    }
  }
  return HOME_META;
}
