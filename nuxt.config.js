const path = require('path')

export default {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  ssr: true,
  target: 'server',

  head: {
    titleTemplate: 'BookingRooms',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },

  // 為了解決defu__WEBPACK_IMPORTED_MODULE_3__ is not a function
  build: {
    transpile: ['defu'],
    extend(config, ctx) {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/svg')]
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'assets/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      })
    },
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

  plugins: ['~/plugins/axios', { src: '@/plugins/icons', ssr: true }],

  components: true,

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs',
  ],

  //定義客戶端環境變量，並可使用服務端的環境變量
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  },

  /**
   * Axios module configurtion
   * @see https://axios.nuxtjs.org/setup
   */
  axios: {
    proxy: true,
    credentials: true,
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },

  // privateRuntimeConfig: {
  //   API_URL: process.env.API_URL,
  // },

  /**
   * Proxy模組
   * @see https://github.com/nuxt-community/proxy-module
   * @see https://github.com/chimurai/http-proxy-middleware
   */
  proxy: {
    // api url當中path的部分，例如：http://localhost:3000/api/
    '/api': process.env.API_URL,
  },

  /**
   * 驗證模組
   * @see https://auth.nuxtjs.org
   */
  auth: {
    strategies: {
      local: {
        token: {
          // 登入時response的token名稱
          property: 'accessToken',
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
    cookies: {
      prefix: 'auth.',
      options: {},
    },
  },

  /**
   * 國際化 (i18n)
   * @see https://i18n.nuxtjs.org/
   */
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh-tw',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    lazy: true,
    langDir: './locales',
    locales: [
      { code: 'en-us', iso: 'en-US', file: 'en.js', dir: 'ltr' },
      { code: 'zh-tw', iso: 'zh-TW', file: 'tw.js', dir: 'ltr' },
    ],
    vueI18n: {
      silentTranslationWarn: true, // 關閉缺少翻譯的警告
      fallbackLocale: 'en-us',
      locale: 'zh-tw',
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
      numberFormats: {
        'en-us': {
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
        'zh-tw': {
          currency: {
            style: 'currency',
            currency: 'TWD', // NTD
            currencyDisplay: 'code',
            minimumFractionDigits: 0,
          },
        },
      },
    },
  },

  /**
   * 時間處理模組
   * @see https://github.com/nuxt-community/dayjs-module
   * @see https://day.js.org/docs/en/installation/node-js
   */
  dayjs: {
    locales: ['en', 'zh-tw'],
    defaultLocale: 'zh-tw',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone',
      'relativeTime',
    ],
  },

  /**
   * UI框架 (Vuetify)
   * @see https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: false,
    // defaultAssets: false,
  },
}
