export namespace Checkbox {
  export interface Model {
    id: string
    name: string
    label?: string
    required?: boolean
    errorMessage?: string
    value?: string
  }

  export interface Emits {
    (event: 'update:modelValue', value: boolean): void
    (event: 'changeStatus', value: boolean): void
  }
}
