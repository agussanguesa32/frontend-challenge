export type QuestionType = 'short' | 'long' | 'number' | 'radio'

export interface FormQuestion {
  id: string
  type: QuestionType
  text: string
  required: boolean
  placeholder?: string
  options?: string[]
}

export interface Form {
  id: string
  title: string
  questions: FormQuestion[]
  responses: FormResponse[][]
}

export interface FormResponse {
  questionId: string
  value: string | number
}

export interface FormSubmission {
  formId: string
  responses: FormResponse[]
}
