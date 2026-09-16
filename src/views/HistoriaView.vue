<script setup lang="ts">
import { onMounted, ref } from "vue";
import { clearHistory, getFavorites, getHistory, toggleFavorite } from "../lib/storage/db";
import type { FavoriteEntry, HistoryEntry } from "../lib/storage/db";
import Formula from "../components/Formula.vue";

const history = ref<HistoryEntry[]>([]);
const favorites = ref<FavoriteEntry[]>([]);

async function reload(): Promise<void> {
  try {
    history.value = await getHistory(30);
  } catch {
    history.value = [];
  }
  try {
    favorites.value = await getFavorites();
  } catch {
    favorites.value = [];
  }
}

async function clear(): Promise<void> {
  await clearHistory().catch(() => {});
  await reload();
}

async function unfav(key: string): Promise<void> {
  await toggleFavorite(key).catch(() => {});
  await reload();
}

function favParts(key: string): { subject: string; formula: string } {
  const [subject, formula] = key.split("/");
  return { subject: subject ?? "", formula: formula ?? "" };
}

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short" });
}

function fmtInputs(inputs: Record<string, string>): string {
  return Object.entries(inputs)
    .filter(([, v]) => v.trim() !== "")
    .map(([k, v]) => `${k} = ${v}`)
    .join(", ");
}

onMounted(() => {
  void reload();
});
</script>

<template>
  <section>
    <h2>Moje</h2>

    <h3>Ulubione wzory</h3>
    <ul v-if="favorites.length > 0" class="favs">
      <li v-for="f in favorites" :key="f.key">
        <router-link :to="{ name: 'solver', params: favParts(f.key) }">{{ f.key }}</router-link>
        <button class="mini" @click="unfav(f.key)" aria-label="Usuń z ulubionych">usuń</button>
      </li>
    </ul>
    <p v-else class="empty">Brak ulubionych — dodaj je gwiazdką w widoku solvera.</p>

    <h3>Historia obliczeń</h3>
    <div v-if="history.length > 0">
      <p><button class="mini" @click="clear">wyczyść historię</button></p>
      <ul class="cards">
        <li v-for="h in history" :key="h.id">
          <p class="cards__meta">
            <router-link
              :to="{ name: 'solver', params: { subject: h.subject, formula: h.formulaId } }"
            >
              {{ h.formulaName }}
            </router-link>
            · {{ fmtDate(h.ts) }}
          </p>
          <p class="cards__inputs">{{ fmtInputs(h.inputs) }}</p>
          <p class="cards__result"><Formula :source="h.result" /></p>
        </li>
      </ul>
    </div>
    <p v-else class="empty">Brak zapisanych obliczeń — rozwiąż coś w kalkulatorze.</p>
  </section>
</template>

<style scoped>
.favs {
  list-style: none;
  padding: 0;
}

.favs li {
  margin: 0.4rem 0;
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
}

.mini {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink-soft);
  cursor: pointer;
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

.cards__meta {
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
}

.cards__inputs {
  margin: 0.25rem 0;
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.cards__result {
  margin: 0.5rem 0 0;
  font-size: 1.0625rem;
  color: var(--color-accent);
}

.empty {
  color: var(--color-ink-soft);
}
</style>
