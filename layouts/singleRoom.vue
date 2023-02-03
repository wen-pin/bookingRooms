<template>
  <v-app>
    <UiAppbar v-if="!$vuetify.breakpoint.xs" />

    <v-main>
      <Nuxt />
    </v-main>
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
