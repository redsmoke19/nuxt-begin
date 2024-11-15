<script setup lang="ts">
import useFileList from '~/composables/BaseDrag/file-list'

const { files, addFiles, removeFile } = useFileList()

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = [...target.files]
    addFiles(files)
    target.value = ''
  }
}
</script>

<template>
  <UiOldDropZone v-slot="{ dropZoneActive }" class="drop-area" @files-dropped="addFiles">
    <label for="file-input">
      <span v-if="dropZoneActive">
        <span>Drop Them Here</span>
        <span class="smaller">to add them</span>
      </span>
      <span v-else>
        <span>Drag Your Files Here</span>
        <span class="smaller">
          or <strong><em>click here</em></strong> to select files
        </span>
      </span>
      <input id="file-input" type="file" multiple @change="onInputChange" />
    </label>
    <ul v-show="files.length">
      <UiOldFilePreview v-for="file in files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
    </ul>
  </UiOldDropZone>
</template>

<style scoped lang="scss">
.drop-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: #fff5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 30%);
  transition: 0.2s ease;

  &[data-active='true'] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 50%);
    background: #fffc;
  }
}
</style>
