export let API_URL =
  process.env.API_URL || 'https://booking-rooms-server.vercel.app'
export default {
  target: 'server',

  // 為了解決defu__WEBPACK_IMPORTED_MODULE_3__ is not a function
  build: {
    transpile: ['defu'],
  },

  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
    'nuxt-windicss',
  ],

  css: [
    // windi extras
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],

  plugins: ['~/plugins/axios'],

  components: true,

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/proxy'],

  /**
   * Axios module configurtion
   * @see https://axios.nuxtjs.org/setup
   */
  axios: {
    proxy: true,
    credentials: true,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL || https://booking-rooms-server.vercel.app
    }
  },

  /**
   * Proxy模組
   * @see https://github.com/nuxt-community/proxy-module
   * @see https://github.com/chimurai/http-proxy-middleware
   */
  proxy: {
    // api url當中path的部分，例如：http://localhost:3000/api/
    '/api': API_URL,
  },

  /**
   * 驗證模組
   * @see https://auth.nuxtjs.org
   */
  auth: {
    strategies: {
      local: {
        token: {
          property: true,
          required: true,
          type: 'Bearer',
          maxAge: 0,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/users/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: {
            url: '/api/users',
            method: 'get',
          },
        },
      },
    },
  },
}
