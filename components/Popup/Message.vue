<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <BasePopup>
    <div class="">
      <p>{{ message }}</p>
    </div>
  </BasePopup>
</template>

<style scoped lang="scss">

</style>
