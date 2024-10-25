<script setup lang="ts">
import useUserStore from '~/stores/users'

const userStore = useUserStore()
userStore.setUserData('John Doe', 'john@example.com')

useSeoMeta({
  title: 'Форма v-model'
})
</script>

<template>
  <ExampleSection>
    <ExampleForm />
  </ExampleSection>
</template>
