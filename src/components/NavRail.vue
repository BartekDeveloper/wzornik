<script setup lang="ts">
const quick = [
  {
    to: '/',
    label: 'Wzory',
    icon: 'M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14'
  },
  {
    to: '/konwerter',
    label: 'Miary',
    icon: 'M4 7h13l-3.5-3.5M20 17H7l3.5 3.5'
  },
  {
    to: '/historia',
    label: 'Moje',
    icon: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1L3.2 9.5l6.1-.9z'
  }
]
</script>

<template>
  <nav class="rail" aria-label="Nawigacja główna">
    <div class="rail__quick" role="list">
      <router-link
        v-for="q in quick"
        :key="q.to"
        :to="q.to"
        class="rail__tab"
        role="listitem"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" class="rail__icon">
          <path :d="q.icon" />
        </svg>
        <span>{{ q.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.rail {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: var(--color-paper-raised);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid var(--color-line);
  padding: 0.25rem 0.5rem calc(0.25rem + env(safe-area-inset-bottom));
}

.rail__quick {
  display: flex;
  justify-content: space-around;
  max-width: var(--content-max);
  margin: 0 auto;
}

.rail__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  min-height: 52px;
  min-width: 72px;
  justify-content: center;
  text-decoration: none;
  color: var(--color-ink-soft);
  font-size: 0.75rem;
  border-radius: var(--radius-sm);
}

.rail__icon {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rail__tab.router-link-exact-active {
  color: var(--color-accent);
  font-weight: 500;
}
</style>
