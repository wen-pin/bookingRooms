<template>
  <div>
    <DivideBlock v-if="!$vuetify.breakpoint.xs">
      <div class="my-5">
        <div class="flex justify-between">
          <TextBtnDialog
            :title="`${$n(
              this.averageRentalCost,
              'currency',
            )}x${calculateDays} 晚`"
          />
          {{ $n(this.calculateRentalCost, 'currency') }}
        </div>

        <div class="flex justify-between mt-4">
          <TextBtnDialog :title="'服務費'" />
          {{ $n(this.calculateServiceCharge, 'currency') }}
        </div>

        <div
          v-if="calculateCleaningFee !== 0"
          class="flex justify-between mt-4"
        >
          <TextBtnDialog :title="'清潔費'" />
          {{ $n(this.calculateCleaningFee, 'currency') }}
        </div>

        <div v-if="isVisible" class="flex justify-between mt-4">
          <TextBtnDialog :title="'稅費'" />
          {{ $n(this.calculateTaxCharges, 'currency') }}
        </div>
      </div>
    </DivideBlock>

    <div v-else>
      <div class="py-6">
        <div class="flex justify-between">
          <TextBtnDialog
            :title="`${$n(
              this.averageRentalCost,
              'currency',
            )}x${calculateDays} 晚`"
          />
          {{ $n(this.calculateRentalCost, 'currency') }}
        </div>

        <div class="flex justify-between mt-4">
          <TextBtnDialog :title="'服務費'" />
          {{ $n(this.calculateServiceCharge, 'currency') }}
        </div>

        <div
          v-if="calculateCleaningFee !== 0"
          class="flex justify-between mt-4"
        >
          <TextBtnDialog :title="'清潔費'" />
          {{ $n(this.calculateCleaningFee, 'currency') }}
        </div>

        <div v-if="isVisible" class="flex justify-between mt-4">
          <TextBtnDialog :title="'稅費'" />
          {{ $n(this.calculateTaxCharges, 'currency') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roomPriceUntaxed',

  props: {
    price: {
      types: Object,
      required: true,
    },
    isVisible: {
      types: Boolean,
      default: false,
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
    // 平均每晚房價(不包含服務費)
    averageRentalCost() {
      if (this.calculateDays > 0) {
        return this.calculateRentalCost / this.calculateDays
      } else {
        return this.price.weekday
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
      if (this.price && this.calculateDays > 0) {
        return this.price.taxCharges + (this.calculateDays - 1) * 200
      } else {
        return 0
      }
    },
  },
  methods: {},
}
</script>
