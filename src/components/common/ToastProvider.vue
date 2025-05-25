<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster
    position="bottom-right"
    theme="dark"
    richColors
    :toastOptions="{
      class: 'rounded-2xl px-6 py-4 shadow-xl border border-zinc-700/70 font-sans',
      descriptionClass: 'text-zinc-300',
      style: { fontFamily: 'inherit' },
    }"
  />
</template>
