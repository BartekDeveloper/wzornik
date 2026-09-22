<script setup lang="ts">
import { computed, ref } from "vue";
import { getFormula } from "../lib/formulas/index";
import { looksLikeEquation, parseEquation } from "../lib/parse-formula";

const raw = ref("");

const parsed = computed(() => {
  if (!looksLikeEquation(raw.value)) return null;
  return parseEquation(raw.value.trim());
});

const targetName = computed(() => {
  const p = parsed.value;
  if (!p) return "";
  return getFormula(p.subject, p.id)?.name ?? p.label;
});

const examples: { example: string; desc: string }[] = [
  { example: "4x^2-2x+10=0", desc: "równanie kwadratowe" },
  { example: "2x+3y=7; x-y=1", desc: "układ dwóch równań" },
  { example: "x^2-5x+6>0", desc: "nierówność kwadratowa" },
  { example: "2^x=8", desc: "równanie wykładnicze" },
  { example: "log_2(x)=3", desc: "równanie logarytmiczne" },
  { example: "20% z 50", desc: "procent z liczby" },
  { example: "2^10", desc: "potęga" },
  { example: "sqrt(9)", desc: "pierwiastek" },
  { example: "a1=2;r=3;n=5", desc: "ciąg arytmetyczny" },
  { example: "a1=2;q=3;n=4", desc: "ciąg geometryczny" },
  { example: "x/4=6/8", desc: "proporcja (Tales)" },
  { example: "x^3-6x^2+11x-6=0", desc: "rozkład wielomianu" },
  { example: "|x-2|=3", desc: "wartość bezwzględna" },
  { example: "2(x-1)^2+3", desc: "postacie funkcji kwadratowej" },
  { example: "log(x)=2", desc: "logarytm dziesiętny" },
  { example: "1:50000", desc: "skala mapy" },
  { example: "ms=5;mr=100", desc: "stężenie procentowe" },
];
</script>

<template>
  <section class="zadanie">
    <h2>Wklej zadanie</h2>
    <p class="hint">
      Wklej treść obliczeniową (równanie, procent, proporcję…), a wzornik podstawi ją do właściwego
      wzoru.
    </p>
    <textarea
      v-model="raw"
      class="zadanie__input"
      rows="3"
      placeholder="np. 4x^2-2x+10=0 albo 2x+3y=7; x-y=1"
      aria-label="Wklej zadanie do rozpoznania"
    ></textarea>

    <div v-if="parsed" class="found" role="status">
      <p>
        Rozpoznano: <strong>{{ parsed.label }}</strong> → wzór „{{ targetName }}”.
      </p>
      <ul v-if="Object.keys(parsed.values).length > 0" class="found__vals">
        <li v-for="(v, k) in parsed.values" :key="k">{{ k }} = {{ v }}</li>
      </ul>
      <router-link
        class="found__go"
        :to="{
          name: 'solver',
          params: { subject: parsed.subject, formula: parsed.id },
          query: { fill: raw.trim() },
        }"
      >
        Podstaw do wzoru →
      </router-link>
    </div>
    <p v-else-if="raw.trim() !== ''" class="error" role="alert">
      Nie rozpoznano zapisu — wybierz przykład z listy poniżej.
    </p>

    <h3 class="examples__title">Wspierane zapisy</h3>
    <ul class="examples">
      <li v-for="e in examples" :key="e.example">
        <button class="examples__btn" @click="raw = e.example">
          <code>{{ e.example }}</code>
          <span>{{ e.desc }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.zadanie {
  max-width: var(--content-max);
}

.hint {
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
}

.zadanie__input {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
  margin-top: 0.5rem;
}

.found {
  margin-top: 1rem;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.found__vals {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  font-family: var(--font-mono);
}

.found__go {
  display: inline-block;
  margin-top: 0.5rem;
  min-height: 44px;
  line-height: 44px;
  color: var(--color-accent);
  font-weight: 500;
}

.error {
  color: var(--color-accent);
  font-size: 0.9375rem;
}

.examples__title {
  margin-top: 2rem;
  font-size: 1rem;
}

.examples {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: grid;
  gap: 0.5rem;
}

.examples__btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  padding: 0.5rem 0.75rem;
  min-height: 44px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
  cursor: pointer;
  text-align: left;
}

.examples__btn code {
  font-family: var(--font-mono);
}

.examples__btn span {
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
}
</style>
