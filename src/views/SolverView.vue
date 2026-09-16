<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { getFormula } from '../lib/formulas/index'
import { solveFormula } from '../lib/solver/solver'
import { formatDecimal, formatLatex } from '../lib/exact/format'
import { isApproxOnly } from '../lib/exact/exact'
import Formula from '../components/Formula.vue'

const props = defineProps<{ subject?: string; formula?: string }>()

const def = computed(() => (props.subject && props.formula ? getFormula(props.subject, props.formula) : undefined))

const inputs = reactive<Record<string, string>>({})
const places = ref(2)

watch(
  def,
  (d) => {
    for (const k of Object.keys(inputs)) delete inputs[k]
    if (d) for (const v of d.vars) inputs[v.id] = ''
  },
  { immediate: true },
)

const hasAnyInput = computed(() => Object.values(inputs).some((s) => s.trim() !== ''))

const view = computed(() => {
  const d = def.value
  if (!d) return { state: 'missing' as const }
  const r = solveFormula(d, { ...inputs }, places.value)
  if (!r.ok) {
    return { state: 'idle' as const, error: hasAnyInput.value ? r.error : '', hint: !hasAnyInput.value }
  }
  return {
    state: 'done' as const,
    unknownLabel: r.unknownLabel,
    values: r.values.map((v) => ({
      tex: formatLatex(v),
      dec: formatDecimal(v, places.value),
      approx: isApproxOnly(v),
    })),
    steps: r.steps,
  }
})
</script>

<template>
  <section v-if="def">
    <p class="topic">{{ def.subject === 'matematyka' ? 'Matematyka' : 'Fizyka' }} · {{ def.topic }}</p>
    <h2>{{ def.name }}</h2>
    <p class="formula"><Formula :source="def.latex" /></p>

    <div class="solver">
      <div class="solver__inputs">
        <label v-for="v in def.vars" :key="v.id">
          {{ v.label }}<span v-if="v.unit" class="unit"> [{{ v.unit }}]</span>
          <input v-model="inputs[v.id]" inputmode="decimal" :placeholder="def.mode === 'nvar' ? 'niewiadoma?' : ''" />
        </label>
        <label>
          miejsca
          <input type="number" v-model.number="places" min="0" max="12" />
        </label>
      </div>
      <p class="hint" v-if="def.mode === 'nvar'">Zostaw jedno pole puste — to będzie niewiadoma. Możesz wpisać π, np. 25π.</p>

      <div v-if="view.state === 'idle'">
        <p v-if="view.hint" class="hint">Uzupełnij dane powyżej, a kroki pojawią się same.</p>
        <p v-else class="error">{{ view.error }}</p>
      </div>

      <ol v-if="view.state === 'done'" class="steps">
        <li v-for="s in view.steps" :key="s.title">
          <p class="steps__title">{{ s.title }}</p>
          <p class="steps__body"><Formula :source="s.body" /></p>
          <p v-if="s.note" class="steps__note">{{ s.note }}</p>
        </li>
      </ol>

      <div v-if="view.state === 'done'" class="results">
        <p v-for="(r, i) in view.values" :key="i" class="results__row">
          {{ view.values.length > 1 ? `x${i + 1}` : view.unknownLabel }} =
          <span class="result-value"><Formula :source="r.tex" /></span>
          <span v-if="!r.approx" class="badge">do zapisu</span>
          <span v-if="r.tex !== r.dec" class="approx">≈ {{ r.dec }}</span>
        </p>
      </div>
    </div>

    <p class="back">
      <router-link :to="{ name: 'kalkulatory', params: { subject: def.subject } }">← wszystkie kalkulatory</router-link>
    </p>
  </section>

  <section v-else>
    <h2>Nie ma takiego kalkulatora</h2>
    <p><router-link :to="{ name: 'kalkulatory' }">Wróć do listy kalkulatorów</router-link></p>
  </section>
</template>

<style scoped>
.topic {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
}

.formula {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  max-width: var(--content-max);
  font-size: 1.125rem;
}

.solver {
  margin-top: 1.5rem;
  max-width: var(--content-max);
}

.solver__inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-bottom: 0.5rem;
}

.solver__inputs label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
}

.solver__inputs input {
  width: 6rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.unit {
  color: var(--color-ink-soft);
}

.hint {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.error {
  color: var(--color-accent);
  font-size: 0.9375rem;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
}

.steps li + li {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-line);
}

.steps__title {
  margin: 0 0 0.25rem;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-ink-soft);
}

.steps__body {
  margin: 0;
  font-size: 1.0625rem;
}

.steps__note {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
}

.results__row {
  font-family: var(--font-mono);
}

.result-value {
  color: var(--color-accent);
  font-weight: 500;
  font-size: 1.0625rem;
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

.back {
  margin-top: 2rem;
  font-size: 0.9375rem;
}
</style>
