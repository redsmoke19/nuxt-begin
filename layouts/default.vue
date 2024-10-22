<script setup lang="ts">
import Header from '~/components/Header.vue'
</script>

<template>
  <v-layout>
    <template #page-header>
      <Header />
    </template>
    <template #page-content>
      <nuxt-page />
    </template>
    <template #page-footer></template>
  </v-layout>
</template>
