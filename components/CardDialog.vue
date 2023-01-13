<template>
  <v-dialog
    v-model="detailDialog"
    :width="width"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-lg p-5" height="100%">
      <v-btn icon @click="detailDialog = false">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>

      <v-card-title v-if="title">
        <span class="text-2xl font-semibold">
          {{ title }}
        </span>
      </v-card-title>

      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'cardDialog',

  props: {
    title: {
      types: String,
      default: '',
    },
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
    icon: {
      type: String,
      default: 'mdi-window-close',
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
