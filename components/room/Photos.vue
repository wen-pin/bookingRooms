<template>
  <div class="flex pr-8 h-[450px]">
    <div class="w-[50%]">
      <v-img
        :lazy-src="lazySrc"
        :src="require(`~/assets/img/rooms/room${roomId}/bg_1.jpg`)"
        width="100%"
        height="100%"
        class="w-[50%] mr-2 rounded-l-lg"
      ></v-img>
    </div>

    <div class="w-[25%] mx-2 pb-2 flex flex-col">
      <div class="h-[50%]">
        <v-img
          :lazy-src="lazySrc"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_2.jpg`)"
          height="100%"
          class="mb-2"
        ></v-img>
      </div>

      <div class="h-[50%]">
        <v-img
          :lazy-src="lazySrc"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_3.jpg`)"
          height="100%"
          class="mt-2"
        ></v-img>
      </div>
    </div>

    <div class="w-[25%] ml-2 pb-2 flex flex-col !relative">
      <div class="h-[50%]">
        <v-img
          :lazy-src="lazySrc"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_4.jpg`)"
          height="100%"
          class="rounded-tr-lg mb-2"
        ></v-img>
      </div>

      <div class="h-[50%]">
        <v-img
          :lazy-src="lazySrc"
          :src="require(`~/assets/img/rooms/room${roomId}/bg_5.jpg`)"
          height="100%"
          class="rounded-br-lg mt-2"
        ></v-img>
      </div>

      <v-btn
        max-width="120px"
        max-height="60px"
        class="!absolute right-[20px] bottom-[20px] !text-xs"
        @click="fullscreenDialog = true"
      >
        <v-icon>mdi-apps</v-icon>
        {{ $t('顯示全部相片') }}
      </v-btn>

      <v-dialog
        v-model="fullscreenDialog"
        fullscreen
        hide-overlay
        scrollable
        transition="dialog-bottom-transition"
      >
        <v-card>
          <div class="flex pt-5 pl-2">
            <v-btn icon @click="fullscreenDialog = false">
              <v-icon class="cursor-pointer" color="black">
                mdi-less-than
              </v-icon>
            </v-btn>

            <v-spacer />

            <DialogShare />

            <DialogFavorites />
          </div>

          <v-card-text class="flex justify-center">
            <v-row class="max-w-[800px] mt-10">
              <v-col
                v-for="item in 13"
                :key="item.id"
                cols="12"
                class="h-[450px]"
              >
                <v-img
                  height="100%"
                  :src="
                    require(`~/assets/img/rooms/room${roomId}/bg_${item}.jpg`)
                  "
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roomPhotos',

  props: {
    lazySrc: {
      types: String,
    },
    roomSrc: {
      types: Array,
    },
  },
  data() {
    return {
      fullscreenDialog: false,
    }
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
  },
}
</script>
