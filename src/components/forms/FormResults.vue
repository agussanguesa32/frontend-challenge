<script setup lang="ts">
import { computed } from 'vue'
import type { Form, FormResponse } from '@/types/form.types'
import StatsIcon from '@/components/icons/StatsIcon.vue'

const props = defineProps<{
  form: Form
}>()

const totalResponses = computed(() => props.form.responses.length)

function getAnswer(responseArr: FormResponse[], questionId: string) {
  return responseArr.find((r) => r.questionId === questionId)?.value || ''
}
</script>

<template>
  <div
    class="max-w-3xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 backdrop-blur-sm"
  >
    <div class="p-8">
      <!-- Título del formulario -->
      <div class="flex items-center gap-4 mb-8">
        <div
          class="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg"
        >
          <StatsIcon class="w-10 h-10 text-white" />
        </div>
        <div>
          <h2
            class="text-3xl font-extrabold text-zinc-100 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-1"
          >
            {{ form.title }}
          </h2>
          <p class="text-zinc-400 text-base">Form Results</p>
        </div>
      </div>
      <div class="flex items-center justify-between mb-10">
        <h3
          class="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
        >
          Responses
        </h3>
        <p class="text-lg text-zinc-400">
          Total responses:
          <span
            class="font-semibold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent"
          >
            {{ totalResponses }}
          </span>
        </p>
      </div>
      <div v-if="form.responses.length === 0" class="text-center text-zinc-400 italic py-12">
        No responses yet.
      </div>
      <div v-else class="space-y-10">
        <div
          v-for="(responseArr, respIdx) in form.responses"
          :key="respIdx"
          class="bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 rounded-2xl p-8 border border-zinc-700/40 shadow-lg backdrop-blur-md group hover:border-indigo-400/40 transition-all duration-300 mb-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold text-lg shadow"
            >
              {{ respIdx + 1 }}
            </div>
            <h4
              class="text-xl font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors"
            >
              Response #{{ respIdx + 1 }}
            </h4>
          </div>
          <div class="space-y-4">
            <div
              v-for="question in form.questions"
              :key="question.id"
              class="p-4 bg-zinc-900/70 rounded-xl border border-zinc-700/40 text-zinc-200 shadow hover:bg-zinc-900/80 transition-all duration-300 mb-3"
            >
              <span class="block font-medium text-zinc-300 mb-1">{{ question.text }}</span>
              <template v-if="question.type === 'radio' && question.options">
                <div class="mt-2 space-y-2">
                  <div
                    v-for="option in question.options"
                    :key="option"
                    class="flex items-center gap-2 text-sm"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="{
                        'bg-indigo-400': getAnswer(responseArr, question.id) === option,
                        'bg-zinc-600': getAnswer(responseArr, question.id) !== option,
                      }"
                    ></div>
                    <span
                      :class="{
                        'text-indigo-300': getAnswer(responseArr, question.id) === option,
                        'text-zinc-500': getAnswer(responseArr, question.id) !== option,
                      }"
                    >
                      {{ option }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <span
                  :class="[
                    getAnswer(responseArr, question.id)
                      ? 'block text-base text-zinc-100 break-words whitespace-pre-line'
                      : 'block italic text-zinc-500',
                  ]"
                >
                  {{ getAnswer(responseArr, question.id) || 'No response' }}
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
