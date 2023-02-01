<template>
  <v-app-bar app flat inverted-scroll>
    <v-tabs
      background-color="transparent"
      color="black"
      height="100%"
      slider-width
      class="max-w-[1185px] mx-auto px-3"
    >
      <v-tabs-slider color="black" width="4px"></v-tabs-slider>

      <v-tab
        v-for="item in items"
        :key="item.title"
        @click="goToTarget(item.targetElement)"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: 'subAppbar',

  data() {
    return {
      items: [
        {
          title: '相片',
          targetElement: '#photos',
        },
        {
          title: '設備與服務',
          targetElement: '#equipment',
        },
        {
          title: '評價',
          targetElement: '#evaluation',
        },
        {
          title: '位置',
          targetElement: '#location',
        },
      ],
    }
  },
  // computed: {
  //   scrollTargetId() {
  //     return this.$store.state.scrollTargetId
  //   },
  //   scrollTargetSelector() {
  //     return `#${this.scrollTargetId}`
  //   },
  // },
  methods: {
    goToTarget(target) {
      this.$vuetify.goTo(target, {
        duration: 2000,
        offset: 40,
        easing: 'easeOutQuart',
      })
    },
  },
}
</script>
