<script setup lang="ts">
interface Props {
  totalPage: number
  currentPage: number
}

withDefaults(defineProps<Props>(), {
  totalPage: 1,
  currentPage: 1
})

const emit = defineEmits<{
  click: [page: number]
}>()

const onLinkClick = (page: number): void => {
  emit('click', page)
}
</script>

<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li v-for="(_, idx) in totalPage" :key="idx" class="pagination__item">
        <a
          href="#"
          class="pagination__link"
          :class="[currentPage === idx + 1 ? 'is-active' : '', 'pagination__link']"
          @click.prevent="onLinkClick(idx + 1)"
          >{{ idx + 1 }}</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  padding: 2rem 0;

  &__list {
    display: flex;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
  }

  &__link {
    display: flex;
    color: rgb(179, 245, 209);
    background-color: rgba(10, 83, 49, 70%);
    height: 4rem;
    width: 4rem;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    line-height: 1;
    border-radius: 6px;
    border: 1px solid rgb(0, 161, 85);
    transition: opacity $transition, background-color $transition, border-color $transition, color $transition;

    @include hover-focus {
      &:not(.is-active) {
        opacity: 0.7;
      }
    }

    &.is-active {
      background-color: rgba(76, 29, 149, 0.5);
      border-color: rgb(124, 58, 237);
      color: rgb(221, 214, 254);
    }
  }
}
</style>
