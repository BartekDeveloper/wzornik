<script setup lang="ts">
defineProps<{ subject?: string; formula?: string }>()
</script>

<template>
  <section>
    <h2>Solver — {{ formula }}</h2>
    <p class="stub-note">
      Miejsce na silnik N-zmiennych: wpisujesz znane wartości dla wzoru
      „{{ formula }}” ({{ subject }}), aplikacja rozwiązuje względem
      niewiadomej i pokazuje kroki. Zobacz mini-wersję tego pomysłu
      (równanie kwadratowe) na stronie głównej — to jego docelowe miejsce.
    </p>
  </section>
</template>

<style scoped>
.stub-note {
  color: var(--color-ink-soft);
}
</style>
