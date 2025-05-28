<script setup lang="ts">
import { Toaster } from 'vue-sonner'

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

// Configuración global de los toasts
const toastConfig = {
  position: 'bottom-right' as ToastPosition,
  duration: 3000,
  closeButton: true,
  richColors: true,
  theme: 'dark' as const,
}
</script>

<template>
  <Toaster v-bind="toastConfig" />
</template>
