export namespace Radio {
  export interface Model {
    id: string
    name: string
    label?: string
    required?: boolean
    value?: string
  }

  export interface Emits {
    (event: 'update:modelValue', value: boolean): void
  }
}
