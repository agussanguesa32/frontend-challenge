<script setup lang="ts">
defineProps<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padding?: boolean
}>()
</script>

<template>
  <div
    class="mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 backdrop-blur-sm"
    :class="{
      'max-w-sm': maxWidth === 'sm',
      'max-w-md': maxWidth === 'md',
      'max-w-lg': maxWidth === 'lg',
      'max-w-xl': maxWidth === 'xl',
      'max-w-2xl': maxWidth === '2xl',
      'max-w-3xl': maxWidth === '3xl',
      'max-w-4xl': maxWidth === '4xl',
      'max-w-5xl': maxWidth === '5xl',
      'max-w-6xl': maxWidth === '6xl',
      'max-w-7xl': maxWidth === '7xl',
      'p-8': padding,
    }"
  >
    <slot></slot>
  </div>
</template>
