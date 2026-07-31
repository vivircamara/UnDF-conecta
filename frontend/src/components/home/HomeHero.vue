<script setup lang="ts">
import simboloLogo from '@/assets/simbolo-logo-transparente.png'

interface Props {
  title: string     
  subtitle: string  
}

defineProps<Props>()
</script>

<template>
  <div class="home-hero text-center d-flex flex-column align-center">
    
        <v-img
  :src="simboloLogo"
  alt="Símbolo UnDF"
  width="300"
  max-width="100%"
  contain
  class="mb-0"
></v-img>

    <!-- <p class="home-hero__subtitle">{{ subtitle }}</p>-->
    <h1 class="home-hero__title">{{ title }}</h1>
    

    
  </div>
</template>

<style scoped>
.home-hero {
  padding-block: 8px 8px;
}

.home-hero__title {
  font-size: 2.8rem; 
  font-weight: 800;
  color: #0F2A4A; 
  letter-spacing: -0.01em;
  margin-bottom: 4px; 
}

.home-hero__subtitle {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface-variant)); 
  font-weight: 500;
  max-width: 650px; 
  white-space: pre-line;
}

@media (max-width: 600px) {
  .home-hero__title {
    font-size: 2.25rem;
  }
}
</style>