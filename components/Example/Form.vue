<script setup lang="ts">
import { Input, Button } from '@/types'
import type { Select } from '@/types'
import { useTemplateRef } from 'vue'
import { useForm } from 'vee-validate'
import generalSchema from '~/utils/validationSchemas/exampleFormSchema'

interface FormsField {
  name: string
  surname: string
  phone: string
  mail: string
  checkbox: boolean
  radio: string
  select: Select.Option | null
  files: File[]
}

interface FileUploadComponent {
  resetFileInput: () => void
}

type FormatType = 'formData' | 'json'

const initialFormState: FormsField = {
  name: '',
  surname: '',
  phone: '',
  mail: '',
  checkbox: false,
  radio: 'idiot',
  select: null,
  files: []
}

const { handleSubmit, resetForm } = useForm({
  validationSchema: generalSchema(['email', 'phone', 'name', 'surname', 'agree']),
  validateOnMount: false,
  initialValues: {
    agree: false
  }
})

const isLoading = ref<boolean>(false)
const isSubmit = ref<boolean>(false)
const fileUploadComponent = useTemplateRef<FileUploadComponent>('fileUploadRef')

const formState = reactive<FormsField>({ ...initialFormState })

const getFullName = computed<string>(() => {
  return `${formState.name?.trim() || ''} ${formState.surname?.trim() || ''}`
})

const selectOptions = [
  {
    id: 1,
    value: 'first-choose',
    text: 'Вариант первый'
  },
  {
    id: 2,
    value: 'second-choose',
    text: 'Вариант второй'
  },
  {
    id: 3,
    value: 'third-choose',
    text: 'Вариант третий'
  }
]

const formReset = (): void => {
  fileUploadComponent.value?.resetFileInput()
  Object.assign(formState, initialFormState)
}

const prepareResponseData = (data: FormsField, format: FormatType): FormData | string => {
  if (format === 'formData') {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value ?? ''))
    })
    return formData
  }
  return JSON.stringify(data)
}

const onSubmit = handleSubmit((values) => {
  isLoading.value = true
  setTimeout(() => {
    isSubmit.value = true
    isLoading.value = false
    const data = prepareResponseData(formState, 'formData')
    console.log(data)
    console.log(values)
    formReset()
    resetForm()
  }, 3000)
})
</script>

<template>
  <div class="main-form">
    <form class="main-form__form" action="#" method="post" novalidate @submit.prevent="onSubmit">
      <div class="main-form__wrapper">
        <h2 class="main-form__title">Тренировочная форма</h2>
        <div class="main-form__grid">
          <UiInput
            id="name"
            v-model="formState.name"
            name="name"
            label="Ваше имя"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свое имя"
            modification="capitalize"
            @click="formState.name = ''"
          />
          <UiInput
            id="surname"
            v-model="formState.surname"
            name="surname"
            error-message="Заполните поле"
            label="Ваша фамилия"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свою фамилию"
            modification="capitalize"
            @blur="formState.mail = 'blurAutoMail@mail.com'"
          />
          <UiInput
            id="phone"
            v-model="formState.phone"
            mask="default"
            name="phone"
            label="Ваш телефон"
            :required="true"
            :type="Input.Types.PHONE"
            placeholder="+7(999)-999-99-99"
          />
          <UiInput
            id="email"
            v-model="formState.mail"
            name="email"
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
            <UiFile
              id="file"
              ref="fileUploadRef"
              v-model="formState.files"
              name="file"
              :max-size="2"
              :multiple="true"
            />
          </div>
        </div>
        <div class="main-form__footer">
          <UiCheckbox id="agree" name="agree" value="true" @change-status="formState.checkbox = $event">
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
        Вы выбрали: <b>{{ formState.select?.text ?? '' }}</b>
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
</style>
