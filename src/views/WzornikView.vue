<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FORMULAS, SUBJECTS } from "../lib/formulas/index";
import type { FormulaDef } from "../lib/formulas/types";
import { searchFormulas } from "../lib/search/search";
import { getFavorites, toggleFavorite } from "../lib/storage/db";
import { looksLikeEquation, parseEquation, parseLabel } from "../lib/parse-formula";
import type { ParsedEquation } from "../lib/parse-formula";
import { computeVirtualRange } from "../lib/virtual/virtual";
import Formula from "../components/Formula.vue";

const props = defineProps<{ subject?: string }>();

const query = ref("");
const filter = ref("");

const SUBJECT_LABELS: Record<string, string> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s.label]),
);

const CARD_GAP = 16;
const CARD_OVERSCAN = 8;
const CARD_DEFAULT_HEIGHT = 116;

const availableSubjects = computed(() =>
  SUBJECTS.filter((s) => FORMULAS.some((f) => f.subject === s.id)),
);

const activeSubject = computed(() => (filter.value !== "" ? filter.value : props.subject));

const results = computed(() => searchFormulas(query.value, activeSubject.value || undefined));

const listEl = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const viewportH = ref(600);
const measured = ref<Record<string, number>>({});

const offsets = computed(() => {
  const rs = results.value;
  const o: number[] = [0];
  for (let i = 0; i < rs.length; i++) {
    o.push(o[i]! + (measured.value[keyOf(rs[i]!)] ?? CARD_DEFAULT_HEIGHT) + CARD_GAP);
  }
  return o;
});

const vrange = computed(() =>
  computeVirtualRange(
    results.value.length,
    scrollTop.value,
    viewportH.value,
    offsets.value,
    CARD_OVERSCAN,
  ),
);

const visible = computed(() => results.value.slice(vrange.value.start, vrange.value.end));

const recognized = computed<ParsedEquation | null>(() => {
  if (!looksLikeEquation(query.value)) return null;
  return parseEquation(query.value);
});

const favs = ref<Set<string>>(new Set());

function keyOf(f: FormulaDef): string {
  return `${f.subject}/${f.id}`;
}

function setCardRef(key: string, el: unknown): void {
  if (!(el instanceof HTMLElement)) return;
  const h = el.offsetHeight;
  if (h > 0 && measured.value[key] !== h) measured.value[key] = h;
}

function onScroll(): void {
  const el = listEl.value;
  if (!el) return;
  viewportH.value = el.clientHeight;
  scrollTop.value = el.scrollTop;
}

async function refreshFavs(): Promise<void> {
  const list = await getFavorites().catch(() => []);
  favs.value = new Set(list.map((f) => f.key));
}

async function toggleFav(f: FormulaDef): Promise<void> {
  await toggleFavorite(keyOf(f)).catch(() => {});
  await refreshFavs();
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  void refreshFavs();
  const el = listEl.value;
  if (el) {
    viewportH.value = el.clientHeight;
    resizeObserver = new ResizeObserver(() => {
      viewportH.value = el.clientHeight;
    });
    resizeObserver.observe(el);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});

onActivated(() => {
  const el = listEl.value;
  if (el) {
    viewportH.value = el.clientHeight;
    scrollTop.value = el.scrollTop;
  }
});

watch([query, filter, activeSubject], () => {
  const el = listEl.value;
  if (el) el.scrollTop = 0;
  scrollTop.value = 0;
});
</script>

<template>
  <section class="wzornik">
    <h1 class="sr-only">Wzornik</h1>
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
    <div v-if="recognized" class="found" role="status">
      <p>
        Rozpoznano zadanie — to
        <strong>{{ recognized ? parseLabel(recognized.id) : "" }}</strong
        >.
      </p>
      <router-link
        class="found__go"
        :to="{
          name: 'solver',
          params: { subject: recognized.subject, formula: recognized.id },
          query: { fill: query.trim() },
        }"
      >
        Rozwiąż z automatu →
      </router-link>
    </div>
    <ul
      ref="listEl"
      class="cards"
      @scroll.passive="onScroll"
      :style="{
        paddingTop: `calc(0.25rem + ${vrange.padTop}px)`,
        paddingBottom: `calc(2rem + ${vrange.padBottom}px)`,
      }"
    >
      <li v-for="f in visible" :key="keyOf(f)" :ref="(el) => setCardRef(keyOf(f), el)">
        <div class="cards__top">
          <p class="cards__topic">{{ SUBJECT_LABELS[f.subject] ?? f.subject }} · {{ f.topic }}</p>
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
.wzornik {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - var(--topbar-height) - var(--tabbar-height) - 3rem);
}

.search {
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

.found {
  max-width: var(--content-max);
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius);
}

.found p {
  margin: 0 0 0.5rem;
}

.found__go {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 500;
  color: var(--color-accent);
}

.cards {
  list-style: none;
  padding: 0.25rem 0.25rem 2rem;
  margin: 0;
  display: grid;
  gap: 1rem;
  align-content: start;
  max-width: var(--content-max);
  flex: 1;
  min-height: 0;
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
