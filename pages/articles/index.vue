<script setup lang="ts">
import type { Articles, Select } from '@/types'

const selectOptions: Select.Option[] = [
  {
    id: 1,
    value: 'default',
    text: 'По умолчанию'
  },
  {
    id: 2,
    value: 'new-article',
    text: 'Сначала новые'
  },
  {
    id: 3,
    value: 'old-article',
    text: 'Сначала старые'
  }
]

const config = useRuntimeConfig()

const page = ref<number>(1)
const totalPage = ref<number>(1)
const filterOption = ref<Select.Option | null>(selectOptions[0])
const authorName = ref<string>('')

const getSortByDate = computed<string>(() => {
  switch (filterOption.value?.value) {
    case 'new-article':
      return '-created_at'
    case 'old-article':
      return 'created_at'
    default:
      return '-'
  }
})

const getAuthorId = computed<string>(() => {
  return authorName.value ? `&author_id=${authorName.value}` : ''
})

const getUrl = computed<string>(() => {
  return `${config.public.apiUrl}articles?page=${page.value}&limit=6&sortBy=${getSortByDate.value}${getAuthorId.value}`
})

const { data, status } = await useAsyncData<Articles.ServerResponse | null>(
  'articles',
  () => {
    return $fetch(getUrl.value)
  },
  {
    watch: [page, filterOption, authorName]
  }
)

const isLoading = computed<boolean>(() => status.value === 'pending')

watch(
  data,
  () => {
    if (data.value && !Array.isArray(data.value)) {
      totalPage.value = data.value.meta.total_pages
    }
  },
  { immediate: true }
)

watch([filterOption, authorName], () => {
  page.value = 1
})

const articles = computed<Articles.Article[]>(() => {
  if (!data.value) {
    return []
  }
  return Array.isArray(data.value) ? data.value : data.value?.items
})

const handlePageChange = (pageNumber: number) => {
  page.value = pageNumber
}
</script>

<template>
  <BaseContainer>
    <div class="articles">
      <div class="articles__top">
        <h2 class="articles__title">Почитайте наши классные статьи</h2>
        <div class="articles__filters">
          <UiInput
            id="author-name"
            v-model="authorName"
            placeholder="Поиск по автору"
            name="author-name"
            :mods="['small', 'dsad', '32131']"
          />
          <UiSelect v-model="filterOption" :options="selectOptions" />
        </div>
      </div>
      <ul class="articles__list">
        <template v-if="!isLoading">
          <li v-for="article in articles" :key="article.id" class="articles__item">
            <ExampleArticleCard v-bind="article" />
          </li>
        </template>
        <template v-else>
          <li v-for="number in 6" :key="number" class="articles__item">
            <ExampleSkeletonCard />
          </li>
        </template>
      </ul>
      <UiPagination
        v-if="status === 'success'"
        :current-page="page"
        :total-page="totalPage"
        @click="handlePageChange"
      />
    </div>
  </BaseContainer>
</template>

<style scoped lang="scss">
.articles {
  padding: 6rem 0 0;

  &__top {
    display: grid;
    grid-template-columns: 60% 1fr;
    align-items: baseline;
  }

  &__filters {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
  }

  &__title {
    color: $color-default-white;
    font-size: 4.6rem;
    line-height: 1.3;
    margin: 0 0 6rem;
    font-weight: 400;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0;
    padding: 0;
    gap: 4rem;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* NOTE: Понять как работает сервер
При моем коде получается при первой загрузке я ни когда скелетон не увижу, потому что страница на сервере рендерится? Потому что если прохожу по пагинации то вижу скелетон, а при первой разгрузке, даже при слабом интернете ни когда не вижу. А что если тогда страница огромная и там куча картинок к примеру или еще чего то. Данные все равно ведь мгновенно не придут ? Как тогда скелетон этот увидеть при первой загружке страницы?
 */

/* NOTE: Понять как работает анимация и почему при переключении страниц все дергается */
/* NOTE: Понять как работают ошибки
Сейчас если просто какой то страницы нет то да я перехожу на 404, но там в консоли куча ошибок. А если попасть на 404 из article/id то ошибок в консоли нет
*/
/* NOTE: Понять как работает Async Await. Сейчас если с ним играть то не отображаются статьи и ошибки в консоли если убрать
*/
</style>
