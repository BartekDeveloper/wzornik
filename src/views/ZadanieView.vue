<script setup lang="ts">
import { computed, ref } from "vue";
import { analyzeOmni } from "../lib/omni/omni";
import Formula from "../components/Formula.vue";
import FunctionPlot from "../components/FunctionPlot.vue";
import MathKeyBar from "../components/MathKeyBar.vue";

const raw = ref("");
const places = ref(2);

const omni = computed(() => analyzeOmni(raw.value, places.value));

const examples: { example: string; desc: string }[] = [
  { example: "4x^2-2x+10=0", desc: "równanie kwadratowe" },
  { example: "2x^2-8x+6", desc: "postacie funkcji kwadratowej" },
  { example: "2(x-2)^2-2", desc: "postać kanoniczna" },
  { example: "2(x-1)(x-3)", desc: "postać iloczynowa" },
  { example: "x^2-5x+6>0", desc: "nierówność kwadratowa" },
  { example: "y=2x-4", desc: "funkcja liniowa" },
  { example: "2x+3y=7; x-y=1", desc: "układ dwóch równań" },
  { example: "x^3-6x^2+11x-6", desc: "wielomian 3. stopnia" },
  { example: "(2x+1)/(x-3)", desc: "ułamek homograficzny" },
  { example: "|x-2|=3", desc: "wartość bezwzględna" },
  { example: "2^x=8", desc: "równanie wykładnicze" },
  { example: "log_2(x)=3", desc: "równanie logarytmiczne" },
  { example: "log_2(8)", desc: "wartość logarytmu" },
  { example: "sin(30)", desc: "wartość trygonometryczna" },
  { example: "sin(x)=1/2", desc: "równanie trygonometryczne" },
  { example: "20% z 50", desc: "procent z liczby" },
  { example: "2^10", desc: "potęga" },
  { example: "sqrt(9)", desc: "pierwiastek" },
  { example: "a1=2;r=3;n=5", desc: "ciąg arytmetyczny" },
  { example: "a1=2;q=3;n=4", desc: "ciąg geometryczny" },
  { example: "x/4=6/8", desc: "proporcja (Tales)" },
  { example: "1:50000", desc: "skala mapy" },
];
</script>

<template>
  <section class="zadanie">
    <h2>Kalkulator uniwersalny</h2>
    <p class="hint">
      Wpisz równanie, nierówność albo wyrażenie — wyniki i kroki pojawią się od razu, bez
      przeładowywania.
    </p>
    <textarea
      v-model="raw"
      class="zadanie__input"
      rows="3"
      placeholder="np. 4x^2-2x+10=0 albo 2x+3y=7; x-y=1"
      aria-label="Wpisz zadanie do rozwiązania"
    ></textarea>
    <label class="places">
      miejsca dziesiętne
      <input type="number" v-model.number="places" min="0" max="12" />
    </label>

    <div v-if="omni" class="omni" role="status">
      <p class="omni__title">{{ omni.title }}</p>
      <p v-if="omni.error" class="error" role="alert">{{ omni.error }}</p>

      <div v-for="s in omni.sections" :key="s.title" class="card">
        <h3>{{ s.title }}</h3>
        <p v-for="row in s.rows" :key="row.label" class="card__row">
          <strong>{{ row.label }}</strong>
          <span class="card__tex"><Formula :source="row.tex" /></span>
        </p>
        <p v-if="s.note" class="card__note">{{ s.note }}</p>
      </div>

      <ol v-if="omni.steps.length > 0" class="steps">
        <li v-for="s in omni.steps" :key="s.title">
          <p class="steps__title">{{ s.title }}</p>
          <p class="steps__body"><Formula :source="s.body" /></p>
          <p v-if="s.note" class="steps__note">{{ s.note }}</p>
        </li>
      </ol>

      <div v-if="omni.values.length > 0" class="results" aria-live="polite">
        <p v-for="(r, i) in omni.values" :key="i" class="results__row">
          {{ r.label }} =
          <span class="result-value"><Formula :source="r.tex" /></span>
          <span v-if="!r.approx" class="badge">do zapisu</span>
          <span v-if="r.tex !== r.dec" class="approx">≈ {{ r.dec }}</span>
        </p>
      </div>

      <FunctionPlot v-if="omni.plot" :data="omni.plot" />

      <router-link
        v-if="omni.link"
        class="omni__go"
        :to="{
          name: 'solver',
          params: { subject: omni.link.subject, formula: omni.link.id },
          query: omni.link.query,
        }"
      >
        Otwórz w pełnym kalkulatorze ({{ omni.link.name }}) →
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

  <MathKeyBar fallback="equation" />
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

.places {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
}

.places input {
  width: 4rem;
  font-size: 0.875rem;
  padding: 0.25rem 0.4rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.omni {
  margin-top: 1rem;
}

.omni__title {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
}

.card h3 {
  margin: 0 0 0.35rem;
  font-size: 0.9375rem;
  color: var(--color-ink-soft);
}

.card__row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 0.2rem 0;
  font-size: 0.9375rem;
}

.card__row strong {
  min-width: 6rem;
  font-weight: 500;
}

.card__note {
  margin: 0.35rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.steps__title {
  font-weight: 600;
  margin: 0.6rem 0 0.15rem;
  font-size: 0.9375rem;
}

.steps__body {
  margin: 0;
  font-size: 0.9375rem;
}

.steps__note {
  margin: 0.15rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}

.results {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
}

.results__row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.badge {
  font-size: 0.75rem;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 0 0.5rem;
}

.approx {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.omni__go {
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
