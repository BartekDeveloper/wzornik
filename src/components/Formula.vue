<script setup lang="ts">
import { computed } from "vue";
import { renderLatex } from "../lib/katex";
import "katex/dist/katex.min.css";

const props = defineProps<{ source: string; display?: boolean }>();

const html = computed(() => renderLatex(props.source, props.display ?? false));
</script>

<template>
  <span class="formula-render" v-html="html"></span>
</template>

<style>
.latex-fallback {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-accent-soft);
  padding: 0.1rem 0.3rem;
  border-radius: var(--radius);
}
</style>
