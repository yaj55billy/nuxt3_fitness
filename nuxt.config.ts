// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  "runtimeConfig": {
    "public": {
      "uuid": '',
      "apiUrl": '',
    }
  }, 
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,500&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css' }
      ],
      script: [
        // { src: '/js/bootstrap.bundle.min.js' }
        // { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js", integrity: "sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ", crossorigin: "anonymous" }
      ]
    }
  },

  devtools: { enabled: true },
  css: [
    // 'bootstrap/scss/bootstrap.scss',
    '@/assets/styles/main.scss',
  ],
  "imports": {
    "dirs": ['stores']
  },
  "modules": [
    [
      '@pinia/nuxt',
      {
          'autoImports': ['defineStore', 'acceptHMRUpdate'],
      },
    ]
  ],
})
