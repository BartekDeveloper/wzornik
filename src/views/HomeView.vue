<script setup lang="ts">
import { computed, ref } from 'vue'

// Hero is a live worked example rather than a headline + gradient —
// the most characteristic thing in this app's world is "type in numbers,
// watch a formula solve itself." This is the same interaction pattern
// the full Solver engine will generalize to any formula in the wzornik.
const a = ref(1)
const b = ref(-5)
const c = ref(6)

const delta = computed(() => b.value ** 2 - 4 * a.value * c.value)
const hasSolution = computed(() => delta.value >= 0)
const sqrtDelta = computed(() => Math.sqrt(Math.max(delta.value, 0)))
const x1 = computed(() => (-b.value - sqrtDelta.value) / (2 * a.value))
const x2 = computed(() => (-b.value + sqrtDelta.value) / (2 * a.value))

function fmt(n: number) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(2)
}
</script>

<template>
  <section class="hero">
    <h1>Wzornik Maturalny</h1>
    <p class="hero__lede">
      Wzory z tablic CKE i kalkulatory do każdego z nich — działa całkowicie
      offline, prosto z telefonu na maturze w domu.
    </p>

    <div class="demo" aria-label="Przykład: równanie kwadratowe">
      <p class="demo__label">Spróbuj — równanie kwadratowe ax² + bx + c = 0</p>

      <div class="demo__inputs">
        <label>a <input type="number" v-model.number="a" /></label>
        <label>b <input type="number" v-model.number="b" /></label>
        <label>c <input type="number" v-model.number="c" /></label>
      </div>

      <div class="demo__steps">
        <p>Δ = b² − 4ac = {{ fmt(delta) }}</p>
        <template v-if="hasSolution">
          <p>x₁ = (−b − √Δ) / 2a = <span class="result-value">{{ fmt(x1) }}</span></p>
          <p>x₂ = (−b + √Δ) / 2a = <span class="result-value">{{ fmt(x2) }}</span></p>
        </template>
        <p v-else class="demo__no-solution">Δ &lt; 0 — brak rozwiązań rzeczywistych.</p>
      </div>
    </div>

    <p class="hero__next">
      To jeden z ~100 wzorów, które trafią do <router-link :to="{ name: 'wzornik' }">wzornika</router-link>
      — każdy z własnym solverem i rozbiciem na kroki.
    </p>
  </section>
</template>

<style scoped>
.hero__lede {
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
}

.demo {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
  max-width: var(--content-max);
}

.demo__label {
  margin: 0 0 1rem;
  font-size: 0.9375rem;
  color: var(--color-ink-soft);
}

.demo__inputs {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.demo__inputs label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
}

.demo__inputs input {
  width: 4.5rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper);
  color: var(--color-ink);
}

.demo__steps p {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  margin: 0.35rem 0;
}

.demo__steps .result-value {
  color: var(--color-accent);
  font-weight: 500;
}

.demo__no-solution {
  color: var(--color-ink-soft);
}

.hero__next {
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
}
</style>
