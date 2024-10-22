<script setup lang="ts">
import InputModel from '~/components/Ui/InputModel.vue'
import { computed, ref } from 'vue'

interface FormsField {
  name: string
  surname: string
  phone: string
  mail: string
}

const isSubmit = ref<boolean>(false)

const field = ref<FormsField>({
  name: '',
  surname: '',
  phone: '',
  mail: ''
})

const onSubmit = () => {
  isSubmit.value = true
}

const getFullName = computed(() => {
  return `${field.value.name?.trim() || ''} ${field.value.surname?.trim() || ''}`
})
</script>

<template>
  <div class="main-form">
    <form class="main-form__form" action="#" method="post" @submit.prevent="onSubmit">
      <div class="main-form__wrapper">
        <h2 class="main-form__title">Тренировочная форма 2</h2>
        <div class="main-form__grid">
          <InputModel
            id="name"
            v-model.capitalize="field.name"
            name="name"
            label="Ваше имя"
            :required="true"
            type="text"
            placeholder="Введите свое имя"
          />
          <InputModel
            id="surname"
            v-model.capitalize="field.surname"
            name="surname"
            error-message="Заполните поле"
            label="Ваша фамилия"
            :required="true"
            type="text"
            placeholder="Введите свою фамилию"
          />
          <InputModel
            id="phone"
            v-model.number="field.phone"
            name="surname"
            label="Ваш телефон"
            :required="true"
            type="tel"
            placeholder="Введите ваш номер телефона"
          />
          <InputModel
            id="mail"
            v-model="field.mail"
            name="mail"
            label="Ваша почта"
            :required="true"
            type="email"
            placeholder="Введите вашу почту"
          />
        </div>
        <button class="main-form__button main-form__wide" type="submit">Отправить форму</button>
      </div>
    </form>
    <div class="main-form__result">
      <h3 class="main-form__result-title">Проверьте ваши данные:</h3>
      <p class="main-form__result-name">
        ФИО: <span v-if="isSubmit">{{ getFullName ? getFullName : '' }}</span>
      </p>
      <a href="#" class="main-form__result-mail">
        Номер телефона: <span v-if="isSubmit">{{ field.phone }}</span>
      </a>
      <a href="#" class="main-form__result-mail">
        Почта: <span v-if="isSubmit">{{ field.mail }}</span>
      </a>
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
    margin: 4rem auto 0;
    cursor: pointer;
    transition: background-color $transition;

    @include hover-focus {
      background-color: rgba($color-light-perp-light, 0.8);
    }
  }
}
</style>
