<script setup lang="ts">
const subjects = [
  { slug: 'matematyka', label: 'Matematyka', accent: 'var(--subject-math)' },
  { slug: 'fizyka', label: 'Fizyka', accent: 'var(--subject-physics)' },
  { slug: 'chemia', label: 'Chemia', accent: 'var(--subject-chemistry)' },
  { slug: 'geografia', label: 'Geografia', accent: 'var(--subject-geography)' }
]
</script>

<template>
  <nav class="rail" aria-label="Przedmioty">
    <router-link to="/" class="rail__brand">Wzornik<br />Maturalny</router-link>

    <div class="rail__group">
      <span class="rail__group-label">Wzory</span>
      <router-link
        v-for="s in subjects"
        :key="s.slug"
        :to="{ name: 'wzornik', params: { subject: s.slug } }"
        class="rail__link"
        :style="{ '--tab-accent': s.accent }"
      >{{ s.label }}</router-link>
    </div>

    <div class="rail__group">
      <span class="rail__group-label">Kalkulatory</span>
      <router-link
        v-for="s in subjects"
        :key="s.slug"
        :to="{ name: 'kalkulatory', params: { subject: s.slug } }"
        class="rail__link"
        :style="{ '--tab-accent': s.accent }"
      >{{ s.label }}</router-link>
    </div>
  </nav>
</template>

<style scoped>
.rail {
  width: var(--rail-width);
  flex-shrink: 0;
  padding: 2rem 1.25rem;
  border-right: 1px solid var(--color-line);
  min-height: 100vh;
}

.rail__brand {
  display: block;
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  color: var(--color-ink);
  margin-bottom: 2.5rem;
}

.rail__group { margin-bottom: 2rem; }

.rail__group-label {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
  margin-bottom: 0.5rem;
}

.rail__link {
  display: block;
  padding: 0.4rem 0 0.4rem 0.6rem;
  border-left: 2px solid var(--color-line);
  text-decoration: none;
  color: var(--color-ink);
  font-size: 0.9375rem;
}

.rail__link:hover,
.rail__link.router-link-active {
  border-left-color: var(--tab-accent, var(--color-accent));
  color: var(--tab-accent, var(--color-accent));
}
</style>
