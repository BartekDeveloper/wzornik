<script setup lang="ts">
import { computed, ref } from 'vue'
import { clearHistory, getFavorites, toggleFavorite } from '../lib/storage/db'
import { applyTheme, loadSettings, saveSettings } from '../lib/settings'
import type { Settings } from '../lib/settings'

const settings = ref<Settings>(loadSettings())
const saved = ref(false)
let timer: number | undefined

function persist(): void {
  saveSettings(settings.value)
  applyTheme(settings.value.theme)
  saved.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    saved.value = false
  }, 1500)
}

async function resetData(): Promise<void> {
  await clearHistory().catch(() => {})
  for (const f of await getFavorites().catch(() => [])) {
    await toggleFavorite(f.key).catch(() => {})
  }
  await persistReload()
}

const dataCleared = ref(false)

async function persistReload(): Promise<void> {
  dataCleared.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    dataCleared.value = false
  }, 2000)
}

const themeLabel = computed(() => (settings.value.theme === 'dark' ? 'Ciemny (domyślny)' : 'Jasny'))
</script>

<template>
  <section>
    <h1>Ustawienia</h1>

    <form @submit.prevent="persist" aria-label="Ustawienia aplikacji">
      <fieldset>
        <legend>Motyw</legend>
        <label>
          <input v-model="settings.theme" type="radio" value="dark" @change="persist" />
          Ciemny (domyślny)
        </label>
        <label>
          <input v-model="settings.theme" type="radio" value="light" @change="persist" />
          Jasny
        </label>
        <p class="current">Aktywny: {{ themeLabel }}</p>
      </fieldset>

      <fieldset>
        <legend>Dokładność</legend>
        <label>
          Miejsca po przecinku
          <input v-model.number="settings.places" type="number" min="0" max="12" @change="persist" />
        </label>
      </fieldset>
    </form>
    <p v-if="saved" class="saved" role="status">Zapisano.</p>

    <h2>Dane na tym urządzeniu</h2>
    <p>Historia obliczeń i ulubione trzymane są lokalnie (IndexedDB).</p>
    <p><button class="danger" @click="resetData">Wyczyść historię i ulubione</button></p>
    <p v-if="dataCleared" class="saved" role="status">Wyczyszczono.</p>
  </section>
</template>

<style scoped>
fieldset {
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  padding: 1rem 1.25rem;
  margin: 0 0 1.25rem;
  max-width: var(--content-max);
}

legend {
  font-family: var(--font-display);
  font-weight: 600;
  padding: 0 0.5rem;
}

label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  font-size: 1rem;
}

input[type='number'] {
  width: 4.5rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper);
  color: var(--color-ink);
}

input[type='radio'] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--color-accent);
}

.current {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
}

.saved {
  color: var(--color-accent);
}

.danger {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  min-height: 44px;
  padding: 0.4rem 1rem;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-accent);
  cursor: pointer;
}
</style>
