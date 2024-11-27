<script setup lang="ts">
import { Input } from '@/types'
import type { MaskInputOptions } from 'maska'
import { useField } from 'vee-validate'

const { $sanitizeHTML } = useNuxtApp()

const props = withDefaults(defineProps<Input.Model>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  required: true,
  disabled: false,
  type: Input.Types.TEXT,
  mask: '',
  modification: '',
  mods: []
})

const { value, errorMessage, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
  syncVModel: true
})

const emit = defineEmits<Input.Emits>()

const validationListeners = {
  blur: (event: InputEvent) => handleBlur(event, true),
  change: handleChange,
  input: (event: InputEvent) => handleChange(event, !!errorMessage.value)
}

const modifyValue = (input: string): string => {
  if (props.modification === 'capitalize') {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
  }
  return input
}

watch(value, (newValue) => {
  if (!value.value) {
    return
  }
  const modified = modifyValue(newValue as string)
  if (newValue !== modified && !props.mask) {
    value.value = modified
    emit('update:modelValue', modified)
  }
})

const getMask = computed<MaskInputOptions | null>(() => {
  if (props.type === Input.Types.PHONE && props.mask) {
    return {
      mask: props.mask === 'default' ? Input.Mask.PHONE : props.mask,
      eager: false
    }
  }
  return null
})

const inputClasses = computed(() => ({
  'is-error': !!props.errorMessage,
  ...(props.mods?.reduce((acc, mod) => ({ ...acc, [`custom-input--${mod}`]: true }), {}) ?? {})
  // ...props.mods?.map((el: string) => `custom-input--${el}`)
}))
</script>

<template>
  <div class="custom-input" :class="inputClasses">
    <label v-if="label" :for="id" v-text="label" />
    <input
      :id="id"
      v-model="value"
      v-maska="getMask"
      class="custom-input__field"
      :type="type"
      :name="name"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      v-on="validationListeners"
      @blur="$emit('blur', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="errorMessage" class="custom-input__error" v-html="$sanitizeHTML(errorMessage)" />
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  $root: &;

  &--small {
    #{$root}__field {
      padding: 0.6rem 2rem;
      border-radius: 0.6rem;
      font-size: 1.4rem;
    }
  }

  &__field {
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
