export default {
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
  components: true,
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],
  auth: {
    // Options
  },
}
