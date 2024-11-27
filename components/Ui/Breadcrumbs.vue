<script setup lang="ts">
import BaseLink from '~/components/Base/Link.vue'
import type { Breadcrumbs } from '@/types'

defineProps<{
  breadcrumbs: Breadcrumbs.Model[]
}>()
</script>

<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li v-for="(item, idx) in breadcrumbs" :key="idx" class="breadcrumbs__item">
        <component
          :is="!item.active ? BaseLink : 'span'"
          v-bind="item.active ? {} : { url: item.url, text: item.text }"
          :class="['breadcrumbs__link', { 'breadcrumbs__link--active': item.active }]"
        >
          {{ item.text }}
        </component>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.breadcrumbs {
  padding: 2rem 0;
  margin: 0 0 2rem;
  $root: &;

  &__list {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item:not(:last-child) {
    #{$root}__link::after {
      content: '';
      position: absolute;
      right: -1.2rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: $color-nuxt;
      height: 0.4rem;
      width: 0.4rem;
      border-radius: 50%;
    }
  }

  &__link {
    color: $color-nuxt;
    font-size: 1.6rem;
    transition: opacity $transition;
    position: relative;

    &--active {
      color: rgba($color-nuxt, 0.6);
    }

    @include hover-focus {
      &:not(.breadcrumbs__link--active) {
        opacity: 0.7;
      }
    }
  }
}
</style>
