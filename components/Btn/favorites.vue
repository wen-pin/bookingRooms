<template>
  <v-btn text @click="openStoreDialog()">
    <v-icon small class="cursor-pointer" color="black">
      mdi-cards-heart-outline
    </v-icon>
    <TextBtnDialog :title="'儲存'" />
  </v-btn>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    openStoreDialog() {
      if (this.$auth.loggedIn) {
        this.storeDialog = true
      } else {
        this.$store.commit('toggleLoginDialog')
      }
    },
  },
}
</script>
