<template>
  <v-app-bar app absolute flat>
    <v-container flex>
      <div class="text-lg flex items-center">The rooms</div>

      <v-spacer></v-spacer>

      <div v-if="$auth.loggedIn" class="mr-2">{{ $auth.user.username }}</div>

      <v-menu offset-y nudge-bottom="10" nudge-width="100">
        <template #activator="{ attrs, on }">
          <v-btn rounded outlined v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>

            <v-icon v-if="$auth.loggedIn">mdi-account-circle</v-icon>
            <v-icon v-else>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-if="!$auth.loggedIn"
              @click.stop="registerDialog_visible = true"
            >
              <v-list-item-title>註冊</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="!$auth.loggedIn"
              @click.stop="loginDialog_visible = !loginDialog_visible"
            >
              <v-list-item-title> 登入 </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="$auth.loggedIn" @click="$auth.logout()">
              <v-list-item-title>登出</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-dialog
        v-model="loginDialog_visible"
        max-width="400"
        :retain-focus="false"
      >
        <v-card class="pa-10">
          <v-btn
            icon
            color="black"
            class="!absolute top-[10px] left-[9px]"
            @click.stop="loginDialog_visible = !loginDialog_visible"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>

          <v-card-title class="justify-center">登入</v-card-title>

          <FormLogin />

          <v-btn text @click="openRegisterDialog()"> 註冊 </v-btn>
        </v-card>
      </v-dialog>

      <v-dialog v-model="registerDialog_visible" max-width="400">
        <v-card class="pa-10">
          <v-btn
            icon
            color="black"
            class="!absolute top-[10px] left-[9px]"
            @click.stop="registerDialog_visible = false"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>

          <v-card-title class="justify-center">註冊</v-card-title>

          <FormRegister />
        </v-card>
      </v-dialog>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'appbar',

  data() {
    return {}
  },
  computed: {
    loginDialog_visible: {
      get() {
        return this.$store.state.loginDialog_visible
      },
      set(v) {
        this.$store.commit('toggleLoginBtn', v)
      },
    },
    registerDialog_visible: {
      get() {
        return this.$store.state.registerDialog_visible
      },
      set(v) {
        this.$store.commit('toggleRegisterBtn', v)
      },
    },
  },
  methods: {
    openRegisterDialog() {
      this.loginDialog_visible = false
      this.registerDialog_visible = true
    },
  },
}
</script>
