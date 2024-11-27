<script setup lang="ts"></script>

<template>
  <div class="skeleton-card">
    <PrimeSkeleton height="4rem" border-radius="10px" class="mb-20" />
    <PrimeSkeleton height="8rem" border-radius="10px" class="mb-30" />
    <div class="skeleton-card__footer">
      <PrimeSkeleton height="4rem" width="12rem" border-radius="10px" />
      <PrimeSkeleton height="2rem" width="16rem" border-radius="10px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  --p-skeleton-background: rgba(255, 255, 255, 6%);
  --p-skeleton-animation-background: rgba(255, 255, 255, 4%);

  min-height: 30rem;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(255, 255, 255, 6%);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: auto 0 0;
  }
}

.mb-20 {
  margin-bottom: 2rem;
}

.mb-30 {
  margin-bottom: 3rem;
}
</style>
