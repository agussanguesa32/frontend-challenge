<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex-1 w-full bg-gradient-to-b from-zinc-900 to-zinc-800 min-h-screen">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-zinc-100 mb-6 tracking-tight">
            Bindin
            <span class="text-indigo-400">.</span>
          </h1>
          <p class="text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            Create and share polls and forms easily and professionally
          </p>

          <!-- Cards Section -->
          <div class="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <div
              class="bg-zinc-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-700/50 group hover:border-indigo-500/50 hover:scale-[1.02] text-center"
              @click="router.push('/polls')"
            >
              <div
                class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2
                class="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors duration-200 mb-2"
              >
                Polls
              </h2>
              <p class="text-zinc-400 leading-relaxed">
                Create and manage single-question polls with multiple choice answers
              </p>
            </div>

            <div
              class="bg-zinc-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-700/50 group hover:border-indigo-500/50 hover:scale-[1.02] text-center"
              @click="router.push('/forms')"
            >
              <div
                class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2
                class="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors duration-200 mb-2"
              >
                Forms
              </h2>
              <p class="text-zinc-400 leading-relaxed">
                Build complex forms with different types of questions and responses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
