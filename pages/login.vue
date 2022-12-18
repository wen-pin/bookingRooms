<template>
  <v-container class="h-[100vh] flex justify-center items-center">
    <v-card width="400px" height="500px" class="px-2">
      <v-card-title class="justify-center">登入</v-card-title>

      <v-form ref="form">
        <v-text-field
          v-model="loginInfo.data.username"
          autofocus
          clearable
          prepend-icon="mdi-account-circle"
          label="帳號"
        ></v-text-field>
        <v-text-field
          v-model="loginInfo.data.password"
          clearable
          prepend-icon="mdi-lock"
          label="密碼"
        ></v-text-field>

        <v-btn dark block @click="loginUser()"> 登入 </v-btn>

        <v-btn text color="grey" nuxt to="/register"> 註冊 </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        data: {
          username: '',
          password: '',
        },
      },
    }
  },
  methods: {
    loginUser() {
      let payload = this.loginInfo.data
      this.$auth.loginWith('local', {
        data: payload,
      })
    },
  },
}
</script>
