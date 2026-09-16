<script setup lang="ts">
import NavRail from "./components/NavRail.vue";
</script>

<template>
  <div class="shell">
    <a class="skip-link" href="#content">Przejdź do treści</a>
    <header class="topbar">
      <router-link to="/" class="topbar__brand">Wzornik Maturalny</router-link>
      <router-link to="/ustawienia" class="topbar__gear" aria-label="Ustawienia">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
          <circle cx="17" cy="8" r="2.2" />
          <circle cx="9" cy="16" r="2.2" />
        </svg>
      </router-link>
    </header>
    <main id="content" class="shell__content" tabindex="-1">
      <router-view />
    </main>
    <NavRail />
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100dvh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  padding-top: env(safe-area-inset-top);
  background: var(--color-paper-raised);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--color-line);
}

.topbar__brand {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--step-1);
  text-decoration: none;
  color: var(--color-ink);
}

.topbar__gear {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: var(--color-ink-soft);
}

.topbar__gear.router-link-active {
  color: var(--color-accent);
}

.topbar__gear svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}

.shell__content {
  flex: 1;
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 1.5rem 1.25rem calc(var(--tabbar-height) + 1.5rem);
}
</style>
