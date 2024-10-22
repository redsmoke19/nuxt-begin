<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Input } from '~/types/components/UI/Input.ts'

const {
  type,
  required = true,
  name,
  modelValue,
  placeholder,
  disabled = false,
  errorMessage,
  label,
  id,
  className
} = defineProps<Input>()

// const emit = defineEmits(['update:onInput'])
const emit = defineEmits<{
  (e: 'update:onInput', value: string): void
}>()

const onInput = (e: Event) => {
  const { value } = e.target
  if (type === 'text') {
    const capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    emit('update:onInput', capitalizeValue)
    return
  }
  emit('update:onInput', value)
}
</script>

<template>
  <div class="custom-input" :class="[className, { 'is-error': errorMessage }]">
    <label v-if="!!label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
    <p v-if="!!errorMessage" class="custom-input__error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  input {
    padding: 1.5rem 2rem;
    border-radius: 1rem;
    border: 0.1rem solid $color-transparent;
    font-size: 2rem;
    background-color: $color-light-perp;
    color: $color-default-white;
    transition: border-color $transition;
    font-family: inherit;
    font-weight: 300;
    width: 100%;

    &:focus {
      outline: none;

      &[disabled] {
        opacity: 0.7;
        pointer-events: none;
      }
    }

    @include hover-focus {
      border-color: $color-light-perp-soft;
      outline: none;
    }
  }

  label {
    color: $color-light-perp-light;
    display: inline-flex;
    font-size: 1.6rem;
    line-height: 1.3;
    margin: 0 0 0.5rem;
  }

  &__error {
    color: $color-error;
    font-size: 1.4rem;
    line-height: 1.3;
    margin: 0.5rem 0 0;
  }
}
</style>
