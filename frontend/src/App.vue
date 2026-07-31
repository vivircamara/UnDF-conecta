<script setup lang="ts">
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppSidebar />
    <AppHeader />

        <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>