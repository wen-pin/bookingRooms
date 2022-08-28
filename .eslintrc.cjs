module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'plugin:vue/vue3-strongly-recommended',z
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'no-console': OFF,
    'vue/multi-word-component-names': OFF,
    '@typescript-eslint/no-unused-vars': WARNNING,
    '@typescript-eslint/no-use-before-define': WARNNING,

    // vue3
    'vue/no-deprecated-v-bind-sync': OFF,
  },
}
