<script setup lang="ts">
interface Props {
  institution?: string
  department?: string
  version?: string
}

withDefaults(defineProps<Props>(), {
  version: '1.0.0',
})

const year = new Date().getFullYear()
</script>

<template>
  <v-footer 
    color="background" 
    class="app-footer flex-column py-2"
  >
    <v-divider class="w-100 mb-2" style="opacity: 0.05"></v-divider>
    <p class="text-caption text-center mb-0 app-footer__line">
      © {{ year }} Open Campus. Todos os direitos reservados.
    </p>
    <p class="text-caption text-center mb-0 app-footer__line app-footer__line--muted">
      {{ department || 'UnDF' }} · Versão {{ version }}
    </p>
  </v-footer>
</template>

<style scoped>
.app-footer {
  flex: 0 0 auto !important;
  width: 100%;
}

.app-footer__line {
  color: rgb(var(--v-theme-on-surface-variant));
}

.app-footer__line--muted {
  opacity: 0.7;
}
</style>
