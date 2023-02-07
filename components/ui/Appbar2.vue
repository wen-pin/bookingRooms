<template>
  <div
    v-if="isVisible"
    class="!fixed top-0 left-0 w-full bg-white z-20 h-[80px] border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-300"
  >
    <v-container class="py-0 h-full">
      <div class="flex h-full">
        <div
          v-for="item in items"
          :key="item.title"
          class="mr-5 font-semibold border border-t-0 border-r-0 border-b-0 border-l-0 hover:border-b-4 border-solid border-black cursor-pointer"
          @click="goToTarget(item.targetElement)"
        >
          <div class="flex items-center h-full">
            {{ item.title }}
          </div>
        </div>

        <v-spacer />

        <div v-if="isVisible_btnCheck" class="flex items-center justify-end">
          <div class="mr-5">
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

            <div class="flex">
              <span>
                <TextRate
                  :value="averageRating"
                  :margin="'mr-4'"
                  class="text-sm"
                />
              </span>

              <span v-if="allMessages" @click="evaluationDialog = true">
                <TextBtnDialog
                  :title="`${allMessages.length}則評價`"
                  class="text-sm"
                />
              </span>
            </div>
          </div>

          <div>
            <v-btn
              v-if="datesQueue.length === 2"
              width="80px"
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

            <v-btn
              v-else
              width="145px"
              height="50px"
              dark
              block
              color="#EC407A"
              class="rounded-lg"
            >
              <span
                class="text-base font-semibold"
                @click="goToTarget(targetElement)"
              >
                查看可訂日期
              </span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'uiAppbar2',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
      required: true,
    },
    price: {
      types: Object,
      required: true,
    },
    targetElement: {
      types: String,
    },
  },

  data() {
    return {
      isVisible: false,
      isVisible_btnCheck: false,

      items: [
        {
          title: '相片',
          targetElement: '#photos',
        },
        {
          title: '設備與服務',
          targetElement: '#equipment',
        },
        {
          title: '評價',
          targetElement: '#evaluation',
        },
        {
          title: '位置',
          targetElement: '#location',
        },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleBtnScroll)
  },
  // 離開該頁面必須移除這個監聽，不然會報錯
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleBtnScroll)
  },
  computed: {
    // 評價對話筐是否顯示
    evaluationDialog: {
      get() {
        return this.$store.state.evaluationDialog_visible
      },
      set(v) {
        this.$store.commit('toggleEvaluationBtn', v)
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
      if (this.calculateDays > 0) {
        return this.calculateRentalCost / this.calculateDays
      } else {
        return this.price.weekday
      }
    },
    // scrollTargetId() {
    //   return this.$store.state.scrollTargetId
    // },
    // scrollTargetSelector() {
    //   return `#${this.scrollTargetId}`
    // },
  },
  methods: {
    goToTarget(target) {
      this.$vuetify.goTo(target, {
        duration: 2000,
        offset: 40,
        easing: 'easeOutQuart',
      })
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      const offsetTop = document.querySelector('#infoTitle').offsetTop

      if (scrollTop > offsetTop) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    },
    handleBtnScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      const offsetTop_btnCheck = document.querySelector('#evaluation').offsetTop

      if (scrollTop > offsetTop_btnCheck) {
        this.isVisible_btnCheck = true
      } else {
        this.isVisible_btnCheck = false
      }
    },
  },
}
</script>
