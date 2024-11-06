<script setup lang="ts">
import { Button } from '@/types'
import BaseLink from '~/components/Base/Link.vue'

const {
  text = '',
  mods = [] as string[],
  url,
  type = Button.Types.BUTTON,
  loading = false
} = defineProps<Button.Model>()

const isTag = computed(() => (url ? BaseLink : 'button'))
// const computedClass = computed<string[]>(() => ['btn', mods.map((mod: string) => `btn--${mod}`)])
const computedClass = computed<string[]>(() => {
  const classes = ['btn']

  if (loading) {
    classes.push('is-loading')
  }

  if (mods) {
    classes.push(...mods.map((mod: string) => `btn--${mod}`))
  }

  return classes
})
</script>

<template>
  <component :is="isTag" :url="url" :class="computedClass" :type="url ? undefined : type" :text="$sanitizeHTML(text)">
    <span class="btn__text" v-html="$sanitizeHTML(text)" />
    <Transition>
      <BaseIconT v-if="loading" class="btn__icon-loader" name="icon-loader" />
    </Transition>
  </component>
</template>

<style scoped lang="scss">
.btn {
  width: fit-content;
  border: none;
  background-color: $color-light-perp-light;
  padding: 2rem 1.5rem;
  border-radius: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  margin: 0;
  cursor: pointer;
  transition: background-color $transition;
  position: relative;

  $root: &;

  @include hover-focus {
    background-color: rgba($color-light-perp-light, 0.8);
  }

  &:focus {
    outline: none;
  }

  &.is-loading {
    pointer-events: none;

    #{$root}__text {
      opacity: 0;
    }
  }

  &__text {
    transition: opacity $transition;
  }

  &__icon-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 3rem;
    width: 3rem;

    :deep(svg) {
      .icon-loader-out {
        animation: rotate 4s infinite linear;
        transform-origin: center;
      }

      .icon-loader-in {
        animation: rotate 3s infinite linear reverse;
        transform-origin: center;
      }
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
