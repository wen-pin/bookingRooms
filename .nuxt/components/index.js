export { default as Appbar } from '../../components/Appbar.vue'
export { default as CardDialog } from '../../components/CardDialog.vue'
export { default as CardEqptAndServ } from '../../components/CardEqptAndServ.vue'
export { default as DivideBlock } from '../../components/DivideBlock.vue'
export { default as FormLogin } from '../../components/FormLogin.vue'
export { default as FormLoginBook } from '../../components/FormLoginBook.vue'
export { default as FormRegister } from '../../components/FormRegister.vue'
export { default as FormRegisterBook } from '../../components/FormRegisterBook.vue'
export { default as MessageBlock } from '../../components/MessageBlock.vue'
export { default as SubAppbar } from '../../components/SubAppbar.vue'
export { default as SvgIcon } from '../../components/SvgIcon.vue'
export { default as TextBtnDialog } from '../../components/TextBtnDialog.vue'
export { default as TextRate } from '../../components/TextRate.vue'
export { default as DialogEvaluation } from '../../components/dialog/Evaluation.vue'
export { default as DialogFavorites } from '../../components/dialog/Favorites.vue'
export { default as DialogShare } from '../../components/dialog/Share.vue'
export { default as DateClearBtn } from '../../components/date/ClearBtn.vue'
export { default as DateCloseBtn } from '../../components/date/CloseBtn.vue'
export { default as DatePicker } from '../../components/date/Picker.vue'
export { default as DateRange } from '../../components/date/Range.vue'
export { default as DateRangeStyle } from '../../components/date/RangeStyle.vue'
export { default as RoomBeds } from '../../components/room/Beds.vue'
export { default as RoomCardBook } from '../../components/room/CardBook.vue'
export { default as RoomCardTenant } from '../../components/room/CardTenant.vue'
export { default as RoomEquipment } from '../../components/room/Equipment.vue'
export { default as RoomEvaluation } from '../../components/room/Evaluation.vue'
export { default as RoomInfoLandlord } from '../../components/room/InfoLandlord.vue'
export { default as RoomInfoTitle } from '../../components/room/InfoTitle.vue'
export { default as RoomIntroduce } from '../../components/room/Introduce.vue'
export { default as RoomLocation } from '../../components/room/Location.vue'
export { default as RoomPhotos } from '../../components/room/Photos.vue'
export { default as RoomPriceUntaxed } from '../../components/room/PriceUntaxed.vue'
export { default as RoomRights } from '../../components/room/Rights.vue'
export { default as RoomNotes } from '../../components/room/notes.vue'

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
