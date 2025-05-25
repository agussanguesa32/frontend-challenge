export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
}

export interface PollVote {
  pollId: string
  optionId: string
}
