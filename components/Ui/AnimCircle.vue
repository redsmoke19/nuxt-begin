<script setup lang="ts"></script>

<template>
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 506 506">
    <circle
      v-motion
      cx="250"
      cy="250"
      r="250"
      stroke="#00ff99"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      :initial="{
        strokeDasharray: '24 10 0 0'
      }"
      :enter="{
        rotate: [120, 360],
        strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
        transition: {
          duration: 5000,
          repeat: Infinity,
          repeatType: 'reverse',
          type: 'spring',
          stiffness: 10,
          damping: 25,
          mass: 0.5
        }
      }"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
