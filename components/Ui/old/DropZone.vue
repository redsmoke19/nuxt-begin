<script setup lang="ts">
import type { DropZone } from '~/types'

const emit = defineEmits<DropZone.Emit>()

const isDragActive = ref<boolean>(false)
const inActiveTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const files = ref<FileList | null>(null)

const setDragActive = (): void => {
  isDragActive.value = true
  clearTimeout(inActiveTimeout.value as unknown as number)
  inActiveTimeout.value = null
}

const setDragInactive = (): void => {
  inActiveTimeout.value = setTimeout(() => {
    isDragActive.value = false
  }, 50)
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    setDragInactive()
    emit('files-dropped', [...event.dataTransfer.files])
  }
}

const preventDefaults = (event: Event) => {
  event.preventDefault()
}

// NOTE: тут ts ругается на DocumentEventMap (на этот тип мне гпт указал, сам я хз)
// eslint-disable-next-line no-undef
const events: Array<keyof DocumentEventMap> = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<template>
  <div
    class="drop-zone"
    :data-drag-active="isDragActive"
    @dragenter.prevent="setDragActive"
    @dragover.prevent="setDragActive"
    @dragleave.prevent="setDragInactive"
    @drop.prevent="onDrop"
  >
    <slot :drop-zone-active="isDragActive" :drop-zone-files="files" />
  </div>
</template>

<style scoped lang="scss"></style>
