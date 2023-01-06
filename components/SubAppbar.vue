<template>
  <v-app-bar
    flat
    absolute
    inverted-scroll
    :scroll-target="scrollTargetSelector"
    scroll-threshol="500"
  >
    <v-container>123</v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'subAppbar',

  data() {
    return {}
  },
  computed: {
    scrollTargetId() {
      return this.$store.state.scrollTargetId
    },
    scrollTargetSelector() {
      return `#${this.scrollTargetId}`
    },
  },
}
</script>
