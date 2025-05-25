<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { Form, FormResponse } from '@/types/form.types'
import { toast } from 'vue-sonner'

const props = defineProps<{
  form: Form
}>()

const formStore = useFormStore()
const responses = ref<Record<string, string | number | null>>({})

// Inicializar responses para preguntas de tipo radio como null
onMounted(() => {
  props.form.questions.forEach((q) => {
    if (q.type === 'radio') {
      responses.value[q.id] = null
    }
  })
})

const isValid = computed(() => {
  return props.form.questions.every((q) => {
    if (!q.required) return true
    const response = responses.value[q.id]
    return response !== undefined && response !== '' && response !== null
  })
})

const submitForm = () => {
  if (!isValid.value) {
    toast.error('Please answer all required questions')
    return
  }
  const formattedResponses: FormResponse[] = props.form.questions.map((q) => {
    let value = responses.value[q.id]
    // Si es una pregunta de tipo radio, convertir el índice al texto de la opción
    if (q.type === 'radio' && typeof value === 'number' && q.options) {
      value = q.options[value] || ''
    }
    return {
      questionId: q.id,
      value: value ?? '',
    }
  })
  formStore.submitFormResponse({
    formId: props.form.id,
    responses: formattedResponses,
  })
  toast.success('Responses submitted successfully!')
  // Reset form
  responses.value = {}
  // Volver a inicializar radios
  props.form.questions.forEach((q) => {
    if (q.type === 'radio') {
      responses.value[q.id] = null
    }
  })
}
</script>

<template>
  <div
    class="max-w-3xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 backdrop-blur-sm"
  >
    <div class="p-8">
      <h3
        class="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-6"
      >
        {{ form.title }}
      </h3>

      <div class="space-y-8">
        <div v-for="question in form.questions" :key="question.id" class="space-y-3 group">
          <label
            :for="question.id"
            class="mb-4 block text-lg text-zinc-200 group-hover:text-indigo-300 transition-colors"
          >
            {{ question.text }}
            <span v-if="question.required" class="text-rose-400">*</span>
          </label>

          <!-- Short Answer -->
          <input
            v-if="question.type === 'short'"
            :id="question.id"
            v-model="responses[question.id]"
            type="text"
            class="mb-4 w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-900/70"
            :placeholder="question.placeholder"
          />

          <!-- Long Answer -->
          <textarea
            v-if="question.type === 'long'"
            :id="question.id"
            v-model="responses[question.id]"
            rows="4"
            class="mb-4 w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-900/70"
            :placeholder="question.placeholder"
          ></textarea>

          <!-- Number -->
          <input
            v-if="question.type === 'number'"
            :id="question.id"
            v-model.number="responses[question.id]"
            type="number"
            class="mb-4 w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-900/70"
            :placeholder="question.placeholder"
          />

          <!-- Radio -->
          <div v-if="question.type === 'radio'" class="space-y-3">
            <div
              v-for="(option, index) in question.options"
              :key="index"
              class="transform transition-all duration-300 hover:scale-[1.01]"
            >
              <label
                class="mb-4 flex items-center w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300"
                :class="{
                  'border-indigo-500/50 bg-gradient-to-r from-indigo-900/40 to-violet-900/40 ring-4 ring-indigo-900/20':
                    responses[question.id] === index,
                  'border-zinc-700/50 hover:border-zinc-600/50 hover:bg-zinc-900/30':
                    responses[question.id] !== index,
                }"
              >
                <input
                  type="radio"
                  :name="question.id"
                  :value="index"
                  v-model.number="responses[question.id]"
                  class="w-5 h-5 text-indigo-400 border-zinc-600 focus:ring-indigo-500 bg-zinc-900/50 flex-shrink-0"
                />
                <span class="ml-4 text-zinc-100 break-words">{{ option }}</span>
              </label>
            </div>
          </div>
        </div>

        <button
          @click="submitForm"
          :disabled="!isValid"
          class="mt-8 w-full px-8 py-4 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white text-lg font-medium rounded-xl transition-all duration-300 transform shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
          :class="{
            'hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600 hover:shadow-indigo-500/30':
              isValid,
            'opacity-50 cursor-not-allowed': !isValid,
          }"
        >
          Submit Form
        </button>
      </div>
    </div>
  </div>
</template>
