<template>
  <v-app-bar app absolute flat>
    <v-container flex>
      <div>
        <div
          class="w-[170px] flex items-center cursor-pointer"
          @click="goHome()"
        >
          <SvgIcon :iconClass="'logo'" :className="'size'" class="mr-1" />
          <span class="text-2xl font-black"> The Rooms </span>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-menu offset-y nudge-bottom="10" nudge-left="100" nudge-width="100">
        <template #activator="{ attrs, on }">
          <v-btn rounded outlined v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>

            <v-icon v-if="$auth.loggedIn">mdi-account-circle</v-icon>
            <v-icon v-else>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list v-if="!$auth.loggedIn">
          <v-list-item-group>
            <v-list-item
              @click.stop="loginDialog_visible = !loginDialog_visible"
            >
              <v-list-item-title> 登入 </v-list-item-title>
            </v-list-item>

            <v-list-item @click.stop="registerDialog_visible = true">
              <v-list-item-title>註冊</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-list v-else>
          <v-list-item-group>
            <v-list-item
              v-for="item in authItems"
              :key="item.title"
              @click="goTo(item.router)"
            >
              <v-list-item-title>
                <span class="font-semibold">{{ item.title }}</span>
              </v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item @click="$auth.logout()">
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

          <v-btn text class="px-0" @click="openRegisterDialog()">
            註冊？
          </v-btn>
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
    return {
      authItems: [
        {
          title: '旅程',
          router: '/trips',
        },
        {
          title: '帳號',
          router: '/account',
        },
      ],
    }
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
    goTo(path) {
      this.$router.push(path)
    },
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>
