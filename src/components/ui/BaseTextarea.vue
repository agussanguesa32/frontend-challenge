<script setup lang="ts">
interface BaseTextareaProps {
  modelValue: string
  placeholder?: string
  error?: string
  disabled?: boolean
  rows?: number
}

const props = defineProps<BaseTextareaProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div>
    <textarea
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :rows="props.rows || 3"
      :disabled="props.disabled"
      @input="(e) => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
      :class="[
        'w-full px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition',
        props.error ? 'border-red-500 focus:border-red-500 focus:ring-red-400' : '',
        props.disabled ? 'opacity-60 cursor-not-allowed' : '',
      ]"
    />
    <p v-if="props.error" class="text-red-500 text-xs mt-1">{{ props.error }}</p>
  </div>
</template>
