<script setup lang="ts">
import BaseContainer from '~/packages/basis/components/BaseContainer.vue'
import Form from '~/components/layouts/Form.vue'
import FormModel from '~/components/layouts/FormModel.vue'

const route = useRoute()
const currentPath = route.path
const childComponent = computed(() => {
  switch (currentPath) {
    case '/index-form-model':
      return FormModel
    default:
      return Form
  }
})
</script>

<template>
  <BaseContainer>
    <component :is="childComponent" />
  </BaseContainer>
</template>

<style scoped lang="scss"></style>
