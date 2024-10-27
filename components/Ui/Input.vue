<script setup lang="ts">
import { Input } from '@/types'

const { $sanitizeHTML } = useNuxtApp()

const props = withDefaults(defineProps<Input.Model>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  required: true,
  disabled: false,
  type: Input.Types.TEXT
})

const emit = defineEmits<Input.Emits>()

const model = computed<string | number>({
  get() {
    return props.modelValue
  },
  set(value: string | number) {
    emit('update:modelValue', value)
  }
})

// const model = ref<string | number>('')

// const onInput = (event: InputEvent) => {
//   emit('update:modelValue', (event.target as HTMLInputElement).value)
// }

// watch(model, (value: string | number) => {
//   emit('update:modelValue', value)
// })

const onClick = () => {
  emit('click')
}
</script>

<template>
  <div class="custom-input" :class="{ 'is-error': errorMessage }">
    <label v-if="label" :for="id" v-text="label" />
    <input
      :id="id"
      v-model="model"
      :type="type"
      :name="name"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      @click="onClick"
    />
    <p v-if="errorMessage" class="custom-input__error" v-html="$sanitizeHTML(errorMessage)" />
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
    transition: border-color $transition, background-color $transition;
    font-family: inherit;
    font-weight: 300;
    width: 100%;

    &[disabled] {
      opacity: 0.7;
      pointer-events: none;
    }

    @include focus {
      outline: none;
    }

    @include hover-focus {
      border-color: $color-light-perp-soft;
      outline: none;
      background-color: rgba($color-light-perp, 0.8);
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
