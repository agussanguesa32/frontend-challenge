<script setup lang="ts">
import { ref } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { useToast } from '@/composables/useToast'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'

const pollStore = usePollStore()
const toast = useToast()

const pollQuestion = ref('')
const options = ref(['', ''])
const isSubmitting = ref(false)

const errors = ref({
  question: '',
  options: [] as string[],
})

const validateForm = () => {
  let isValid = true

  // Validar pregunta
  if (!pollQuestion.value.trim()) {
    errors.value.question = 'Question is required'
    isValid = false
  } else if (pollQuestion.value.length < 5) {
    errors.value.question = 'Question must be at least 5 characters'
    isValid = false
  } else {
    errors.value.question = ''
  }

  // Validar opciones
  options.value.forEach((option, index) => {
    if (!option.trim()) {
      errors.value.options[index] = 'Option is required'
      isValid = false
    } else if (option.length < 2) {
      errors.value.options[index] = 'Option must be at least 2 characters'
      isValid = false
    } else {
      errors.value.options[index] = ''
    }
  })

  return isValid
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
  if (!validateForm()) {
    if (errors.value.question) {
      toast.showError(errors.value.question)
    } else if (options.value.length < 2) {
      toast.showError('You must enter at least 2 options')
    } else if (errors.value.options.some((err) => err)) {
      toast.showError('Please check all options are filled correctly')
    }
    return
  }

  isSubmitting.value = true
  try {
    pollStore.createPoll(
      pollQuestion.value,
      options.value.filter((opt) => opt.trim()),
    )

    toast.showSuccess('Poll created successfully', {
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
    toast.showError('Error creating poll', {
      description: 'Please try again',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseContainer max-width="2xl" padding>
    <BaseTitle :level="1" center class="mb-10"> Create New Poll </BaseTitle>

    <form @submit.prevent="createPoll" class="space-y-10">
      <!-- Poll Question -->
      <BaseInput
        v-model="pollQuestion"
        label="Poll Question"
        placeholder="Enter poll question"
        :error="errors.question"
        required
      />

      <!-- Poll Options -->
      <div class="space-y-6">
        <label class="mb-3 block text-base font-medium text-zinc-300">Poll Options</label>
        <div class="space-y-4">
          <div v-for="(option, index) in options" :key="index" class="flex items-start gap-2">
            <div class="flex-1">
              <BaseInput
                v-model="options[index]"
                :placeholder="`Option ${index + 1}`"
                :error="errors.options[index]"
                required
              />
            </div>
            <button
              v-if="options.length > 2"
              @click="removeOption(index)"
              type="button"
              class="p-2 text-zinc-400 hover:text-rose-400 transition-colors flex-shrink-0"
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
        <button
          @click="addOption"
          type="button"
          class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          + Add option
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-4 pt-8">
        <BaseButton type="submit" variant="primary" class="flex-1" :disabled="isSubmitting">
          Create Poll
        </BaseButton>
      </div>
    </form>
  </BaseContainer>
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
