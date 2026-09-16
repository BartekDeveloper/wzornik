<script setup lang="ts">
import { computed } from "vue";
import { FORMULAS, SUBJECTS, formulasBySubject } from "../lib/formulas/index";
import Formula from "../components/Formula.vue";

const props = defineProps<{ subject?: string }>();

const subjectLabel = computed(() => SUBJECTS.find((s) => s.id === props.subject)?.label ?? "");

const groups = computed(() => {
  const list = props.subject ? formulasBySubject(props.subject) : FORMULAS;
  const map = new Map<string, typeof list>();
  for (const f of list) {
    const g = map.get(f.topic) ?? [];
    g.push(f);
    map.set(f.topic, g);
  }
  return [...map.entries()];
});
</script>

<template>
  <section>
    <template v-if="!subject">
      <h2>Kalkulatory</h2>
      <p>Wybierz przedmiot, aby zobaczyć dostępne kalkulatory.</p>
      <ul class="subjects">
        <li v-for="s in SUBJECTS" :key="s.id">
          <router-link :to="{ name: 'kalkulatory', params: { subject: s.id } }">{{
            s.label
          }}</router-link>
          <span class="count">({{ formulasBySubject(s.id).length }})</span>
        </li>
      </ul>
    </template>

    <template v-else-if="subjectLabel">
      <h2>Kalkulatory — {{ subjectLabel }}</h2>
      <div v-for="[topic, list] in groups" :key="topic" class="group">
        <h3>{{ topic }}</h3>
        <ul>
          <li v-for="f in list" :key="f.id">
            <router-link :to="{ name: 'solver', params: { subject: f.subject, formula: f.id } }">
              {{ f.name }}
            </router-link>
            <span class="formula-preview"><Formula :source="f.latex" /></span>
          </li>
        </ul>
      </div>
    </template>

    <template v-else>
      <h2>Nie ma takiego przedmiotu</h2>
      <p><router-link :to="{ name: 'kalkulatory' }">Wróć do listy kalkulatorów</router-link></p>
    </template>
  </section>
</template>

<style scoped>
.subjects {
  list-style: none;
  padding: 0;
  font-size: 1.125rem;
}

.subjects li {
  margin: 0.5rem 0;
}

.count {
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
  margin-left: 0.5rem;
}

.group {
  margin-top: 1.5rem;
}

.group ul {
  list-style: none;
  padding: 0;
}

.group li {
  margin: 0.4rem 0;
}

.formula-preview {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}
</style>
