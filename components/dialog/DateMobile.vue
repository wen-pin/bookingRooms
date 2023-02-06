<template>
  <!-- 日期選擇 -->
  <v-dialog
    v-model="dateDialog_mobile_visible"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="!rounded-none">
      <div>
        <div class="flex justify-between px-3 mt-3">
          <v-btn icon @click="dateDialog_mobile_visible = false">
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
              <div v-if="datesQueue.length === 2" class="flex items-center">
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
            @click="dateDialog_mobile_visible = false"
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
</template>

<script>
export default {
  name: 'dialogDateMobile',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    location: {
      types: Object,
      required: true,
    },
    price: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    dateDialog_mobile_visible: {
      get() {
        return this.$store.state.dateDialog_mobile_visible
      },
      set(v) {
        this.$store.commit('toggleDateDialog_mobile', v)
      },
    },
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
  },
}
</script>
