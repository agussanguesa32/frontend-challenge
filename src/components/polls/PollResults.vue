<script setup lang="ts">
import { computed } from 'vue'
import type { Poll } from '@/types/poll.types'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'

const props = defineProps<{
  poll: Poll
}>()

const totalVotes = computed(() => props.poll.totalVotes)

const getPercentage = (votes: number) => {
  if (totalVotes.value === 0) return 0
  return Math.round((votes / totalVotes.value) * 100)
}
</script>

<template>
  <BaseContainer max-width="2xl" padding>
    <BaseTitle :level="2" center class="mb-6">
      {{ poll.question }}
    </BaseTitle>

    <div class="text-zinc-400 mb-6 text-center">Results</div>

    <div class="space-y-6">
      <div
        v-for="option in poll.options"
        :key="option.id"
        class="mb-3 bg-zinc-800/30 rounded-xl border border-zinc-700/30 p-4"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-zinc-100">{{ option.text }}</span>
          <span class="text-zinc-400">{{ getPercentage(option.votes) }}%</span>
        </div>
        <div class="w-full bg-zinc-900/50 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${getPercentage(option.votes)}%` }"
          ></div>
        </div>
        <div class="text-sm text-zinc-500 mt-1">
          {{ option.votes }} {{ option.votes === 1 ? 'vote' : 'votes' }}
        </div>
      </div>
    </div>

    <div class="text-center text-zinc-400 mt-6">Total votes: {{ totalVotes }}</div>
  </BaseContainer>
</template>
