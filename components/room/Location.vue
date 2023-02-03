<template>
  <DivideBlock>
    <div class="my-8">
      <div class="text-2xl font-bold">
        {{ $t('住宿地點') }}
      </div>

      <div v-if="location" class="my-5">
        <TextBtnDialog
          :title="location.address"
          :subTitle="country"
          :isUnderlineCursorPointer="false"
        />
      </div>

      <GmapMap
        v-if="googleMaps_visible"
        :center="{ lat: location.lat, lng: location.lng }"
        :zoom="15"
        map-type-id="terrain"
        :class="$vuetify.breakpoint.xs ? 'h-[220px]' : 'h-[400px]'"
        class="w-full"
      >
        <GmapMarker :position="{ lat: location.lat, lng: location.lng }" />
      </GmapMap>

      <div
        v-if="location.content"
        class="!max-w-[115px] flex mt-7"
        @click="isVisible = !isVisible"
      >
        <TextBtnDialog :title="'顯示更多內容'" />

        <v-icon class="cursor-pointer" small color="black">
          mdi-greater-than
        </v-icon>
      </div>

      <v-dialog
        v-model="isVisible"
        transition="dialog-bottom-transition"
        scrollable
        fullscreen
      >
        <v-card class="h-screen relative bg-white">
          <v-btn icon class="ml-3 mt-2" @click="close()">
            <v-icon color="black"> mdi-less-than </v-icon>
          </v-btn>

          <v-card-text class="black--text flex mb-8">
            <div
              class="pr-10"
              :class="$vuetify.breakpoint.xs ? 'w-full' : 'w-[40%]'"
            >
              <div class="text-3xl font-bold mt-3 mb-6">住宿地點</div>

              <div v-if="location">
                <div v-if="location.title" class="text-xl font-medium mb-3">
                  {{ location.title }}
                </div>

                <div
                  v-html="convertTobr"
                  :class="details_visible ? 'line-clamp-3' : ''"
                  class="text-base"
                ></div>

                <div v-if="location.content" class="text-base">
                  <div
                    v-if="details_visible"
                    class="!max-w-[85px] flex"
                    @click="details_visible = !details_visible"
                  >
                    <TextBtnDialog :title="'閱讀詳情'" />

                    <v-icon class="cursor-pointer" small color="black">
                      mdi-greater-than
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>

            <GmapMap
              v-if="!$vuetify.breakpoint.xs"
              :center="{ lat: location.lat, lng: location.lng }"
              :zoom="15"
              map-type-id="terrain"
              class="w-full h-full"
            >
              <GmapMarker
                :position="{ lat: location.lat, lng: location.lng }"
              />
            </GmapMap>
          </v-card-text>
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
    return {
      details_visible: true,
    }
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
    googleMaps_visible() {
      return this.$store.state.googleMaps_visible
    },
    convertTobr() {
      if (this.location.content) {
        let arr = this.location.content.split('')
        return arr
          .map((item) => {
            return item === '\n' ? '<br />' : item
          })
          .join('')
      }
    },
  },
  methods: {
    close() {
      this.isVisible = !this.isVisible
      this.details_visible = !this.details_visible
    },
  },
}
</script>
