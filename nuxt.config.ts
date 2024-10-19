import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-br'
      },
      title: 'Controle de Ponto'
    }
  },

  // Read more about Nuxt Layers
  // https://nuxt.com/docs/getting-started/layers
  extends: [
    // Layout compositions for Nuxt
    // https://github.com/pisandelli/nuxt-layout-compositions
    'nuxt-layout-compositions'
  ],

  components: {
    dirs: [
      { path: '~/components/_widgets', pathPrefix: false, prefix: 'W' },
      '~/components'
    ]
  },

  alias: {
    images: fileURLToPath(new URL('./assets/images', import.meta.url)),
    styles: fileURLToPath(new URL('./assets/styles', import.meta.url)),
    utilities: fileURLToPath(
      new URL('./assets/styles/utilities', import.meta.url)
    )
  },

  // Enabled Take Over Mode or installed the TypeScript Vue Plugin (Volar)
  // https://nuxt.com/docs/getting-started/installation#prerequisites
  typescript: {
    shim: false
  },

  css: ['@/assets/styles/reset.styl'],

  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [
            fileURLToPath(
              new URL('./assets/styles/abstracts/*.styl', import.meta.url)
            )
          ]
        }
      }
    }
  },

  modules: [
    [
      '@ant-design-vue/nuxt',
      {
        // Add options for Ant Design Vue
        // https://nuxt.com/modules/ant-design-vue#options
        extractStyle: true
      }
    ],
    [
      '@nuxtjs/google-fonts',
      {
        // Add options for Google Fonts
        // https://google-fonts.nuxtjs.org/options
        families: {
          Inter: [300, 400, 600, 700]
        }
      }
    ],
    [
      '@nuxtjs/html-validator',
      {
        // Add custom options for HTML-Validator
        // https://html-validator.nuxtjs.org/#configuration-optional
        // https://html-validate.org/rules/index.html
        logLevel: 'warning'
      }
    ],
    [
      '@nuxtjs/robots',
      {
        // add robots config here
        // https://github.com/nuxt-community/robots-module#robots-config
      }
    ],
    [
      '@nuxt/image',
      {
        // add nuxt-image config here
        // https://v1.image.nuxtjs.org/configuration
        // dir: 'assets/images/',
        format: ['webp']
      }
    ],
    [
      '@vueuse/nuxt',
      {
        // No options, but see the section Caveats for further info
        // https://www.npmjs.com/package/@vueuse/nuxt}
      }
    ],
    [
      '@nuxtjs/color-mode',
      {
        // Control the site color Mode
        // https://color-mode.nuxtjs.org/
      }
    ],
    [
      'nuxt-icon',
      {
        // Add custom options for NuxtIcon
        // https://github.com/nuxt-modules/icon
      }
    ],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    [
      'dayjs-nuxt',
      {
        // Add custom options for dayjs
        // https://nuxt.com/modules/dayjs#configuration
        locales: ['pt-br'],
        defaultLocale: 'pt-br',
        plugins: ['duration']
      }
    ],
    [
      'nuxt-vuefire',
      {
        // Add custom options for vuefire
        // https://vuefire.vuejs.org/guide/nuxt.html
        auth: {
          enabled: true
        },
        config: {
          apiKey: 'AIzaSyALG6Fw3VKBFwjADYMgs9CBKPnRIZ4bX0Q',
          authDomain: 'controle-ponto-dfb5e.firebaseapp.com',
          projectId: 'controle-ponto-dfb5e',
          storageBucket: 'controle-ponto-dfb5e.appspot.com',
          messagingSenderId: '292295606902',
          appId: '1:292295606902:web:124662e5f2395911659557'
        }
      }
    ]
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
      API: '/api',
      API_TIMELOG: {
        POST_LOG: 'postLog',
        GET_LOG: 'getLog',
        START_TIME: 'startTime',
        CHECK_LOG: 'checkLog'
      }
    }
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2024-08-19'
})
