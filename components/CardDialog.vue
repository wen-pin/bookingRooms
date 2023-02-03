<template>
  <v-dialog
    v-model="detailDialog"
    :width="width"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-lg">
      <v-btn icon @click="detailDialog = false" class="ml-3 mt-2">
        <v-icon color="black">{{ icon }}</v-icon>
      </v-btn>

      <v-card-text class="p-5 mb-10 black--text">
        <div v-if="title" class="text-2xl font-semibold mt-5">
          {{ title }}
        </div>

        <slot />
      </v-card-text>
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
