<template>
  <div>
    <div
      class="h-[56px] flex justify-center items-center border border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-300"
    >
      登入
    </div>
    <v-container class="h-[100vh] flex justify-center">
      <v-card width="400px" height="500px" flat class="px-2 mt-10">
        <div class="justify-start font-semibold text-2xl mb-5">
          The Rooms 歡迎你
        </div>

        <FormLogin />

        <v-btn text class="px-0" nuxt to="/register"> 註冊？ </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {}
  },
}
</script>
