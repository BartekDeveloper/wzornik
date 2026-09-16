<script setup lang="ts">
import { computed } from 'vue'
import { renderDiagram } from '../lib/diagrams/geometry'

const props = defineProps<{
  formulaId: string
  nums: Record<string, number>
  highlight: string
  caption?: string
}>()

const svg = computed(() => renderDiagram(props.formulaId, props.nums, props.highlight))
</script>

<template>
  <figure v-if="svg" class="diagram">
    <div v-html="svg"></div>
    <figcaption class="diagram__cap">{{ caption ?? 'Rysunek pomocniczy' }}</figcaption>
  </figure>
</template>

<style scoped>
.diagram {
  margin: 1.5rem 0 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1rem 1.25rem 0.75rem;
  max-width: 22rem;
}

.diagram :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.diagram :deep(.e) {
  stroke: var(--color-ink);
  fill: none;
}

.diagram :deep(.es) {
  stroke: var(--color-ink-soft);
  fill: none;
}

.diagram :deep(.dot) {
  fill: var(--color-ink);
}

.diagram :deep(text) {
  fill: var(--color-ink);
}

.diagram :deep(.e.hl) {
  stroke: var(--color-accent);
}

.diagram :deep(text.hl) {
  fill: var(--color-accent);
}

.diagram__cap {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}
</style>
