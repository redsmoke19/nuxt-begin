<script setup lang="ts">
import { Button } from '@/types'
import BaseLink from '~/components/Base/Link.vue'

const { text = '', mods = [] as string[], url, type = Button.Types.BUTTON } = defineProps<Button.Model>()

const isTag = computed(() => (url ? BaseLink : 'button'))
// const computedClass = computed<string[]>(() => ['btn', mods.map((mod: string) => `btn--${mod}`)])
const computedClass = computed<string[]>(() => {
  const classes = ['btn']

  if (mods) {
    classes.push(...mods.map((mod: string) => `btn--${mod}`))
  }

  return classes
})
</script>

<template>
  <component :is="isTag" :url="url" :class="computedClass" :type="url ? undefined : type" :text="$sanitizeHTML(text)">
    <span class="button__text" v-html="$sanitizeHTML(text)" />
  </component>
</template>

<style scoped lang="scss">
.btn {
  width: fit-content;
  border: none;
  background-color: $color-light-perp-light;
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  margin: 0;
  cursor: pointer;
  transition: background-color $transition;

  @include hover-focus {
    background-color: rgba($color-light-perp-light, 0.8);
  }
}
</style>
