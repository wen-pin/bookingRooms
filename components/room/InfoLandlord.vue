<template>
  <DivideBlock>
    <div class="my-10">
      <div class="flex items-center">
        <v-avatar size="70px" class="mr-2">
          <img
            alt="Avatar"
            :src="
              require(`~/assets/img/rooms/room${this.$route.params.id}/avater.jpeg`)
            "
            class="cursor-pointer"
          />
        </v-avatar>

        <div>
          <span class="text-2xl font-medium">房東:{{ landlord }}</span>
          <div class="text-zinc-400">加入時間:2017年5月</div>
        </div>
      </div>

      <div class="flex my-5 w-full">
        <div class="w-[50%]">
          <div class="flex">
            <span>
              <TextRate
                :value="averageRating"
                :size="25"
                :max-width="''"
                :margin="'mr-4'"
                class="text-lg"
              />
            </span>

            <TextBtnDialog
              :title="`${allMessages.length}則評價`"
              :isUnderlineCursorPointer="false"
              class="text-lg"
            />

            <v-icon color="black" class="ml-7 mr-3">mdi-shield-check</v-icon>

            <div class="text-lg font-medium">身分已驗證</div>
          </div>

          <div class="text-lg pr-[100px] mt-5">
            巨蟹女，所以愛家又溫暖～ 非常愛電影，來墾丁之前在電影公司工作。
            現在搬來墾丁生活，經營甜點工作室，
            喜歡出外郊遊，拍拍好看的照片，也玩底片機。
          </div>
        </div>

        <div class="w-[50%] text-lg">
          <div>語言: 中文 (简体)、English</div>
          <div class="mt-3">回覆率: 100%</div>
          <div class="mt-3">回覆時間: 1 小時內</div>

          <v-btn large outlined class="rounded-lg mt-8" height="50px">
            <span class="text-lg font-semibold">聯絡房東</span>
          </v-btn>
        </div>
      </div>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomInfoLandlord',

  props: {
    landlord: {
      types: String,
      required: true,
    },
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
      required: true,
    },
  },

  data() {
    return {
      googleMapsDialog: false,
    }
  },
}
</script>
