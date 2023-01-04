<template>
  <div class="flex pr-8">
    <v-img
      :lazy-src="lazySrc"
      :src="roomSrc[0].img"
      class="w-[50%] mr-2 rounded-l-lg"
    ></v-img>

    <div class="w-[25%] mx-2 flex flex-col">
      <v-img :lazy-src="lazySrc" :src="roomSrc[1].img" class="mb-2"></v-img>

      <v-img :lazy-src="lazySrc" :src="roomSrc[2].img" class="mt-2"></v-img>
    </div>

    <div class="w-[25%] ml-2 flex flex-col !relative">
      <v-img
        :lazy-src="lazySrc"
        :src="roomSrc[3].img"
        class="rounded-tr-lg mb-2"
      ></v-img>

      <v-img
        :lazy-src="lazySrc"
        :src="roomSrc[4].img"
        class="rounded-br-lg mt-2"
      ></v-img>

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

            <v-btn text>
              <v-icon small class="cursor-pointer" color="black">
                mdi-export-variant
              </v-icon>
              <TextBtnDialog :title="'分享'" />
            </v-btn>

            <v-btn text @click="openStoreDialog()">
              <v-icon small class="cursor-pointer" color="black">
                mdi-cards-heart-outline
              </v-icon>
              <TextBtnDialog :title="'儲存'" />
            </v-btn>
          </div>

          <v-card-text class="flex justify-center">
            <v-row class="max-w-[800px] mt-10">
              <v-col v-for="item in roomSrc" :key="item.id" cols="6">
                <v-img :src="item.img" />
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
}
</script>
