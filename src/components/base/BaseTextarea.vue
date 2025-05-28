<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
  required?: boolean
  error?: string
  rows?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="group">
    <label
      v-if="label"
      :for="label"
      class="block text-base font-medium text-zinc-300 mb-2 group-hover:text-indigo-300 transition-colors"
    >
      {{ label }}
      <span v-if="required" class="text-rose-400">*</span>
    </label>
    <textarea
      :id="label"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :rows="rows || 4"
      class="w-full px-4 py-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-800/70"
      :class="{ 'border-rose-500': error }"
    ></textarea>
    <p v-if="error" class="mt-1 text-sm text-rose-400">{{ error }}</p>
  </div>
</template>
