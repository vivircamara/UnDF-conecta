<script setup lang="ts">
/**
 * ModuleCard
 * Card de acesso a um módulo (Fórum, Calendário, Avaliação...).
 * Reutilizável: qualquer tela que precise de um "atalho de módulo"
 * (ex.: Dashboard) pode reaproveitar este componente.
 */
interface Props {
  title: string
  description: string
  icon: string
  to: string
  badge?: string
  badgeColor?: string
}

withDefaults(defineProps<Props>(), {
  badgeColor: 'grey-lighten-1',
})
</script>

<template>
  <v-card
    :to="to"
    variant="outlined"
    color="surface"
    class="module-card h-100"
    role="link"
  >
    <v-chip
      v-if="badge"
      :color="badgeColor"
      size="x-small"
      variant="flat"
      class="module-card__badge"
    >
      {{ badge }}
    </v-chip>

        <v-card-text class="text-center py-6 px-6">
      <div class="module-card__icon mx-auto mb-3">
        <v-icon :icon="icon" size="24" color="secondary" />
      </div>

      <h2 class="module-card__title mb-1">{{ title }}</h2>
      <p class="module-card__description">{{ description }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.module-card {
  position: relative;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.module-card:hover {
  box-shadow: 0 8px 24px rgba(27, 51, 88, 0.08);
  transform: translateY(-2px);
}

.module-card__badge {
  position: absolute;
  top: 16px;
  right: 16px;
}

.module-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-secondary), 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.module-card__description {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.5;
}
</style>
