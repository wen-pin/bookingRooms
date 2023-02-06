<template>
  <div
    class="!fixed top-0 left-0 w-full bg-white z-20 h-[64px] border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-300"
  >
    <div class="!relative font-semibold flex items-center h-full px-4">
      <div class="">
        <v-btn icon class="">
          <v-icon small color="black"> mdi-less-than </v-icon>
        </v-btn>

        <div
          class="absolute top-[50%] left-[50%]"
          style="transform: translate(-50%, -50%) !important"
        >
          申請預訂
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uiAppbarBook',

  data() {
    return {}
  },
}
</script>
