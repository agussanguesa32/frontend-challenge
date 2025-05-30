<script setup lang="ts">
import { computed } from 'vue'
import type { Form } from '@/types/form.types'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps<{
  forms: Form[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showFormSelector = computed(() => props.forms.length > 1)

const selectedForm = computed(() => {
  if (!props.modelValue) return props.forms[0]
  return props.forms.find((form) => form.id === props.modelValue)
})
</script>

<template>
  <div v-if="showFormSelector" class="mb-8">
    <label class="block text-sm font-medium text-zinc-300 mb-2"
      >Select Form ({{ forms.length }})</label
    >
    <Listbox :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
      <div class="relative">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-zinc-900/50 border border-zinc-700/50 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <span class="block truncate text-zinc-100">
            {{ selectedForm?.title || 'Select a form' }}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              class="w-5 h-5 text-zinc-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-zinc-900 rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="form in forms"
              :key="form.id"
              :value="form.id"
              v-slot="{ active, selected }"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-white bg-indigo-600' : 'text-zinc-100',
                  'cursor-pointer select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                  {{ form.title }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-300"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
