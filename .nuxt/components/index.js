export { default as Appbar } from '../../components/Appbar.vue'
export { default as CardDialog } from '../../components/CardDialog.vue'
export { default as CardEqptAndServ } from '../../components/CardEqptAndServ.vue'
export { default as DivideBlock } from '../../components/DivideBlock.vue'
export { default as SvgIcon } from '../../components/SvgIcon.vue'
export { default as TextBtnDialog } from '../../components/TextBtnDialog.vue'
export { default as TextRate } from '../../components/TextRate.vue'
export { default as MessageBlock } from '../../components/messageBlock.vue'
export { default as BtnShare } from '../../components/Btn/Share.vue'
export { default as BtnFavorites } from '../../components/Btn/favorites.vue'
export { default as RoomsPhotos } from '../../components/rooms/Photos.vue'

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
