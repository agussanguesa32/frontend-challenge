<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { FormQuestion, QuestionType } from '@/types/form.types'
import { toast } from 'vue-sonner'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const formStore = useFormStore()

const formTitle = ref('')
const questions = ref<Omit<FormQuestion, 'id'>[]>([
  {
    type: 'short',
    text: '',
    required: false,
    placeholder: '',
    options: [],
  },
])

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: 'short', label: 'Short Answer' },
  { value: 'long', label: 'Long Answer' },
  { value: 'number', label: 'Number' },
  { value: 'radio', label: 'Single Choice' },
]

const addQuestion = () => {
  questions.value.push({
    type: 'short',
    text: '',
    required: false,
    placeholder: '',
    options: [],
  })
}

const removeQuestion = (index: number) => {
  if (questions.value.length > 1) {
    questions.value.splice(index, 1)
  }
}

const addOption = (index: number) => {
  if (!questions.value[index].options) {
    questions.value[index].options = []
  }
  questions.value[index].options?.push('')
}

const removeOption = (questionIndex: number, optionIndex: number) => {
  if (questions.value[questionIndex].options) {
    questions.value[questionIndex].options?.splice(optionIndex, 1)
  }
}

const createForm = () => {
  if (!formTitle.value.trim()) {
    toast.error('Form title is required')
    return
  }
  if (!questions.value.every((q) => q.text.trim())) {
    toast.error('All questions must have text')
    return
  }
  // Validar que las preguntas de tipo radio tengan al menos 2 opciones
  const invalidRadioQuestions = questions.value.filter(
    (q) =>
      q.type === 'radio' &&
      (!q.options || q.options.length < 2 || q.options.some((opt: string) => !opt.trim())),
  )
  if (invalidRadioQuestions.length > 0) {
    toast.error('Single choice questions must have at least 2 non-empty options')
    return
  }
  formStore.createForm(
    formTitle.value,
    questions.value.map((q) => ({
      type: q.type,
      text: q.text.trim(),
      required: q.required,
      placeholder: q.placeholder,
      options: q.options,
    })),
  )
  toast.success('Form created successfully')
  // Reset form
  formTitle.value = ''
  questions.value = [
    {
      type: 'short',
      text: '',
      required: false,
      placeholder: '',
      options: [],
    },
  ]
}

questions.value.forEach((question, qIndex) => {
  watch(
    () => question.type,
    (newType) => {
      if (newType === 'radio') {
        question.options = ['', '']
        question.placeholder = undefined
      } else {
        question.options = []
      }
    },
    { immediate: true },
  )
})
</script>

