<template>
  <div>
    <!-- 手機版Appbar -->
    <v-app-bar
      v-if="$vuetify.breakpoint.xs"
      app
      color="white"
      elevate-on-scroll
    >
      <div class="!relative font-semibold flex items-center h-full">
        <div>
          <v-btn icon @click="$router.go(-1)">
            <v-icon small color="black"> mdi-less-than </v-icon>
          </v-btn>

          <div
            class="absolute top-[50%] left-[50%]"
            style="transform: translate(-50%, -50%) !important"
          >
            確認並付款
          </div>
        </div>
      </div>
    </v-app-bar>

    <v-container class="!max-w-[1280px]">
      <!-- 手機版預訂房間照片相關資訊 -->
      <div v-if="$vuetify.breakpoint.xs">
        <BookRoomPhoto
          :rentalType="room.rentalType"
          :title="room.title"
          :averageRating="room.averageRating"
          :allMessages="room.allMessages"
          :roomId="roomId"
          class="px-6"
        />
      </div>

      <div v-else class="flex my-10">
        <v-btn icon class="mr-6" @click="$router.go(-1)">
          <v-icon> mdi-less-than </v-icon>
        </v-btn>
        <div class="text-4xl font-semibold">確認並付款</div>
      </div>

      <v-row>
        <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
          <!-- 你的旅程 -->
          <BookTrip
            :limitPeople="room.limitPeople"
            :isAcceptPet="room.isAcceptPet"
            :averageRating="room.averageRating"
            :location="room.location"
            :price="room.price"
          />

          <!-- 手機版價格詳情 -->
          <div
            v-if="$vuetify.breakpoint.xs"
            class="px-6 pb-6 border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200"
          >
            <BookCardPrice :price="room.price" />
          </div>

          <!-- 已登入 -->
          <div v-if="$auth.loggedIn" class="">
            <!-- 付款方式 -->
            <div
              :class="
                $vuetify.breakpoint.xs
                  ? 'border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200'
                  : ''
              "
            >
              <BookPayment
                :class="$vuetify.breakpoint.xs ? 'px-6 pt-6' : 'pt-8'"
              />
            </div>

            <!-- 退訂政策 -->
            <div
              :class="
                $vuetify.breakpoint.xs
                  ? 'border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200'
                  : ''
              "
            >
              <BookUnsubscribe
                :class="$vuetify.breakpoint.xs ? 'px-6 pt-6' : 'pt-8'"
              />
            </div>

            <div
              :class="
                $vuetify.breakpoint.xs
                  ? 'px-6 pb-6 border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200'
                  : ''
              "
            >
              <div class="py-6 text-xs">
                點選以下按鈕即表示本人同意房東的《房屋守則》、房客基本守則、《重新預訂和退款政策》，且允許
                Airbnb 在我應負責賠償損壞時，可以向我的付款方式扣款。
              </div>

              <v-btn
                :disabled="this.select.title === undefined"
                :block="$vuetify.breakpoint.xs"
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
          </div>

          <div
            v-else
            :class="
              $vuetify.breakpoint.xs
                ? 'border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200 p-6'
                : 'mt-10'
            "
          >
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

        <v-col v-if="!$vuetify.breakpoint.xs" cols="6">
          <div class="flex justify-end">
            <v-card outlined class="rounded-lg p-6" max-width="480px">
              <BookRoomPhoto
                :rentalType="room.rentalType"
                :title="room.title"
                :averageRating="room.averageRating"
                :allMessages="room.allMessages"
                :roomId="roomId"
              />
              <BookCardPrice :price="room.price" />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'scheduleRoom',
  layout: 'singleRoom',

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
    roomId() {
      return this.$route.params.id
    },
  },
  methods: {
    async payment() {
      try {
        await this.$axios.$post('api/bookingRooms', {
          bookerName: this.$auth.user.user.username,
          bookingDate: this.dateRangeText,
          roomId: this.$route.params.id,
          payment: this.select.title,
        })

        this.successDialog = true
        this.select = {}
        this.dates = []
      } catch (err) {
        console.log(err)
        this.$toast.warning('訂房日期未填寫')
      } finally {
      }
    },
  },
}
</script>
