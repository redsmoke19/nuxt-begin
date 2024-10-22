<script setup lang="ts">
import Input from '@ui/Input.vue'
import { computed, ref } from 'vue'

const name = ref<string>()
const surname = ref<string>()
const mail = ref<string>()
const phone = ref<string>()

const onName = (e) => {
  name.value = e
}

const onSurname = (e) => {
  surname.value = e
}

const onPhoneInput = (e) => {
  phone.value = e.replace(/\D/g, '')
}

const getFullName = computed(() => {
  return `${name.value?.trim() || ''} ${surname.value?.trim() || ''}`
})
</script>

<template>
  <form class="main-form" action="#" method="post">
    <div class="main-form__wrapper">
      <h2 class="main-form__title">Тренировочная форма</h2>
      <div class="main-form__grid">
        <Input
          id="name"
          :model-value="name"
          name="name"
          error-message="Заполните поле"
          label="Ваше имя"
          :required="true"
          type="text"
          placeholder="Введите свое имя"
          @update:on-input="onName"
        />
        <Input
          id="surname"
          :model-value="surname"
          name="surname"
          label="Ваша фамилия"
          :required="true"
          type="text"
          placeholder="Введите свою фамилию"
          @update:on-input="onSurname"
        />
        <Input
          id="phone"
          :model-value="phone"
          name="phone"
          label="Ваш номер телефона"
          :required="true"
          type="tel"
          placeholder="Введите свой номер телефона"
          @update:on-input="onPhoneInput"
        />
        <Input
          id="mail"
          :model-value="mail"
          name="mail"
          label="Ваша почта"
          :required="true"
          type="mail"
          placeholder="Введите свою почту"
          @update:on-input="($event) => (mail = $event)"
        />
        <div class="main-form__result main-form__wide">
          <h3 class="main-form__result-title">Проверьте ваши данные:</h3>
          <p class="main-form__result-name">ФИО: {{ getFullName ? getFullName : '' }}</p>
          <a href="#" class="main-form__result-mail">Номер телефона: {{ phone }}</a>
          <a href="#" class="main-form__result-mail">Почта: {{ mail }}</a>
        </div>
      </div>
    </div>
  </form>
</template>

<!--@apply-emit="($event) => (name = $event)"-->

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
    align-items: center;
    flex-direction: column;
  }

  &__result-title {
    font-size: 24px;
    line-height: 1.3;
    margin: 0 0 25px;
  }

  &__result-name {
    font-size: 20px;
    line-height: 1.3;
    margin: 0 0 15px;
  }

  &__result-mail {
    font-size: 18px;
    line-height: 1.3;
    color: $color-light-perp-soft;
  }
}
</style>
