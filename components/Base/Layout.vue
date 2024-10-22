<template>
  <div class="page">
    <header class="page-header">
      <slot name="page-header" />
    </header>
    <main class="page-wrapper">
      <slot name="page-content" />
    </main>
    <footer class="page-footer">
      <slot name="page-footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.page-header {
  position: sticky;
  z-index: 10;
  top: 0;
}

.page-wrapper {
  position: relative;
  flex: auto;
  background: inherit;
}
</style>
