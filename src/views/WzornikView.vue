<script setup lang="ts">
defineProps<{ subject?: string }>()
</script>

<template>
  <section>
    <h2>Wzornik{{ subject ? ` — ${subject}` : '' }}</h2>
    <p v-if="!subject">
      Wybierz przedmiot z menu po lewej, aby zobaczyć wzory z tablic CKE.
    </p>
    <p v-else>
      Tu trafi lista wzorów dla przedmiotu „{{ subject }}”, z wyszukiwarką
      kontekstową i renderowaniem w KaTeX. Kolejny etap po szkielecie PWA.
    </p>
  </section>
</template>