<template>
  <div
    class="max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 p-6 sm:p-10 backdrop-blur-sm"
  >
    <h2
      class="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-10 text-center"
    >
      Create New Form
    </h2>
    <form @submit.prevent="createForm" class="space-y-10">
      <!-- Form Title -->
      <div class="group mb-8">
        <label
          for="title"
          class="block text-base font-medium text-zinc-300 mb-2 group-hover:text-indigo-300 transition-colors"
          >Form Title</label
        >
        <input
          id="title"
          v-model="formTitle"
          type="text"
          class="w-full px-4 py-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-800/70"
          placeholder="Enter form title"
        />
      </div>

      <!-- Questions -->
      <div class="flex flex-col gap-6 mb-10">
        <div
          v-for="(question, qIndex) in questions"
          :key="qIndex"
          class="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700/30 space-y-6 shadow-lg backdrop-blur-sm group hover:border-zinc-600/50 transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-2">
            <h3
              class="text-lg font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors"
            >
              Question {{ qIndex + 1 }}
            </h3>
            <button
              v-if="questions.length > 1"
              @click="removeQuestion(qIndex)"
              class="p-2 text-zinc-400 hover:text-rose-400 opacity-80 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              type="button"
              aria-label="Remove question"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Question Type -->
          <div class="group relative mt-5">
            <label
              class="block text-sm font-medium text-zinc-300 mb-4 group-hover:text-indigo-300 transition-colors"
              >Question Type</label
            >
            <Listbox v-model="question.type">
              <div class="relative">
                <ListboxButton
                  class="w-full px-4 py-3 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/80 border border-zinc-700/70 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70 transition-all duration-300 hover:bg-zinc-900/90 pr-12 shadow-lg flex items-center justify-between min-h-[48px]"
                >
                  <span class="truncate">{{
                    questionTypes.find((t) => t.value === question.type)?.label
                  }}</span>
                  <span
                    class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </ListboxButton>
                <ListboxOptions
                  class="absolute z-50 mt-2 w-full rounded-xl bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-800/95 shadow-2xl border border-zinc-700/70 focus:outline-none overflow-auto ring-2 ring-indigo-700/30 pb-2"
                >
                  <ListboxOption
                    v-for="(type, idx) in questionTypes"
                    :key="type.value"
                    :value="type.value"
                    class="cursor-pointer select-none px-5 py-3 text-zinc-100 transition-all duration-200 text-base"
                    :class="[
                      question.type === type.value
                        ? 'bg-indigo-600/30 text-indigo-100 font-semibold'
                        : 'hover:bg-indigo-700/30 hover:text-indigo-200',
                      idx === questionTypes.length - 1 ? 'mb-1' : '',
                    ]"
                  >
                    {{ type.label }}
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <!-- Question Text -->
          <div class="group mt-5">
            <label
              class="block text-sm font-medium text-zinc-300 mb-4 group-hover:text-indigo-300 transition-colors"
              >Question Text</label
            >
            <input
              v-model="question.text"
              type="text"
              class="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 transition-all duration-300 hover:bg-zinc-900/70"
              :placeholder="'Enter question ' + (qIndex + 1)"
            />
          </div>

          <!-- Placeholder (for text inputs) -->
          <div v-if="question.type !== 'radio'" class="group mt-5">
            <label
              class="block text-sm font-medium text-zinc-300 mb-4 group-hover:text-indigo-300 transition-colors"
              >Placeholder Text</label
            >
            <input
              v-model="question.placeholder"
              type="text"
              class="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 transition-all duration-300 hover:bg-zinc-900/70"
              placeholder="Enter placeholder text"
            />
          </div>

          <!-- Radio Options -->
          <div v-if="question.type === 'radio'" class="mt-5 space-y-4">
            <div class="flex justify-between items-center">
              <label
                class="mb-4 block text-sm font-medium text-zinc-300 group-hover:text-indigo-300 transition-colors"
              >
                Options
              </label>
              <button
                @click="addOption(qIndex)"
                type="button"
                class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                + Add option
              </button>
            </div>
            <div
              v-for="(option, oIndex) in question.options || []"
              :key="oIndex"
              class="flex items-center gap-2"
            >
              <input
                v-model="question.options![oIndex]"
                type="text"
                class="mb-2 flex-1 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 transition-all duration-300 hover:bg-zinc-900/70"
                placeholder="Enter option text"
              />
              <button
                v-if="question.options && question.options.length > 1"
                @click="removeOption(qIndex, oIndex)"
                type="button"
                class="p-2 text-zinc-400 hover:text-rose-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Required Toggle -->
          <div class="flex items-center mt-2">
            <input
              v-model="question.required"
              type="checkbox"
              class="w-4 h-4 text-indigo-500 border-zinc-600 rounded focus:ring-indigo-500 bg-zinc-900/50"
            />
            <label
              class="ml-2 text-sm text-zinc-400 select-none cursor-pointer hover:text-zinc-300 transition-colors"
            >
              Required question
            </label>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-4 pt-8">
        <button
          @click="addQuestion"
          type="button"
          class="px-6 py-3 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800/50 rounded-xl transition-all duration-300 hover:scale-105 transform"
        >
          + Add question
        </button>
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white font-medium rounded-xl hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transform"
        >
          Create Form
        </button>
      </div>
    </form>
  </div>
</template>
