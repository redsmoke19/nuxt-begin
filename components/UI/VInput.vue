<script setup lang="ts">
interface Props {
  type?: string
  value?: string
  required?: boolean
  name: string
}

const props = defineProps<Props>({
  type: {
    
  }
})
</script>

<template>
  <div class="custom-input">
    <input :type="type" :value="modelValue" :required="required" :name="name" />
  </div>
</template>
