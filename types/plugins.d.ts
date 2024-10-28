import { NuxtApp } from 'nuxt/app'

declare module 'vue' {
  interface ComponentCustomProperties {
    $sanitizeHTML: (dirty: string) => string
  }
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $sanitizeHTML: (dirty: string) => string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $sanitizeHTML: (dirty: string) => string
  }
}

export {}

// import { NuxtApp } from 'nuxt/app'
//
// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $sanitizeHTML: (html: string) => string
//   }
// }
//
// declare module 'nuxt/app' {
//   interface NuxtApp {
//     $sanitizeHTML: (html: string) => string
//   }
// }
//
// export {}
