import { ref } from 'vue'
import type { Ref } from 'vue'

export class UploadableFile {
  file: File

  id: string

  url: string

  status: string | null

  isImage: boolean

  constructor(file: File) {
    this.file = file
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
    this.url = URL.createObjectURL(file)
    this.status = null
    this.isImage = this.getImageType(file)
  }

  private getImageType = (file: File): boolean => {
    const fileExtension: string = file.name.split('.').pop() ?? ''
    return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)
  }
}

export default () => {
  const files: Ref<UploadableFile[]> = ref([])

  const fileExists = (otherId: string): boolean => {
    return files.value.some(({ id }) => id === otherId)
  }

  function addFiles(newFiles: File[]) {
    const newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file)
    if (index > -1) files.value.splice(index, 1)
  }

  return { files, addFiles, removeFile }
}
