export namespace Select {
  export interface Model {
    modelValue: string
    placeholder?: string
    options: string[]
    filter?: boolean
  }

  export interface Emits {
    (event: 'update:modelValue', value: string | null): void
  }
}
