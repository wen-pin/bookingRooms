<template>
  <div>
    <!-- 尚未完成開發 -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon small class="cursor-pointer" color="black">
            mdi-cards-heart-outline
          </v-icon>
          <TextBtnDialog :title="'儲存'" />
        </v-btn>
      </template>

      <span>此功能開發中</span>
    </v-tooltip>

    <!-- <v-btn text @click="authLogin()">
      <v-icon small class="cursor-pointer" color="black">
        mdi-cards-heart-outline
      </v-icon>
      <TextBtnDialog :title="'儲存'" />
    </v-btn> -->

    <v-dialog v-model="isVisible">
      <v-card class="rounded-lg p-5" height="100%">
        <v-btn icon @click="isVisible = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogFavorites',

  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    authLogin() {
      if (this.$auth.loggedIn) {
        this.isVisible = true
      } else {
        this.$store.commit('toggleLoginBtn', true)
      }
    },
  },
}
</script>
