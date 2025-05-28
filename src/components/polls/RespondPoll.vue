<script setup lang="ts">
import { ref } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { toast } from 'vue-sonner'
import type { Poll } from '@/types/poll.types'
import BaseRadioGroup from '@/components/base/BaseRadioGroup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'

const props = defineProps<{
  poll: Poll
}>()

const pollStore = usePollStore()
const selectedOption = ref<number | null>(null)
const isSubmitting = ref(false)

const submitResponse = async () => {
  if (selectedOption.value === null) return

  isSubmitting.value = true
  try {
    pollStore.submitResponse(props.poll.id, selectedOption.value)
    toast.success('Response submitted', {
      description: 'Thank you for participating in the poll!',
    })
    selectedOption.value = null
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
  <BaseContainer max-width="3xl" padding>
    <BaseTitle :level="2" center class="mb-6">
      {{ poll.question }}
    </BaseTitle>

    <div class="space-y-8">
      <BaseRadioGroup
        v-model="selectedOption"
        :options="poll.options.map((opt) => opt.text)"
        required
      />

      <BaseButton
        @click="submitResponse"
        variant="primary"
        full-width
        :disabled="selectedOption === null || isSubmitting"
      >
        Submit Response
      </BaseButton>
    </div>
  </BaseContainer>
</template>
