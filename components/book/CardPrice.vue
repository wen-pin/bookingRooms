<template>
  <v-card outlined class="rounded-lg p-6" max-width="480px">
    <DivideBlock>
      <div class="flex w-full mb-7">
        <v-img
          :src="require(`~/assets/img/rooms/room${roomId}/bg_2.jpg`)"
          :aspect-ratio="1"
          class="rounded-lg w-[30%]"
        ></v-img>

        <div class="w-[70%] px-2">
          <div class="text-sm font-extralight">
            {{ rentalType }}
          </div>

          <div class="line-clamp-3">{{ title }}</div>

          <div class="flex mt-3">
            <span>
              <TextRate :value="averageRating" :size="15" class="text-sm" />
            </span>

            <span v-if="allMessages">
              <TextBtnDialog
                :title="`${allMessages.length}則評價`"
                :isUnderlineCursorPointer="false"
                class="text-sm"
              />
            </span>
          </div>
        </div>
      </div>
    </DivideBlock>

    <div class="text-xl font-semibold mt-5">價格詳情</div>

    <RoomPriceUntaxed :price="price" :isVisible="true" />

    <div class="flex justify-between mt-5">
      <div class="font-medium">總價 (TWD)</div>

      <div>{{ $n(this.allRentalCost, 'currency') }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'bookCardPrice',

  props: {
    rentalType: {
      types: String,
      required: true,
    },
    title: {
      types: String,
      required: true,
    },
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
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
    roomId() {
      return this.$route.params.id
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
