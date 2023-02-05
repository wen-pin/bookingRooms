<template>
  <v-dialog
    v-model="googleMapsDialog_mobile"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-btn
      absolute
      width="50px"
      height="40px"
      class="z-10 top-[10px] right-[60px]"
      @click="googleMapsDialog_mobile = !googleMapsDialog_mobile"
    >
      <div>關閉</div>
    </v-btn>

    <GmapMap
      v-if="googleMaps_visible"
      :center="{ lat: location.lat, lng: location.lng }"
      :zoom="15"
      map-type-id="terrain"
      class="w-full h-full"
    >
      <GmapMarker :position="{ lat: location.lat, lng: location.lng }" />
    </GmapMap>
  </v-dialog>
</template>

<script>
export default {
  name: 'roomGmaoMobile',

  props: {
    location: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    googleMapsDialog_mobile: {
      get() {
        return this.$store.state.googleMapsDialog_mobile_visible
      },
      set(v) {
        this.$store.commit('toggleGoogleMapsBtn_mobile', v)
      },
    },
    googleMaps_visible() {
      return this.$store.state.googleMaps_visible
    },
  },
}
</script>
