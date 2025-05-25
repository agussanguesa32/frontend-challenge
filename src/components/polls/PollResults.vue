<script setup lang="ts">
import { computed } from 'vue'
import type { Poll } from '@/types/poll.types'

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
  <div
    class="max-w-2xl w-full mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800/50 backdrop-blur-sm px-2 sm:px-6 py-4 sm:py-8"
  >
    <div class="p-2 sm:p-8">
      <h3
        class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 text-center"
      >
        {{ poll.question }}
      </h3>
      <div class="text-zinc-400 mb-4 sm:mb-6 text-center">Results</div>
      <div class="space-y-4 sm:space-y-6">
        <div v-for="option in poll.options" :key="option.id" class="space-y-2 sm:space-y-3">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <span class="text-base sm:text-lg text-zinc-200 break-words">{{ option.text }}</span>
            <span
              class="text-lg sm:text-xl font-semibold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent"
            >
              {{ getPercentage(option.votes) }}%
            </span>
          </div>
          <div class="relative">
            <div class="absolute inset-0 bg-zinc-700/50 rounded-full"></div>
            <div
              class="relative h-2 sm:h-3 bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-400 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: getPercentage(option.votes) + '%' }"
            >
              <div
                class="absolute -right-1 -top-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full shadow-lg transform scale-0 transition-transform duration-300"
                :class="{ 'scale-100': option.votes > 0 }"
              ></div>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-zinc-400 text-right">
            {{ option.votes }} {{ option.votes === 1 ? 'vote' : 'votes' }}
          </p>
        </div>
        <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <p class="text-base sm:text-lg text-zinc-400">Total votes</p>
            <p
              class="text-xl sm:text-2xl font-bold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent"
            >
              {{ totalVotes }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
