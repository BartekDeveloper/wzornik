<script setup lang="ts">
import NavRail from './components/NavRail.vue'
</script>

<template>
  <div class="shell">
    <NavRail />
    <main class="shell__content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  align-items: stretch;
}

.shell__content {
  flex: 1;
  padding: 3rem clamp(1.25rem, 5vw, 4rem);
  max-width: calc(var(--content-max) + 4rem);
}
</style>
