<script setup lang="ts">
import { computed } from 'vue'

interface BaseInputProps {
  modelValue: string | number | undefined
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
}>()

const inputClasses = computed(() => {
  return {
    'w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 transition-all duration-300 hover:bg-zinc-900/70':
      true,
    'border-zinc-700/50': !props.error,
    'border-rose-500/50': props.error,
    'opacity-50 cursor-not-allowed': props.disabled,
  }
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value || undefined)
}
</script>

<template>
  <div class="relative">
    <input
      :type="props.type || 'text'"
      :value="props.modelValue ?? ''"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="inputClasses"
      @input="handleInput"
    />
    <p v-if="props.error" class="mt-1 text-sm text-rose-500">{{ props.error }}</p>
  </div>
</template>
