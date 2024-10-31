<script setup lang="ts">
import type { Select } from '@/types'
import { useTemplateRef } from 'vue'

const {
  modelValue = '',
  placeholder = 'Выберите вариант',
  options = [] as string[],
  filter = false
} = defineProps<Select.Model>()

const emit = defineEmits<Select.Emits>()

const isOptionsOpen = ref<boolean>(false)
const activeOption = ref<string | null>(null)
const searchOptionState = ref<string>('')
const optionsMenu = useTemplateRef<HTMLDivElement>('options-menu')

const optionsWithId = computed<Select.Option[]>(() => {
  return options.map((label, index) => {
    return {
      id: `options-${index}-${Date.now()}`,
      label
    }
  })
})

// NOTE: Далее я фильтрую элементы на основе v-model, который получаю из инпута и этот же массив я отрисовываю в шаблоне
const filteredOptions = computed<Select.Option[]>(() => {
  return optionsWithId.value.filter((option: Select.Option) =>
    option.label.toLowerCase().includes(searchOptionState.value.toLowerCase())
  )
})

// NOTE: Тут эти три функции ниже возможно можно как то оптимизировать, но я не придумал как это сделать
const openOptions = (): void => {
  isOptionsOpen.value = true
}

const closeOptions = (): void => {
  isOptionsOpen.value = false
  searchOptionState.value = ''
}

const toggleOptions = (): void => {
  if (isOptionsOpen.value) {
    closeOptions()
  } else {
    openOptions()
  }
}

// NOTE: Тут получаю активный выбранный элемент по id и его value передаю в эмит
const getOptions = (option: { id: string; label: string }) => {
  activeOption.value = option.id
  emit('update:modelValue', option.label)
  closeOptions()
}

// NOTE: Слушатель который проверяет если я кликнул за пределы селекта, то закрываю его
const handleClickOutside = (event: Event) => {
  if (optionsMenu?.value && !optionsMenu?.value.contains(event.target as Node)) {
    closeOptions()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="custom-select">
    <div :class="['custom-select__label', { 'is-open': isOptionsOpen }]" @click.stop="toggleOptions">
      <span :class="['custom-select__label-field', { 'is-placeholder': !modelValue }]">
        {{ modelValue ? modelValue : placeholder }}
      </span>
      <span class="custom-select__icon">
        <Icon mode="svg" name="ri:arrow-down-s-line" />
      </span>
    </div>
    <Transition name="fade">
      <div v-if="isOptionsOpen" ref="options-menu" class="custom-select__options">
        <div v-if="filter" class="custom-select__input">
          <input v-model="searchOptionState" class="custom-select__field" type="text" placeholder="Поиск" />
          <Icon mode="svg" name="ei:search" />
        </div>
        <ul class="custom-select__list">
          <li
            v-for="option in filteredOptions"
            :key="option.id"
            :class="['custom-select__item', { 'is-active': activeOption === option.id }]"
            @click="getOptions(option)"
          >
            <span class="custom-select__option" v-text="$sanitizeHTML(option.label)" />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.custom-select {
  position: relative;

  &__label {
    width: 16rem;
    color: $color-default-white;
    display: flex;
    font-size: 1.4rem;
    line-height: 1.3;
    background-color: $color-default-black;
    border-radius: 0.6rem;
    border: 0.1rem solid rgba($color-default-white, 0.4);
    cursor: pointer;
    transition: border-color $transition;

    &.is-open {
      border-color: $color-default-white;
    }

    @include hover-focus {
      border-color: $color-default-white;
    }
  }

  &__label-field {
    flex: 1 1 auto;
    width: 1%;
    padding: 0.5rem 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: clip;

    &.is-placeholder {
      color: #a1a1a1;
    }
  }

  &__icon {
    height: auto;
    display: flex;
    width: 3rem;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      height: 1.8rem;
      width: 1.8rem;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    border: 0.1rem solid rgba($color-default-white, 0.4);
    position: absolute;
    border-radius: 0.6rem;
    padding: 0.4rem;
    top: calc(100% + 0.3rem);
    left: 0;
    width: 100%;
    max-width: 16rem;
  }

  &__input {
    margin: 0 0 0.5rem;
    position: relative;

    svg {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      z-index: 2;
      height: 2rem;
      width: 2rem;
      color: $color-default-white;
      transform: translateY(-50%);
    }
  }

  &__field {
    background-color: $color-default-black;
    border: 0.1rem solid rgba($color-default-white, 0.4);
    border-radius: 0.4rem;
    padding: 0.4rem;
    font-size: 1.4rem;
    width: 100%;
    transition: border-color $transition;
    color: $color-default-white;

    @include focus {
      outline: none;
    }

    @include hover-focus {
      border-color: $color-default-white;
    }
  }

  &__list {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
  }

  &__item {
    display: flex;
    padding: 0.7rem 1rem;
    border-radius: 0.4rem;
    color: $color-default-white;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color $transition, color $transition;

    &.is-active {
      background-color: $color-default-white;
      color: $color-default-black;
    }

    @include hover-focus {
      &:not(.is-active) {
        background-color: #3a3a3a;
      }
    }
  }

  &__option {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition, transform $transition;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
