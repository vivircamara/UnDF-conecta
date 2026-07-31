<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import ModuleCard from '@/components/home/ModuleCard.vue'
import { computed } from 'vue'
import {
  possuiPendenciasAvaliacao,
  totalPendenciasAvaliacao,
} from '@/stores/avaliacao'

interface HomeModule {
  key: string
  title: string
  description: string
  icon: string
  to: string
  badge?: string
  badgeColor?: string
}

const modules = computed<HomeModule[]>(() => [
  {
    key: 'forum',
    title: 'Fórum',
    description: 'Participe de discussões acadêmicas, tire dúvidas e conecte-se com sua turma.',
    icon: 'mdi-forum-outline',
    to: '/forum',
    badge: 'NOVO',
    badgeColor: 'primary',
  },
  {
    key: 'calendario',
    title: 'Calendário',
    description: 'Acompanhe datas de provas, entregas de trabalhos e eventos institucionais.',
    icon: 'mdi-calendar-blank-outline',
    to: '/calendario',
  },
  {
  key: 'avaliacao',
  title: 'Avaliação Institucional',
  description: possuiPendenciasAvaliacao.value
    ? `Você possui ${totalPendenciasAvaliacao.value} participação(ões) pendente(s).`
    : 'Todas as avaliações e enquetes foram respondidas.',
  icon: 'mdi-clipboard-check-outline',
  to: '/avaliacao',
  badge: possuiPendenciasAvaliacao.value
    ? 'PENDENTE'
    : undefined,
  badgeColor: 'grey-lighten-1',
},
])

const currentUser = {
  name: 'Ana Silva Santos',
  avatarUrl: undefined,
}
</script>

<template>
  <v-container class="home-view__content pt-0 pb-6 fill-height align-center" max-width="1100">
    <div class="w-100">
      <HomeHero
        title="Open Campus"
        subtitle="Universidade do Distrito Federal&#10;Professor Jorge Amaury Maia Nunes"
      />

      <v-row justify="center" class="ma-0">
        <v-col
          v-for="module in modules"
          :key="module.key"
          cols="12"
          sm="6"
          md="4"
        >
          <ModuleCard
            :title="module.title"
            :description="module.description"
            :icon="module.icon"
            :to="module.to"
            :badge="module.badge"
            :badge-color="module.badgeColor"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>