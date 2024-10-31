<script setup lang="ts">
interface BaseLink {
  url: string
  text: string
}

const { url } = defineProps<BaseLink>()

const linkProps = computed(() => {
  const isLink = url.startsWith('/')

  return {
    to: !isLink ? undefined : url,
    href: !isLink ? url : undefined,
    target: !isLink ? '_blank' : undefined
  }
})
</script>

<template>
  <NuxtLink v-bind="linkProps">
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
