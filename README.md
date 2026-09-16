# Wzornik Maturalny — szkielet PWA

Szkielet aplikacji: Vite + Vue 3 + TypeScript + vue-router + vite-plugin-pwa.
Zawiera routing, shell z nawigacją przedmiotów, offline caching i jeden
działający mini-kalkulator (delta/równanie kwadratowe) jako dowód koncepcji
dla przyszłego silnika solvera.

## Uruchomienie

```bash
npm install
npm run dev
npm test        # 125 testów (vitest)
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

## Wykresy funkcji (Etap 5 — gotowy)

- `src/lib/plots/plot.ts` — viewport, próbkowanie, zera, wierzchołek,
  punkt (0, c); czysta matematyka na liczbach, testowana bez DOM.
- `FunctionPlot.vue` — Canvas 2D z HiDPI, adaptacyjną siatką i etykietami.
- Nowa formuła `funkcja-liniowa` (miejsce zerowe + gałęzie
  tożsamość/sprzeczność); wykres pod deltą i funkcją liniową.

## Historia i ulubione (Etap 6 — gotowy)

- `src/lib/storage/db.ts` — IndexedDB: historia (limit 100, przycinanie
  najstarszych) i ulubione (`subject/id`).
- Solver zapisuje udane wyniki z debounce 1,5s + gwiazdka ulubionych.
- Widok `/historia` (link w nawigacji): ulubione z linkami, historia
  z wynikami renderowanymi przez KaTeX.

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

## Motyw, mobile i dostępność (Etap 8)

- Ciemny motyw domyślny (WCAG 2.2 AA), jasny tylko w `/ustawieniach`
  (motyw + miejsca po przecinku + reset danych). Motyw stawiany przed
  pierwszym malowaniem — bez flasha.
- Mobile-first: dolny pasek zakładek <900px, boczny rail na desktopie,
  cele ≥44px, inputy 1rem.
- Wzornik to globalny search z rankingiem (`delta` → równanie kwadratowe,
  działa bez ogonków) + filtr przedmiotu.
- A11y: skip-link, `aria-live` wyników, opisy diagramów, tekstowa
  alternatywa wykresu, KaTeX z MathML. SEO: tytuły per route + meta OG.

## Komplet CKE + konwerter (Etap 10)

- ~111 wzorów: matma PP/PR i fizyka PP/PR (potęgi, logarytmy, trygonometria,
  pochodne, granice, kombinatoryka, Vieta, Horner, soczewki, termodynamika,
  elektrostatyka, Bohr, relatywistyka…). Poziom PR dopisany w temacie.
- Silnik: silnia/kombinacje (BigInt), trygonometria (dokładne 30/45/60°),
  logarytmy całkowite, usuwanie niewymierności z mianownika.
- `/konwerter`: 10 kategorii (w tym temperatura °C/K/°F), live w obie
  strony, przycisk ⇄.
- Weryfikacja lokalna: `npm test && npm run build`.

## Grafit, jeden layout, rozkłady (Etap 11)

- Grafit `#0D1117` (zero zieleni), radius 14px, widoczne linie, siatka
  fixed na full height (fix: tło na `html`, `body transparent`).
- Jeden layout: topbar + dolne taby wszędzie, treść 46rem na środku.
- Wzornik: sticky search, scroll w kontenerze kart (62dvh).
- Wyniki z symbolami (`(a+b)³`, `x₁+x₂`, `p`, `w`…) zamiast `x1, x2`;
  koniec placeholdera „niewiadoma?".
- Nowe: wszystkie postacie kwadratowej, rozkład liczby na czynniki
  pierwsze, rozkład wielomianu (Horner + deflacja z krotnościami).

## Nawigacja i wygląd (Etap 9)

- Jeden dział: `/` to wzornik (globalny search), solver pod
  `/wzornik/:subject/:formula`; stare `/kalkulatory/*` redirectują.
  Pliki `HomeView.vue` i `KalkulatoryView.vue` bez route — do ręcznego
  usunięcia (`rm src/views/HomeView.vue src/views/KalkulatoryView.vue`).
- Neutralny dark + glass (blur, subtelne bordery, cień); siatka jako
  warstwa fixed na całą wysokość (obejście mobilnego buga
  `background-attachment`).
- Dolny tab-bar z ikonkami SVG (Wzory, Moje, Opcje).

## Ikony PWA (Etap 7 — render lokalnie)

Źródła SVG w `public/icons/` (Δ w tokenach apki), manifest pod PNG +
maskable. Ostatni krok lokalnie, bo agent nie miał uprawnień shell:

```bash
resvg -w 192 -h 192 public/icons/icon.svg public/icons/icon-192.png
resvg -w 512 -h 512 public/icons/icon.svg public/icons/icon-512.png
resvg -w 512 -h 512 public/icons/icon-maskable.svg public/icons/icon-maskable-512.png
resvg -w 180 -h 180 public/icons/icon.svg public/apple-touch-icon.png
rm public/icons/icon-192.svg public/icons/icon-512.svg public/icons/icon-maskable.svg
npm run build
```

Potem DevTools → Application → Manifest (instalowalność) i Lighthouse PWA.

## Co NIE jest jeszcze zrobione

Brak — wszystkie zaplanowane etapy dowiezione (ikony czekają tylko na render powyżej).

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
