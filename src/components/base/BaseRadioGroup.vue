<script setup lang="ts">
defineProps<{
  modelValue: number | null
  options: string[]
  label?: string
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <div class="space-y-3">
    <label
      v-if="label"
      class="block text-base font-medium text-zinc-300 mb-2 group-hover:text-indigo-300 transition-colors"
    >
      {{ label }}
      <span v-if="required" class="text-rose-400">*</span>
    </label>
    <div class="space-y-3">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="transform transition-all duration-300 hover:scale-[1.01]"
      >
        <label
          class="mb-4 flex items-center w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300"
          :class="{
            'border-indigo-500/50 bg-gradient-to-r from-indigo-900/40 to-violet-900/40 ring-4 ring-indigo-900/20':
              modelValue === index,
            'border-zinc-700/50 hover:border-zinc-600/50 hover:bg-zinc-900/30':
              modelValue !== index,
          }"
        >
          <input
            type="radio"
            :name="label"
            :value="index"
            :checked="modelValue === index"
            @change="emit('update:modelValue', index)"
            class="w-5 h-5 text-indigo-400 border-zinc-600 focus:ring-indigo-500 bg-zinc-900/50 flex-shrink-0"
          />
          <span class="ml-4 text-zinc-100 break-words">{{ option }}</span>
        </label>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-rose-400">{{ error }}</p>
  </div>
</template>
