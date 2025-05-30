<script setup lang="ts">
import { ref } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { useViewStore } from '@/stores/view.store'
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
const viewStore = useViewStore()
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
  <BaseContainer
    :max-width="viewStore.isCompactView ? undefined : '3xl'"
    :padding="true"
    class="flex flex-col h-full w-full"
  >
    <BaseTitle
      :level="viewStore.isCompactView ? 3 : 2"
      :center="!viewStore.isCompactView"
      class="mb-4 text-ellipsis overflow-hidden"
    >
      {{ poll.question }}
    </BaseTitle>

    <div
      :class="[viewStore.isCompactView ? 'space-y-3' : 'space-y-8', 'flex-grow overflow-y-hidden']"
    >
      <BaseRadioGroup
        v-model="selectedOption"
        :options="poll.options.map((opt) => opt.text)"
        required
      />
    </div>

    <div class="mt-auto pt-4">
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
