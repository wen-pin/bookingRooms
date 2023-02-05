<template>
  <DivideBlock>
    <div class="my-8">
      <div
        :class="$vuetify.breakpoint.xs ? 'justify-between' : ''"
        class="flex items-center"
      >
        <v-avatar v-if="!$vuetify.breakpoint.xs" size="70px" class="mr-2">
          <img
            alt="Avatar"
            :src="
              require(`~/assets/img/rooms/room${this.$route.params.id}/avater.jpeg`)
            "
            class="cursor-pointer"
          />
        </v-avatar>

        <div>
          <span class="text-2xl font-medium"
            >房東：{{ landlordInfo.name }}</span
          >
          <div class="text-zinc-400 text-sm">
            加入時間：{{
              this.$dayjs(landlordInfo.createdAt).format('YYYY[年]M[月]')
            }}
          </div>
        </div>

        <v-avatar v-if="$vuetify.breakpoint.xs" size="70px" class="mr-2">
          <img
            alt="Avatar"
            :src="
              require(`~/assets/img/rooms/room${this.$route.params.id}/avater.jpeg`)
            "
            class="cursor-pointer"
          />
        </v-avatar>
      </div>

      <div
        :class="$vuetify.breakpoint.xs ? 'flex-col' : ''"
        class="flex my-5 w-full text-base"
      >
        <div :class="$vuetify.breakpoint.xs ? 'w-full' : 'w-[50%]'">
          <div
            :class="$vuetify.breakpoint.xs ? 'flex-col' : 'items-center'"
            class="flex"
          >
            <div>
              <div class="flex items-center">
                <div>
                  <TextRate
                    :value="averageRating"
                    :size="20"
                    :max-width="''"
                    :isVisible="$vuetify.breakpoint.xs ? false : true"
                    class="text-lg"
                  />
                </div>

                <div
                  v-if="allMessages"
                  :class="$vuetify.breakpoint.xs ? '' : ''"
                >
                  <TextBtnDialog
                    :title="`${allMessages.length}則評價`"
                    :isUnderlineCursorPointer="false"
                  />
                </div>
              </div>
            </div>

            <div
              v-if="landlordInfo.isAuth"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'ml-5'"
            >
              <div class="flex">
                <v-icon color="black" class="mr-3">mdi-shield-check</v-icon>

                <div class="font-medium">身分已驗證</div>
              </div>
            </div>

            <div
              v-if="landlordInfo.isNice"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'ml-5'"
            >
              <div class="flex">
                <v-icon color="black" class="mr-3">mdi-medal-outline</v-icon>

                <div class="font-medium">超讚房東</div>
              </div>
            </div>
          </div>

          <div
            :class="$vuetify.breakpoint.xs ? '' : 'pr-[100px]'"
            class="mt-5"
            v-html="convertTobr"
          ></div>

          <div v-if="landlordInfo.isNice">
            <div class="font-semibold mt-5 mb-1">
              {{ landlordInfo.name }} 是超讚房東
            </div>

            <div>
              超讚房東是一批經驗豐富、深獲房客好評的房東，全心為房客提供超棒的入住體驗。
            </div>
          </div>
        </div>

        <div :class="$vuetify.breakpoint.xs ? 'w-full' : 'w-[50%]'">
          <div :class="$vuetify.breakpoint.xs ? 'mt-5' : 'pl-[80px]'">
            <div v-if="landlordInfo.language">
              語言: {{ landlordInfo.language }}
            </div>
            <div class="mt-3">回覆率: {{ landlordInfo.responseRate }}</div>
            <div class="mt-3">回覆時間: {{ landlordInfo.responseTime }}</div>

            <!-- <v-btn large outlined class="rounded-lg mt-8" height="50px">
              <span class="text-lg font-semibold">聯絡房東</span>
            </v-btn> -->

            <!-- 尚未完成開發 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :block="$vuetify.breakpoint.xs"
                  v-bind="attrs"
                  v-on="on"
                  large
                  outlined
                  class="rounded-lg mt-8"
                  height="50px"
                >
                  <span class="text-lg font-semibold">聯絡房東</span>
                </v-btn>
              </template>

              <span>此功能開發中</span>
            </v-tooltip>

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
