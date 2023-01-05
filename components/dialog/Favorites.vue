<template>
  <v-dialog v-model="isVisible" :retain-focus="false">
    <v-card class="rounded-lg p-5" height="100%">
      <v-btn icon @click="this.isVisible = false">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogFavorites',

  data() {
    return {}
  },
  computed: {
    isVisible: {
      get() {
        return this.$store.state.favoritesDialog_visible
      },
      set(v) {
        this.$store.commit('toggleFavoritesBtn', v)
      },
    },
  },
}
</script>
