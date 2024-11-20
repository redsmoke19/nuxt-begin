<template>
  <span
    v-if="isSvg"
    class="icon-wrapper"
    :class="{ 'icon-wrapper--fill': !filled, 'icon-wrapper--stroke': isStroke }"
    v-html="icon"
  />
</template>

<script lang="ts" setup>
interface Props {
  name: string
  filled?: boolean
  isSvg?: boolean
  alt?: string
}

const props = withDefaults(defineProps<Props>(), { filled: true, isSvg: true, alt: '' })

const icon = ref<string | Record<string, any>>('')
const hasStroke = ref<boolean>(false)

const isStroke = computed<boolean>(() => {
  return hasStroke.value && !props.filled
})

const getIcon = async () => {
  try {
    const icons = props.isSvg
      ? import.meta.glob('assets/icons/**/**.svg', {
          query: '?raw',
          import: 'default',
          eager: false
        })
      : import.meta.glob('assets/icons/**/**.svg', {
          eager: false
        })

    const importedIcon = await icons[`/assets/icons/${props.name}.svg`]()

    if (props.isSvg && importedIcon.includes('stroke')) {
      hasStroke.value = true
    }

    icon.value = props.isSvg ? importedIcon : importedIcon.default
  } catch {
    console.error(`[inetstudio-basic] Icon '${props.name}' doesn't exist in 'assets/icons'`)
  }
}

await getIcon()

watchEffect(getIcon)
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  :deep(svg) {
    width: 100%;
    height: 100%;
    margin: 0;
    vertical-align: unset;
  }

  &--fill,
  &--fill * {
    /* stylelint-disable-next-line value-keyword-case */
    fill: currentColor !important;
  }

  &--stroke,
  &--stroke * {
    /* stylelint-disable-next-line value-keyword-case */
    stroke: currentColor !important;
  }
}
</style>
