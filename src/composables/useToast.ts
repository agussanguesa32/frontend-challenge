import { toast } from 'vue-sonner'

interface ToastOptions {
  description?: string
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options)
  }

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, options)
  }

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, options)
  }

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, options)
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
}
