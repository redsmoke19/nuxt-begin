<script setup lang="ts">
import SectionForms from '@views/SectionForms.vue'
import { useSeoMeta } from 'nuxt/app'

useSeoMeta({
  title: 'Форма v-model'
})
</script>

<template>
  <SectionForms />
</template>
