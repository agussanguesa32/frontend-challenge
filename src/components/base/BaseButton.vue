<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  fullWidth?: boolean
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="px-6 py-3 font-medium rounded-xl transition-all duration-300 transform"
    :class="{
      'w-full': fullWidth,
      'bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600 hover:shadow-indigo-500/30 hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-500/20':
        variant === 'primary',
      'text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800/50 hover:scale-105':
        variant === 'secondary',
      'text-rose-400 hover:text-rose-300 hover:bg-zinc-800/50 hover:scale-105':
        variant === 'danger',
      'opacity-50 cursor-not-allowed': disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
