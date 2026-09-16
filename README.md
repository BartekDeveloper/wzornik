# Wzornik Maturalny — szkielet PWA

Szkielet aplikacji: Vite + Vue 3 + TypeScript + vue-router + vite-plugin-pwa.
Zawiera routing, shell z nawigacją przedmiotów, offline caching i jeden
działający mini-kalkulator (delta/równanie kwadratowe) jako dowód koncepcji
dla przyszłego silnika solvera.

## Uruchomienie

```bash
npm install
npm run dev
```

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
- Wzornik i kalkulatory to puste widoki — dane wzorów, silnik solvera
  (mathjs, Fraction/BigNumber dla dokładności), KaTeX i rysunki SVG to
  kolejne etapy, nie ma ich w tym szkielecie.

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
