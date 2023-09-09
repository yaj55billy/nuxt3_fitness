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
      "viewport": "width=device-width, initial-scale=1, minimum-scale=1, user-scalable=0",
      "title": "FitSpace 健身空間",
      "meta": [
        { charset: 'utf-8' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: '想讓身體更健康、更強壯嗎? FitSpace能夠提供給您正確的飲食知識、運動方法' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'FitSpace 健身空間' },
        { property: 'og:title', content: 'FitSpace 健身空間' },
        { property: 'og:description', content: '想讓身體更健康、更強壯嗎? FitSpace能夠提供給您正確的飲食知識、運動方法' },
        { property: 'og:image', content: 'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Hpk6eOSj846UU4ADcKHI2TH6bMAk0NUl6TmkUDYh2UZnyJc9M9U5IXp5E4hiU6ZHn9wqCj5qIHOWlJcdGN1XxHILdTBypxvUWtGXdoXNJkAePcH9EINjaonNATqi4sDJ.JPG' },
        { property: 'og:url', content: 'https://nuxt3-fitness.vercel.app/' }
      ],

      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,500&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css' }
      ],
      script: [

      ]
    }
  },

  devtools: { enabled: true },
  css: [
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
    ],
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VForm',
          Field: 'VField',
          FieldArray: 'VFieldArray',
          ErrorMessage: 'VErrorMessage',
        },
      },
    ],
  ],
})
