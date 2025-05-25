<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex-1 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-zinc-100 mb-4">Bindin</h1>
        <p class="text-xl text-zinc-400 mb-12">Create and share polls and forms easily</p>

        <div class="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          <div
            class="bg-zinc-800 shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow cursor-pointer border border-zinc-700 group"
            @click="router.push('/polls')"
          >
            <h2
              class="text-2xl font-bold text-zinc-100 mb-4 group-hover:text-indigo-400 transition-colors duration-200"
            >
              Polls
            </h2>
            <p class="text-zinc-400">
              Create and manage single-question polls with multiple choice answers
            </p>
          </div>

          <div
            class="bg-zinc-800 shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow cursor-pointer border border-zinc-700 group"
            @click="router.push('/forms')"
          >
            <h2
              class="text-2xl font-bold text-zinc-100 mb-4 group-hover:text-indigo-400 transition-colors duration-200"
            >
              Forms
            </h2>
            <p class="text-zinc-400">
              Build complex forms with different types of questions and responses
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
