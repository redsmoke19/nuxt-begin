export namespace Input {
  export enum Mask {
    PHONE = '+7(###)-###-##-##'
  }

  export enum Types {
    TEXT = 'text',
    EMAIL = 'email',
    NUMBER = 'number',
    PASSWORD = 'password',
    PHONE = 'tel',
    URL = 'url'
  }

  export interface Model {
    id: string
    name: string
    label?: string
    modelValue?: string | number
    placeholder?: string
    errorMessage?: string
    required?: boolean
    disabled?: boolean
    type?: Input.Types
    mask?: string
    modification?: string
  }

  export interface Emits {
    (event: 'update:modelValue', value: string | number): void
    (event: 'click'): void
    (event: 'blur', value: string | number): void
  }
}
