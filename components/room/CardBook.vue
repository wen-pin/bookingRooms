<template>
  <v-card
    width="80%"
    :height="datesQueue.length === 2 ? '490px' : '315px'"
    elevation="7"
    class="rounded-lg"
  >
    <v-card-title class="justify-between">
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

      <v-spacer />

      <span>
        <TextRate :value="averageRating" :margin="'mr-4'" class="text-sm" />
      </span>

      <span v-if="allMessages" @click="evaluationDialog = true">
        <TextBtnDialog :title="`${allMessages.length}則評價`" class="text-sm" />
      </span>
    </v-card-title>

    <v-row class="justify-center">
      <v-col cols="11">
        <div
          class="px-3 flex justify-between border-gray-300 border-l border-t border-r border-b-0 border-solid rounded-tl-lg rounded-tr-lg cursor-pointer"
          @click="openDateCard()"
        >
          <div class="w-[50%] my-2">
            <div class="font-semibold text-sm">入住</div>
            <div v-if="datesQueue[0] != null">{{ datesQueue[0] }}</div>
            <div v-else class="text-neutral-500">選取日期</div>
          </div>

          <v-divider vertical />

          <div class="w-[50%] my-2 pl-3">
            <div class="font-semibold text-sm">退房</div>
            <div v-if="datesQueue[1] != null">{{ datesQueue[1] }}</div>
            <div v-else class="text-neutral-500">選取日期</div>
          </div>
        </div>

        <v-card
          v-if="isVisible"
          max-width="200%"
          width="1000px"
          class="!absolute top-[65px] left-[-355px] z-10 rounded-lg"
        >
          <div class="my-5">
            <div class="flex justify-between mx-8">
              <DateRange
                :location="location"
                class="flex flex-col justify-center"
              />

              <DateRangeStyle />
            </div>

            <DatePicker />

            <div class="flex justify-end mx-8">
              <DateClearBtn />

              <DateCloseBtn :text="'關閉'" @click="isVisible = false" />
            </div>
          </div>
        </v-card>

        <div class="relative">
          <div
            class="h-[65px] flex justify-between border-gray-300 border-[1px] border-solid rounded-bl-lg rounded-br-lg px-3 cursor-pointer"
            :class="tenantCard_visible ? 'border-black border-[2px]' : ''"
            @click="tenantCard_visible = !tenantCard_visible"
          >
            <div class="my-2">
              <div class="font-semibold">房客</div>
              <div class="flex">
                <div>{{ allTenants }}位</div>
                <div v-if="babyQuantity > 0">, {{ babyQuantity }}名嬰幼兒</div>
                <div v-if="petQuantity > 0">, {{ petQuantity }}隻寵物</div>
              </div>
            </div>

            <v-icon v-if="tenantCard_visible">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </div>

          <roomCardTenant
            v-if="tenantCard_visible"
            :limitPeople="limitPeople"
            :isAcceptPet="isAcceptPet"
            class="!absolute top-[65px] left-0 z-10"
          />
        </div>
      </v-col>
    </v-row>

    <div class="mt-4 px-4">
      <div v-if="datesQueue.length === 2">
        <v-btn
          height="50px"
          dark
          block
          color="#EC407A"
          nuxt
          :to="`/book/stays/${this.$route.params.id}`"
          class="rounded-lg"
        >
          <span class="text-base font-semibold"> 預定 </span>
        </v-btn>

        <div class="flex justify-center mt-4">你暫時不會被收費</div>

        <RoomPriceUntaxed :price="price" />

        <div class="flex justify-between mt-5 font-semibold">
          <span>稅前總價</span>

          {{ $n(this.allRentalCost, 'currency') }}
        </div>
      </div>

      <v-btn
        v-else
        height="50px"
        dark
        block
        color="#EC407A"
        class="rounded-lg"
        @click="openDateCard()"
      >
        <span class="text-base font-semibold"> 查看可訂日期 </span>
      </v-btn>
    </div>

    <div
      class="flex absolute left-[50%]"
      :class="datesQueue.length === 2 ? 'top-[530px]' : 'top-[355px]'"
      style="transform: translate(-50%, -50%)"
    >
      <v-icon class="mr-3">mdi-flag</v-icon>
      <TextBtnDialog :title="'檢舉此房源'" class="text-gray-600" />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'roomCardBook',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
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
    limitPeople: {
      types: Number,
      required: true,
    },
    isAcceptPet: {
      types: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isVisible: false,
    }
  },
  computed: {
    // 房客
    tenants() {
      return this.$store.state.tenants
    },
    // 評價對話筐是否顯示
    evaluationDialog: {
      get() {
        return this.$store.state.evaluationDialog_visible
      },
      set(v) {
        this.$store.commit('toggleEvaluationBtn', v)
      },
    },
    // 房客選擇卡片
    tenantCard_visible: {
      get() {
        return this.$store.state.tenantCard_visible
      },
      set(v) {
        this.$store.commit('toggleTenantCardBtn', v)
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
  methods: {
    openDateCard() {
      this.tenantCard_visible = false
      this.isVisible = true
    },
  },
}
</script>
