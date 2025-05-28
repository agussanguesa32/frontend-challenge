<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { FormQuestion, QuestionType } from '@/types/form.types'
import { useToast } from '@/composables/useToast'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'

const formStore = useFormStore()
const toast = useToast()

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
    toast.showError('Form title is required')
    return
  }

  // Validar que todas las preguntas tengan texto
  const emptyQuestions = questions.value.filter((q) => !q.text.trim())
  if (emptyQuestions.length > 0) {
    toast.showError('All questions must have text')
    return
  }

  // Validar que las preguntas de tipo radio tengan al menos 2 opciones válidas
  const invalidRadioQuestions = questions.value.filter(
    (q) =>
      q.type === 'radio' &&
      (!q.options || q.options.length < 2 || q.options.some((opt: string) => !opt.trim())),
  )
  if (invalidRadioQuestions.length > 0) {
    toast.showError('Single choice questions must have at least 2 non-empty options')
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
  toast.showSuccess('Form created successfully')
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

// Watch para manejar cambios en el tipo de pregunta
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
  <BaseContainer max-width="2xl" padding>
    <BaseTitle :level="1" center class="mb-10"> Create New Form </BaseTitle>
    <form @submit.prevent="createForm" class="space-y-10">
      <!-- Form Title -->
      <BaseInput v-model="formTitle" label="Form Title" placeholder="Enter form title" />

      <!-- Questions -->
      <div class="space-y-8">
        <div
          v-for="(question, qIndex) in questions"
          :key="qIndex"
          class="mb-3 p-6 bg-zinc-800/30 rounded-2xl border border-zinc-700/30"
        >
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex-1">
              <BaseInput
                v-model="question.text"
                label="Question Text"
                placeholder="Enter your question"
              />
            </div>
            <button
              v-if="questions.length > 1"
              @click="removeQuestion(qIndex)"
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

          <!-- Question Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-zinc-300 mb-2">Question Type</label>
            <Listbox v-model="question.type">
              <div class="relative">
                <ListboxButton
                  class="relative w-full py-2 pl-3 pr-10 text-left bg-zinc-900/50 border border-zinc-700/50 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <span class="block truncate text-zinc-100">
                    {{ questionTypes.find((t) => t.value === question.type)?.label }}
                  </span>
                  <span
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                  >
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
                      v-for="type in questionTypes"
                      :key="type.value"
                      :value="type.value"
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
                          {{ type.label }}
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

          <!-- Placeholder -->
          <BaseInput
            v-if="question.type !== 'radio'"
            :model-value="question.placeholder || ''"
            @update:model-value="question.placeholder = $event as string"
            label="Placeholder Text"
            placeholder="Enter placeholder text"
          />

          <!-- Radio Options -->
          <div v-if="question.type === 'radio'" class="space-y-4">
            <label class="block text-sm font-medium text-zinc-300 mb-2">Options</label>
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center gap-2"
            >
              <BaseInput v-model="question.options![oIndex]" placeholder="Enter option text" />
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
            <button
              @click="addOption(qIndex)"
              type="button"
              class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + Add option
            </button>
          </div>

          <!-- Required Toggle -->
          <div class="flex items-center mt-4">
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
        <BaseButton @click="addQuestion" type="button" variant="secondary">
          + Add question
        </BaseButton>
        <BaseButton type="submit" variant="primary" class="flex-1"> Create Form </BaseButton>
      </div>
    </form>
  </BaseContainer>
</template>
