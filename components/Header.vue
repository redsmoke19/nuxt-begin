<script setup lang="ts">
interface RouteItem {
  name: string
  path: string
}

const { options } = useRouter()
const getRotes = computed<RouteItem[]>(() => {
  return options.routes
    .map((item) => {
      return {
        name: item.name,
        path: item.path
      }
    })
    .reverse()
})
</script>

<template>
  <div class="header">
    <BaseContainer>
      <nav class="header__nav">
        <ul class="header__list">
          <li v-for="(item, idx) in getRotes" :key="idx" class="header__item">
            <nuxt-link class="header__link" active-class="header__link--active" :to="item.path">
              Форма {{ idx + 1 }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </BaseContainer>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 3rem 0;

  &__nav {
    display: flex;
    background-color: rgba(98, 98, 98, 65%);
    padding: 2rem;
    border-radius: 2rem;
    justify-content: center;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;
  }

  &__link {
    color: $color-light-perp-light;
    font-size: 1.8rem;

    &--active {
      color: rgb(0, 220, 130);
    }
  }
}
</style>
