# Wzornik Maturalny — szkielet PWA

Szkielet aplikacji: Vite + Vue 3 + TypeScript + vue-router + vite-plugin-pwa.
Zawiera routing, shell z nawigacją przedmiotów, offline caching i jeden
działający mini-kalkulator (delta/równanie kwadratowe) jako dowód koncepcji
dla przyszłego silnika solvera.

## Uruchomienie

```bash
npm install
npm run dev
npm test        # 33 testy: silnik Exact + jednostki + solver (vitest)
```

## Solver N-zmiennych (Etap 2 — gotowy)

20 wzorów w `src/lib/formulas/` (12 matematyka + 8 fizyka), każdy z ręcznie
zakodowanymi wariantami algebraicznymi — puste pole inputu to niewiadoma:

- Matematyka: Pitagoras, pola (trójkąt/prostokąt/koło/kula), obwód koła,
  równanie kwadratowe, procenty, ciągi, objętości.
- Fizyka: prędkość, ruch jednostajnie przyspieszony, F=ma, Ek/Ep, gęstość,
  ciśnienie, praca.
- Inputy rozumieją `π` (`25π`), ułamki (`1/3`) i przecinki (`2,5`).
  Warianty z odwracaniem π wracają wynikiem tylko przybliżonym z notką.
- Kroki z szablonu: przekształcenie → podstawienie → wynik (latex jako
  tekst do czasu KaTeX w Etapie 3).

## Renderowanie wzorów (Etap 3 — gotowy)

- `src/components/Formula.vue` + `src/lib/katex.ts` — KaTeX z fallbackiem
  do `<code>` przy nieparsowalnym wejściu. Kroki solvera to czysty latex
  (notki tekstowe osobno), ważność sprawdzana testem dla wszystkich
  61 wariantów (`latex.test.ts`).
- Fonty aplikacji self-hosted: `public/fonts/*.woff2` (Spectral, Plex Sans,
  Plex Mono; latin + latin-ext) — offline od pierwszej wizyty, zero CDN.
- `/wzornik` ma wyszukiwarkę kontekstową (np. „delt" → równanie kwadratowe).

## Diagramy SVG (Etap 4 — gotowy)

- `src/lib/diagrams/geometry.ts` — czyste funkcje: Pitagoras (znacznik kąta
  prostego), trójkąt z wysokością, prostokąt, koło, prostopadłościan (rzut),
  kula. Proporcje z danych, niewiadoma na czerwono.
- `FormulaDiagram.vue` w widoku solvera — rysuje się z inputów
  i rozwiązanej niewiadomej, tylko przy pełnym sukcesie.

## Silnik dokładności (Etap 1 — gotowy)

Czysty TypeScript w `src/lib/`, zero zależności runtime (celowo bez mathjs —
oszczędza ~600KB w paczce offline):

- `src/lib/exact/rational.ts` — liczby wymierne na `BigInt` (mianownik > 0,
  skrócone przez NWD). `0.1 + 0.2 = 3/10`, nie `0.30000000000000004`.
- `src/lib/exact/exact.ts` — typ `Exact` (`rat + irr`): pierwiastki trzymane
  symbolicznie (`√12 → 2√3`), `π` symbolicznie, solver `solveQuadratic`
  z gałęziami `two/one/none/linear`.
- `src/lib/exact/format.ts` — `formatExactText` / `formatLatex` (pod KaTeX
  w Etapie 3) / `formatDecimal` + reguła „do zapisu" (całkowite > ułamek >
  `a√b` / `kπ`, dziesiętne tylko jako przybliżenie).
- `src/lib/units/units.ts` — konwersje SI MVP: długość, masa, czas,
  prędkość (`36 km/h → 10 m/s`), z kontrolą zgodności wymiarów.

## Test trybu offline

Service worker rejestruje się też w trybie dev (`devOptions.enabled: true`
w `vite.config.ts`), ale najbardziej wiarygodny test to build produkcyjny:

```bash
npm run build
npm run preview
```

Otwórz podgląd, poczekaj aż SW się zainstaluje (DevTools → Application →
Service Workers), potem włącz "Offline" w DevTools i odśwież — routing i
mini-kalkulator powinny nadal działać.

## Co NIE jest jeszcze zrobione

- **Ikony PWA są placeholderami** (SVG z „Δ”) — do podmiany na docelowe
  PNG/maskable przed publikacją (wymóg niektórych przeglądarek/Android).
- Wykresy funkcji (Canvas) — kolejny etap.
- Historia obliczeń i ulubione (IndexedDB) — kolejny etap.

## Struktura

```
src/
  router/index.ts      — trasy: /, /wzornik/:subject?, /kalkulatory/:subject?,
                          /kalkulatory/:subject/:formula (solver)
  components/NavRail.vue
  views/
    HomeView.vue        — hero z działającym mini-kalkulatorem
    WzornikView.vue      — placeholder
    KalkulatoryView.vue  — placeholder
    SolverView.vue       — placeholder
  assets/styles/main.css — design tokens (kolory, typografia, grid tła)
```
