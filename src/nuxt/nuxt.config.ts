// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
          title: 'Nuxt - App Project',
          meta: [
            { name: 'description', content: 'Nuxt 3 Project' }
          ]
        }
    },
    modules: [
        // ...
        '@pinia/nuxt'
    ],
    css: [
      '~/assets/css/main.css',
      '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    nitro: {
      preset: 'node-server',
      prerender: {
        routes: ['/about']
      }
    },
    routeRules: {
      // Set custom headers matching paths
      '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },      
      // Add cors headers
      // '/api/**': { cors: true }
    },
    runtimeConfig: {
      // The private keys which are only available within server-side
      apiSecret: '123',
      // Keys within public, will be also exposed to the client-side
      public: {
        apiBaseProxy: process.env.API_BASE_PROXY,
        apiBase: process.env.API_BASE,
        mode: process.env.ENV_MODE,
      }
    }
})
