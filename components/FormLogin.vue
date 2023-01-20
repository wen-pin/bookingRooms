<template>
  <div>
    <v-form ref="form" v-model="valid">
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
        :rules="[(v) => !!v || $t(`帳號為必填`)]"
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
        :rules="[(v) => !!v || $t(`密碼為必填`)]"
        @click:append="form_password_visible = !form_password_visible"
      ></v-text-field>
    </v-form>

    <v-btn dark block @click="loginUser()"> 登入 </v-btn>
  </div>
</template>

<script>
export default {
  name: 'formLoginBook',

  props: {},

  data() {
    return {
      /** 表單密碼可見 */
      form_password_visible: false,
      // 表單是否有效驗證
      valid: true,

      loginInfo: {
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
    async loginUser() {
      if (!this.valid) {
        this.validate()
        this.$toast.warning('帳號或密碼未填寫')
      } else {
        try {
          this.$nuxt.$loading.start()

          let payload = this.loginInfo.data
          await this.$auth.loginWith('local', {
            data: payload,
          })

          this.$router.push('/')
        } catch (err) {
          this.$error(err)
        } finally {
          this.$toast.success('登入成功')
          this.loginDialog_visible = false
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
