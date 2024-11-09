export namespace FileTypes {
  export enum Image {
    PDF = 'icon-pdf'
  }

  export interface Custom {
    modelValue?: File | null
    id: string
    name: string
    accept?: string
    maxSize?: number
  }

  export interface Data {
    name: string
    size: number
    type: string
    fileExtension: string
    url: string
    isImage: boolean
    isUploaded: boolean
  }
}
