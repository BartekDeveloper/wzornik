# Wzornik Maturalny — szkielet PWA

Szkielet aplikacji: Vite + Vue 3 + TypeScript + vue-router + vite-plugin-pwa.
Zawiera routing, shell z nawigacją przedmiotów, offline caching i jeden
działający mini-kalkulator (delta/równanie kwadratowe) jako dowód koncepcji
dla przyszłego silnika solvera.

## Uruchomienie

```bash
npm install
npm run dev
npm test        # 17 testów silnika Exact + jednostek (vitest)
```

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

## Co NIE jest jeszcze zrobione (świadomie, zgodnie z ustaloną kolejnością)

- **Fonty ładowane z Google Fonts CDN** (`index.html`) — działają offline
  dopiero *po* pierwszym udanym pobraniu, bo cache'ują się dopiero w runtime.
  Przed pierwszym wdrożeniem produkcyjnym: pobrać `.woff2` i dołączyć jako
  pliki statyczne w `public/fonts/`, podmienić `@font-face` w
  `main.css`, dodać do `globPatterns` w `vite.config.ts`. Inaczej pierwsza
  wizyta bez internetu wyświetli fallbacki systemowe zamiast Spectral/Plex.
- **Ikony PWA są placeholderami** (SVG z „Δ”) — do podmiany na docelowe
  PNG/maskable przed publikacją (wymóg niektórych przeglądarek/Android).
- Wzornik i kalkulatory to puste widoki — dane wzorów CKE, KaTeX i rysunki
  SVG to kolejne etapy. Silnik solvera (liczby wymierne, pierwiastki
  symboliczne, jednostki) jest gotowy i przetestowany — strona główna
  pokazuje go na przykładzie delty.

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
