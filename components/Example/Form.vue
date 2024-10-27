<script setup lang="ts">
import { Input } from '~/types'

interface FormsField {
  name: string
  surname: string
  phone: string
  mail: string
  checkbox: boolean
  radio: string
}

const isSubmit = ref<boolean>(false)

const field = reactive<FormsField>({
  name: '',
  surname: '',
  phone: '',
  mail: '',
  checkbox: false,
  radio: ''
})

const onSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement
  isSubmit.value = true
  const formData = new FormData()
  formData.append('name', field.name)
  formData.append('surname', field.surname)
  formData.append('phone', field.phone)
  formData.append('mail', field.mail)
  console.log((form.elements.namedItem('name') as HTMLInputElement).value)
}

const getFullName = computed<string>(() => {
  return `${field.name?.trim() || ''} ${field.surname?.trim() || ''}`
})
</script>

<template>
  <div class="main-form">
    <form class="main-form__form" action="#" method="post" @submit.prevent="onSubmit">
      <div class="main-form__wrapper">
        <h2 class="main-form__title">Тренировочная форма 2</h2>
        <div class="main-form__grid">
          <UiInput
            id="name"
            v-model="field.name"
            name="name"
            label="Ваше имя"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свое имя"
            @click="field.name = ''"
          />
          <UiInput
            id="surname"
            v-model.capitalize="field.surname"
            name="surname"
            error-message="Заполните поле"
            label="Ваша фамилия"
            :required="true"
            :type="Input.Types.TEXT"
            placeholder="Введите свою фамилию"
          />
          <UiInput
            id="phone"
            v-model.number="field.phone"
            name="surname"
            label="Ваш телефон"
            :required="true"
            :type="Input.Types.PHONE"
            placeholder="Введите ваш номер телефона"
          />
          <UiInput
            id="mail"
            v-model="field.mail"
            name="mail"
            label="Ваша почта"
            :required="true"
            :type="Input.Types.EMAIL"
            placeholder="Введите вашу почту"
          />
          <div class="main-form__group main-form__wide">
            <h3 class="main-form__group-title">Укажите ваш пол</h3>
            <div class="main-form__radio-group">
              <UiRadio id="male" v-model="field.radio" name="gender" value="male" label="Мужской" />
              <UiRadio id="female" v-model="field.radio" name="gender" value="female" label="Женский" />
              <UiRadio id="idiot" v-model="field.radio" name="gender" value="idiot" label="Квадробер" />
            </div>
          </div>
        </div>
        <div class="main-form__footer">
          <UiCheckbox
            id="agree"
            v-model="field.checkbox"
            name="agree"
            :error-message="field.checkbox ? '' : 'Необходимо дать свое согласие'"
          >
            Принимаю пользовательское соглашение
          </UiCheckbox>
          <button class="main-form__button main-form__wide" type="submit">Отправить форму</button>
        </div>
      </div>
    </form>
    <div class="main-form__result">
      <h3 class="main-form__result-title">Проверьте ваши данные:</h3>
      <p class="main-form__result-name">
        ФИО: <span v-if="isSubmit">{{ getFullName }}</span>
      </p>
      <a href="#" class="main-form__result-mail">
        Номер телефона: <span v-if="isSubmit">{{ field.phone }}</span>
      </a>
      <a href="#" class="main-form__result-mail">
        Почта: <span v-if="isSubmit">{{ field.mail }}</span>
      </a>
      <p class="main-form__result-note">
        Пользовательское соглашение <b>{{ field.checkbox ? 'принято' : 'не принято' }}</b>
      </p>
      <p class="main-form__result-note">
        Ваш пол: <b>{{ field.radio }}</b>
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
  }

  &__radio-group {
    display: flex;
    align-items: center;
    gap: 10px;
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
    border: none;
    background-color: $color-light-perp-light;
    padding: 1.5rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    margin: 4rem 0 0;
    cursor: pointer;
    transition: background-color $transition;

    @include hover-focus {
      background-color: rgba($color-light-perp-light, 0.8);
    }
  }
}
</style>
