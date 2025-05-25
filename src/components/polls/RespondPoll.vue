<script setup lang="ts">
import { ref } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { toast } from 'vue-sonner'
import type { Poll } from '@/types/poll.types'

const props = defineProps<{
  poll: Poll
}>()

const pollStore = usePollStore()
const selectedOption = ref<number | undefined>(undefined)
const isSubmitting = ref(false)

const submitResponse = async () => {
  if (selectedOption.value === undefined) return

  isSubmitting.value = true
  try {
    pollStore.submitResponse(props.poll.id, selectedOption.value)
    toast.success('Response submitted', {
      description: 'Thank you for participating in the poll!',
    })
    selectedOption.value = undefined
  } catch (error) {
    toast.error('Error submitting response', {
      description: 'Please try again',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    class="max-w-3xl w-full mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 backdrop-blur-sm px-2 sm:px-6 py-4 sm:py-8"
  >
    <div class="p-2 sm:p-8">
      <h3
        class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 text-center"
      >
        {{ poll.question }}
      </h3>
      <div class="space-y-4 sm:space-y-8">
        <div
          v-for="(option, index) in poll.options"
          :key="option.id"
          class="transform transition-all duration-300 hover:scale-[1.01] mb-3 sm:mb-4"
        >
          <label
            class="flex items-center w-full p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 text-base sm:text-lg"
            :class="{
              'border-indigo-500/50 bg-gradient-to-r from-indigo-900/40 to-violet-900/40 ring-4 ring-indigo-900/20':
                selectedOption === index,
              'border-zinc-700/50 hover:border-zinc-600/50 hover:bg-zinc-900/30':
                selectedOption !== index,
            }"
          >
            <input
              type="radio"
              :name="poll.id"
              :value="index"
              v-model="selectedOption"
              class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 border-zinc-600 focus:ring-indigo-500 bg-zinc-900/50 flex-shrink-0"
            />
            <span class="ml-4 sm:ml-6 text-zinc-100 break-words">{{ option.text }}</span>
          </label>
        </div>
        <button
          @click="submitResponse"
          :disabled="selectedOption === undefined || isSubmitting"
          class="mt-6 sm:mt-8 w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white text-base sm:text-lg font-medium rounded-xl transition-all duration-300 transform shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
          :class="{
            'hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600 hover:shadow-indigo-500/30':
              selectedOption !== undefined && !isSubmitting,
            'opacity-50 cursor-not-allowed': selectedOption === undefined || isSubmitting,
          }"
        >
          Submit Poll
        </button>
      </div>
    </div>
  </div>
</template>
