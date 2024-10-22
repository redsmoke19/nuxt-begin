export interface Input {
  type: string
  name: string
  required?: boolean
  modelValue?: number | string
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  label?: string
  id: string
  className?: string
}
