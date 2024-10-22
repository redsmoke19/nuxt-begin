<script setup lang="ts">
defineProps<{
  isFull?: boolean
}>()
</script>

<template>
  <div class="container" :class="{ 'container--full': isFull }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: inherit;
  min-height: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;

  &:not(&--full) {
    max-width: $vp-1440;
  }
}
</style>
