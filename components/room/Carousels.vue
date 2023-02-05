<template>
  <div class="relative">
    <v-btn
      light
      fab
      absolute
      small
      color="white"
      class="z-10 top-3 left-3"
      @click="goBack()"
    >
      <v-icon size="20" class="mr-1">mdi-less-than</v-icon>
    </v-btn>

    <v-carousel
      v-model="value"
      eager
      hide-delimiters
      :show-arrows="false"
      height="300"
    >
      <v-carousel-item
        v-for="item in roomQuality"
        :key="item"
        touch
        height="300"
      >
        <v-img
          :src="require(`~/assets/img/rooms/room${roomId}/bg_${item}.jpg`)"
          aspect-ratio="16/9"
          width="100%"
          height="300"
          @click="photosDialog = !photosDialog"
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <v-chip
      color="rgba(0, 0, 0, 0.6)"
      dark
      label
      class="!absolute bottom-4 right-3"
    >
      <div class="w-[35px] text-center">{{ value + 1 }}/{{ roomQuality }}</div>
    </v-chip>

    <DialogPhotos
      :dialog="photosDialog"
      :roomQuality="roomQuality"
      :roomId="roomId"
      @update="updatePhotosDialog"
    />
  </div>
</template>

<script>
export default {
  name: 'roomCarousels',

  props: {
    roomQuality: {
      types: Number,
    },
  },

  data() {
    return {
      value: 0,
      photosDialog: false,
    }
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    updatePhotosDialog(val) {
      this.photosDialog = val
    },
  },
}
</script>
