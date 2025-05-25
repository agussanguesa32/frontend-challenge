<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { toast } from 'vue-sonner'

const pollStore = usePollStore()

const pollQuestion = ref('')
const options = ref(['', ''])
const isSubmitting = ref(false)

const errors = ref({
  question: '',
  options: [] as string[],
})

const isValid = computed(() => {
  return (
    pollQuestion.value.trim() &&
    options.value.every((opt) => opt.trim()) &&
    !errors.value.question &&
    !errors.value.options.some((err) => err)
  )
})

const validateQuestion = () => {
  if (!pollQuestion.value.trim()) {
    errors.value.question = 'Question is required'
  } else if (pollQuestion.value.length < 5) {
    errors.value.question = 'Question must be at least 5 characters'
  } else {
    errors.value.question = ''
  }
}

const validateOption = (index: number) => {
  if (!options.value[index].trim()) {
    errors.value.options[index] = 'Option is required'
  } else if (options.value[index].length < 2) {
    errors.value.options[index] = 'Option must be at least 2 characters'
  } else {
    errors.value.options[index] = ''
  }
}

const addOption = () => {
  options.value.push('')
  errors.value.options.push('')
}

const removeOption = (index: number) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1)
    errors.value.options.splice(index, 1)
  }
}

const createPoll = async () => {
  validateQuestion()
  options.value.forEach((_, i) => validateOption(i))
  const validOptions = options.value.filter((opt) => opt.trim().length >= 2)

  if (!pollQuestion.value.trim() || errors.value.question) {
    toast.error('Question is required and must be at least 5 characters')
    return
  }
  if (validOptions.length < 2) {
    toast.error('You must enter at least 2 valid options (minimum 2 characters each)')
    return
  }
  if (errors.value.options.some((err) => err)) {
    toast.error('All options must be at least 2 characters')
    return
  }

  isSubmitting.value = true
  try {
    pollStore.createPoll(
      pollQuestion.value,
      options.value.filter((opt) => opt.trim()),
    )

    toast.success('Poll created successfully', {
      description: 'Your poll is ready to receive responses',
    })

    // Reset form
    pollQuestion.value = ''
    options.value = ['', '']
    errors.value = {
      question: '',
      options: ['', ''],
    }
  } catch (error) {
    toast.error('Error creating poll', {
      description: 'Please try again',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    class="max-w-2xl w-full mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-zinc-800/50 px-2 sm:px-6 py-4 sm:py-10 backdrop-blur-sm"
  >
    <h2
      class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-6 sm:mb-10 text-center"
    >
      Create New Poll
    </h2>
    <form @submit.prevent="createPoll" class="space-y-6 sm:space-y-10">
      <!-- Poll Question -->
      <div class="group mb-6 sm:mb-8">
        <label
          for="poll-question"
          class="block text-base font-medium text-zinc-300 mb-2 group-hover:text-indigo-300 transition-colors"
          >Poll Question</label
        >
        <input
          id="poll-question"
          v-model="pollQuestion"
          type="text"
          class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 placeholder-zinc-500 transition-all duration-300 hover:bg-zinc-800/70 text-sm sm:text-base"
          placeholder="Enter poll question"
        />
        <p v-if="errors.question" class="mt-2 text-xs sm:text-sm text-rose-400">
          {{ errors.question }}
        </p>
      </div>
      <!-- Poll Options -->
      <div class="flex flex-col gap-2 mb-6 sm:mb-10">
        <label
          class="block text-base font-medium text-zinc-300 group-hover:text-indigo-300 transition-colors"
          >Options</label
        >
        <div
          v-for="(option, oIndex) in options"
          :key="oIndex"
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 group"
        >
          <input
            v-model="options[oIndex]"
            type="text"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-zinc-100 transition-all duration-300 hover:bg-zinc-900/70 text-sm sm:text-base"
            :placeholder="`Option ${oIndex + 1}`"
          />
          <button
            v-if="options.length > 2"
            @click="removeOption(oIndex)"
            class="p-2 text-zinc-400 hover:text-rose-400 transition-all duration-300 hover:scale-110"
            type="button"
            aria-label="Remove option"
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
          <p v-if="errors.options[oIndex]" class="ml-2 text-xs sm:text-sm text-rose-400">
            {{ errors.options[oIndex] }}
          </p>
        </div>
        <button
          @click="addOption"
          type="button"
          class="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors mt-2 hover:scale-105 transform self-start"
        >
          + Add option
        </button>
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
        <button
          type="submit"
          class="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white font-medium rounded-xl hover:from-indigo-700 hover:via-indigo-600 hover:to-violet-600 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transform text-sm sm:text-base"
        >
          Create Poll
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
