export default {
  preflight: false,

  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  extend: {
    lineClamp: {
      6: '6',
      sm: '3',
      lg: '10',
    },
  },
  plugins: [require('windicss/plugin/line-clamp')],
}
