<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import ToastProvider from '@/components/common/ToastProvider.vue'
import '@/assets/animations.css'

const route = useRoute()
</script>

<template>
  <div class="dark">
    <Navbar />
    <main class="min-h-screen bg-zinc-900">
      <router-view />
      <ToastProvider />
    </main>
  </div>
</template>

<style>
@import '@/assets/main.css';

/* Animaciones globales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
