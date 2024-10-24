<script setup lang="ts">
import useUserStore from '~/stores/users'

const userStore = useUserStore()
console.log(userStore.name)
userStore.setUserData('John Doe', 'john@example.com')
console.log(userStore.name)
useSeoMeta({
  title: 'Форма v-model'
})
</script>

<template>
  <ExampleSection>
    <ExampleForm />
  </ExampleSection>
</template>
