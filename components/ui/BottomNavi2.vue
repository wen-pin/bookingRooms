<template>
  <div
    class="!fixed w-full bottom-0 left-0 bg-white z-20 h-[80px] border-t border-r-0 border-b-0 border-l-0 border-solid border-gray-300"
  >
    <v-container class="flex justify-between px-5">
      <div class="flex flex-col justify-center font-semibold">
        <div v-if="datesQueue">
          <div v-if="datesQueue.length === 2" class="flex items-center">
            {{ $n(this.averageRentalCost, 'currency') }}
            <div class="font-normal text-base ml-1">晚</div>
          </div>
          <div v-else class="flex items-center">
            {{ $n(0, 'currency') }}
            <div class="font-normal text-base ml-1">晚</div>
          </div>
        </div>

        <div
          v-if="datesQueue.length === 2"
          class="underline"
          @click="dateDialog = true"
        >
          {{ this.$dayjs(datesQueue[0]).format('M[月]DD[日]') }}至{{
            this.$dayjs(datesQueue[1]).format('M[月]DD[日]')
          }}
        </div>

        <TextRate v-else :value="averageRating" class="text-sm" />
      </div>

      <div>
        <v-btn
          v-if="datesQueue.length === 2"
          width="80px"
          height="50px"
          dark
          block
          color="#EC407A"
          class="rounded-lg"
          @click="bookDialog = true"
        >
          <span class="text-base font-semibold"> 預定 </span>
        </v-btn>

        <v-btn
          v-else
          height="50px"
          dark
          color="#EC407A"
          class="rounded-lg"
          @click="dateDialog = true"
        >
          <span class="text-base font-semibold"> 查看可訂日期 </span>
        </v-btn>

        <!-- 預定最後確認 -->
        <v-dialog
          v-model="bookDialog"
          fullscreen
          scrollable
          transition="dialog-bottom-transition"
        >
          <v-card class="!rounded-none">
            <v-btn icon large @click="bookDialog = false" class="ml-2 mt-3">
              <v-icon color="black">mdi-window-close</v-icon>
            </v-btn>

            <div class="px-5">
              <div class="text-2xl font-semibold mt-8">你的旅程</div>

              <DivideBlock>
                <div class="mb-6 mt-8">
                  <div
                    class="px-3 flex justify-between border-gray-300 border-l border-t border-r border-b-0 border-solid rounded-tl-lg rounded-tr-lg cursor-pointer"
                    @click="dateDialog = true"
                  >
                    <div class="w-[50%] my-2">
                      <div class="font-semibold text-sm">入住</div>
                      <div v-if="datesQueue[0] != null">
                        {{ this.$dayjs(datesQueue[0]).format('YYYY/M/DD') }}
                      </div>
                      <div v-else class="text-neutral-500">選取日期</div>
                    </div>

                    <v-divider vertical />

                    <div class="w-[50%] my-2 pl-3">
                      <div class="font-semibold text-sm">退房</div>
                      <div v-if="datesQueue[1] != null">
                        {{ this.$dayjs(datesQueue[1]).format('YYYY/M/DD') }}
                      </div>
                      <div v-else class="text-neutral-500">選取日期</div>
                    </div>
                  </div>

                  <div
                    class="h-[65px] flex justify-between border-gray-300 border-[1px] border-solid rounded-bl-lg rounded-br-lg px-3 cursor-pointer"
                    @click="tenantDialog = true"
                  >
                    <div class="my-2">
                      <div class="font-semibold">房客</div>
                      <div class="flex">
                        <div>{{ allTenants }}位</div>
                        <div v-if="babyQuantity > 0">
                          , {{ babyQuantity }}名嬰幼兒
                        </div>
                        <div v-if="petQuantity > 0">
                          , {{ petQuantity }}隻寵物
                        </div>
                      </div>
                    </div>
                  </div>

                  <v-dialog
                    v-model="tenantDialog"
                    scrollable
                    transition="dialog-bottom-transition"
                  >
                    <v-card class="">
                      <v-btn
                        icon
                        large
                        @click="tenantDialog = false"
                        class="ml-2 mt-3"
                      >
                        <v-icon color="black">mdi-window-close</v-icon>
                      </v-btn>
                    </v-card>
                  </v-dialog>
                </div>
              </DivideBlock>

              <DivideBlock>
                <div>
                  <RoomPriceUntaxed :price="price" />
                </div>
              </DivideBlock>

              <div class="flex justify-between mt-5 font-semibold">
                <span>稅前總價</span>

                {{ $n(this.allRentalCost, 'currency') }}
              </div>
            </div>

            <div
              class="!fixed w-full bottom-0 left-0 bg-white z-20 h-[80px] border-t border-r-0 border-b-0 border-l-0 border-solid border-gray-300"
            >
              <div class="w-full h-full px-6 py-4">
                <v-btn
                  block
                  height="100%"
                  color="#EC407A"
                  nuxt
                  :to="`/book/stays/${this.$route.params.id}`"
                >
                  <div class="text-white text-base">預訂</div>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-dialog>

        <!-- 日期選擇 -->
        <v-dialog
          v-model="dateDialog"
          fullscreen
          scrollable
          transition="dialog-bottom-transition"
        >
          <v-card class="!rounded-none">
            <div>
              <div class="flex justify-between px-3 mt-3">
                <v-btn icon @click="dateDialog = false" class="">
                  <v-icon color="black">mdi-window-close</v-icon>
                </v-btn>

                <div class="flex justify-end" @click="dates = []">
                  <TextBtnDialog :title="'清除日期'" />
                </div>
              </div>
            </div>

            <DateRange :location="location" class="px-5 mt-8" />
            <v-card-text>
              <DatePicker />
            </v-card-text>

            <div
              class="!fixed w-full bottom-0 left-0 bg-white z-20 h-[80px] border-t border-r-0 border-b-0 border-l-0 border-solid border-gray-300"
            >
              <v-container class="flex justify-between px-5">
                <div class="flex flex-col justify-center font-semibold">
                  <div v-if="datesQueue">
                    <div
                      v-if="datesQueue.length === 2"
                      class="flex items-center"
                    >
                      {{ $n(this.averageRentalCost, 'currency') }}
                      <div class="font-normal text-base ml-1">晚</div>
                    </div>
                    <div v-else class="flex items-center">
                      {{ $n(0, 'currency') }}
                      <div class="font-normal text-base ml-1">晚</div>
                    </div>
                  </div>

                  <TextRate :value="averageRating" class="text-sm" />
                </div>

                <v-btn
                  v-if="datesQueue.length === 2"
                  width="80px"
                  height="50px"
                  dark
                  color="#000"
                  class="rounded-lg"
                  @click="dateDialog = false"
                >
                  <span class="text-base font-semibold"> 儲存 </span>
                </v-btn>

                <v-btn
                  v-else
                  depressed
                  disabled
                  width="80px"
                  height="50px"
                  class="rounded-lg"
                >
                  <div class="text-white">儲存</div>
                </v-btn>
              </v-container>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'uiBottomNavi2',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    price: {
      types: Object,
      required: true,
    },
    location: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {
      bookDialog: false,
      dateDialog: false,
      tenantDialog: false,
    }
  },
  computed: {
    dates: {
      get() {
        return this.$store.state.dates
      },
      set(v) {
        this.$store.commit('fetchDates', v)
      },
    },
    // 時間排列
    datesQueue() {
      return this.$store.getters.datesQueue
    },
    // 計算天數
    calculateDays() {
      return this.$store.getters.calculateDays
    },
    // 計算全部每晚房價
    calculateRentalCost() {
      let holidayOfDays = 0
      let weekdayOfDays = 0
      let firstDay = this.datesQueue[0]
      for (let i = 0; i < this.calculateDays; i++) {
        let week = parseInt(this.$dayjs(firstDay).add(i, 'day').day())
        if (week === 6) {
          holidayOfDays++
        } else {
          weekdayOfDays++
        }
      }
      if (this.price) {
        return (
          holidayOfDays * this.price.holiday +
          weekdayOfDays * this.price.weekday
        )
      }
    },
    // 平均每晚房價(不包含服務費)
    averageRentalCost() {
      return this.calculateRentalCost / this.calculateDays
    },
    // 計算全部服務費
    calculateServiceCharge() {
      if (this.price) {
        return this.calculateDays * this.price.serviceCharge
      }
    },
    // 計算全部清潔費
    calculateCleaningFee() {
      if (this.price) {
        return this.calculateDays * this.price.cleaningFee
      }
    },
    // 總價
    allRentalCost() {
      return (
        this.calculateRentalCost +
        this.calculateServiceCharge +
        this.calculateCleaningFee
      )
    },
    // 大人人數
    allTenants() {
      return this.$store.getters.allTenants
    },
    // 嬰幼兒人數
    babyQuantity() {
      return this.$store.state.tenants[2].quantity
    },
    // 寵物數量
    petQuantity() {
      return this.$store.state.tenants[3].quantity
    },
  },
  methods: {},
}
</script>
