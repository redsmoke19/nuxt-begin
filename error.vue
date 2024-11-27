<script setup lang="ts">
import type { NuxtError } from '#app'

// NOTE: Тут ExLint ругается на error типо должно быть значение по умолчанию
defineProps({
  error: Object as () => NuxtError
})

const handleClearError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <BaseContainer>
      <div class="error-page__wrapper">
        <p class="error-page__code">{{ error?.statusCode }}</p>
        <p class="error-page__text"><b>Ooops.</b> Произошла какая-то ошибка</p>
        <p class="error-page__message">Ошибка: {{ error?.statusMessage }}</p>
        <UiButton text="Вернись домой..." @click="handleClearError" />
      </div>
    </BaseContainer>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  background-color: #1a1a1a;
  display: flex;
  min-height: 100vh;

  &__wrapper {
    padding: 6rem 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__code {
    margin: 0 0 6rem;
    color: $color-nuxt;
    font-size: 14rem;
    line-height: 1;
    font-weight: 700;
  }

  &__text {
    font-size: 5rem;
    color: $color-default-white;
    margin: 0 0 3rem;
  }

  &__message {
    color: $color-error;
    font-size: 2.5rem;
    text-align: center;
    margin: 0 0 5rem;
  }
}
</style>
