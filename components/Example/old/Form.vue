<script setup lang="ts">
import { Input, Button } from '~/types'
import type { Select } from '~/types'
import useFileList from '~/composables/BaseDrag/file-list.ts'

interface FormsField {
  name: string
  surname: string
  phone: string
  mail: string
  checkbox: boolean
  radio: string
  select: Select.Option | null
  file: File | null
}

// NOTE: Тут тестирую новый тип файлов
const { files, addFiles, removeFile } = useFileList()

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = [...target.files]
    addFiles(files)
    target.value = ''
  }
}
// NOTE: Тут заканчивается этот код

type FormatType = 'formData' | 'json'

const initialFormState: FormsField = {
  name: '',
  surname: '',
  phone: '',
  mail: '',
  checkbox: false,
  radio: 'idiot',
  select: null,
  file: null
}

const isLoading = ref<boolean>(false)
const isSubmit = ref<boolean>(false)

const formState = reactive<FormsField>({ ...initialFormState })

const formReset = (): void => {
  Object.assign(formState, initialFormState)
}

const selectOptions = [
  {
    id: 1,
    value: 'Вариант первый'
  },
  {
    id: 2,
    value: 'Вариант второй'
  },
  {
    id: 3,
    value: 'Вариант третий'
  },
  {
    id: 4,
    value: 'Вариант четвертый'
  },
  {
    id: 5,
    value: 'Вариант пятый'
  }
]

function prepareResponseData(data: FormsField, format: FormatType): FormData | string {
  if (format === 'formData') {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value ?? ''))
    })
    return formData
  }
  return JSON.stringify(data)
}

const onSubmit = (e: Event) => {
  isLoading.value = true
  setTimeout(() => {
    isSubmit.value = true
    isLoading.value = false
    const data = prepareResponseData(formState, 'json')
    console.log(data)
    formReset()
  }, 3000)
  // console.log((form.elements.namedItem('name') as HTMLInputElement).value)
}

const getFullName = computed<string>(() => {
  return `${formState.name?.trim() || ''} ${formState.surname?.trim() || ''}`
})
</script>

<template>
  <div class="main-form">
    <form class="main-form__form" action="#" method="post" @submit.prevent="onSubmit">
      <div class="main-form__wrapper">
        <h2 class="main-form__title">Тренировочная форма</h2>
        <div class="main-form__grid">
          <UiInput
            id="name"
            v-model.capitalize="formState.name"
            name="name"
            label="Ваше имя"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свое имя"
            @click="formState.name = ''"
          />
          <UiInput
            id="surname"
            v-model.capitalize="formState.surname"
            name="surname"
            error-message="Заполните поле"
            label="Ваша фамилия"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свою фамилию"
            @blur="($event) => (formState.mail = 'blurAutoMail@mail.com')"
          />
          <UiInput
            id="phone"
            v-model.number="formState.phone"
            mask="default"
            name="surname"
            label="Ваш телефон"
            :required="true"
            :type="Input.Types.PHONE"
            placeholder="+7(999)-999-99-99"
          />
          <UiInput
            id="mail"
            v-model="formState.mail"
            name="mail"
            label="Ваша почта"
            :required="true"
            :type="Input.Types.EMAIL"
            placeholder="Введите вашу почту"
          />
          <div class="main-form__group">
            <h3 class="main-form__group-title">Укажите ваш пол</h3>
            <div class="main-form__radio-group">
              <UiRadio id="male" v-model="formState.radio" name="gender" value="male" label="Мужской" />
              <UiRadio id="female" v-model="formState.radio" name="gender" value="female" label="Женский" />
              <UiRadio id="idiot" v-model="formState.radio" name="gender" value="idiot" label="Квадробер" />
            </div>
            <div class="main-form__select">
              <h3 class="main-form__group-title">Выберете понравившейся вариант</h3>
              <UiSelect v-model="formState.select" :options="selectOptions" />
            </div>
          </div>
          <div class="main-form__group">
            <h3 class="main-form__group-title">Загрузить файл</h3>
            <UiFile id="file" v-model="formState.file" name="file" :max-size="2" />
            <BaseDropZone v-slot="{ dropZoneActive }" class="drop-area" @files-dropped="addFiles">
              <label for="file-input">
                <span v-if="dropZoneActive">
                  <span>Drop Them Here</span>
                  <span class="smaller">to add them</span>
                </span>
                <span v-else>
                  <span>Drag Your Files Here</span>
                  <span class="smaller">
                    or <strong><em>click here</em></strong> to select files
                  </span>
                </span>
                <input id="file-input" type="file" multiple @change="onInputChange" />
              </label>
              <ul v-show="files.length">
                <UiFilePrewiew v-for="file in files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
              </ul>
            </BaseDropZone>
          </div>
        </div>
        <div class="main-form__footer">
          <UiCheckbox
            id="agree"
            v-model="formState.checkbox"
            name="agree"
            :error-message="formState.checkbox ? '' : 'Необходимо дать свое согласие'"
          >
            Принимаю пользовательское соглашение
          </UiCheckbox>
          <UiButton
            text="Отправить форму"
            :loading="isLoading"
            class="main-form__button"
            :type="Button.Types.SUBMIT"
            :mods="['primary']"
          />
        </div>
      </div>
    </form>
    <div class="main-form__result">
      <h3 class="main-form__result-title">Проверьте ваши данные:</h3>
      <p class="main-form__result-name">
        ФИО: <span>{{ getFullName }}</span>
      </p>
      <a href="#" class="main-form__result-mail">
        Номер телефона: <span>{{ formState.phone }}</span>
      </a>
      <a href="#" class="main-form__result-mail">
        Почта: <span>{{ formState.mail }}</span>
      </a>
      <p class="main-form__result-note">
        Пользовательское соглашение <b>{{ formState.checkbox ? 'принято' : 'не принято' }}</b>
      </p>
      <p class="main-form__result-note">
        Ваш пол: <b>{{ formState.radio }}</b>
      </p>
      <p class="main-form__result-note">
        Вы выбрали: <b>{{ formState.select?.value ?? '' }}</b>
      </p>
      <p class="main-form__result-note">
        Вы загрузили файл: <b>{{ formState.file?.name }}</b>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-form {
  padding: 5rem 0;

  &__wrapper {
    padding: 5rem 3rem;
    background-color: $color-black-soft;
    border-radius: 2rem;
  }

  &__title {
    text-align: center;
    color: $color-default-white;
    font-size: 3.4rem;
    line-height: 1.2;
    margin: 0 0 3rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  &__wide {
    grid-column: span 2;
  }

  &__group-title {
    font-size: 16px;
    color: $color-default-white;
    margin: 0 0 20px;
  }

  &__radio-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__select {
    margin: 4rem 0 0;
  }

  &__result {
    color: $color-default-white;
    display: flex;
    flex-direction: column;
    margin: 3rem auto 0;
    max-width: 60rem;
  }

  &__result-title {
    font-size: 2.4rem;
    line-height: 1.3;
    margin: 0 0 2.5rem;
    text-align: center;
  }

  &__result-name {
    font-size: 2rem;
    line-height: 1.3;
    margin: 0 0 1.5rem;
  }

  &__result-mail {
    font-size: 1.8rem;
    line-height: 1.3;
    color: $color-light-perp-soft;
  }

  &__result-note {
    margin: 0;
    font-size: 16px;
    line-height: 1.3;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0 0;
  }

  &__button {
    width: 30rem;
    margin: 4rem 0 0;
  }
}

.drop-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: #fff5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 30%);
  transition: 0.2s ease;

  &[data-active='true'] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 50%);
    background: #fffc;
  }
}
</style>
