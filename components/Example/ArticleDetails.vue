<script setup lang="ts">
import formatDate from '~/utils/formatDate'
import type { Articles } from '@/types'

defineProps<Articles.ArticleWithAuthor>()
</script>

<template>
  <div class="article">
    <h2 class="article__title">{{ title }}</h2>
    <p class="article__description">{{ description }}</p>
    <p class="article__content">{{ content }}</p>
    <div class="article__author">
      <img class="article__author-photo" :src="author.photo" alt="Фотография автора" data-not-lazy />
      <div class="article__author-inner">
        <span class="article__author-name">{{ author.name }}</span>
        <span class="article__date">{{ formatDate(created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article {
  &__title {
    color: $color-default-white;
    font-weight: 700;
    font-size: 4rem;
    margin: 0 0 3rem;
  }

  &__description {
    color: $color-default-white;
    font-size: 1.8rem;
    margin: 0 0 2rem;
  }

  &__content {
    color: $color-default-white;
    font-size: 1.6rem;
    margin: 0 0 2rem;
  }

  &__author {
    color: $color-default-white;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: flex-end;
  }

  &__author-inner {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  &__author-photo {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
  }

  &__author-name {
    font-size: 1.8rem;
  }
}
</style>
