<script setup lang="ts">
import type { Radio } from '~/types'

const { $sanitizeHTML } = useNuxtApp()

const props = withDefaults(defineProps<Radio.Model>(), {
  label: '',
  checked: false,
  required: true,
  value: ''
})

const model = defineModel<string>('modelValue', { default: '' })
// const emit = defineEmits<Checkbox.Emits>()
//
// const model = computed<boolean>({
//   get() {
//     return props.modelValue
//   },
//   set(value: boolean) {
//     emit('update:modelValue', value)
//   }
// })
</script>

<template>
  <div class="custom-radio">
    <input
      :id="props.id"
      v-model="model"
      type="radio"
      class="custom-radio__field visually-hidden"
      :name="props.name"
      :value="value"
    />
    <label :for="props.id" class="custom-radio__label">
      <span class="custom-radio__icon"></span>
      <span class="custom-radio__content" v-text="$sanitizeHTML(label)" />
    </label>
  </div>
</template>

<style scoped lang="scss">
.custom-radio {
  position: relative;
  display: flex;
  flex-direction: column;

  &__field:checked + .custom-radio__label {
    .custom-radio__icon {
      border-color: $color-default-white;

      &::after {
        opacity: 1;
      }
    }
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.8rem;

    @include hover {
      .custom-toggle__icon {
        border-color: $color-default-white;
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    transition: border-color $transition;
    color: $color-default-white;
    border: 0.1rem solid rgba($color-default-white, 50%);
    background-color: $color-transparent;
    position: relative;

    &::after {
      content: '';
      height: 5px;
      width: 5px;
      background-color: $color-default-white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      opacity: 0;
      transition: opacity $transition;
    }
  }

  &__content {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 130%;
    letter-spacing: -0.01em;
    color: $color-default-white;
  }
}
</style>
