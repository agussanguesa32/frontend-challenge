<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form.store'
import type { Form, FormResponse } from '@/types/form.types'
import { toast } from 'vue-sonner'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseRadioGroup from '@/components/base/BaseRadioGroup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseTitle from '@/components/base/BaseTitle.vue'

const props = defineProps<{
  form: Form
}>()

const formStore = useFormStore()
const responses = ref<Record<string, string | number | null>>({})

// Inicializar responses para preguntas de tipo radio como null
onMounted(() => {
  props.form.questions.forEach((q) => {
    if (q.type === 'radio') {
      responses.value[q.id] = null
    }
  })
})

const isValid = computed(() => {
  return props.form.questions.every((q) => {
    if (!q.required) return true
    const response = responses.value[q.id]
    return response !== undefined && response !== '' && response !== null
  })
})

const submitForm = () => {
  if (!isValid.value) {
    toast.error('Please answer all required questions')
    return
  }
  const formattedResponses: FormResponse[] = props.form.questions.map((q) => {
    let value = responses.value[q.id]
    // Si es una pregunta de tipo radio, convertir el índice al texto de la opción
    if (q.type === 'radio' && typeof value === 'number' && q.options) {
      value = q.options[value] || ''
    }
    return {
      questionId: q.id,
      value: value ?? '',
    }
  })
  formStore.submitFormResponse({
    formId: props.form.id,
    responses: formattedResponses,
  })
  toast.success('Responses submitted successfully!')
  // Reset form
  responses.value = {}
  // Volver a inicializar radios
  props.form.questions.forEach((q) => {
    if (q.type === 'radio') {
      responses.value[q.id] = null
    }
  })
}
</script>

<template>
  <BaseContainer max-width="3xl" padding>
    <BaseTitle :level="2" class="mb-6">
      {{ form.title }}
    </BaseTitle>

    <div class="space-y-8">
      <div v-for="question in form.questions" :key="question.id" class="space-y-3 group">
        <!-- Short Answer -->
        <BaseInput
          v-if="question.type === 'short'"
          v-model="responses[question.id] as string"
          :label="question.text"
          :required="question.required"
          :placeholder="question.placeholder"
        />

        <!-- Long Answer -->
        <BaseTextarea
          v-if="question.type === 'long'"
          v-model="responses[question.id] as string"
          :label="question.text"
          :required="question.required"
          :placeholder="question.placeholder"
        />

        <!-- Number -->
        <BaseInput
          v-if="question.type === 'number'"
          v-model="responses[question.id] as number"
          type="number"
          :label="question.text"
          :required="question.required"
          :placeholder="question.placeholder"
        />

        <!-- Radio -->
        <BaseRadioGroup
          v-if="question.type === 'radio'"
          v-model="responses[question.id] as number | null"
          :options="question.options || []"
          :label="question.text"
          :required="question.required"
        />
      </div>

      <BaseButton @click="submitForm" variant="primary" full-width> Submit Form </BaseButton>
    </div>
  </BaseContainer>
</template>
