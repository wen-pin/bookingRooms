<template>
  <div>
    <div
      class="h-[56px] flex justify-center items-center border border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-300"
    >
      註冊
    </div>
    <v-container class="h-[100vh] flex justify-center">
      <v-card width="400px" height="500px" flat class="px-2 mt-10">
        <div class="justify-start font-semibold text-2xl mb-5">
          The Rooms 歡迎你
        </div>

        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="registerInfo.data.username"
            clearable
            outlined
            label="帳號"
            placeholder="帳號"
            prepend-inner-icon="mdi-account-circle"
            :rules="[(v) => !!v || $t(`帳號為必填`)]"
          ></v-text-field>
          <v-text-field
            v-model="registerInfo.data.password"
            clearable
            outlined
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
            :rules="[(v) => !!v || $t(`確認密碼為必填`)]"
            @click:append="form_password_visible = !form_password_visible"
          ></v-text-field>

          <v-btn dark block color="#EC407A" @click="registerUser()">
            註冊並登入
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'login',

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

          this.$router.push('/')
        } catch (err) {
          console.err(err)
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
