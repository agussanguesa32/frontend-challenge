import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Form, FormQuestion, FormResponse, FormSubmission } from '@/types/form.types'

export const useFormStore = defineStore('form', () => {
  const forms = ref<Form[]>([])

  const createForm = (title: string, questions: Omit<FormQuestion, 'id'>[]) => {
    const newForm: Form = {
      id: crypto.randomUUID(),
      title,
      questions: questions.map((q) => ({
        ...q,
        id: crypto.randomUUID(),
      })),
      responses: [],
    }
    forms.value.push(newForm)
    return newForm
  }

  const submitFormResponse = (submission: FormSubmission) => {
    const form = forms.value.find((f) => f.id === submission.formId)
    if (form) {
      form.responses.push(submission.responses)
    }
  }

  const getForm = (id: string) => {
    return forms.value.find((form) => form.id === id)
  }

  const getAllForms = () => {
    return forms.value
  }

  return {
    forms,
    createForm,
    submitFormResponse,
    getForm,
    getAllForms,
  }
})
