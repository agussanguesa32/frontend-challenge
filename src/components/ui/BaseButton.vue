<script setup lang="ts">
import { computed } from 'vue'

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = defineProps<BaseButtonProps>()
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const buttonClasses = computed(() => {
  return {
    'bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600':
      props.variant === 'primary',
    'bg-zinc-800 text-zinc-100 hover:bg-zinc-700': props.variant === 'secondary',
    'bg-rose-500 text-white hover:bg-rose-600': props.variant === 'danger',
    'bg-transparent border-2 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50':
      props.variant === 'outline',
    'px-4 py-2 text-sm': props.size === 'sm',
    'px-6 py-3 text-base': props.size === 'md',
    'px-8 py-4 text-lg': props.size === 'lg',
    'opacity-50 cursor-not-allowed': props.disabled || props.loading,
  }
})
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.disabled || props.loading"
    @click="(e) => emit('click', e)"
    :class="buttonClasses"
  >
    <span v-if="props.loading" class="loader mr-2"></span>
    <slot />
  </button>
</template>

<style scoped>
.loader {
  border: 2px solid #fff;
  border-top: 2px solid #6366f1;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
