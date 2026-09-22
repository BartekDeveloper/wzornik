import { FORMULAS } from "../formulas/index";
import type { FormulaDef } from "../formulas/types";
import { buildFuzzyIndex, fuzzyScore } from "./fuzzy";

export const KEYWORDS: Record<string, string[]> = {
  pitagoras: ["pitagoras", "przeciwprostokątna", "przyprostokątna"],
  "pole-trojkata": ["pole", "trójkąt", "podstawa", "wysokość"],
  "pole-prostokata": ["pole", "prostokąt", "bok"],
  "pole-kola": ["pole", "koło", "okrąg", "promień"],
  "obwod-kola": ["obwód", "koło", "okrąg", "promień"],
  "rownanie-kwadratowe": [
    "delta",
    "wyróżnik",
    "pierwiastki",
    "miejsca zerowe",
    "równanie kwadratowe",
  ],
  "funkcja-liniowa": ["prosta", "miejsce zerowe", "funkcja liniowa"],
  procent: ["procent", "podatek", "zniżka"],
  "ciag-arytmetyczny": ["ciąg", "arytmetyczny", "różnica"],
  "ciag-geometryczny": ["ciąg", "geometryczny", "iloraz"],
  "objetosc-prostopadloscianu": ["objętość", "prostopadłościan"],
  "objetosc-kuli": ["objętość", "kula"],
  "pole-kuli": ["pole", "kula", "sfera"],
  predkosc: ["prędkość", "droga", "czas", "ruch jednostajny"],
  "droga-jednostajnie-przyspieszona": ["przyspieszenie", "droga", "kinematyka"],
  sila: ["siła", "dynamika", "masa", "newton"],
  "energia-kinetyczna": ["energia kinetyczna", "dżul"],
  "energia-potencjalna": ["energia potencjalna", "wysokość"],
  gestosc: ["gęstość", "rho"],
  cisnienie: ["ciśnienie", "pascal"],
  praca: ["praca", "dżul"],
  potega: ["potęga", "wykładnik"],
  pierwiastek: ["pierwiastek", "stopień"],
  logarytm: ["logarytm", "podstawa"],
  "wartosc-bezwzgledna": ["wartość bezwzględna", "moduł"],
  "procent-skladany": ["procent składany", "lokata", "kapitał"],
  "uklad-rownan": ["układ równań", "cramer", "dwie niewiadome"],
  "nierownosc-kwadratowa": ["nierówność", "parabola", "przedział"],
  "horner-pierwiastki": ["horner", "wielomian", "pierwiastki wymierne"],
  "postac-kanoniczna": ["postać kanoniczna", "wierzchołek"],
  "prawdo-klasyczne": ["prawdopodobieństwo", "losowanie"],
  permutacje: ["permutacje", "silnia", "ustawienia"],
  kombinacje: ["kombinacje", "podzbiory", "lotto"],
  wariacje: ["wariacje", "losowanie bez zwracania"],
  tales: ["tales", "proporcja", "podobieństwo"],
  "postacie-kwadratowej": ["postać ogólna", "kanoniczna", "iloczynowa", "wierzchołek"],
  "rozklad-liczby": ["czynniki pierwsze", "rozkład", "dzielniki", "liczba pierwsza"],
  "katy-okrag": ["kąt środkowy", "kąt wpisany"],
  "zamiana-miary": ["stopnie", "radiany", "miara łukowa", "zamiana"],
  "kat-trojkat": ["trzeci kąt", "suma kątów trójkąta"],
  "kat-miedzy-prostymi": ["kąt między prostymi", "nachylenie"],
  "trojkaty-podobne": ["podobieństwo", "skala", "trójkąty podobne"],
  "kat-z-bokow": ["kąt z boków", "arcsin", "arccos", "arctan"],
  "suma-katow": ["suma kątów", "wielokąt"],
  "znak-wielomianu": ["znak wielomianu", "nierówność wielomianowa", "wężyk"],
  "pole-trapez": ["pole", "trapez"],
  "pole-rombu": ["pole", "romb", "przekątne"],
  "pole-rownoleglobok": ["pole", "równoległobok"],
  "luk-okregu": ["łuk", "długość łuku"],
  "wycinek-kola": ["wycinek", "sektor"],
  "odl-punktow": ["odległość punktów", "długość odcinka"],
  "srodek-odcinka": ["środek odcinka"],
  "prosta-2-punkty": ["prosta przez punkty", "równanie prostej"],
  prostopadlosc: ["prostopadłe", "równoległe", "współczynnik kierunkowy"],
  "okrag-rownanie": ["równanie okręgu", "środek okręgu"],
  "odl-punkt-prosta": ["odległość punktu od prostej"],
  graniastoslup: ["graniastosłup", "objętość"],
  ostroslup: ["ostrosłup", "objętość"],
  walec: ["walec", "objętość"],
  stozek: ["stożek", "objętość"],
  newton: ["newton", "dwumian", "trójkąt pascala"],
  silnia: ["silnia"],
  szesciany: ["sześcian sumy", "wzory skróconego mnożenia"],
  "granica-qn": ["granica", "ciąg geometryczny", "nieskończoność"],
  "pochodna-wielomianu": ["pochodna", "różniczkowanie"],
  "ekstrema-kwadratowej": ["ekstremum", "minimum", "maksimum", "wierzchołek"],
  "prawdo-warunkowe": ["prawdopodobieństwo warunkowe"],
  "prawdo-calkowite": ["prawdopodobieństwo całkowite"],
  "rownanie-wykladnicze": ["równanie wykładnicze"],
  "rownanie-logarytmiczne": ["równanie logarytmiczne"],
  vieta: ["viete", "suma pierwiastków", "iloczyn pierwiastków"],
  "podwojony-kat": ["podwojony kąt", "sinus", "cosinus"],
  moc: ["moc", "wat"],
  sprawnosc: ["sprawność", "wydajność"],
  ped: ["pęd"],
  zderzenia: ["zderzenie", "zachowanie pędu"],
  "ruch-okrag": ["ruch po okręgu", "okres", "częstotliwość"],
  grawitacja: ["grawitacja", "newton", "ciążenie"],
  kepler: ["kepler", "planety", "orbita"],
  archimedes: ["archimedes", "wypór", "pływalność"],
  hydrostatyczne: ["ciśnienie hydrostatyczne", "głębokość"],
  cieplo: ["ciepło właściwe", "ogrzewanie"],
  "cieplo-przemiany": ["topnienie", "parowanie", "ciepło przemiany"],
  ohm: ["ohm", "opór", "napięcie", "natężenie"],
  opor: ["opór właściwy", "przewodnik"],
  "moc-pradu": ["moc prądu"],
  "energia-pradu": ["praca prądu", "licznik"],
  lorentz: ["lorentz", "pole magnetyczne"],
  snell: ["snellius", "załamanie", "optyka"],
  soczewki: ["soczewka", "ogniskowa", "obraz"],
  powiekszenie: ["powiększenie"],
  siatka: ["siatka dyfrakcyjna", "dyfrakcja", "rząd"],
  fale: ["fala", "długość fali", "częstotliwość"],
  "wahadlo-mat": ["wahadło", "okres drgań"],
  "wahadlo-sprezyna": ["wahadło sprężynowe", "sprężyna"],
  foto: ["fotoelektryczne", "foton", "praca wyjścia"],
  emc2: ["einstein", "masa i energia"],
  rozpad: ["rozpad", "połowiczny zanik", "promieniotwórczość"],
  "rzut-poziomy": ["rzut poziomy", "zasięg"],
  "moment-sily": ["moment siły", "dźwignia"],
  "energia-obrotowa": ["energia obrotowa", "moment bezwładności"],
  bernoulli: ["bernoulli", "przepływ", "zwężka"],
  clapeyron: ["clapeyron", "gaz doskonały", "mole"],
  "pierwsza-zasada": ["pierwsza zasada termodynamiki", "energia wewnętrzna"],
  izobaryczna: ["przemiana izobaryczna", "praca gazu"],
  carnot: ["carnot", "silnik", "sprawność"],
  rozszerzalnosc: ["rozszerzalność", "dylatacja"],
  coulomb: ["coulomb", "ładunki", "elektrostatyka"],
  natezenie: ["natężenie pola", "ładunek punktowy"],
  potencjal: ["potencjał", "napięcie"],
  "kondensator-q": ["kondensator", "pojemność"],
  "kondensator-e": ["kondensator", "energia"],
  sem: ["sem", "ogniwo", "opór wewnętrzny"],
  strumien: ["strumień magnetyczny", "weber"],
  faraday: ["faraday", "indukcja", "sem"],
  solenoid: ["solenoid", "cewka", "elektromagnes"],
  "sila-elektrodynamiczna": ["siła elektrodynamiczna", "szyna", "prąd w polu"],
  bohr: ["bohr", "atom wodoru", "powłoki"],
  debroglie: ["de broglie", "fala materii"],
  "energia-rel": ["relatywistyka", "czynnik lorentza"],
  mol: ["mol", "liczba moli", "masa molowa", "molarna"],
  "stezenie-molowe": ["stężenie molowe", "molarność", "mol na dm3"],
  "stezenie-procentowe": ["stężenie procentowe", "procent masowy", "masa substancji"],
  rozcienczanie: ["rozcieńczanie", "c1v1=c2v2", "roztwór macierzysty"],
  ph: ["ph", "pH", "stężenie jonów wodorowych", "kwasowość"],
  wydajnosc: ["wydajność", "masa praktyczna", "masa teoretyczna", "reakcja chemiczna"],
  mieszanie: ["mieszanie roztworów", "średnie stężenie"],
  kc: ["stała równowagi", "kc", "równowaga chemiczna", "stężenia równowagi"],
  dysocjacja: ["stopień dysocjacji", "elektrolit", "kwas", "baza"],
  iloczyn: ["iloczyn rozpuszczalności", "ks", "sól 1:1"],
  ogniwo: ["ogniwo galwaniczne", "sem", "katoda", "anoda", "potencjał"],
  elektroliza: ["elektroliza", "praca prądu", "ekwiwalent", "faraday"],
  bufor: ["bufor", "henderson-hasselbalch", "pk", "pka", "cis/trans"],
  delta: ["delta", "wyróżnik", "liczba pierwiastków", "rownanie kwadratowe"],
  "kwadratowa-iloczynowa": ["postać iloczynowa", "mjesta zerowe", "funkcja kwadratowa"],
  "kwadratowa-ogolna": ["postać ogólna", "viete", "suma pierwiastków", "iloczyn pierwiastków"],
  "kwadrat-sumy-roznicy": [
    "kwadrat sumy",
    "kwadrat różnicy",
    "wzory skróconego mnożenia",
    "rozszerzanie",
  ],
  "roznica-kwadratow": ["różnica kwadratów", "wzory skróconego mnożenia", "a2-b2"],
  "wzor-herona": ["heron", "pole trójkąta", "półobwód", "trzy boki"],
  "wyodrebnianie-czynnika": ["wyodrębnianie", "wspólny czynnik", "NWD", "wykluczenie przed nawias"],
  grupowanie: ["grupowanie", "wyrazy", "wielomian 4 wyrazy", "rozklad"],
  "rozklad-wielomianu": ["rozkład wielomianu", "horner", "czynniki", "pierwiastki wymierne"],
  "dzielenie-wielomianow": ["dzielenie wielomianów", "iloraz", "reszta", "długie dzielenie"],
  "schemat-hornera": ["horner", "schemat", "wartość wielomianu", "deflacja"],
  "dodawanie-pisemne": ["dodawanie pisemne", "kolumny", "przeniesienia"],
  "odejmowanie-pisemne": ["odejmowanie pisemne", "pożyczki", "kolumny"],
  "mnozenie-pisemne": ["mnożenie pisemne", "częściowe iloczyny", "pod kreską"],
  "dzielenie-pisemne": ["dzielenie pisemne", "pod kreską", "reszta", "iloczyn"],
  "suma-ciagu-arytmetycznego": ["suma ciągu", "arytmetyczny", "Sn"],
  "suma-ciagu-geometrycznego": ["suma ciągu", "geometryczny", "Sn"],
  "szereg-geometryczny": ["szereg", "suma nieskończona", "zbieżny"],
  "tw-sinusow": ["twierdzenie sinusów", "2R", "bok z kąta"],
  "tw-cosinusow": ["twierdzenie cosinusów", "bok z boków", "kąt z boków"],
  "okrag-opisany-wpisany": ["okrąg opisany", "okrąg wpisany", "promień R r", "Heron"],
  "schemat-bernoulliego": ["bernoulli", "schemat", "prób Bernoulliego", "sukcesy"],
  "skala-mapy": ["skala", "mapa", "mianownik", "odległość na mapie"],
  "gestosc-zaludnienia": ["gęstość zaludnienia", "ludność", "powierzchnia"],
  "przyrost-naturalny": ["przyrost naturalny", "urodzenia", "zgony"],
  "saldo-migracji": ["saldo migracji", "imigracja", "emigracja"],
  "przyrost-rzeczywisty": ["przyrost rzeczywisty", "saldo", "bilans ludności"],
  deniwelacja: ["deniwelacja", "wysokość", "różnica wysokości"],
  "amplituda-temperatur": ["amplituda", "temperatura", "klimat"],
  "nachylenie-stoku": ["nachylenie", "stok", "spadek", "procent"],
  "wskaznik-urbanizacji": ["urbanizacja", "miasta", "wskaźnik"],
  "stopa-bezrobocia": ["bezrobocie", "stopa", "rynek pracy"],
  "pkb-per-capita": ["pkb", "per capita", "na mieszkańca", "gospodarka"],
  "wspolczynnik-feminizacji": ["feminizacja", "kobiety", "mężczyźni", "płeć"],
  "wspolczynnik-przyrostu": ["współczynnik przyrostu", "promil", "demografia"],
  "predkosc-chwilowa": ["prędkość chwilowa", "v0+at", "ruch zmienny"],
  "energia-wewnetrzna": ["energia wewnętrzna", "gaz doskonały", "3/2 nRT"],
  "oporniki-szeregowo": ["szeregowo", "oporniki", "suma oporów"],
  "oporniki-rownolegle": ["równolegle", "oporniki", "opór zastępczy"],
  doppler: ["doppler", "częstotliwość", "źródło dźwięku"],
  "kat-graniczny": ["kąt graniczny", "całkowite odbicie", "odbicie wewnętrzne"],
  statystyka: ["statystyka", "średnia", "mediana", "dominanta", "odchylenie"],
  "romb-bok": ["romb", "bok", "wysokość", "pole rombu"],
  "suma-katow-tryg": ["sinus sumy", "cosinus różnicy", "wzory trygonometryczne"],
  boyle: ["boyle", "mariotte", "izoterma", "pV"],
  gaylussac: ["gay-lussac", "izobara", "V/T"],
  charles: ["charles", "izochora", "p/T"],
  "czas-sloneczny": ["czas słoneczny", "długość geograficzna", "południk"],
  "bilans-wodny": ["bilans wodny", "opad", "parowanie", "hydrologia"],
};

