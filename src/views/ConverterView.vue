<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CATEGORIES, convert, unitsOf } from '../lib/units/units'
import type { Category } from '../lib/units/units'
import { trimNum } from '../lib/exact/format'

const cat = ref<Category>('speed')
const leftVal = ref('36')
const rightVal = ref('')
const leftUnit = ref('km/h')
const rightUnit = ref('m/s')
const lastEdited = ref<'left' | 'right'>('left')
const error = ref('')

const units = computed(() => unitsOf(cat.value))

function parseNum(s: string): number | null {
  const t = s.trim().replace(',', '.')
  if (t === '') return null
  const v = Number(t)
  return Number.isFinite(v) ? v : null
}

function convertLeft(): void {
  error.value = ''
  const v = parseNum(leftVal.value)
  if (v === null) {
    rightVal.value = ''
    return
  }
  try {
    rightVal.value = trimNum(convert(v, leftUnit.value, rightUnit.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Błąd'
  }
}

function convertRight(): void {
  error.value = ''
  const v = parseNum(rightVal.value)
  if (v === null) {
    leftVal.value = ''
    return
  }
  try {
    leftVal.value = trimNum(convert(v, rightUnit.value, leftUnit.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Błąd'
  }
}

function swap(): void {
  const uv = leftUnit.value
  leftUnit.value = rightUnit.value
  rightUnit.value = uv
  const vv = leftVal.value
  leftVal.value = rightVal.value
  rightVal.value = vv
}

watch(cat, () => {
  const u = unitsOf(cat.value)
  leftUnit.value = u[0] ?? ''
  rightUnit.value = u[1] ?? u[0] ?? ''
  lastEdited.value = 'left'
  convertLeft()
})

watch([leftVal, leftUnit, rightUnit], () => {
  if (lastEdited.value === 'left') convertLeft()
})

watch([rightVal], () => {
  if (lastEdited.value === 'right') convertRight()
})

convertLeft()
</script>

<template>
  <section>
    <h1>Konwerter jednostek</h1>
    <p>Działa offline. Najpierw wybierz kategorię, potem jednostki pod liczbami. Strzałka zamienia strony.</p>

    <label class="cat">
      Kategoria
      <select v-model="cat" aria-label="Kategoria jednostek">
        <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.label }}</option>
      </select>
    </label>

    <div class="row">
      <div class="cell">
        <input
          v-model="leftVal"
          inputmode="decimal"
          aria-label="Wartość źródłowa"
          @focus="lastEdited = 'left'"
        />
        <select v-model="leftUnit" aria-label="Jednostka źródłowa">
          <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
        </select>
      </div>

      <button class="swap" aria-label="Zamień jednostki miejscami" @click="swap">⇄</button>

      <div class="cell">
        <input
          v-model="rightVal"
          inputmode="decimal"
          aria-label="Wartość docelowa"
          @focus="lastEdited = 'right'"
        />
        <select v-model="rightUnit" aria-label="Jednostka docelowa">
          <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
        </select>
      </div>
    </div>

    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </section>
</template>

<style scoped>
.cat {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  margin: 1rem 0 1.5rem;
}

.cat select {
  font-size: 1rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: var(--content-max);
}

.cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cell input,
.cell select {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.swap {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  font-size: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-accent);
  cursor: pointer;
}

.error {
  color: var(--color-accent);
}
</style>
