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
          <span class="text-2xl font-medium">房東:{{ landlordInfo.name }}</span>
          <div class="text-zinc-400">
            加入時間:{{
              this.$dayjs(landlordInfo.createdAt).format('YYYY[年]M[月]')
            }}
          </div>
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

            <span v-if="allMessages">
              <TextBtnDialog
                :title="`${allMessages.length}則評價`"
                :isUnderlineCursorPointer="false"
                class="text-lg"
              />
            </span>

            <div v-if="landlordInfo.isAuth" class="ml-5">
              <div class="flex">
                <v-icon color="black" class="mr-3">mdi-shield-check</v-icon>

                <div class="text-lg font-medium">身分已驗證</div>
              </div>
            </div>

            <div v-if="landlordInfo.isNice" class="ml-5">
              <div class="flex">
                <v-icon color="black" class="mr-3">mdi-medal-outline</v-icon>

                <div class="text-lg font-medium">超讚房東</div>
              </div>
            </div>
          </div>

          <div class="text-lg pr-[100px] mt-5" v-html="convertTobr"></div>

          <div v-if="landlordInfo.isNice">
            <div class="font-semibold mt-5 mb-1">
              {{ landlordInfo.name }} 是超讚房東
            </div>

            <div>
              超讚房東是一批經驗豐富、深獲房客好評的房東，全心為房客提供超棒的入住體驗。
            </div>
          </div>
        </div>

        <div class="w-[50%] text-lg">
          <div class="pl-[80px]">
            <div v-if="landlordInfo.language">
              語言: {{ landlordInfo.language }}
            </div>
            <div class="mt-3">回覆率: {{ landlordInfo.responseRate }}</div>
            <div class="mt-3">回覆時間: {{ landlordInfo.responseTime }}</div>

            <v-btn large outlined class="rounded-lg mt-8" height="50px">
              <span class="text-lg font-semibold">聯絡房東</span>
            </v-btn>

            <div class="flex items-center mt-6">
              <SvgIcon :iconClass="'shield'" class="mr-2" />

              <div class="w-[70%] text-xs font-normal">
                為了確保你的付款安全，請勿透過 Airbnb
                網站或應用程式以外的方式來匯款或聯絡。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomInfoLandlord',

  props: {
    landlordInfo: {
      types: Object,
    },
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
    },
  },

  data() {
    return {
      googleMapsDialog: false,
    }
  },
  computed: {
    convertTobr() {
      let arr = this.landlordInfo.selfIntroduction.split('')
      return arr
        .map((item) => {
          return item === '\n' ? '<br />' : item
        })
        .join('')
    },
  },
}
</script>