export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function score(f: FormulaDef, q: string): number {
  let s = 0;
  if (norm(f.id).includes(q)) s += 3;
  if (norm(f.name).includes(q)) s += 3;
  for (const k of KEYWORDS[f.id] ?? []) {
    if (norm(k).includes(q) || q.includes(norm(k))) s += 3;
  }
  if (norm(f.topic).includes(q)) s += 1;
  if (q.length > 1 && norm(f.latex).includes(q)) s += 0.5;
  return s;
}

export function searchFormulas(query: string, subject?: string): FormulaDef[] {
  const q = norm(query.trim());
  const pool = subject ? FORMULAS.filter((f) => f.subject === subject) : [...FORMULAS];
  if (q === "") return pool;
  const fuzzy = fuzzyScore(fuzzyIndex(), query);
  return pool
    .map((f) => {
      const base = score(f, q);
      const bonus = base === 0 ? (fuzzy.get(f.subject + "/" + f.id) ?? 0) : 0;
      return { f, s: base + bonus };
    })
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.f);
}

let cached: ReturnType<typeof buildFuzzyIndex> | null = null;

function fuzzyIndex() {
  if (!cached) {
    cached = buildFuzzyIndex(
      FORMULAS.map((f) => ({
        id: f.subject + "/" + f.id,
        text: [f.id, f.name, f.topic, ...(KEYWORDS[f.id] ?? [])].join(" "),
      })),
    );
  }
  return cached;
}
