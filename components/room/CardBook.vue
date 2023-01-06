<template>
  <v-card
    width="80%"
    :height="datesQueue.length === 2 ? '460px' : '285px'"
    elevation="7"
    class="rounded-lg"
  >
    <v-card-title class="justify-between">
      <div>
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
        <TextRate :value="averageRating" class="text-sm" />
      </span>

      <span @click="EvaluationDialog = true">
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
              <div class="flex flex-col justify-center">
                <div class="text-2xl font-bold">
                  <div v-if="datesQueue.length == 0">選擇入住日期</div>
                  <div v-else-if="datesQueue.length == 1">選擇退房日期</div>
                  <div v-else>
                    {{ $t('在') }}{{ location.address }}住{{ calculateDays }}晚
                  </div>
                </div>

                <div class="text-sm text-neutral-500">
                  <div v-if="datesQueue.length < 2">
                    新增旅行日期，查看確切價格
                  </div>
                  <div v-else>
                    {{ dateRangeText }}
                  </div>
                </div>
              </div>

              <div
                class="!max-w-[320px] flex justify-between border-gray-300 border border-solid rounded-lg cursor-pointer"
              >
                <div
                  :class="
                    datesQueue[0] == null
                      ? 'w-[50%] px-3 py-2 border-2 border-solid border-black rounded-lg '
                      : 'w-[50%] px-3 py-2'
                  "
                >
                  <div class="font-semibold text-sm">入住</div>
                  <div v-if="datesQueue[0] != null">
                    {{ datesQueue[0] }}
                  </div>
                  <div v-else class="text-neutral-500">選取日期</div>
                </div>

                <v-divider vertical />

                <div
                  :class="
                    datesQueue[0] != null
                      ? 'w-[50%] py-2 pl-3 border-2 border-solid border-black rounded-lg'
                      : 'w-[50%] py-2 pl-3'
                  "
                >
                  <div class="font-semibold text-sm">退房</div>
                  <div v-if="datesQueue[1] != null">
                    {{ datesQueue[1] }}
                  </div>
                  <div v-else class="text-neutral-500">選取日期</div>
                </div>
              </div>
            </div>

            <v-date-picker
              v-model="dates"
              no-title
              range
              full-width
              :min="$dayjs().format('YYYY-MM-DD')"
              year-icon="mdi-calendar-blank"
              class="mt-5"
            />

            <div class="flex justify-end mx-8" @click="dates = []">
              <TextBtnDialog :title="'清除日期'" class="mr-5" />

              <v-btn dark color="black" @click="isVisible = false">關閉</v-btn>
            </div>
          </div>
        </v-card>

        <div class="relative">
          <div
            class="h-[65px] flex justify-between border-gray-300 border-[1px] border-solid rounded-bl-lg rounded-br-lg px-3 cursor-pointer"
            :class="isVisible2 ? 'border-black border-[2px]' : ''"
            @click="isVisible2 = !isVisible2"
          >
            <div class="my-2">
              <div class="font-semibold">房客</div>
              <div class="flex">
                <div>{{ allTenants }}</div>
                <div v-if="babyQuantity > 0">, {{ babyQuantity }}名嬰幼兒</div>
                <div v-if="petQuantity > 0">, {{ petQuantity }}隻寵物</div>
              </div>
            </div>

            <v-icon v-if="isVisible2">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </div>

          <v-card
            v-if="isVisible2"
            class="!absolute top-[65px] left-0 py-5 z-10 rounded-lg"
          >
            <div
              v-for="(tenant, idx) in tenants"
              :key="tenant.id"
              class="flex mx-5 mb-5"
            >
              <div>
                <div class="font-semibold">{{ tenant.ageGroup }}</div>
                <TextBtnDialog
                  v-if="tenant.ageGroup == '寵物'"
                  :title="tenant.ageRange"
                  class="text-sm"
                />

                <div v-else class="text-sm">{{ tenant.ageRange }}</div>
              </div>

              <v-card-actions class="flex justify-end">
                <v-btn
                  :disabled="isReduceBtnDisable(idx)"
                  icon
                  small
                  outlined
                  @click="reduceTenant(idx)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <div class="mx-4">
                  {{ tenant.quantity }}
                </div>

                <v-btn
                  :disabled="isAddBtnDisable(idx)"
                  icon
                  small
                  outlined
                  @click="addTenant(idx)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-actions>
            </div>

            <div class="mx-5 mb-8 text-xs">
              <span v-if="limitPeople">
                此房源最多可供
                {{ limitPeople }}
                人入住（不包括嬰幼兒）。
              </span>
              <span v-if="isAcceptPet">
                如果會攜帶超過 2 隻寵物，請事先通知房東。
              </span>

              <span v-else> 不接受寵物入住。 </span>
            </div>

            <div @click="isVisible2 = false">
              <TextBtnDialog :title="'關閉'" class="mx-5 flex justify-end" />
            </div>
          </v-card>
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
        >
          <span class="text-base font-semibold"> 預定 </span>
        </v-btn>

        <div class="flex justify-center mt-4">你暫時不會被收費</div>

        <DivideBlock>
          <div class="mb-5">
            <div class="flex justify-between mt-5">
              <TextBtnDialog
                :title="`${$n(
                  this.averageRentalCost,
                  'currency',
                )}x${calculateDays} 晚`"
              />
              {{ $n(this.calculateRentalCost, 'currency') }}
            </div>

            <div class="flex justify-between mt-2">
              <TextBtnDialog :title="'服務費'" />
              {{ $n(this.calculateServiceCharge, 'currency') }}
            </div>
          </div>
        </DivideBlock>

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
        @click="openDateCard()"
      >
        <span class="text-base font-semibold"> 查看可訂日期 </span>
      </v-btn>
    </div>

    <div
      class="flex absolute left-[50%]"
      :class="datesQueue.length === 2 ? 'top-[500px]' : 'top-[325px]'"
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
      isVisible2: false,

      dates: [],

      tenants: [
        {
          id: 1,
          ageGroup: '大人',
          ageRange: '13 歲以上',
          quantity: 1,
        },
        {
          id: 2,
          ageGroup: '兒童',
          ageRange: '2 - 12歲',
          quantity: 0,
        },
        {
          id: 3,
          ageGroup: '嬰幼兒',
          ageRange: '2 歲以下',
          quantity: 0,
        },
        {
          id: 4,
          ageGroup: '寵物',
          ageRange: '會攜帶服務性動物嗎？',
          quantity: 0,
        },
      ],
    }
  },
  computed: {
    EvaluationDialog: {
      get() {
        return this.$store.state.evaluationDialog_visible
      },
      set(v) {
        this.$store.commit('toggleEvaluationBtn', v)
      },
    },
    dateRangeText() {
      return this.datesQueue.join(' ~ ')
    },
    allTenants: {
      get() {
        let total = this.tenants[0].quantity + this.tenants[1].quantity

        return total + '位'
      },
    },
    babyQuantity: {
      get() {
        return this.tenants[2].quantity
      },
    },
    petQuantity() {
      return this.tenants[3].quantity
    },
    calculateDays() {
      return this.$dayjs(this.datesQueue[1]).diff(this.datesQueue[0], 'day')
    },
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

      return (
        holidayOfDays * this.price.holiday + weekdayOfDays * this.price.weekday
      )
    },
    averageRentalCost() {
      return this.calculateRentalCost / this.calculateDays
    },
    calculateServiceCharge() {
      return this.calculateDays * this.price.serviceCharge
    },
    allRentalCost() {
      return this.calculateRentalCost + this.calculateServiceCharge
    },
    datesQueue() {
      if (this.dates.length === 2) {
        if (this.$dayjs(this.dates[0]).isAfter(this.$dayjs(this.dates[1]))) {
          let temp = this.dates[0]
          let newDates = []
          newDates[0] = this.dates[1]
          newDates[1] = temp
          return newDates
        } else {
          return this.dates
        }
      } else {
        return this.dates
      }
    },
  },
  methods: {
    addTenant(idx) {
      return this.tenants[idx].quantity++
    },
    reduceTenant(idx) {
      return this.tenants[idx].quantity--
    },
    isReduceBtnDisable(idx) {
      if (idx == 0) {
        if (this.tenants[idx].quantity < 2) return true
      } else if (idx != 0) {
        if (this.tenants[idx].quantity < 1) return true
      }
    },
    isAddBtnDisable(idx) {
      if (idx === 2) {
        if (this.tenants[idx].quantity > 4) return true
      } else if (idx === 3) {
        if (this.isAcceptPet) {
          if (this.tenants[idx].quantity > 4) return true
        } else {
          return true
        }
      } else {
        if (
          this.tenants[0].quantity + this.tenants[1].quantity >
          this.limitPeople - 1
        )
          return true
      }
    },
    openDateCard() {
      this.isVisible2 = false
      this.isVisible = true
    },
  },
}
</script>
