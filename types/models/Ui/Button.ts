export namespace Button {
  export enum Types {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset'
  }

  export interface Model {
    mods?: string[]
    text?: string
    url?: string
    type?: Types
  }
}
