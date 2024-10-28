import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  alias: {
    '@img': fileURLToPath(new URL('./assets/images', import.meta.url)),
    '@icons': fileURLToPath(new URL('./assets/icons', import.meta.url)),
    '@ui': fileURLToPath(new URL('./components/UI', import.meta.url)),
    '@views': fileURLToPath(new URL('./views', import.meta.url)),
    '@vars': fileURLToPath(new URL('./assets/styles/global/variables.scss', import.meta.url))
  },

  css: ['@/assets/styles/index.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/global/variables.scss" as *;
            @use "@/assets/styles/global/mixins.scss" as *;
          `
        }
      }
    }
  },

  modules: [
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/eslint-module',
    'nuxt-icons',
    'nuxt-lazy-load',
    ['@pinia/nuxt', { disableVuex: false }],
    '@nuxt/icon',
    '@primevue/nuxt-module'
  ],

  primevue: {
    autoImport: true,
    components: {
      prefix: 'Prime'
    }
  },

  plugins: ['~/plugins/sanitizeHtml.ts'],

  lazyLoad: {
    loadingClass: 'isImageLoading',
    directiveOnly: true
  },

  compatibilityDate: '2024-10-21'
})
