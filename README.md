# Wzornik Maturalny

Wzory z tablic CKE z kalkulatorami, które liczą same. Wpisujesz to, co znasz,
puste pole to niewiadoma — wynik dostajesz dokładnie (ułamki, pierwiastki, π),
krok po kroku, z wykresem albo rysunkiem. Całość działa offline, prosto
z telefonu.

**Live:** https://bartekdeveloper.github.io/wzornik/

## Co tu jest

- **~110 wzorów** — matematyka i fizyka, podstawa i rozszerzenie, każdy
  z własnym solverem (poziom PR dopisany w temacie).
- **Wyniki do przepisania** — dokładne tam, gdzie się da; przybliżenie
  z wybraną liczbą miejsc obok. Wpisz `25π` albo `1/3`, też zrozumie.
- **Kroki rozwiązania** — przekształcenie, podstawienie, wynik, renderowane
  w KaTeX.
- **Wykresy i rysunki** — parabola z zerami i wierzchołkiem, trójkąty, bryły.
- **Konwerter jednostek** — 11 kategorii (długość, masa, czas, prędkość,
  pole, objętość, ciśnienie, energia, moc, temperatura, kąt), liczy w obie
  strony na żywo.
- **Nierówności z wyborem znaku** — `> ≥ < ≤ ≠` dla funkcji kwadratowej
  i wielomianów 3. stopnia (tabela znaków z krotnościami pierwiastków).
- **Kąty na bogato** — zamiana °/rad, trzeci kąt trójkąta, kąt między
  prostymi, podobieństwo, kąt z boków (arcsin/arccos/arctan), suma kątów.
- **Historia i ulubione** — zapisywane na urządzeniu (IndexedDB), serduszko
  na każdej karcie.
- **Ciemny motyw** (jasny w ustawieniach), wyszukiwarka bez ogonków
  (`delta` znajduje równanie kwadratowe, literówki też — fuzzy BK-Trie),
  pełne PWA — instaluje się i chodzi bez internetu.
- **Szukanie wzorem** — wklej `4x^2-2x+10=0`, a aplikacja rozpozna funkcję
  kwadratową i uzupełni `a, b, c` (liniowe też; działa też z pola we wzorze).

## Start

```bash
npm install
npm run dev
```

| Komenda              | Po co                                   |
| -------------------- | --------------------------------------- |
| `npm test`           | testy (vitest)                          |
| `npm run lint`       | lint (oxlint)                           |
| `npm run format:check` / `:write` | format (oxfmt)               |
| `npm run build`      | build produkcyjny (`vue-tsc` + vite)    |
| `npm run preview`    | podgląd buildu + test offline w DevTools |

Pre-commit (husky) odpala `lint + format:check + test`. Po klonie:
`git config core.hooksPath .husky`.

## Jak to działa (w skrócie)

- `src/lib/exact/` — arytmetyka szkolna bez błędów float (`0,1 + 0,2 = 3/10`):
  wymierne na `BigInt`, pierwiastki i π trzymane symbolicznie. Zero `eval`,
  zero ciężkich zależności.
- `src/lib/formulas/` — jeden plik na dział (`math_pp1`, `physics_pr`, …).
  Każdy wzór to wpis z ręcznie rozpisanymi wariantami + test w macierzy
  `latex.test.ts`. Nowy wzór = dopisać wpis, keywords do szukajki i 1–2
  przypadki testowe.
- `src/views/` — `WzornikView` (lista + search), `SolverView` (liczenie),
  `ConverterView`, `HistoriaView`, `SettingsView`.
- `src/components/` — `Formula` (KaTeX), `FormulaDiagram` (SVG),
  `FunctionPlot` (Canvas).

## Deploy

Push na `main` buduje i publikuje na GitHub Pages (workflow `deploy`,
CI na każdym pushu/PR). Fork pod inną ścieżkę? Ustaw `PAGES_BASE`
w workflow — reszta (router, manifest, precache) podąża sama.
Sitemapę (`public/sitemap.xml`) i `robots.txt` trzymamy w repo ręcznie
(statyczny SPA, ~120 URL-i), a test `sitemap.test.ts` pilnuje, żeby każda
zarejestrowana formuła miała w niej wpis — nowy wzór = dopisz URL
do sitemapy.

---

*In short: Polish matura cheat-sheet turned into offline calculators —
type what you know, get exact results step by step. Vue 3 + Vite + PWA.*
