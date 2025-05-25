import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Poll, PollOption } from '@/types/poll.types'

export const usePollStore = defineStore('poll', () => {
  const polls = ref<Poll[]>([])

  const createPoll = (question: string, options: string[]) => {
    const newPoll: Poll = {
      id: crypto.randomUUID(),
      question,
      options: options.map((text) => ({
        id: crypto.randomUUID(),
        text,
        votes: 0,
      })),
      totalVotes: 0,
    }
    polls.value.push(newPoll)
    return newPoll
  }

  const submitResponse = (pollId: string, optionIndex: number) => {
    const poll = polls.value.find((p) => p.id === pollId)
    if (poll && optionIndex >= 0 && optionIndex < poll.options.length) {
      poll.options[optionIndex].votes++
      poll.totalVotes++
    }
  }

  const getPoll = (id: string) => {
    return polls.value.find((poll) => poll.id === id)
  }

  const getAllPolls = () => {
    return polls.value
  }

  return {
    polls,
    createPoll,
    submitResponse,
    getPoll,
    getAllPolls,
  }
})
