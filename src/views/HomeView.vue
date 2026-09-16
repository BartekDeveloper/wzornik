<script setup lang="ts">
import { computed, ref } from "vue";
import { ZERO, fromString } from "../lib/exact/rational";
import type { Rational } from "../lib/exact/rational";
import { solveQuadratic } from "../lib/exact/exact";
import type { Quadratic } from "../lib/exact/exact";
import { formatDecimal, formatExactText } from "../lib/exact/format";
import { convert } from "../lib/units/units";
import { loadSettings } from "../lib/settings";

const aIn = ref(1);
const bIn = ref(-5);
const cIn = ref(6);
const places = ref(loadSettings().places);

function rat(v: number): Rational {
  if (!Number.isFinite(v)) return ZERO;
  return fromString(String(v));
}

const result = computed<{ solution: Quadratic | null; error: string }>(() => {
  try {
    return { solution: solveQuadratic(rat(aIn.value), rat(bIn.value), rat(cIn.value)), error: "" };
  } catch (e) {
    return { solution: null, error: e instanceof Error ? e.message : "Błąd obliczeń" };
  }
});

const deltaExact = computed(() => {
  const s = result.value.solution;
  if (!s || !("delta" in s)) return "—";
  return formatExactText(s.delta);
});

const deltaDec = computed(() => {
  const s = result.value.solution;
  if (!s || !("delta" in s)) return "";
  return formatDecimal(s.delta, places.value);
});

const roots = computed(() => {
  const s = result.value.solution;
  if (!s) return [];
  return s.roots.map((r, i) => ({
    name: s.roots.length > 1 ? `x${i + 1}` : "x",
    exact: formatExactText(r),
    dec: formatDecimal(r, places.value),
  }));
});

const convValue = ref(36);
const convFrom = ref("km/h");
const convTo = ref("m/s");
const unitOptions = ["mm", "cm", "m", "km", "g", "kg", "t", "s", "min", "h", "m/s", "km/h"];

const convResult = computed(() => {
  if (!Number.isFinite(convValue.value)) return "—";
  try {
    return `${Number(convert(convValue.value, convFrom.value, convTo.value).toFixed(6))} ${convTo.value}`;
  } catch (e) {
    return e instanceof Error ? e.message : "Błąd";
  }
});
</script>

<template>
  <section class="hero">
    <h1>Wzornik Maturalny</h1>
    <p class="hero__lede">
      Wzory z tablic CKE i kalkulatory do każdego z nich — działa całkowicie offline, prosto z
      telefonu na maturze w domu.
    </p>

    <div class="demo" aria-label="Przykład: równanie kwadratowe">
      <p class="demo__label">Spróbuj — równanie kwadratowe ax² + bx + c = 0</p>

      <div class="demo__inputs">
        <label>a <input type="number" v-model.number="aIn" /></label>
        <label>b <input type="number" v-model.number="bIn" /></label>
        <label>c <input type="number" v-model.number="cIn" /></label>
        <label>miejsca <input type="number" v-model.number="places" min="0" max="12" /></label>
      </div>

      <div class="demo__steps" v-if="result.solution">
        <p>
          Δ = b² − 4ac = {{ deltaExact }}<span v-if="deltaDec"> ≈ {{ deltaDec }}</span>
        </p>
        <template v-for="r in roots" :key="r.name">
          <p>
            {{ r.name }} = <span class="result-value">{{ r.exact }}</span>
            <span class="badge">do zapisu</span>
            <span class="approx">≈ {{ r.dec }}</span>
          </p>
        </template>
        <p v-if="result.solution.kind === 'none'" class="demo__no-solution">
          Δ &lt; 0 — brak rozwiązań rzeczywistych.
        </p>
        <p v-if="result.solution.kind === 'linear'" class="demo__note">
          a = 0 — to równanie liniowe, nie kwadratowe.
        </p>
      </div>
      <p v-else class="demo__no-solution">{{ result.error }}</p>
    </div>

    <div class="demo" aria-label="Przykład: konwerter jednostek">
      <p class="demo__label">Konwerter jednostek (fizyka): prędkość, długość, masa, czas</p>
      <div class="demo__inputs">
        <label><input type="number" v-model.number="convValue" /></label>
        <label>
          <select v-model="convFrom">
            <option v-for="u in unitOptions" :key="u" :value="u">{{ u }}</option>
          </select>
        </label>
        <span aria-hidden="true">→</span>
        <label>
          <select v-model="convTo">
            <option v-for="u in unitOptions" :key="u" :value="u">{{ u }}</option>
          </select>
        </label>
      </div>
      <div class="demo__steps">
        <p>
          = <span class="result-value">{{ convResult }}</span>
        </p>
      </div>
    </div>

    <p class="hero__next">
      To jeden z ~100 wzorów, które trafią do
      <router-link :to="{ name: 'wzornik' }">wzornika</router-link>
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
  flex-wrap: wrap;
  align-items: center;
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

.demo__inputs input,
.demo__inputs select {
  width: 4.5rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper);
  color: var(--color-ink);
}

.demo__inputs select {
  width: auto;
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

.demo__note {
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
}

.badge {
  display: inline-block;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius);
  padding: 0.05rem 0.35rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.approx {
  color: var(--color-ink-soft);
  margin-left: 0.5rem;
}

.hero__next {
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
}
</style>
