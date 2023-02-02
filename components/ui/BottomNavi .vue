<template>
  <v-bottom-navigation :value="value" app color="primary">
    <v-btn>
      <span>探索</span>

      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn>
      <span>心願單</span>

      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>

    <v-btn>
      <span>登入</span>

      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    }
  },
}
</script>
