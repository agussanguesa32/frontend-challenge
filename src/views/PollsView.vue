<script setup lang="ts">
import { ref } from 'vue'
import { usePollStore } from '@/stores/poll.store'
import { useViewStore } from '@/stores/view.store'
import CreatePoll from '@/components/polls/CreatePoll.vue'
import RespondPoll from '@/components/polls/RespondPoll.vue'
import PollResults from '@/components/polls/PollResults.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const pollStore = usePollStore()
const viewStore = useViewStore()
const activeTab = ref<'create' | 'active' | 'results'>('active')

const tabs = [
  { id: 'create', label: 'Create Poll' },
  { id: 'active', label: 'Active Polls' },
  { id: 'results', label: 'View Results' },
]
</script>

<template>
  <div class="container mx-auto px-2 sm:px-4 py-6 sm:py-8 w-full">
    <h1
      class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-6 sm:mb-8 text-center"
    >
      Polls Dashboard
    </h1>

    <!-- Tab Selector -->
    <div class="max-w-3xl w-full mx-auto mb-6 sm:mb-8">
      <div
        class="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-1 rounded-2xl backdrop-blur-sm border border-zinc-700/30"
      >
        <div class="grid grid-cols-3 gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id as 'create' | 'active' | 'results'"
            class="px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 relative overflow-hidden group"
            :class="{
              'bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20':
                activeTab === tab.id,
              'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50': activeTab !== tab.id,
            }"
          >
            <span class="relative z-10">{{ tab.label }}</span>
            <div
              v-if="activeTab === tab.id"
              class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-indigo-500/20 to-violet-500/20 animate-pulse"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- View Toggle Button -->
    <div
      v-if="activeTab !== 'create'"
      class="max-w-4xl w-full mx-auto mb-6 text-center hidden sm:block"
    >
      <BaseButton @click="viewStore.toggleView" variant="primary">
        {{ viewStore.isCompactView ? 'Vista Extendida' : 'Vista Compacta' }}
      </BaseButton>
    </div>

    <!-- Content Sections -->
    <div class="max-w-4xl w-full mx-auto">
      <!-- Create Poll Section -->
      <div v-if="activeTab === 'create'" class="animate-fade-in">
        <CreatePoll />
      </div>

      <!-- Active Polls Section -->
      <div v-if="activeTab === 'active'" class="animate-fade-in">
        <template v-if="pollStore.getAllPolls().length">
          <div :class="{ 'grid grid-cols-1 md:grid-cols-3 gap-4': viewStore.isCompactView }">
            <div
              v-for="poll in pollStore.getAllPolls()"
              :key="poll.id"
              :class="{
                'py-2 sm:py-4': !viewStore.isCompactView,
                'h-full flex flex-col': viewStore.isCompactView,
              }"
            >
              <RespondPoll :poll="poll" />
            </div>
          </div>
        </template>
        <div
          v-else
          class="text-center py-8 sm:py-12 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-zinc-700/30"
        >
          <p class="text-zinc-400 text-base sm:text-lg">
            No polls created yet. Be the first to create one!
          </p>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="activeTab === 'results'" class="animate-fade-in">
        <template v-if="pollStore.getAllPolls().length">
          <div :class="{ 'grid grid-cols-1 md:grid-cols-3 gap-4': viewStore.isCompactView }">
            <div
              v-for="poll in pollStore.getAllPolls()"
              :key="poll.id"
              :class="{
                'py-2 sm:py-4': !viewStore.isCompactView,
                'h-full flex flex-col': viewStore.isCompactView,
              }"
            >
              <PollResults :poll="poll" />
            </div>
          </div>
        </template>
        <div
          v-else
          class="text-center py-8 sm:py-12 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-zinc-700/30"
        >
          <p class="text-zinc-400 text-base sm:text-lg">No polls available to show results.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
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
