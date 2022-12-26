<template>
  <v-dialog
    v-model="detailDialog"
    :width="width"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
  >
    <v-card class="rounded-lg p-5">
      <v-btn icon @click="detailDialog = false">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>

      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 600,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    hideOverlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    detailDialog: {
      get() {
        return this.dialog
      },
      set(val) {
        return this.$emit('update', val)
      },
    },
  },
}
</script>
