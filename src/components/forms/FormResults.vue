<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { Form, FormResponse } from '@/types/form.types'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'
import BaseFormSelector from '@/components/base/BaseFormSelector.vue'

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
    <BaseFormSelector
      :forms="activeForms"
      v-model="selectedFormId"
      @update:model-value="handleFormChange"
    />

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
          class="mb-3 p-6 bg-zinc-800/30 rounded-2xl border border-zinc-700/30"
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
