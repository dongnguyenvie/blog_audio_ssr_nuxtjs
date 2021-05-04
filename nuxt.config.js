const { join } = require('path')

export default {
  // loading: '~/components/loadings/HomeLoading.vue',
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  router: {
    middleware: 'skelton',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8', 'http-equiv': 'Content-Type', content: 'text/html' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/localforage', mode: 'client', ssr: false },
    { src: '~/plugins/websocket-channel', mode: 'client', ssr: false },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/initialClient', mode: 'client', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // Doc: https://github.com/nuxt-community/localforage-module
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // With options
    'nuxt-fontawesome',
    '@nuxtjs/svg',
    [
      'nuxt-lazy-load',
      {
        // These are the default values
        // images: true,
        // videos: true,
        // audios: true,
        // iframes: true,
        // native: false,
        // polyfill: true,
        directiveOnly: true,
        defaultImage: '/images/default-image.png',
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL,
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ['vue-awesome'],
  },
  env: {
    API_URL: process.env.API_URL || '',
    WEBSOCKET_API_URL: process.env.WEBSOCKET_API_URL,
    ENABLE_WEBSOCKET_PLUGIN: process.env.ENABLE_WEBSOCKET_PLUGIN,
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },
  moment: {
    defaultTimezone: 'Asia/Ho_Chi_Minh',
    defaultLocale: 'vi',
    locales: ['vi'],
  },
  routerModule: {
    keepDefaultRouter: false,
    path: join(__dirname, 'routes'),
    fileName: 'index.ts',
  },
  localforage: {
    instances: [
      {
        name: 'audioVyVyApp',
        storeName: 'media',
      },
    ],
  },
}
