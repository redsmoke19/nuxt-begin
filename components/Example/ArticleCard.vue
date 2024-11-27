<script setup lang="ts">
import formatDate from '~/utils/formatDate'
import type { Articles } from '@/types'

withDefaults(defineProps<Articles.Article>(), {
  id: 0,
  title: '',
  description: '',
  content: '',
  author_id: 0,
  created_at: ''
})
</script>

<template>
  <div class="article-card">
    <h2 class="article-card__title">{{ title }}</h2>
    <p class="article-card__description">{{ description }}</p>
    <div class="article-card__footer">
      <NuxtLink :to="`/articles/${id}`" class="article-card__link">Читать полностью</NuxtLink>
      <span class="article-card__date">{{ formatDate(created_at) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-card {
  min-height: 30rem;
  padding: 1.5rem 2rem;
  border: 1px solid $color-nuxt;
  border-radius: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    color: $color-default-white;
    font-size: 2.2rem;
    line-height: 1.3;
    margin: 0 0 2rem;
    font-weight: 600;
  }

  &__description {
    color: rgb(203, 213, 225);
    font-size: 1.6rem;
    line-height: 1.3;
    margin: 0 0 3rem;
  }

  &__footer {
    width: 100%;
    display: flex;
    margin: auto 0 0;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__link {
    color: $color-default-black;
    background-color: $color-nuxt;
    padding: 1rem 2rem;
    display: inline-flex;
    border-radius: 1.1rem;
    font-size: 1.6rem;
    transition: opacity $transition;

    @include hover-focus {
      opacity: 0.7;
    }
  }

  &__date {
    color: $color-default-white;
  }
}
</style>
