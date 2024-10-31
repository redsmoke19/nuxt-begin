export namespace Select {
  export type Option = {
    id: string | number
    value: string
  }

  export interface Model {
    modelValue: Option | null
    placeholder?: string
    options: Option[]
    filter?: boolean
  }

  export interface Emits {
    (event: 'update:modelValue', value: Option | null): void
  }
}
