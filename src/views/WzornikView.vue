<script setup lang="ts">
import { computed, ref } from 'vue'
import { FORMULAS, SUBJECTS } from '../lib/formulas/index'
import Formula from '../components/Formula.vue'

const props = defineProps<{ subject?: string }>()

const query = ref('')

const subjectLabel = computed(() => SUBJECTS.find((s) => s.id === props.subject)?.label ?? '')

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  return FORMULAS.filter((f) => {
    if (props.subject && f.subject !== props.subject) return false
    if (q === '') return true
    return `${f.name} ${f.topic} ${f.latex} ${f.id}`.toLowerCase().includes(q)
  })
})
</script>

<template>
  <section>
    <h2>Wzornik{{ subjectLabel ? ` — ${subjectLabel}` : '' }}</h2>
    <p v-if="!subject">
      Wybierz przedmiot z menu po lewej albo szukaj po wszystkich wzorach —
      np. „delta", „koło" albo „energia".
    </p>
    <input
      v-model="query"
      class="search"
      type="search"
      placeholder='Szukaj wzoru, np. „delta"'
      aria-label="Szukaj wzoru"
    />
    <ul class="cards">
      <li v-for="f in results" :key="`${f.subject}/${f.id}`">
        <p class="cards__topic">{{ f.subject === 'matematyka' ? 'Matematyka' : 'Fizyka' }} · {{ f.topic }}</p>
        <router-link :to="{ name: 'solver', params: { subject: f.subject, formula: f.id } }">
          {{ f.name }}
        </router-link>
        <p class="cards__formula"><Formula :source="f.latex" /></p>
      </li>
    </ul>
    <p v-if="results.length === 0" class="empty">Brak wzorów dla tej frazy.</p>
  </section>
</template>

<style scoped>
.search {
  width: 100%;
  max-width: 28rem;
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
  margin: 1rem 0 1.5rem;
}

.cards {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  max-width: var(--content-max);
}

.cards li {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.cards__topic {
  margin: 0 0 0.25rem;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}

.cards__formula {
  margin: 0.5rem 0 0;
  font-size: 1.0625rem;
}

.empty {
  color: var(--color-ink-soft);
}
</style>
