import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useViewStore = defineStore('view', () => {
  const isCompactView = ref(false)

  const toggleView = () => {
    isCompactView.value = !isCompactView.value
  }

  return {
    isCompactView,
    toggleView,
  }
})
