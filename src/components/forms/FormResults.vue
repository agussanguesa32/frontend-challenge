<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { Form, FormResponse } from '@/types/form.types'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const formStore = useFormStore()
const loading = ref(false)
const error = ref<string | null>(null)
const responses = ref<FormResponse[][]>([])
const selectedFormId = ref<string | null>(null)

const activeForms = computed(() => formStore.forms)

const selectedForm = computed(() => {
  if (!selectedFormId.value) return activeForms.value[0]
  return activeForms.value.find((form) => form.id === selectedFormId.value)
})

const showFormSelector = computed(() => activeForms.value.length > 1)

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    // Si no hay formulario seleccionado y hay formularios activos, seleccionar el primero
    if (!selectedFormId.value && activeForms.value.length > 0) {
      selectedFormId.value = activeForms.value[0].id
    }
    // Cargar las respuestas del formulario seleccionado
    if (selectedFormId.value) {
      const form = activeForms.value.find((f) => f.id === selectedFormId.value)
      if (form) {
        responses.value = form.responses
      }
    }
  } catch (err) {
    error.value = 'Error loading responses'
  } finally {
    loading.value = false
  }
})

const handleFormChange = (formId: string) => {
  selectedFormId.value = formId
  const form = activeForms.value.find((f) => f.id === formId)
  if (form) {
    responses.value = form.responses
  }
}

const formatResponseValue = (response: FormResponse[], questionId: string) => {
  const answer = response.find((a) => a.questionId === questionId)
  if (!answer) return 'No answer'
  return answer.value
}
</script>

<template>
  <BaseContainer max-width="4xl" padding>
    <BaseTitle :level="1" center class="mb-10">Form Responses</BaseTitle>

    <!-- Form Selector -->
    <div v-if="showFormSelector" class="mb-8">
      <label class="block text-sm font-medium text-zinc-300 mb-2">Select Form</label>
      <Listbox v-model="selectedFormId" @update:model-value="handleFormChange">
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
                v-for="form in activeForms"
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

    <!-- Título del formulario seleccionado -->
    <BaseTitle v-if="selectedForm" :level="2" class="mb-6 text-center">
      {{ selectedForm.title }}
    </BaseTitle>

    <!-- Content Area -->
    <div class="mt-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center text-zinc-400">Loading responses...</div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-rose-400">{{ error }}</div>

      <!-- No Responses -->
      <div v-else-if="!responses.length" class="text-center text-zinc-400">
        No responses yet for this form
      </div>

      <!-- Responses List -->
      <div v-else class="space-y-8">
        <div
          v-for="(response, index) in responses"
          :key="index"
          class="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-700/30"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-zinc-400"> Response #{{ index + 1 }} </span>
          </div>

          <div class="space-y-4">
            <div v-for="question in selectedForm?.questions" :key="question.id" class="space-y-2">
              <h4 class="text-zinc-300 font-medium">{{ question.text }}</h4>
              <p class="text-zinc-400">
                {{ formatResponseValue(response, question.id) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>
