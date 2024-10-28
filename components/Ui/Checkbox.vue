<script setup lang="ts">
import type { Checkbox } from '@/types'

const props = withDefaults(defineProps<Checkbox.Model>(), {
  label: '',
  required: true,
  errorMessage: ''
})

const model = defineModel<boolean>('modelValue', { required: true, default: false })
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
  <div class="custom-checkbox">
    <input :id="id" v-model="model" type="checkbox" class="custom-checkbox__field visually-hidden" :name="name" />
    <label :for="id" class="custom-checkbox__label">
      <span class="custom-checkbox__icon">
        <Transition>
          <Icon v-if="model" mode="css" name="stash:check-solid" />
        </Transition>
      </span>
      <span class="custom-checkbox__content">
        <slot />
      </span>
    </label>
    <Transition>
      <p v-if="errorMessage" class="custom-checkbox__error" v-html="$sanitizeHTML(errorMessage)" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.custom-checkbox {
  position: relative;
  display: flex;
  flex-direction: column;

  &__field:checked + .custom-checkbox__label {
    .custom-checkbox__icon {
      border-color: $color-default-white;
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
    width: 1.9rem;
    height: 1.9rem;
    transition: border-color $transition;
    color: $color-default-white;
    border: 0.1rem solid rgba($color-default-white, 50%);
    border-radius: 0.4rem;
    background-color: $color-transparent;

    span {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 130%;
    letter-spacing: -0.01em;
    color: $color-default-white;
  }

  &__error {
    color: $color-error;
    font-size: 1.4rem;
    line-height: 1.3;
    margin: 0.5rem 0 0;
  }

  .input-message {
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 130%;
    margin: 0.4rem 0;
    letter-spacing: -0.01em;
    color: $color-error;

    &.is-invalid {
      color: $color-error;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity $transition;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
