<template>
  <v-container>
    <div>房間標題</div>
    <div>
      <span>星評</span>
      <span>地址</span>
    </div>
    <div class="flex">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://picsum.photos/id/11/500/300"
        class="w-[50%]"
      ></v-img>
      <div class="w-[25%] flex flex-col">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </div>
      <div class="w-[25%] flex flex-col !relative">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>

        <v-btn
          max-width="80px"
          max-height="60px"
          class="!absolute right-0 bottom-0 !text-sm"
        >
          {{ $t('顯示全部相片') }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
