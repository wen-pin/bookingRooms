<template>
  <div class="w-full h-full bg-red-50 flex flex-col items-center">
    <SvgIcon :iconClass="'warn'" :className="'warn'" class="mt-[150px]" />

    <div class="text-3xl font-semibold">找不到頁面</div>

    <img width="400px" :src="require('~/assets/img/404error.png')" />

    <div>
      <div class="flex font-semibold mt-10">
        <div class="mr-2">oops 找不到此連結</div>
        <NuxtLink to="/">首頁</NuxtLink>
      </div>
    </div>
    <!-- <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink> -->
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'],
}
</script>
