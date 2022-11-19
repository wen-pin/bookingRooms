export default {
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

  /**
   * Proxy模組
   * @see https://github.com/nuxt-community/proxy-module
   * @see https://github.com/chimurai/http-proxy-middleware
   */
  proxy: {
    // api url當中path的部分，例如：http://localhost:3000/api/
    '/api': {
      // 代理請求api url地址(server地址)
      target: 'https://booking-rooms-server.vercel.app',
    },
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
