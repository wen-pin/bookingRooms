<template>
  <DivideBlock>
    <div class="my-10">
      <div class="text-2xl font-bold">
        {{ $t('住宿地點') }}
      </div>

      <div class="my-5">
        <TextBtnDialog
          :title="location.address"
          :subTitle="country"
          :isUnderlineCursorPointer="false"
        />
      </div>

      <GmapMap
        :center="{ lat: location.lat, lng: location.lng }"
        :zoom="15"
        map-type-id="terrain"
        class="w-full h-[400px]"
      >
        <GmapMarker :position="{ lat: location.lat, lng: location.lng }" />
      </GmapMap>

      <div class="!max-w-[115px] flex mt-7" @click="isVisible = !isVisible">
        <TextBtnDialog :title="'顯示更多內容'" />

        <v-icon class="cursor-pointer" small color="black">
          mdi-greater-than
        </v-icon>
      </div>

      <v-dialog
        v-model="isVisible"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="h-full relative">
          <v-btn
            icon
            class="!absolute top-4 left-4"
            @click="isVisible = !isVisible"
          >
            <v-icon> mdi-less-than </v-icon>
          </v-btn>

          <div class="flex w-full h-full pt-[60px] px-8 pb-8">
            <div class="w-[30%] pr-10">
              <div class="text-3xl font-bold mt-3 mb-6">住宿地點</div>

              <div class="font-medium mb-3">周邊交通</div>

              <div>
                離最美沙灘砂島保護區約1分鐘車程
                離台灣最南端鵝鑾鼻燈塔約1分鐘車程
                離日出與觀星景點龍磐公園約5分鐘車程
              </div>

              <div class="!max-w-[80px] flex">
                <TextBtnDialog :title="'閱讀詳情'" />

                <v-icon class="cursor-pointer" small color="black">
                  mdi-greater-than
                </v-icon>
              </div>
            </div>

            <GmapMap
              :center="{ lat: location.lat, lng: location.lng }"
              :zoom="15"
              map-type-id="terrain"
              class="w-full h-full"
            >
              <GmapMarker
                :position="{ lat: location.lat, lng: location.lng }"
              />
            </GmapMap>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomLocation',

  props: {
    location: {
      types: Object,
      required: true,
    },
    country: {
      types: String,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    isVisible: {
      get() {
        return this.$store.state.googleMapsDialog_visible
      },
      set(v) {
        this.$store.commit('toggleGoogleMapsBtn', v)
      },
    },
  },
}
</script>
