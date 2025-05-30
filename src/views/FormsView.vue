<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '@/stores/form.store'
import CreateForm from '@/components/forms/CreateForm.vue'
import RespondForm from '@/components/forms/RespondForm.vue'
import FormResults from '@/components/forms/FormResults.vue'

const formStore = useFormStore()
const activeTab = ref<'create' | 'active' | 'results'>('active')

const tabs = [
  { id: 'create', label: 'Create Form' },
  { id: 'active', label: 'Active Forms' },
  { id: 'results', label: 'View Results' },
]
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1
      class="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center"
    >
      Forms Dashboard
    </h1>

    <!-- Tab Selector -->
    <div class="max-w-3xl mx-auto mb-8">
      <div
        class="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-1 rounded-2xl backdrop-blur-sm border border-zinc-700/30"
      >
        <div class="grid grid-cols-3 gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id as 'create' | 'active' | 'results'"
            class="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group"
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

    <!-- Content Sections -->
    <div class="max-w-4xl mx-auto">
      <!-- Create Form Section -->
      <div v-if="activeTab === 'create'" class="animate-fade-in">
        <CreateForm />
      </div>

      <!-- Active Forms Section -->
      <div v-if="activeTab === 'active'" class="space-y-8 animate-fade-in">
        <template v-if="formStore.getAllForms().length">
          <RespondForm />
        </template>

        <div
          v-else
          class="text-center py-12 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-zinc-700/30"
        >
          <p class="text-zinc-400 text-lg">No forms created yet. Be the first to create one!</p>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="activeTab === 'results'" class="space-y-8 animate-fade-in">
        <template v-if="formStore.getAllForms().length">
          <FormResults />
        </template>

        <div
          v-else
          class="text-center py-12 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-zinc-700/30"
        >
          <p class="text-zinc-400 text-lg">No forms available to show results.</p>
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
