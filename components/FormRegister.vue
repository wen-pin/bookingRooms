<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="registerInfo.data.username"
        clearable
        flat
        prepend-inner-icon="mdi-account-circle"
        solo
        outlined
        label="帳號"
        placeholder="帳號"
        :rules="[(v) => !!v || $t(`帳號為必填`)]"
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
        :rules="[(v) => !!v || $t(`密碼為必填`)]"
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
        :rules="[(v) => !!v || $t(`確認密碼為必填`)]"
        @click:append="form_password_visible = !form_password_visible"
      ></v-text-field>
    </v-form>

    <v-btn
      dark
      block
      height="48px"
      color="#EC407A"
      class="rounded-lg"
      @click="registerUser()"
    >
      <span class="text-base"> 註冊並登入 </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'formRegister',

  data() {
    return {
      /** 表單密碼可見 */
      form_password_visible: false,
      // 表單是否有效驗證
      valid: true,

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
      if (!this.valid) {
        this.validate()
        this.$toast.warning('帳號或密碼未填寫')
      } else {
        try {
          this.$nuxt.$loading.start()

          await this.$axios.$post('/api/users', this.registerInfo.data)

          this.$auth.loginWith('local', {
            data: this.registerInfo.data,
          })

          this.registerDialog_visible = false
        } catch (err) {
        } finally {
          this.$nuxt.$loading.finish()
        }
      }
    },
    // 驗證表單是否有效
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
