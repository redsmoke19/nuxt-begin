<script lang="ts" setup>
import { InputCurrent } from '@/types'

const props = withDefaults(defineProps<InputCurrent.Model>(), {
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  required: true,
  disabled: false,
  label: '',
  type: InputCurrent.Types.TEXT
})

const emit = defineEmits<InputCurrent.Emits>()

const model = computed<string | number>({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="ui-input" :class="{ 'ui-input--error': errorMessage }">
    <label v-if="label" :for="id" v-text="label" />
    <input
      :id="id"
      v-model="model"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
    />
    <p v-if="errorMessage" class="ui-input__error-message" v-text="errorMessage" />
  </div>
</template>

<style scoped lang="scss">
.ui-input {
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
    }

    &:disabled {
      opacity: 0.7;
      pointer-events: none;
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

  &__error-message {
    color: $color-error;
    font-size: 1.4rem;
    line-height: 1.3;
    margin: 0.5rem 0 0;
  }
}
</style>
