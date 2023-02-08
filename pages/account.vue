<template>
  <v-container>
    <div v-if="$vuetify.breakpoint.xs">
      <div class="mt-12 p-6 mb-8 text-4xl font-semibold">個人資料</div>

      <div class="px-6">
        <DivideBlock>
          <div class="flex justify-between items-center mb-4">
            <div class="flex">
              <v-avatar color="indigo" class="mr-4">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>

              <div v-if="$auth.loggedIn">
                {{ $auth.user.user.username }}
                <div>顯示個人資料</div>
              </div>
            </div>

            <div>
              <v-icon>mdi-greater-than</v-icon>
            </div>
          </div>
        </DivideBlock>

        <v-btn
          block
          light
          outlined
          height="48px"
          class="rounded-lg mt-4"
          @click="logout()"
        >
          <span class="text-base"> 登出 </span>
        </v-btn>
      </div>
    </div>
    <div v-else class="my-16">
      <div class="text-4xl font-semibold">帳號</div>
      <div v-if="$auth.loggedIn" class="text-xl font-medium mt-2">
        <span>{{ $auth.user.user.username }} ·</span>
        <span class="underline cursor-pointer">前往個人資料</span>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async logout() {
      try {
        this.$nuxt.$loading.start()

        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
