<script setup lang="ts">
defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6
  gradient?: boolean
  center?: boolean
}>()
</script>

<template>
  <component
    :is="`h${level || 1}`"
    class="font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
    :class="{
      'text-3xl': level === 1,
      'text-2xl': level === 2,
      'text-xl': level === 3,
      'text-lg': level === 4,
      'text-base': level === 5,
      'text-sm': level === 6,
      'text-center': center,
    }"
  >
    <slot></slot>
  </component>
</template>
