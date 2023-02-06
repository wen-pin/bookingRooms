<template>
  <v-dialog
    v-model="detailDialog"
    fullscreen
    hideOverlay
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <div class="flex py-3 pl-2">
        <v-btn icon @click="detailDialog = false">
          <v-icon class="cursor-pointer ml-5" color="black">
            mdi-less-than
          </v-icon>
        </v-btn>

        <v-spacer />

        <DialogShare />

        <DialogFavorites />
      </div>

      <v-card-text
        class="flex justify-center"
        :class="$vuetify.breakpoint.xs ? 'px-0' : 'mt-10'"
      >
        <v-row v-if="roomQuality" class="max-w-[800px]">
          <v-col
            v-for="item in roomQuality"
            :key="item"
            cols="12"
            class="!py-[6px]"
            :class="$vuetify.breakpoint.xs ? 'h-[312px]' : 'h-[412px]'"
          >
            <v-img
              aspect-ratio="16/9"
              height="100%"
              :max-height="$vuetify.breakpoint.xs ? '300px' : '400px'"
              :src="require(`~/assets/img/rooms/room${roomId}/bg_${item}.jpg`)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogPhotos',

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    roomQuality: {
      types: Number,
    },
    roomId: {
      types: Number,
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
