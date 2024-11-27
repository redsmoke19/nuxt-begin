<script setup lang="ts">
import { createError } from '#app'
import type { Articles } from '~/types'

const config = useRuntimeConfig()

const { id } = useRoute().params

const { data: articleData } = await useAsyncData<Articles.ArticleWithAuthor[] | null>('article', () => {
  return $fetch(`${config.public.apiUrl}/articles?_relations=authors&id=${id}`)
})

// NOTE: Изначально хоть даже я хочу получить одну статью, они приходит как массив. Поэтому тут я и одного элемента массива делаю просто объект
const article = computed<Articles.ArticleWithAuthor | null>(() => {
  if (!articleData.value) {
    return null
  }
  const [articleObject] = articleData.value
  return articleObject
})

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Такой страницы не существует', fatal: true })
}

const breadcrumbs = [
  {
    url: '/',
    text: 'Главная'
  },
  {
    url: '/articles',
    text: 'Статьи'
  },
  {
    active: true,
    text: article?.value.title
  }
]
</script>

<template>
  <BaseContainer>
    <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
    <ExampleArticleDetails :article="article" />
  </BaseContainer>
</template>

<style scoped lang="scss">
/* Тут вопрос, а что если данные вместо article будут null - я проверил и там просто пустая страница появится со сломанной фоткой. А как правильно обработать такую ситуацию, что если данные не загрузились? Или за то что данные не загрузились отвечает как раз ошибка 404 ? Что типо если нет artticle.value то го в 404? Но тут компонент по типу все равно думает что может быть null и вот вопрос как его правильно именно в компоненте ExampleArticleDetails обработать */
</style>
