# Etap 1 — Fundament dokładności Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Silnik dokładności szkolnej (typ `Exact` + jednostki SI MVP) zasilający demo delty na stronie głównej — zero nowych zależności runtime.

**Architecture:** Czysty TS w `src/lib/` bez zależności od Vue. Liczby wymierne na `BigInt` (mianownik > 0, NWD = 1), niewymierności trzymane symbolicznie (`coef·√r`, `coef·π`) do samego końca, przybliżenie dziesiętne tylko do wyświetlania. Solver kwadratowy zwraca pierwiastki dokładne w postaci `u ± w`.

**Tech Stack:** Vue 3 + Vite 5 + TS strict, vitest 2.1.9 (dev only), brak nowych runtime deps (mathjs odrzucony — 600KB+ do precache za zerowy zysk przy ~100 wzorach CKE).

**Spec:** decyzja z brainstormingu 2026-09-16 — wariant A (hybryda), zatwierdzony przez użytkownika.

## Global Constraints

- Zero `eval` — parsing tylko przez `fromString`.
- Brak komentarzy w kodzie (zasada projektu).
- `npm run build` (vue-tsc) musi przejść czysto; testy `npm test` zielone.
- Bundle offline ma nie urosnąć o runtime deps.

---

### Task 1: Liczby wymierne BigInt

**Files:**
- Create: `src/lib/exact/rational.ts`
- Test: `src/lib/exact/rational.test.ts`

**Interfaces:**
- Produces: `Rational {p: bigint, q: bigint}`, `norm/gcd/of/fromString/add/sub/mul/div/neg/cmp/isZero/toNumber`, `ZERO/ONE`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { add, fromString } from './rational'

describe('rational', () => {
  it('adds 0.1 + 0.2 exactly', () => {
    const r = add(fromString('0.1'), fromString('0.2'))
    expect(r).toEqual({ p: 3n, q: 10n })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/exact/rational.test.ts`
Expected: FAIL with "Failed to resolve import".

- [ ] **Step 3: Write minimal implementation** — pełny `rational.ts` (norm z NWD, operacje, parser `"2.5"` / `"1/3"` / `"4"`, zamiana `,` na `.`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/exact/rational.test.ts`
Expected: PASS. Dopisać przypadki: `1/3+1/6=1/2`, `2/4→1/2`, dzielenie przez zero rzuca błąd.

- [ ] **Step 5: Commit**

```bash
git add src/lib/exact/rational.ts src/lib/exact/rational.test.ts
git commit -m "feat: add BigInt rational arithmetic"
```

### Task 2: Typ Exact + solver kwadratowy

**Files:**
- Create: `src/lib/exact/exact.ts`
- Test: `src/lib/exact/exact.test.ts`

**Interfaces:**
- Consumes: `Rational` i operacje z Task 1.
- Produces: `Exact {rat, irr}`, `Irr`, `sqrtRational/addExact/subExact/divRat/approx/bestForm/solveQuadratic`, typ `Quadratic`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { fromString } from './rational'
import { solveQuadratic } from './exact'
import { formatExactText } from './format'

describe('solveQuadratic', () => {
  it('solves x²-5x+6=0 exactly', () => {
    const q = solveQuadratic(fromString('1'), fromString('-5'), fromString('6'))
    expect(q.kind).toBe('two')
    if (q.kind === 'two') {
      expect(formatExactText(q.roots[0])).toBe('2')
      expect(formatExactText(q.roots[1])).toBe('3')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails** — `npx vitest run src/lib/exact/exact.test.ts`, expected FAIL (brak modułu).
- [ ] **Step 3: Write minimal implementation** — `isqrt`, `splitSquareFactor` (wyciąganie czynników kwadratowych, trial division do 1e12), `sqrtRational` (`√(p/q) = √(pq)/q`), `addExact` (tylko zgodne `irr`, inny radicand / sqrt+pi → błąd), `solveQuadratic` (gałęzie `two/one/none/linear`).
- [ ] **Step 4: Run test, expected PASS.** Dopisać: `x²-2=0 → ±√2`, `Δ<0 → none`, `a=0 → linear`.
- [ ] **Step 5: Commit** — `git add src/lib/exact/exact.ts src/lib/exact/exact.test.ts` + commit.

### Task 3: Formatowanie (tekst / LaTeX / dziesiętne)

**Files:**
- Create: `src/lib/exact/format.ts`
- Test: dopisać do `src/lib/exact/exact.test.ts` (wewnątrz Task 2, discreatnie): `formatExactText(2√3) === '2√3'`, `formatLatex` zawiera `\sqrt{3}`, `formatDecimal(1/3, 2) === '0.33'`.

**Interfaces:**
- Consumes: `Exact` z Task 2.
- Produces: `formatExactText/formatLatex/formatDecimal`.

Zasady: współczynnik `1`/`-1` pomijany (`√3`, `−√3`), część wymierna `0` pomijana, ułamkowy współczynnik przy `√` w nawias z `·`, LaTeX przez `\frac`/`\sqrt`/`\pi`, dziesiętne przez zaokrąglenie `toFixed` + trim zer.

### Task 4: Jednostki SI MVP

**Files:**
- Create: `src/lib/units/units.ts`
- Test: `src/lib/units/units.test.ts` (`36 km/h → 10 m/s`, `1 km → 1000 m`, `m + s → błąd wymiaru`).

Tabela: length (`mm/cm/m/km`), mass (`g/kg/t`), time (`s/min/h`), speed (`m/s`, `km/h` = 1/3.6). `convert` sprawdza zgodność wymiaru.

### Task 5: HomeView na nowym silniku + skrypt testowy

**Files:**
- Modify: `src/views/HomeView.vue` (demo delty: Δ dokładnie + dziesiętnie, każdy pierwiastek w 3 formach + badge „do zapisu", selektor miejsc po przecinku, mini-konwerter jednostek).
- Modify: `package.json` (skrypt `"test": "vitest run"`).
- Modify: `README.md` (silnik Exact oznaczony jako gotowy).

Weryfikacja: `npm test` zielone, `npm run build` czysto, `npm run preview` + DevTools Offline działa.
