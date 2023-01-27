<template>
  <v-container class="!max-w-[1280px]">
    <div class="flex my-10">
      <v-btn icon class="mr-6" @click="$router.go(-1)">
        <v-icon> mdi-less-than </v-icon>
      </v-btn>
      <div class="text-4xl font-semibold">申請預訂</div>
    </div>

    <v-row class="px-[80px]">
      <v-col cols="6">
        <BookTrip
          :limitPeople="room.limitPeople"
          :isAcceptPet="room.isAcceptPet"
        />

        <div v-if="$auth.loggedIn" class="mt-8">
          <BookPayment />

          <BookUnsubscribe />

          <div class="my-8 text-xs">
            點選以下按鈕即表示本人同意房東的《房屋守則》、房客基本守則、《重新預訂和退款政策》，且允許
            Airbnb 在我應負責賠償損壞時，可以向我的付款方式扣款。
          </div>

          <v-btn
            :disabled="this.select.title === undefined"
            width="150px"
            height="50px"
            color="#EC407A"
            class="rounded-lg"
          >
            <span class="text-lg text-white" @click="payment()">
              {{ $t('確認並付款') }}
            </span>
          </v-btn>

          <v-dialog v-model="successDialog" width="450" persistent>
            <v-card height="500px" class="p-5">
              <div class="flex flex-col items-center">
                <SvgIcon
                  :iconClass="'success'"
                  :className="'success'"
                  class="my-10"
                />

                <div class="text-3xl">預訂完成</div>

                <v-btn
                  color="#0288D1"
                  width="300px"
                  height="50px"
                  dark
                  depressed
                  class="mt-[100px]"
                  nuxt
                  to="/trips"
                >
                  查看訂單詳情
                </v-btn>

                <v-btn
                  width="300px"
                  height="50px"
                  dark
                  depressed
                  nuxt
                  to="/"
                  class="mt-5"
                >
                  回首頁
                </v-btn>
              </div>
            </v-card>
          </v-dialog>
        </div>

        <div v-else class="mt-10">
          <div class="text-2xl font-medium">登入或註冊即可預訂</div>

          <v-tabs v-model="tab" fixed-tabs>
            <v-tabs-slider color="light-blue darken-4"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="mt-5">
            <v-tab-item>
              <FormLoginBook />
            </v-tab-item>

            <v-tab-item>
              <FormRegisterBook />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="flex justify-end">
          <BookCardPrice
            :rentalType="room.rentalType"
            :title="room.title"
            :averageRating="room.averageRating"
            :allMessages="room.allMessages"
            :price="room.price"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'scheduleRoom',

  data() {
    return {
      tab: null,
      successDialog: false,
      items: ['登入', '註冊'],

      room: {},
    }
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.get(`/api/rooms/${params.id}`)
    return { room: res.data }
  },
  computed: {
    select: {
      get() {
        return this.$store.state.select
      },
      set(v) {
        return this.$store.commit('selectPayment', v)
      },
    },
    dates: {
      get() {
        return this.$store.state.dates
      },
      set(v) {
        return this.$store.commit('fetchDates', v)
      },
    },
    dateRangeText() {
      return this.$store.getters.dateRangeText
    },
  },
  methods: {
    async payment() {
      try {
        await this.$axios.$post('api/bookingRooms', {
          bookerName: this.$auth.user.user.username,
          bookingDate: this.dateRangeText,
          roomId: this.$route.params.id,
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.successDialog = true
        this.select = {}
        this.dates = []
      }
    },
  },
}
</script>
