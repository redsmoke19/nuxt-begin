export namespace DropZone {
  export interface Emit {
    (event: 'files-dropped', value: any): void
  }
}
