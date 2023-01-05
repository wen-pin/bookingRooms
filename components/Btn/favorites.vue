<template>
  <v-btn text @click="openFavoritesDialog()">
    <v-icon small class="cursor-pointer" color="black">
      mdi-cards-heart-outline
    </v-icon>
    <TextBtnDialog :title="'儲存'" />
  </v-btn>
</template>

<script>
export default {
  name: 'btnFavorites',

  data() {
    return {}
  },
  methods: {
    openFavoritesDialog() {
      if (this.$auth.loggedIn) {
        this.$store.commit('toggleFavoritesBtn')
      } else {
        this.$store.commit('toggleLoginBtn')
      }
    },
  },
}
</script>
