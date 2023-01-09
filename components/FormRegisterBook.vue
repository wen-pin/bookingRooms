<template>
  <div>
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
        flat
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
    </v-form>

    <v-btn dark block @click="registerUser()"> 註冊並登入 </v-btn>
  </div>
</template>

<script>
export default {
  name: 'formRegister',

  data() {
    return {
      /** 表單密碼可見 */
      form_password_visible: false,

      /** 表單密碼確認 */
      password_confirm: '',

      registerInfo: {
        data: {
          username: '',
          password: '',
        },
      },
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
    async registerUser() {
      try {
        this.$nuxt.$loading.start()

        await this.$axios.$post('/api/users', this.registerInfo.data)

        this.$auth.loginWith('local', {
          data: this.registerInfo.data,
        })

        this.$router.push(`/book/stays/${this.$route.params.id}`)
      } catch (err) {
        console.err(err)
      } finally {
        this.registerDialog_visible = false

        this.$nuxt.$loading.start()
      }
    },
  },
}
</script>
