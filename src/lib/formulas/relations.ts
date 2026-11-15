import { FORMULAS, getFormula } from "./index";
import type { FormulaDef } from "./types";
import type { Exact } from "../exact/exact";
import { formatRatText } from "../exact/format";

interface RelationEntry {
  simpler: string[];
  harder: string[];
}

const RELATIONS: Record<string, RelationEntry> = {
  "kwadratowa-ogolna": { simpler: [], harder: ["rownanie-kwadratowe", "delta"] },
  "rownanie-kwadratowe": {
    simpler: ["kwadratowa-ogolna"],
    harder: ["postacie-kwadratowej", "vieta", "nierownosc-kwadratowa", "ekstrema-kwadratowej"],
  },
  delta: {
    simpler: ["kwadratowa-ogolna"],
    harder: [
      "miejsca-zerowe-kwadratowej",
      "wierzcholek-p-q",
      "monotonicznosc-kwadratowej",
      "nierownosc-kwadratowa",
      "postacie-kwadratowej",
    ],
  },
  "miejsca-zerowe-kwadratowej": {
    simpler: ["delta"],
    harder: ["kwadratowa-iloczynowa", "postacie-kwadratowej"],
  },
  "wierzcholek-p-q": {
    simpler: ["delta", "miejsca-zerowe-kwadratowej"],
    harder: ["postac-kanoniczna", "kwadratowa-z-wierzcholka-i-punktu", "ekstrema-kwadratowej"],
  },
  "postac-kanoniczna": {
    simpler: ["wierzcholek-p-q"],
    harder: ["kwadratowa-z-kanonicznej"],
  },
  "kwadratowa-z-kanonicznej": {
    simpler: ["postac-kanoniczna", "wierzcholek-p-q"],
    harder: ["postacie-kwadratowej", "miejsca-zerowe-kwadratowej"],
  },
  "kwadratowa-iloczynowa": {
    simpler: ["miejsca-zerowe-kwadratowej"],
    harder: ["kwadratowa-z-iloczynowej"],
  },
  "kwadratowa-z-iloczynowej": {
    simpler: ["kwadratowa-iloczynowa", "vieta"],
    harder: ["postacie-kwadratowej"],
  },
  "kwadratowa-z-wierzcholka-i-punktu": {
    simpler: ["wierzcholek-p-q", "postac-kanoniczna"],
    harder: ["kwadratowa-z-kanonicznej"],
  },
  "monotonicznosc-kwadratowej": {
    simpler: ["wierzcholek-p-q"],
    harder: ["minmax-kwadratowej-przedzial", "monotonicznosc-ekstrema-wielomianu"],
  },
  "minmax-kwadratowej-przedzial": {
    simpler: ["monotonicznosc-kwadratowej", "ekstrema-kwadratowej"],
    harder: [],
  },
  "nierownosc-kwadratowa": { simpler: ["rownanie-kwadratowe", "delta"], harder: [] },
  vieta: {
    simpler: ["rownanie-kwadratowe"],
    harder: ["vieta-rozszerzone", "kwadratowa-z-iloczynowej"],
  },
  "vieta-rozszerzone": { simpler: ["vieta"], harder: [] },
  "postacie-kwadratowej": { simpler: ["rownanie-kwadratowe", "delta"], harder: [] },
  "ekstrema-kwadratowej": { simpler: ["wierzcholek-p-q"], harder: [] },

  "funkcja-liniowa": {
    simpler: [],
    harder: [
      "monotonicznosc-liniowej",
      "uklad-rownan",
      "prosta-przeksztalcenia",
      "prosta-2-punkty",
    ],
  },
  "monotonicznosc-liniowej": { simpler: ["funkcja-liniowa"], harder: [] },
  "uklad-rownan": { simpler: ["funkcja-liniowa"], harder: [] },
  "prosta-przeksztalcenia": { simpler: ["funkcja-liniowa"], harder: [] },
  "prosta-2-punkty": {
    simpler: ["funkcja-liniowa"],
    harder: ["odl-punktow", "srodek-odcinka"],
  },

  "odl-punktow": {
    simpler: ["pitagoras", "prosta-2-punkty"],
    harder: ["wektory-analityczna", "odl-punkt-prosta"],
  },
  "srodek-odcinka": {
    simpler: ["prosta-2-punkty"],
    harder: ["srodek-ciezkosci-trojkata", "przeksztalcenia-geometryczne"],
  },
  "wektory-analityczna": { simpler: ["odl-punktow"], harder: ["okrag-rownanie"] },
  "pole-trojkata-analitycznie": {
    simpler: ["odl-punktow"],
    harder: ["srodek-ciezkosci-trojkata"],
  },
  "srodek-ciezkosci-trojkata": {
    simpler: ["srodek-odcinka", "pole-trojkata-analitycznie"],
    harder: [],
  },
  "okrag-rownanie": { simpler: ["wektory-analityczna"], harder: ["okrag-postac-ogolna"] },
  "okrag-postac-ogolna": { simpler: ["okrag-rownanie"], harder: [] },
  "przeksztalcenia-geometryczne": { simpler: ["srodek-odcinka"], harder: [] },

  "roznica-kwadratow": { simpler: [], harder: ["roznica-n-tych-poteg"] },
  "roznica-n-tych-poteg": {
    simpler: ["roznica-kwadratow"],
    harder: ["rozklad-wielomianu"],
  },
  "wyodrebnianie-czynnika": { simpler: [], harder: ["rozklad-wielomianu"] },
  grupowanie: { simpler: [], harder: ["rozklad-wielomianu"] },
  "rozklad-wielomianu": {
    simpler: ["roznica-n-tych-poteg", "wyodrebnianie-czynnika", "grupowanie"],
    harder: ["horner-pierwiastki", "tw-bezouta", "vieta-3-stopnia", "dzielenie-wielomianow"],
  },
  "schemat-hornera": { simpler: [], harder: ["horner-pierwiastki", "dzielenie-wielomianow"] },
  "horner-pierwiastki": {
    simpler: ["rozklad-wielomianu", "schemat-hornera"],
    harder: ["znak-wielomianu", "monotonicznosc-ekstrema-wielomianu"],
  },
  "tw-bezouta": { simpler: ["rozklad-wielomianu"], harder: ["dzielenie-wielomianow"] },
  "dzielenie-wielomianow": {
    simpler: ["tw-bezouta", "rozklad-wielomianu", "schemat-hornera"],
    harder: [],
  },
  "vieta-3-stopnia": {
    simpler: ["vieta", "rozklad-wielomianu"],
    harder: ["monotonicznosc-ekstrema-wielomianu"],
  },
  "monotonicznosc-ekstrema-wielomianu": {
    simpler: ["pochodna-wielomianu", "vieta-3-stopnia"],
    harder: [],
  },
  "znak-wielomianu": { simpler: ["horner-pierwiastki"], harder: [] },

  potega: {
    simpler: [],
    harder: ["dzialania-na-potegach", "potega-wymierna", "rownanie-wykladnicze"],
  },
  "dzialania-na-potegach": { simpler: ["potega"], harder: ["potega-wymierna"] },
  pierwiastek: { simpler: [], harder: ["potega-wymierna"] },
  "potega-wymierna": {
    simpler: ["pierwiastek", "dzialania-na-potegach"],
    harder: [],
  },
  logarytm: {
    simpler: [],
    harder: ["dzialania-na-logarytmach", "zamiana-podstawy-log", "rownanie-logarytmiczne"],
  },
  "dzialania-na-logarytmach": { simpler: ["logarytm"], harder: [] },
  "zamiana-podstawy-log": { simpler: ["logarytm"], harder: ["rownanie-logarytmiczne"] },
  "rownanie-wykladnicze": { simpler: ["potega", "logarytm"], harder: [] },
  "rownanie-logarytmiczne": { simpler: ["logarytm", "zamiana-podstawy-log"], harder: [] },
  "wartosc-bezwzgledna": { simpler: [], harder: ["nierownosc-bezwzgledna"] },
  "nierownosc-bezwzgledna": { simpler: ["wartosc-bezwzgledna"], harder: [] },

  "trygonometria-trojkat-punkt": {
    simpler: [],
    harder: ["jedynka-trygonometryczna", "wzory-redukcyjne"],
  },
  "jedynka-trygonometryczna": {
    simpler: ["trygonometria-trojkat-punkt"],
    harder: ["podwojony-kat", "tangens-sumy-podwojony", "rownanie-trygonometryczne"],
  },
  "wzory-redukcyjne": {
    simpler: ["trygonometria-trojkat-punkt"],
    harder: ["sumy-iloczyny-tryg"],
  },
  "podwojony-kat": { simpler: ["jedynka-trygonometryczna"], harder: ["tangens-sumy-podwojony"] },
  "tangens-sumy-podwojony": {
    simpler: ["jedynka-trygonometryczna", "podwojony-kat"],
    harder: [],
  },
  "sumy-iloczyny-tryg": { simpler: ["wzory-redukcyjne"], harder: [] },
  "rownanie-trygonometryczne": { simpler: ["jedynka-trygonometryczna"], harder: [] },
  "tw-sinusow": { simpler: ["pitagoras"], harder: ["tw-cosinusow", "pole-trojkata-sinus"] },
  "tw-cosinusow": { simpler: ["tw-sinusow", "pitagoras"], harder: [] },
  "pole-trojkata-sinus": { simpler: ["tw-sinusow"], harder: ["wzor-herona"] },

  pitagoras: {
    simpler: [],
    harder: ["trojkat-prostokatny-relacje", "odl-punktow", "tw-cosinusow", "trojkaty-podobne"],
  },
  "pole-trojkata": {
    simpler: [],
    harder: ["wzor-herona", "pole-trojkata-sinus", "trojkat-rownoboczny"],
  },
  "wzor-herona": { simpler: ["pole-trojkata"], harder: ["pole-trojkata-promienie"] },
  "trojkat-prostokatny-relacje": { simpler: ["pitagoras"], harder: [] },
  "trojkat-rownoboczny": { simpler: ["pole-trojkata", "pitagoras"], harder: [] },
  tales: { harder: [], simpler: [] },
  "tw-dwusiecznej": { simpler: ["tales"], harder: [] },
  "katy-okrag": { simpler: [], harder: ["sieczna-styczna"] },
  "sieczna-styczna": { simpler: ["katy-okrag", "tw-dwusiecznej"], harder: [] },
  "trojkaty-podobne": {
    simpler: ["tales", "pitagoras"],
    harder: ["pola-objetosci-podobnych"],
  },
  "pola-objetosci-podobnych": { simpler: ["trojkaty-podobne"], harder: [] },
  "pole-kola": { simpler: [], harder: ["wycinek-kola", "luk-okregu", "pole-walca", "pole-kuli"] },
  "obwod-kola": { simpler: ["pole-kola"], harder: [] },
  "wycinek-kola": { simpler: ["pole-kola"], harder: [] },
  "luk-okregu": { simpler: ["pole-kola"], harder: [] },
  "pole-walca": { simpler: ["pole-kola"], harder: ["pole-tworzaca-stozka"] },
  "pole-tworzaca-stozka": {
    simpler: ["pole-walca", "pitagoras"],
    harder: ["bryly-sciete"],
  },
  "bryly-sciete": {
    simpler: ["pole-tworzaca-stozka", "pole-graniastoslupa-ostroslupa", "stozek"],
    harder: [],
  },
  "pole-przekatna-prostopadloscianu": {
    simpler: ["pitagoras", "objetosc-prostopadloscianu"],
    harder: ["pole-graniastoslupa-ostroslupa"],
  },
  "pole-graniastoslupa-ostroslupa": {
    simpler: ["pole-przekatna-prostopadloscianu", "graniastoslup", "ostroslup"],
    harder: ["bryly-sciete"],
  },
  "objetosc-kuli": { simpler: [], harder: ["pole-kuli"] },
  "pole-kuli": { simpler: ["objetosc-kuli"], harder: [] },
  "pole-czworokata-sinus": {
    simpler: ["pole-rownoleglobok", "pole-trojkata-sinus"],
    harder: ["czworokat-okrag"],
  },
  "czworokat-okrag": { simpler: ["wzor-herona", "pole-czworokata-sinus"], harder: [] },

  "ciag-arytmetyczny": {
    simpler: [],
    harder: [
      "sasiednie-arytmetyczny",
      "suma-ciagu-arytmetycznego",
      "suma-arytmetycznego-r",
      "monotonicznosc-ciagu",
      "ciag-z-dwoch-wyrazow",
    ],
  },
  "ciag-geometryczny": {
    simpler: [],
    harder: [
      "sasiednie-geometryczny",
      "suma-ciagu-geometrycznego",
      "szereg-geometryczny",
      "monotonicznosc-ciagu",
      "ciag-z-dwoch-wyrazow",
    ],
  },
  "sasiednie-arytmetyczny": { simpler: ["ciag-arytmetyczny"], harder: [] },
  "sasiednie-geometryczny": { simpler: ["ciag-geometryczny"], harder: [] },
  "suma-ciagu-arytmetycznego": {
    simpler: ["ciag-arytmetyczny"],
    harder: ["suma-arytmetycznego-r"],
  },
  "suma-arytmetycznego-r": { simpler: ["suma-ciagu-arytmetycznego"], harder: [] },
  "suma-ciagu-geometrycznego": {
    simpler: ["ciag-geometryczny"],
    harder: ["szereg-geometryczny"],
  },
  "szereg-geometryczny": {
    simpler: ["suma-ciagu-geometrycznego"],
    harder: ["granica-wymierna"],
  },
  "ciag-z-dwoch-wyrazow": {
    simpler: ["ciag-arytmetyczny", "ciag-geometryczny"],
    harder: [],
  },
  "monotonicznosc-ciagu": {
    simpler: ["ciag-arytmetyczny", "ciag-geometryczny"],
    harder: [],
  },
  "granica-wymierna": { simpler: [], harder: ["granica-qn"] },

  silnia: { simpler: [], harder: ["permutacje", "kombinacje", "wariacje"] },
  permutacje: { simpler: ["silnia"], harder: ["wariacje", "kombinacje"] },
  wariacje: { simpler: ["permutacje"], harder: ["wariacje-z-powtorzeniami"] },
  kombinacje: {
    simpler: ["permutacje"],
    harder: ["kombinacje-z-powtorzeniami", "newton", "schemat-bernoulliego"],
  },
  "wariacje-z-powtorzeniami": { simpler: ["wariacje"], harder: [] },
  "kombinacje-z-powtorzeniami": { simpler: ["kombinacje"], harder: [] },
  newton: { simpler: ["kombinacje", "silnia"], harder: ["wyraz-newtona"] },
  "wyraz-newtona": { simpler: ["newton"], harder: [] },

  "prawdo-klasyczne": {
    simpler: [],
    harder: ["prawdo-wlasnosci", "prawdo-warunkowe", "schemat-bernoulliego"],
  },
  "prawdo-wlasnosci": {
    simpler: ["prawdo-klasyczne"],
    harder: ["prawdo-warunkowe", "prawdo-calkowite"],
  },
  "prawdo-warunkowe": {
    simpler: ["prawdo-wlasnosci"],
    harder: ["prawdo-calkowite", "tw-bayesa"],
  },
  "prawdo-calkowite": { simpler: ["prawdo-warunkowe"], harder: ["tw-bayesa"] },
  "tw-bayesa": { simpler: ["prawdo-calkowite", "prawdo-warunkowe"], harder: [] },
  "schemat-bernoulliego": { simpler: ["prawdo-klasyczne", "kombinacje"], harder: [] },
  "wartosc-oczekiwana": { simpler: ["prawdo-klasyczne"], harder: [] },
  statystyka: { simpler: [], harder: ["srednie-statystyczne"] },
  "srednie-statystyczne": { simpler: ["statystyka"], harder: [] },

  procent: { simpler: [], harder: ["procent-skladany"] },
  "procent-skladany": { simpler: ["procent", "ciag-geometryczny"], harder: [] },

  "pochodna-wielomianu": {
    simpler: [],
    harder: ["monotonicznosc-ekstrema-wielomianu", "rownanie-stycznej"],
  },
  "rownanie-stycznej": { simpler: ["pochodna-wielomianu"], harder: [] },
  "pochodna-ilorazu-iloczynu": { simpler: [], harder: ["dziedzina-ulamka-wymiernego"] },
  "dziedzina-ulamka-wymiernego": { simpler: ["pochodna-ilorazu-iloczynu"], harder: [] },
};

