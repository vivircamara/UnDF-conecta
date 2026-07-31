<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toggleSidebar } from '@/stores/sidebar'

defineEmits(['toggle-menu'])

interface Props {
  portalLabel?: string
  moduleLabel?: string
  userName?: string
  userAvatarUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  portalLabel: 'Open Campus',
  userName: 'Ana Silva Santos'
})

const route = useRoute()


const currentModuleLabel = computed(() => {
  if (props.moduleLabel) return props.moduleLabel
  if (route.path === '/') return '' 

  return (route.meta?.title as string) || ''
})
</script>

<template>
  <v-app-bar app flat color="background" class="app-header px-8" height="72">
    <div class="d-flex align-center gap-2">
      <v-btn icon="mdi-menu" variant="text" color="#0F2A4A" class="mr-1" @click="toggleSidebar"></v-btn>
      
      <router-link to="/" class="brand-link d-flex align-center gap-2">
        <span class="font-weight-bold text-subtitle-1 text-grey-darken-4">{{ portalLabel }}</span>
        
        <!-- Usamos a nossa variável computada inteligente aqui -->
        <template v-if="currentModuleLabel">
          <span class="text-grey-lighten-1">|</span>
          <span class="text-subtitle-2 text-grey-darken-1 font-weight-regular">{{ currentModuleLabel }}</span>
        </template>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-chip variant="outlined" color="grey-lighten-1" class="text-grey-darken-3 font-weight-medium rounded-lg px-3">
      <span class="mr-2">{{ userName }}</span>
      <v-avatar size="24">
        <v-img v-if="userAvatarUrl" :src="userAvatarUrl" :alt="userName" cover />
        <v-icon v-else icon="mdi-account-circle" size="24" color="blue-grey-darken-4" />
      </v-avatar>
    </v-chip>
  </v-app-bar>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}

.brand-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.brand-link:hover {
  opacity: 0.85;
}
</style>