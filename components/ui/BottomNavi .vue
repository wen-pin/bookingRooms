<template>
  <v-bottom-navigation :value="value" app color="primary">
    <div v-if="!$auth.loggedIn" class="flex justify-center">
      <div v-for="item in naviBtns" :key="item.title">
        <v-btn nuxt :to="item.router" height="100%">
          <span class="mt-1">{{ item.title }}</span>

          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </div>
    </div>

    <div v-else class="flex justify-center">
      <div v-for="item in naviBtns_auth" :key="item.title">
        <v-btn nuxt :to="item.router" height="100%">
          <span class="mt-1">{{ item.title }}</span>

          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 0,

      naviBtns: [
        {
          title: '探索',
          icon: 'mdi-magnify',
          router: '/',
        },
        {
          title: '心願單',
          icon: 'mdi-heart-outline',
          router: '/wishlists',
        },
        {
          title: '登入',
          icon: 'mdi-account-circle-outline',
          router: '/login',
        },
      ],

      naviBtns_auth: [
        {
          title: '探索',
          icon: 'mdi-magnify',
          router: '/',
        },
        {
          title: '心願單',
          icon: 'mdi-heart-outline',
          router: '/wishlists',
        },
        {
          title: '旅程',
          icon: 'mdi-language-r',
          router: '/trips',
        },
        {
          title: '收件匣',
          icon: 'mdi-message-outline',
          router: '/message',
        },
        {
          title: '個人資料',
          icon: 'mdi-account-circle-outline',
          router: '/account',
        },
      ],
    }
  },
}
</script>
