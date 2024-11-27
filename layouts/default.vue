<template>
  <BaseLayout>
    <template #page-header>
      <LayoutHeader />
    </template>
    <template #page-content>
      <NuxtPage />
      <LazyLayoutPopups />
    </template>
    <template #page-footer></template>
  </BaseLayout>
</template>