export interface RelatedFormulas {
  simpler: FormulaDef[];
  harder: FormulaDef[];
}

export function getRelations(id: string): RelatedFormulas {
  const simpler = new Set<string>(RELATIONS[id]?.simpler ?? []);
  const harder = new Set<string>(RELATIONS[id]?.harder ?? []);
  for (const [other, rel] of Object.entries(RELATIONS)) {
    if (rel.simpler.includes(id)) harder.add(other);
    if (rel.harder.includes(id)) simpler.add(other);
  }
  simpler.delete(id);
  harder.delete(id);
  harder.forEach((h) => simpler.delete(h));
  const toDefs = (ids: Iterable<string>): FormulaDef[] =>
    [...ids].map((x) => getFormula("matematyka", x)).filter((d): d is FormulaDef => Boolean(d));
  return { simpler: toDefs(simpler), harder: toDefs(harder) };
}

export function exactToInput(e: Exact): string | null {
  if (e.irr === null) return formatRatText(e.rat);
  if (e.irr.type === "approx") return null;
  const c = e.irr.coef;
  const num = c.p === 1n ? "" : c.p === -1n ? "-" : String(c.p);
  if (e.irr.type === "pi") {
    return c.q === 1n ? `${c.p}π` : `${num}π/${c.q}`;
  }
  const unit = `√${e.irr.radicand.toString()}`;
  return c.q === 1n ? `${c.p}${unit}` : `${num}${unit}/${c.q}`;
}

export interface TransferSource {
  inputs: Record<string, string>;
  values?: Exact[];
  labels?: string[];
}

export function transferQuery(
  from: FormulaDef,
  to: FormulaDef,
  source: TransferSource,
): Record<string, string> {
  const q: Record<string, string> = {};
  if (from.subject !== to.subject) return q;
  for (const v of to.vars) {
    if (v.kind !== undefined) continue;
    const typed = source.inputs[v.id];
    if (typed !== undefined && typed.trim() !== "") {
      q[`v_${v.id}`] = typed;
      continue;
    }
    if (source.values && source.labels) {
      const idx = source.labels.findIndex((l) => l === v.id || l === v.label);
      if (idx >= 0) {
        const s = exactToInput(source.values[idx]!);
        if (s !== null) q[`v_${v.id}`] = s;
      }
    }
  }
  return q;
}

export const FORMULA_COUNT_CHECK = FORMULAS.length;
