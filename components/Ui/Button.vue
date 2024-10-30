<script setup lang="ts">
import { Button } from '@/types'

const {
  text = '',
  mods = [] as string[],
  className = '',
  url = '',
  type = Button.Types.BUTTON
} = defineProps<Button.Model>()

const isTag = computed(() => (url ? 'a' : 'button'))
const computedHref = computed(() => url || undefined)
const computedType = computed(() => (url ? undefined : type))
const computedClass = computed(() => ['btn', className, mods.map((mod) => `btn--${mod}`)])
</script>

<template>
  <component :is="isTag" :href="computedHref" :class="computedClass" :type="computedType">
    <slot>
      <span class="button__text" v-html="$sanitizeHTML(text)" />
    </slot>
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
