<script setup lang="ts">
import type { Select } from '@/types'
import { useTemplateRef } from 'vue'

const {
  modelValue = null,
  placeholder = 'Выберите вариант',
  options = [] as Select.Option[],
  filter = false
} = defineProps<Select.Model>()

const emit = defineEmits<Select.Emits>()

const isOptionsOpen = ref<boolean>(false)
const activeOption = ref<Select.Option | null>(null)
const searchOptionState = ref<string>('')
const optionsMenu = useTemplateRef<HTMLDivElement>('options-menu')
const focusedOptionIndex = ref<number>(-1)

// NOTE: Далее я фильтрую элементы на основе v-model, который получаю из инпута и этот же массив я отрисовываю в шаблоне
const filteredOptions = computed<Select.Option[]>(() => {
  return options.filter((option: Select.Option) =>
    option.value.toLowerCase().includes(searchOptionState.value.toLowerCase())
  )
})

// NOTE: Тут эти три функции ниже возможно можно как то оптимизировать, но я не придумал как это сделать
const openOptions = (): void => {
  isOptionsOpen.value = true
}

const closeOptions = (): void => {
  isOptionsOpen.value = false
  searchOptionState.value = ''
  focusedOptionIndex.value = -1
}

const toggleOptions = (): void => {
  if (isOptionsOpen.value) {
    closeOptions()
  } else {
    openOptions()
  }
}

// NOTE: Тут получаю активный выбранный элемент по id и его value передаю в эмит
const onOptionClick = (option: Select.Option) => {
  activeOption.value = option
  // emit('update:modelValue', option)
  closeOptions()
}

// NOTE: Слушатель который проверяет если я кликнул за пределы селекта, то закрываю его
const handleClickOutside = (event: Event) => {
  if (optionsMenu?.value && !optionsMenu?.value.contains(event.target as Node)) {
    closeOptions()
  }
}

const onBlur = (event: Event): void => {
  emit('blur', event)
}

// NOTE: Эта функция проверяет, является ли переданный символ одиночным и отображаемым (не пробелом или невидимым символом, за исключением пробела).
const isPrintableCharacter = (char: string): boolean => {
  return char.length === 1 && !!char.match(/\S| /)
}

// const findLastIndex = <T>(
//   array: T[],
//   predicate: (value: T, index: number, array: T[]) => boolean
// ): number => {
//   for (let i = array.length - 1; i >= 0; i--) {
//     if (predicate(array[i], i, array)) {
//       return i;
//     }
//   }
//   return -1;
// }

// NOTE: Оставил пока так, потому что, возможно, первый индекс не будет равен первому элементу массива и сюда добавлю функцию предиката, что бы проверить это!
const findFirstOptionIndex = computed<number>(() => {
  return options.findIndex((option) => option)
})

const findLastOptionIndex = (arr: any) => {
  return arr.length > 0 ? arr.length - 1 : -1
}

const changeFocusedOptionIndex = (index: number): void => {
  if (focusedOptionIndex.value !== index) {
    focusedOptionIndex.value = index
  }
}

const findNextOptionIndex = (index: number): number => {
  const matchedOptionIndex = index < options.length - 1 ? options.slice(index + 1).findIndex((option) => option) : -1

  return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index
}

const findPrevOptionIndex = (index: number): number => {
  const matchedOptionIndex = index > 0 ? findLastOptionIndex(options.slice(0, index)) : -1

  return matchedOptionIndex > -1 ? matchedOptionIndex : index
}

const onArrowDownKey = (event: Event) => {
  if (!isOptionsOpen.value) {
    openOptions()
  } else {
    const optionIndex =
      focusedOptionIndex.value !== -1 ? findNextOptionIndex(focusedOptionIndex.value) : findFirstOptionIndex.value
    changeFocusedOptionIndex(optionIndex)
  }
  event.preventDefault()
}

const onArrowUpKey = (event: Event) => {
  if (!isOptionsOpen.value) {
    openOptions()
  } else {
    const optionIndex =
      focusedOptionIndex.value !== -1 ? findPrevOptionIndex(focusedOptionIndex.value) : findLastOptionIndex(options)
    changeFocusedOptionIndex(optionIndex)
    event.preventDefault()
  }
}

const onEnterKey = (event: Event): void => {
  if (!isOptionsOpen.value) {
    openOptions()
  } else {
    if (focusedOptionIndex.value !== -1) {
      activeOption.value = options[focusedOptionIndex.value]
    }
    closeOptions()
  }
  event.preventDefault()
}

const onEscapeKey = (event: Event): void => {
  if (isOptionsOpen.value) {
    closeOptions()
    event.preventDefault()
    event.stopPropagation()
  }
}

const onKeyDown = (event: KeyboardEvent): void => {
  const metaKey = event.metaKey || event.ctrlKey

  switch (event.code) {
    case 'ArrowDown':
      onArrowDownKey(event)
      break
    case 'ArrowUp':
      onArrowUpKey(event)
      break
    case 'Tab':
      if (isOptionsOpen.value) {
        closeOptions()
      }
      break
    case 'Enter':
      onEnterKey(event)
      break
    case 'Space':
      onEnterKey(event)
      break
    case 'Escape':
      onEscapeKey(event)
      break
    default:
      // NOTE: Тут если что можно на любой символ открывать кроме мета клавиш
      // if (!metaKey && isPrintableCharacter(event.key)) {
      //   toggleOptions()
      // }
      break
  }
}

// NOTE: Просто для примера работы вотчера
watch(activeOption, (newValue) => {
  emit('update:modelValue', newValue)
})

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
      <span
        :class="['custom-select__label-field', { 'is-placeholder': !modelValue }]"
        tabindex="0"
        @keydown="onKeyDown"
        @blur="onBlur"
        v-text="modelValue?.value ?? placeholder"
      />
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
            v-for="(option, idx) in filteredOptions"
            :key="option.id"
            :class="[
              'custom-select__item',
              { 'is-active': activeOption?.id === option.id, 'is-focus': focusedOptionIndex === idx }
            ]"
            @click="onOptionClick(option)"
          >
            <span class="custom-select__option" v-text="$sanitizeHTML(option.value)" />
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

    @include hover {
      border-color: $color-default-white;
    }

    &:focus-within {
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

    &:focus {
      outline: none;
    }

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

    &.is-focus {
      background-color: #3a3a3a;
    }

    @include hover {
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
