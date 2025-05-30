<script setup lang="ts">
import { computed } from 'vue'
import type { Poll } from '@/types/poll.types'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'
import { useViewStore } from '@/stores/view.store'

const props = defineProps<{
  poll: Poll
}>()

const viewStore = useViewStore()
const totalVotes = computed(() => props.poll.totalVotes)

const getPercentage = (votes: number) => {
  if (totalVotes.value === 0) return 0
  return Math.round((votes / totalVotes.value) * 100)
}
</script>

<template>
  <BaseContainer
    :max-width="viewStore.isCompactView ? undefined : '2xl'"
    :padding="false"
    :class="[viewStore.isCompactView ? 'p-5' : 'p-6', 'flex flex-col h-full w-full']"
  >
    <BaseTitle
      :level="viewStore.isCompactView ? 3 : 2"
      :center="!viewStore.isCompactView"
      :class="[viewStore.isCompactView ? 'mb-5' : 'mb-4', 'text-ellipsis overflow-hidden']"
    >
      {{ poll.question }}
    </BaseTitle>

    <div
      :class="[
        viewStore.isCompactView ? 'mb-5' : 'mb-4',
        'text-zinc-400',
        { 'text-center': !viewStore.isCompactView },
      ]"
    >
      Results
    </div>

    <div
      :class="[
        viewStore.isCompactView ? 'space-y-5' : 'space-y-6',
        'flex-grow overflow-y-hidden overflow-x-hidden',
      ]"
    >
      <div
        v-for="option in poll.options"
        :key="option.id"
        class="mb-3 bg-zinc-800/30 rounded-xl border border-zinc-700/30 p-5"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-zinc-100 text-sm break-words min-w-0 mr-2">{{ option.text }}</span>
          <span
            class="text-zinc-400 text-sm flex-shrink-0"
            :class="{ 'ml-2': viewStore.isCompactView }"
            >{{ getPercentage(option.votes) }}%</span
          >
        </div>
        <div class="w-full bg-zinc-900/50 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${getPercentage(option.votes)}%` }"
          ></div>
        </div>
        <div class="text-xs text-zinc-500 mt-1">
          {{ option.votes }} {{ option.votes === 1 ? 'vote' : 'votes' }}
        </div>
      </div>
    </div>

    <div
      :class="[
        viewStore.isCompactView ? 'mt-5' : 'mt-4',
        'text-zinc-400',
        { 'text-center': !viewStore.isCompactView },
      ]"
    >
      Total votes: {{ totalVotes }}
    </div>
  </BaseContainer>
</template>
