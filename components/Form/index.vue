<script setup lang="ts">
defineOptions({
  name: 'Form'
})
const state = reactive<Record<string, string>>({
  name: '',
  surname: '',
  phone: '',
  mail: ''
})

const getFullName = computed<string>(() => {
  return `${state.name?.trim() || ''} ${state.surname?.trim() || ''}`
})
</script>

<template>
  <form class="main-form" action="#" method="post">
    <div class="main-form__wrapper">
      <h2 class="main-form__title">Тренировочная форма</h2>
      <div class="main-form__grid">
        <UiInputCurrent
          id="name"
          v-model="state.name"
          name="name"
          error-message="Заполните поле"
          label="Ваше имя"
          required
          type="text"
        />
        <UiInputCurrent
          id="surname"
          v-model="state.surname"
          name="surname"
          label="Ваша фамилия"
          required
          type="text"
          placeholder="Введите свою фамилию"
        />
        <UiInputCurrent
          id="phone"
          v-model="state.phone"
          name="phone"
          label="Ваш номер телефона"
          required
          type="tel"
          placeholder="Введите свой номер телефона"
        />
        <UiInputCurrent
          id="mail"
          v-model="state.mail"
          name="mail"
          label="Ваша почта"
          required
          type="mail"
          placeholder="Введите свою почту"
        />
        <div class="main-form__result main-form__wide">
          <h3 class="main-form__result-title">Проверьте ваши данные:</h3>
          <p class="main-form__result-name">ФИО: {{ getFullName ? getFullName : '' }}</p>
          <a href="#" class="main-form__result-mail">Номер телефона: {{ state.phone }}</a>
          <a href="#" class="main-form__result-mail">Почта: {{ state.mail }}</a>
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
