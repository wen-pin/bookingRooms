<template>
  <div>
    <div class="text-xl font-semibold mt-6">價格詳情</div>

    <RoomPriceUntaxed :price="price" :isVisible="true" />

    <div
      class="flex justify-between"
      :class="$vuetify.breakpoint.xs ? '' : 'mt-6'"
    >
      <div class="font-bold">總價 (TWD)</div>

      <div>{{ $n(this.allRentalCost, 'currency') }}</div>
    </div>

    <div
      v-if="$vuetify.breakpoint.xs"
      class="font-bold underline flex justify-end mt-4"
    >
      更多資訊
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookCardPrice',

  props: {
    price: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
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
    // 計算全部稅費
    calculateTaxCharges() {
      if (this.price) {
        return this.price.taxCharges + (this.calculateDays - 1) * 200
      }
    },
    // 稅後總價
    allRentalCost() {
      return (
        this.calculateRentalCost +
        this.calculateServiceCharge +
        this.calculateCleaningFee +
        this.calculateTaxCharges
      )
    },
  },
}
</script>
