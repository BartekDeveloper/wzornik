<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { FORMULAS, SUBJECTS } from "../lib/formulas/index";
import type { FormulaDef } from "../lib/formulas/types";
import { searchFormulas } from "../lib/search/search";
import { getFavorites, toggleFavorite } from "../lib/storage/db";
import Formula from "../components/Formula.vue";

const props = defineProps<{ subject?: string }>();

const query = ref("");
const filter = ref("");

const availableSubjects = computed(() =>
  SUBJECTS.filter((s) => FORMULAS.some((f) => f.subject === s.id)),
);

const activeSubject = computed(() => (filter.value !== "" ? filter.value : props.subject));

const results = computed(() => searchFormulas(query.value, activeSubject.value || undefined));

const favs = ref<Set<string>>(new Set());

function keyOf(f: FormulaDef): string {
  return `${f.subject}/${f.id}`;
}

async function refreshFavs(): Promise<void> {
  const list = await getFavorites().catch(() => []);
  favs.value = new Set(list.map((f) => f.key));
}

async function toggleFav(f: FormulaDef): Promise<void> {
  await toggleFavorite(keyOf(f)).catch(() => {});
  await refreshFavs();
}

onMounted(() => {
  void refreshFavs();
});
</script>

<template>
  <section>
    <h1>Wzornik</h1>
    <p>
      Wszystkie wzory w jednym miejscu. Wpisz np. „delta", „koło" albo „energia" — trafisz prosto we
      wzór z linkiem do kalkulatora.
    </p>
    <input
      v-model="query"
      class="search"
      type="search"
      placeholder='Szukaj wzoru, np. „delta"'
      aria-label="Szukaj wzoru w całym wzorniku"
    />
    <div class="filters" role="group" aria-label="Filtr przedmiotu">
      <button
        :class="{ active: !activeSubject }"
        :aria-pressed="!activeSubject"
        @click="filter = ''"
      >
        Wszystkie
      </button>
      <button
        v-for="s in availableSubjects"
        :key="s.id"
        :class="{ active: activeSubject === s.id }"
        :aria-pressed="activeSubject === s.id"
        @click="filter = s.id"
      >
        {{ s.label }}
      </button>
    </div>
    <ul class="cards">
      <li v-for="f in results" :key="`${f.subject}/${f.id}`">
        <div class="cards__top">
          <p class="cards__topic">
            {{ f.subject === "matematyka" ? "Matematyka" : "Fizyka" }} · {{ f.topic }}
          </p>
          <button
            class="heart"
            :class="{ active: favs.has(`${f.subject}/${f.id}`) }"
            :aria-pressed="favs.has(`${f.subject}/${f.id}`)"
            :aria-label="
              favs.has(`${f.subject}/${f.id}`)
                ? `Usuń ${f.name} z ulubionych`
                : `Dodaj ${f.name} do ulubionych`
            "
            @click="toggleFav(f)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2z"
              />
            </svg>
          </button>
        </div>
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
  position: sticky;
  top: calc(var(--topbar-height) + 0.5rem);
  z-index: 10;
  width: 100%;
  max-width: 28rem;
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  background: var(--color-paper-raised);
  color: var(--color-ink);
  margin: 1rem 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters button {
  font-family: var(--font-body);
  font-size: 0.875rem;
  min-height: 44px;
  padding: 0.3rem 0.9rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink-soft);
  cursor: pointer;
}

.filters button.active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.cards {
  list-style: none;
  padding: 0.25rem;
  margin: 0;
  display: grid;
  gap: 1rem;
  max-width: var(--content-max);
  max-height: 62dvh;
  overflow-y: auto;
}

.cards li {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.cards__topic {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}

.cards__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.heart {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: -0.5rem -0.5rem 0 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-ink-soft);
}

.heart svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linejoin: round;
}

.heart.active {
  color: var(--color-accent);
}

.heart.active svg {
  fill: currentColor;
}

.cards__formula {
  margin: 0.5rem 0 0;
  font-size: 1.0625rem;
}

.empty {
  color: var(--color-ink-soft);
}
</style>
