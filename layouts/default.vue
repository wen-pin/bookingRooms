<template>
  <v-app>
    <UiAppbar v-if="!$vuetify.breakpoint.xs" />

    <v-main>
      <Nuxt />
    </v-main>

    <UiBottomNavi v-if="$vuetify.breakpoint.xs" />
  </v-app>
</template>

<script>
export default {
  name: 'default',

  data() {
    return {}
  },
}
</script>
