<template>
  <v-app-bar app flat>
    <v-spacer></v-spacer>

    <v-menu offset-y nudge-bottom="10" nudge-width="100">
      <template #activator="{ attrs, on }">
        <v-btn rounded outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>

          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>註冊</v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="dialogLogin = true">
            <v-list-item-title> 登入 </v-list-item-title>

            <v-dialog v-model="dialogLogin" max-width="400">
              <v-card class="pa-10">
                <v-card-title class="justify-center">登入</v-card-title>
                <v-form ref="form">
                  <v-text-field label="帳號"></v-text-field>
                  <v-text-field label="密碼"></v-text-field>

                  <v-btn dark block @click="onSumit()"> 登入 </v-btn>

                  <v-btn text nuxt to="/register"> 註冊 </v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      dialogLogin: false,

      form: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    onSumit() {},
  },
}
</script>
