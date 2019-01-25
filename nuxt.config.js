const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { ENV } = require('./configs/env')

const routerConfig = {
  middleware: 'redirectAppRoot'
}
if (ENV.BASE_URL) {
  routerConfig.base = ENV.BASE_URL
}

module.exports = {
  mode: 'universal',

  srcDir: 'app/',

  router: {
    ...routerConfig
  },

  render: {
    /**
     * compression を通すと API Gateway がレスポンスを返せないので
     * なにもしないミドルウェアを定義しておく
     */
    compressor: (req, res, next) => {
      next()
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'towa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'towa' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  manifest: {
    name: 'towa',
    lang: 'ja',
    short_name: 'npls',
    title: 'towa',
    'og:title': 'towa',
    description: 'towa',
    'og:description': 'towa',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
