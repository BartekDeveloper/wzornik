<script setup lang="ts">
defineProps<{ subject?: string }>()
</script>

<template>
  <section>
    <h2>Kalkulatory{{ subject ? ` — ${subject}` : '' }}</h2>
    <p v-if="!subject">
      Wybierz przedmiot z menu po lewej, aby zobaczyć dostępne kalkulatory.
    </p>
    <p v-else>
      Tu trafi lista kalkulatorów (solverów N-zmiennych) dla przedmiotu
      „{{ subject }}”. Każdy prowadzi do widoku solvera z krokami.
    </p>
  </section>
</template>
