export { default as Appbar } from '../../components/Appbar.vue'
export { default as CardDialog } from '../../components/CardDialog.vue'
export { default as DivideBlock } from '../../components/DivideBlock.vue'
export { default as TextBtnDialog } from '../../components/TextBtnDialog.vue'
export { default as TextRate } from '../../components/TextRate.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
