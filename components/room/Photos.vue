<template>
  <div class="flex pr-8 h-[450px]">
    <div class="w-[50%]">
      <v-img
        :lazy-src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
        :src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
        width="100%"
        height="100%"
        class="w-[50%] mr-2 rounded-l-lg"
      ></v-img>
    </div>

    <div class="w-[25%] mx-2 pb-2 flex flex-col">
      <div class="h-[50%]">
        <v-img
          :lazy-src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_2.jpg`)"
          height="100%"
          class="mb-2"
        ></v-img>
      </div>

      <div class="h-[50%]">
        <v-img
          :lazy-src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_3.jpg`)"
          height="100%"
          class="mt-2"
        ></v-img>
      </div>
    </div>

    <div class="w-[25%] ml-2 pb-2 flex flex-col !relative">
      <div class="h-[50%]">
        <v-img
          :lazy-src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_4.jpg`)"
          height="100%"
          class="rounded-tr-lg mb-2"
        ></v-img>
      </div>

      <div class="h-[50%]">
        <v-img
          :lazy-src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_5.jpg`)"
          height="100%"
          class="rounded-br-lg mt-2"
        ></v-img>
      </div>

      <v-btn
        max-width="120px"
        max-height="60px"
        class="!absolute right-[20px] bottom-[20px] !text-xs"
        @click="photosDialog = !photosDialog"
      >
        <v-icon>mdi-apps</v-icon>
        {{ $t('顯示全部相片') }}
      </v-btn>

      <DialogPhotos
        :dialog="photosDialog"
        :roomQuality="roomQuality"
        :roomId="roomId"
        @update="updatePhotosDialog"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'roomPhotos',

  props: {
    roomQuality: {
      types: Number,
    },
  },

  data() {
    return {
      photosDialog: false,
    }
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
  },
  methods: {
    updatePhotosDialog(val) {
      this.photosDialog = val
    },
  },
}
</script>
