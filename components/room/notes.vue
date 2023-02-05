<template>
  <div :class="$vuetify.breakpoint.xs ? 'my-2' : 'my-10'">
    <div v-if="!$vuetify.breakpoint.xs" class="text-2xl font-medium">
      注意事項
    </div>

    <v-row class="mt-2">
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
        <div
          :class="
            $vuetify.breakpoint.xs
              ? 'divide-solid divide-y divide-slate-200'
              : ''
          "
          @click="houseRulesDialog_mobile()"
        >
          <div :class="$vuetify.breakpoint.xs ? 'mb-5' : ''">
            <div
              :class="$vuetify.breakpoint.xs ? 'text-2xl' : ''"
              class="font-medium"
            >
              《房屋守則》
            </div>

            <div class="h-[100px]">
              <div class="my-2">入住時間：{{ notes.checkIn }}</div>
              <div class="my-2">退房時間：{{ notes.checkOut }}</div>
              <div class="my-2">最多 {{ limitPeople }} 位房客</div>
            </div>

            <div>
              <div v-if="$vuetify.breakpoint.xs" class="font-bold underline">
                顯示更多
              </div>

              <div
                v-else
                :class="$vuetify.breakpoint.xs ? '' : 'mt-7'"
                class="!max-w-[115px] flex"
                @click="houseRulesDialog = !houseRulesDialog"
              >
                <TextBtnDialog :title="'顯示更多內容'" />

                <v-icon class="cursor-pointer" small color="black">
                  mdi-greater-than
                </v-icon>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <CardDialog
          :dialog="houseRulesDialog"
          :width="800"
          :fullscreen="$vuetify.breakpoint.xs"
          :icon="$vuetify.breakpoint.xs ? 'mdi-less-than' : 'mdi-window-close'"
          @update="updateHouseRulesDialog"
        >
          <div class="text-3xl font-semibold mt-10">《房屋守則》</div>

          <div class="mt-5 text-base">
            請遵守這些規則，作個貼心的房客並在住宿期間避免造成問題。
          </div>

          <div class="my-10 font-medium text-xl">入住條件</div>

          <div v-if="!isAcceptPet" class="flex items-center">
            <v-icon large class="mr-2">mdi-account-group-outline</v-icon>

            <div class="text-base">最多{{ limitPeople }}位房客</div>
          </div>

          <div v-else>
            <DivideBlock>
              <div class="flex items-center mb-5">
                <v-icon large class="mr-2">mdi-account-group-outline</v-icon>

                <div class="text-base">最多{{ limitPeople }}位房客</div>
              </div>
            </DivideBlock>

            <div class="flex items-center mt-5">
              <v-icon large class="mr-3">mdi-paw</v-icon>

              <div class="text-base">可攜帶寵物</div>
            </div>
          </div>

          <div class="my-10 font-medium text-xl">允許的事項</div>

          <DivideBlock>
            <div class="flex items-center mb-5">
              <v-icon large class="mr-3">mdi-clock-time-four-outline</v-icon>

              <div class="text-base">入住時間：{{ notes.checkIn }}</div>
            </div>
          </DivideBlock>

          <div v-if="!notes.isSmoking" class="flex items-center mt-5">
            <v-icon large class="mr-3">mdi-clock-time-four-outline</v-icon>

            <div class="text-base">退房時間：{{ notes.checkOut }}</div>
          </div>

          <div v-else>
            <DivideBlock>
              <div class="flex items-center mt-5 mb-5">
                <v-icon large class="mr-3">mdi-clock-time-four-outline</v-icon>

                <div class="text-base">退房時間：{{ notes.checkOut }}</div>
              </div>
            </DivideBlock>

            <div class="flex items-center mt-5">
              <v-icon large class="mr-3">mdi-smoking</v-icon>

              <div class="text-base">允許抽煙</div>
            </div>
          </div>

          <div class="my-10 font-medium text-xl">其他規則</div>

          <div v-html="convertTobr" class="text-base"></div>
        </CardDialog>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
        <div
          :class="
            $vuetify.breakpoint.xs
              ? 'divide-solid divide-y divide-slate-200'
              : ''
          "
          @click="securityDialogDialog_mobile()"
        >
          <div class="mb-5">
            <div
              :class="$vuetify.breakpoint.xs ? 'text-2xl' : ''"
              class="font-medium"
            >
              安全與房源
            </div>

            <div class="h-[100px]">
              <div
                v-for="item in notes.safeInfo[0].eqptAndServices.slice(0, 3)"
                :key="item.title"
                class="my-2"
              >
                {{ item.title }}
              </div>
            </div>

            <div>
              <div v-if="$vuetify.breakpoint.xs" class="font-bold underline">
                顯示更多
              </div>

              <div
                v-else
                :class="$vuetify.breakpoint.xs ? '' : 'mt-7'"
                class="!max-w-[115px] flex"
                @click="securityDialog = !securityDialog"
              >
                <TextBtnDialog :title="'顯示更多內容'" />

                <v-icon class="cursor-pointer" small color="black">
                  mdi-greater-than
                </v-icon>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <CardDialog
          :dialog="securityDialog"
          :width="800"
          :fullscreen="$vuetify.breakpoint.xs"
          :icon="$vuetify.breakpoint.xs ? 'mdi-less-than' : 'mdi-window-close'"
          @update="updateSecurityDialogDialog"
        >
          <div>
            <div class="text-3xl font-semibold mt-10">安全與房源</div>

            <div class="mt-5 text-base">
              詳閱房源的重要細節，避免遇到意料之外的情況。
            </div>

            <div v-for="items in notes.safeInfo" :key="items.id" class="mb-10">
              <div class="text-xl font-bold my-10">
                {{ items.category }}
              </div>

              <CardEqptAndServ
                v-for="item in items.eqptAndServices"
                :key="item.id"
                :title="item.title"
                :subtitle="item.subtitle"
                :svgTitle="item.svgTitle"
                :isSupply="item.isSupply"
              />
            </div>
          </div>
        </CardDialog>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
        <div
          :class="$vuetify.breakpoint.xs ? 'flex justify-between' : ''"
          @click="unsubscribePolicyDialog_mobile()"
        >
          <div>
            <div
              :class="$vuetify.breakpoint.xs ? 'text-2xl' : ''"
              class="font-medium"
            >
              《退訂政策》
            </div>

            <div :class="$vuetify.breakpoint.xs ? '' : 'h-[100px]'">
              <div v-if="datesQueue.length === 0" class="my-2">
                新增旅程日期，即可查看此住宿的退訂詳情。
              </div>
              <div v-else>
                <div class="my-2">這筆預訂不可退款。</div>
                <div class="my-2">
                  請查看房東完整的《退訂政策》；即便是因為感染新冠肺炎而取消，或新冠疫情導致旅程中斷，這些政策依然適用。
                </div>
              </div>
            </div>
          </div>

          <v-icon v-if="$vuetify.breakpoint.xs" color="black"
            >mdi-greater-than</v-icon
          >
        </div>

        <div v-if="!$vuetify.breakpoint.xs">
          <div
            v-if="datesQueue.length !== 0"
            class="!max-w-[115px] flex mt-7"
            @click="unsubscribePolicyDialog = !unsubscribePolicyDialog"
          >
            <TextBtnDialog :title="'顯示更多內容'" />

            <v-icon class="cursor-pointer" small color="black">
              mdi-greater-than
            </v-icon>
          </div>

          <div
            v-else
            class="!max-w-[115px] flex mt-7"
            @click="goToTarget(targetElement)"
          >
            <div class="font-bold underline cursor-pointer">新增日期</div>

            <v-icon class="cursor-pointer" small color="black">
              mdi-greater-than
            </v-icon>
          </div>
        </div>

        <CardDialog
          :dialog="unsubscribePolicyDialog"
          :width="620"
          :fullscreen="$vuetify.breakpoint.xs"
          :icon="$vuetify.breakpoint.xs ? 'mdi-less-than' : 'mdi-window-close'"
          @update="updateUnsubscribePolicyDialog"
        >
          <div>
            <div class="text-3xl font-semibold mt-10">《退訂政策》</div>

            <div class="px-2">
              <div class="mt-5 text-base">
                預訂之前，請確認你同意遵守房東的《退訂政策》。請注意，TheRooms
                的
                <span class="font-semibold underline cursor-pointer">
                  《特殊情況政策》
                </span>
                不適用感染新冠肺炎或因新冠疫情影響而取消的預訂。
              </div>

              <div class="mt-12 mb-8 font-medium text-xl">取消截止時間</div>

              <DivideBlock>
                <div class="flex mb-6">
                  <div class="mr-[100px]">
                    <div class="flex flex-col items-center">
                      <div class="font-medium text-base">
                        {{ this.$dayjs(datesQueue[0]).format('M[月]D[日]') }}
                      </div>

                      <div class="text-xs">{{ notes.checkIn }}</div>

                      <div class="text-xs">(入住)</div>
                    </div>
                  </div>

                  <div class="text-base">
                    {{ notes.unsubscribeInfo }}
                  </div>
                </div>
              </DivideBlock>

              <div class="font-semibold underline mt-8 mb-10 cursor-pointer">
                了解更多有關《退訂政策》的事宜
              </div>
            </div>
          </div>
        </CardDialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'roomNotes',

  props: {
    notes: {
      types: Object,
    },
    isAcceptPet: {
      types: Boolean,
    },
    limitPeople: {
      types: Number,
    },
    targetElement: {
      types: String,
    },
  },

  data() {
    return {
      houseRulesDialog: false,
      securityDialog: false,
      unsubscribePolicyDialog: false,
    }
  },
  computed: {
    convertTobr() {
      if (this.notes) {
        let arr = this.notes.other.split('')
        return arr
          .map((item) => {
            return item === '\n' ? '<br />' : item
          })
          .join('')
      }
    },
    datesQueue() {
      return this.$store.getters.datesQueue
    },
  },
  methods: {
    updateHouseRulesDialog(val) {
      this.houseRulesDialog = val
    },
    houseRulesDialog_mobile() {
      if (this.$vuetify.breakpoint.xs) {
        this.houseRulesDialog = !this.houseRulesDialog
      }
    },
    updateSecurityDialogDialog(val) {
      this.securityDialog = val
    },
    securityDialogDialog_mobile() {
      if (this.$vuetify.breakpoint.xs) {
        this.securityDialog = !this.securityDialog
      }
    },
    updateUnsubscribePolicyDialog(val) {
      this.unsubscribePolicyDialog = val
    },
    unsubscribePolicyDialog_mobile() {
      if (this.$vuetify.breakpoint.xs) {
        this.unsubscribePolicyDialog = !this.unsubscribePolicyDialog
      }
    },
    goToTarget(target) {
      this.$vuetify.goTo(target, {
        duration: 2000,
        offset: 40,
        easing: 'easeOutQuart',
      })
    },
  },
}
</script>
