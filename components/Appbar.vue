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
              @click.stop="registerDialog = true"
            >
              <v-list-item-title>註冊</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!$auth.loggedIn" @click.stop="toggleLoginBtn()">
              <v-list-item-title> 登入 </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="$auth.loggedIn" @click="$auth.logout()">
              <v-list-item-title>登出</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-dialog v-model="isVisible" max-width="400" :retain-focus="false">
        <v-card class="pa-10">
          <v-btn
            icon
            color="black"
            class="!absolute top-[10px] left-[9px]"
            @click.stop="toggleLoginBtn()"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>

          <v-card-title class="justify-center">登入</v-card-title>
          <v-form ref="form">
            <v-text-field
              v-model="loginInfo.data.username"
              autofocus
              clearable
              flat
              prepend-inner-icon="mdi-account-circle"
              solo
              outlined
              label="帳號"
              placeholder="帳號"
              :rules="[(v) => !!v || $t(`不能為空`)]"
            ></v-text-field>
            <v-text-field
              v-model="loginInfo.data.password"
              :type="form_password_visible ? 'text' : 'password'"
              clearable
              flat
              prepend-inner-icon="mdi-lock"
              :append-icon="form_password_visible ? 'mdi-eye' : 'mdi-eye-off'"
              solo
              outlined
              label="密碼"
              placeholder="密碼"
              :rules="[(v) => !!v || $t(`不能為空`)]"
              @click:append="form_password_visible = !form_password_visible"
            ></v-text-field>

            <v-btn dark block @click="loginUser()"> 登入 </v-btn>

            <v-btn text @click="openRegisterDialog()"> 註冊 </v-btn>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="registerDialog" max-width="400">
        <v-card class="pa-10">
          <v-btn
            icon
            color="black"
            class="!absolute top-[10px] left-[9px]"
            @click.stop="registerDialog = false"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>

          <v-card-title class="justify-center">註冊</v-card-title>
          <v-form ref="form">
            <v-text-field
              v-model="registerInfo.data.username"
              autofocus
              clearable
              flat
              prepend-inner-icon="mdi-account-circle"
              solo
              outlined
              label="帳號"
              placeholder="帳號"
              :rules="[(v) => !!v || $t(`不能為空`)]"
            ></v-text-field>

            <v-text-field
              v-model="registerInfo.data.password"
              clearable
              solo
              outlined
              flat
              label="密碼"
              placeholder="密碼"
              prepend-inner-icon="mdi-lock"
              :type="form_password_visible ? 'text' : 'password'"
              :append-icon="form_password_visible ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[(v) => !!v || $t(`不能為空`)]"
              @click:append="form_password_visible = !form_password_visible"
            ></v-text-field>

            <v-text-field
              v-model="password_confirm"
              clearable
              solo
              outlined
              prepend-inner-icon="mdi-lock"
              :type="form_password_visible ? 'text' : 'password'"
              :append-icon="form_password_visible ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('確認密碼')"
              :error-messages="
                password_confirm === registerInfo.data.password
                  ? null
                  : $t(`密碼不相同`)
              "
              @click:append="form_password_visible = !form_password_visible"
            ></v-text-field>

            <v-btn dark block @click="registerUser()"> 註冊 </v-btn>
          </v-form>
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
      registerDialog: false,
      /** 表單密碼可見 */
      form_password_visible: false,
      /** 表單密碼確認 */
      password_confirm: '',

      loginInfo: {
        data: {
          username: '',
          password: '',
        },
      },

      registerInfo: {
        data: {
          username: '',
          password: '',
        },
      },
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.$store.state.loginDialog_visible
      },
    },
  },
  methods: {
    toggleLoginBtn() {
      return this.$store.commit('toggleLoginBtn')
    },
    loginUser() {
      let payload = this.loginInfo.data
      this.$auth.loginWith('local', {
        data: payload,
      })

      this.toggleLoginBtn()
    },
    async registerUser() {
      try {
        await this.$axios.$post('/api/users', this.registerInfo.data)

        this.$auth.loginWith('local', {
          data: this.registerInfo.data,
        })
      } catch (err) {
        console.err(err)
      } finally {
        this.registerDialog = false
      }
    },
    openRegisterDialog() {
      this.toggleLoginBtn()
      this.registerDialog = true
    },
  },
}
</script>
