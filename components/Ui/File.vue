<script setup lang="ts">
import { FileTypes } from '@/types'
import { useTemplateRef } from 'vue'

const initialFileData: FileTypes.Data = {
  name: '',
  size: 0,
  type: '',
  fileExtension: '',
  url: '',
  isImage: false,
  isUploaded: false
}

const props = withDefaults(defineProps<FileTypes.Custom>(), {
  modelValue: null,
  id: '',
  name: '',
  accept: '.jpg, .png, .pdf',
  maxSize: 1
})

// NOTE: я так и не понял как эту хеработу типизировать!
const model = defineModel<File | null | string>('modelValue', { default: null })

// NOTE: объявляю рефы
const uploadReady = ref<boolean>(true)
const errors = ref<string[]>([])
const file = reactive<FileTypes.Data>({ ...initialFileData })
const inputElement = useTemplateRef<HTMLInputElement>('input-file')
// console.log(inputElement.value)

// NOTE: Тут computed'ы
const getFileType = computed<string>(() => {
  return props.accept?.split(', ').reduce((acc: string, cur: string, idx: number): string => {
    const regCur = cur.replace(/^./, '')
    return idx > 0 ? `${acc} / ${regCur}` : acc + regCur
  }, '')
})

const getFileIcon = computed<string>(() => {
  if (!file.fileExtension) {
    return 'icon-img-default'
  }

  // NOTE: Вот тут нужен твой совет и помощь) Хотел как то красиво сделать через enum, но не уверен уместен ли он тут
  const extension = file.fileExtension.toUpperCase() as keyof typeof FileTypes.Image
  return FileTypes.Image[extension] || 'icon-img-default'
})

// NOTE: Ниже три функции не стал делать computed вроде как это не нужно, но могу ошибаться, поправь если не так)

// NOTE: тут происходит просто пуш в массив ошибок, если они есть, и если я правильно понял, то для этого не нужно computed
const isFileSizeValid = (fileSize: number): void => {
  if (fileSize > props.maxSize) {
    errors.value.push(`Размер файла не должен превышать ${props.maxSize} Мб`)
  }
}

const isFileTypeValid = (fileExtension: string): void => {
  const filesType = props.accept.split(', ').map((index) => index.replace(/^./, ''))
  if (!filesType.includes(fileExtension)) {
    errors.value.push(`Тип файла должен быть одним из: ${props.accept}`)
  }
}

// NOTE: Общая валидация файлов
const isFileValid = (file: File): boolean => {
  if (!file) return false
  isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100)
  isFileTypeValid(file.name.split('.').pop() ?? '')
  return errors.value.length === 0
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  // NOTE: Тут из за этого ts пришлось так писать, по другому ни как не пропускал
  if (!target?.files) return
  if (!isFileValid(target?.files[0])) return
  const fileField = target.files[0]
  const fileSize = Math.round((fileField.size / 1024 / 1024) * 100) / 100
  const fileExtension: string = fileField.name.split('.').pop() ?? ''
  const fileName = fileField.name.split('.').shift()

  // NOTE: Тут вот такую штуку ?? false тоже пришлось писать из за ts. Потому что он думает, что может быть пустые значения
  const isImage = ['jpg', 'jpeg', 'png'].includes(fileExtension) ?? false
  console.log(fileSize, fileExtension, fileName, file.isImage)

  const reader = new FileReader()
  reader.addEventListener(
    'load',
    () => {
      Object.assign(file, {
        name: fileName,
        size: fileSize,
        type: fileField.type,
        fileExtension,
        url: reader.result as string,
        isImage,
        isUploaded: true
      })
    },
    false
  )

  reader.readAsDataURL(fileField)
  model.value = fileField
}

const resetFileInput = async (): Promise<void> => {
  uploadReady.value = false

  // NOTE: Правильно я тут сделал через nextTick ? Не совсем понял как он работает и нужен ли он тут
  await nextTick()

  if (inputElement.value) {
    inputElement.value.value = ''
  }
  uploadReady.value = true
  Object.assign(file, initialFileData)
}
</script>

<template>
  <div class="custom-file">
    <div class="custom-file__wrapper">
      <input
        :id="id"
        ref="input-file"
        type="file"
        class="custom-file__field visually-hidden"
        :name="name"
        :accept="accept"
        @change="handleFileChange"
      />
      <label :for="id" class="custom-file__label">
        <span class="custom-file__initial">
          <BaseIconT class="custom-file__icon" name="icon-upload" />
          <span class="custom-file__text">Загрузить файл</span>
          <span class="custom-file__note">Формат файла: {{ getFileType }}</span>
          <span class="custom-file__note">Размер файла: до {{ maxSize }} Мб</span>
        </span>
      </label>
      <Transition>
        <div v-if="file.isUploaded" class="custom-file__result">
          <div v-if="file.isImage" class="custom-file__result-box">
            <img :src="file.url" alt="" data-not-lazy />
          </div>
          <div v-if="!file.isImage" class="custom-file__result-box">
            <BaseIconT :name="getFileIcon" class="custom-file__result-icon" />
          </div>
          <button class="custom-file__delete" type="button" aria-label="Очистить файл" @click="resetFileInput">
            <BaseIconT name="icon-close" />
          </button>
        </div>
      </Transition>
    </div>
    <Transition>
      <span v-if="file.isUploaded" class="custom-file__file-name">{{ `${file.name}.${file.fileExtension}` }}</span>
    </Transition>
    <div v-if="errors.length > 0" class="custom-file__errors">
      <span v-for="error in errors" :key="error" class="custom-file__error">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-file {
  display: flex;
  flex-direction: column;

  $root: &;

  &__field {
    @include focus {
      + #{$root}__label {
        border-color: $color-default-white;
        background-color: #292d3e;

        #{$root}__initial {
          color: #fff;
        }
      }
    }
  }

  &__wrapper {
    position: relative;
    border-radius: 1.5rem;
    overflow: hidden;
  }

  &__label {
    background-color: #a3a3a3;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid $color-transparent;
    padding: 2rem 1rem;
    cursor: pointer;
    border-radius: 1.5rem;
    transition: border-color $transition, background-color $transition;

    @include hover {
      border-color: $color-default-white;
      background-color: #292d3e;

      #{$root}__initial {
        color: #fff;
      }
    }
  }

  &__initial {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #363636;
    transition: color $transition;
  }

  &__icon {
    height: 2rem;
    width: 2rem;
    margin: 0 0 0.5rem;
  }

  &__text {
    font-size: 1.6rem;
    line-height: 1;
    margin: 0 0 1rem;
  }

  &__note {
    font-size: 1rem;
    line-height: 1.2rem;
  }

  &__result {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #a3a3a3;
  }

  &__result-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &__result-icon {
    height: 9rem;
    width: auto;
  }

  &__delete {
    position: absolute;
    right: 1rem;
    top: 1rem;
    padding: 0;
    border: none;
    background-color: $color-transparent;
    height: 3rem;
    width: 3rem;
    outline: 1px solid $color-transparent;
    border-radius: 50%;
    transition: color $transition, outline $transition;
    cursor: pointer;

    @include hover-focus {
      outline-color: $color-default-white;
      color: $color-default-white;
    }
  }

  &__file-name {
    margin: 1rem 0 0;
    color: $color-default-white;
    font-size: 1.4rem;
    line-height: 1;
  }

  &__errors {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    margin: 1rem 0 0;
    color: $color-error;
  }
}
</style>
