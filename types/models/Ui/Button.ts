export namespace Button {
  export enum Types {
    BUTTON = 'button',
    SUBMIT = 'submit'
  }

  export interface Model {
    mods?: string[]
    text?: string
    className?: string
    url?: string
    type?: Types
  }
}
