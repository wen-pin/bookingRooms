<template>
  <v-container class="px-6">
    <div class="text-4xl font-semibold my-5">旅程</div>

    <div v-if="bookingRooms.length !== 0">
      <div class="text-2xl font-semibold mt-13">預定的旅程</div>

      <v-row class="my-5">
        <v-col
          v-for="bookingRoom in bookingRooms"
          :key="bookingRoom.id"
          :cols="$vuetify.breakpoint.xs ? 12 : 4"
        >
          <div class="flex items-center">
            <v-img
              :src="
                require(`~/assets/img/rooms/room${bookingRoom.room.id}/bg_2.jpg`)
              "
              :aspect-ratio="1"
              max-width="72px"
              class="rounded-lg w-[30%] mr-2"
            ></v-img>

            <div class="px-2 class">
              <div class="font-medium">
                {{ bookingRoom.room.location.address }}
              </div>

              <div class="text-sm font-light">
                房東 / 體驗達人：{{ bookingRoom.room.landlord }}
              </div>

              <div class="text-sm font-light">
                {{ bookingRoom.bookingDate }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-card v-else flat outlined class="!rounded-lg my-13">
      <v-row>
        <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
          <div
            :class="
              $vuetify.breakpoint.xs ? 'flex flex-col items-center p-6' : 'p-10'
            "
          >
            <SvgIcon
              :iconClass="'handWaving'"
              :className="'size'"
              class="mt-1 mb-4"
            />

            <div class="text-lg font-semibold mb-1">還沒預訂任何旅程！</div>

            <div class="text-sm font-light">
              該拿出行李箱，開始規劃下一趟冒險之旅了
            </div>

            <v-btn
              :block="$vuetify.breakpoint.xs"
              width="112px"
              height="48px"
              dark
              color="#EC407A"
              class="mt-5 rounded-lg"
              nuxt
              to="/"
            >
              開始搜尋
            </v-btn>
          </div>
        </v-col>

        <v-col v-if="!$vuetify.breakpoint.xs" cols="8">
          <v-img
            :src="require('assets/img/bg_1.jpeg')"
            class="rounded-tr-lg rounded-br-lg"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>

    <div v-if="isHistory">
      <div class="text-2xl font-semibold mt-13">你去過的地方</div>

      <v-row class="my-5">
        <v-col v-for="i in 3" :key="i" cols="4">
          <div class="flex items-center">
            <v-img
              :src="require(`~/assets/img/rooms/room1/bg_2.jpg`)"
              :aspect-ratio="1"
              max-width="72px"
              class="rounded-lg w-[30%] mr-2"
            ></v-img>

            <div class="px-2 class">
              <div class="font-medium">Hengchun</div>

              <div class="text-sm font-light">房東 / 體驗達人：Chiang</div>

              <div class="text-sm font-light">
                2021年12月11日~2021年12月12日
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div v-if="isCancel">
      <div class="text-2xl font-semibold mt-13">已取消的旅程</div>

      <v-row class="my-5">
        <v-col v-for="i in 3" :key="i" cols="4">
          <div class="flex items-center">
            <v-img
              :src="require(`~/assets/img/rooms/room1/bg_2.jpg`)"
              :aspect-ratio="1"
              max-width="72px"
              class="rounded-lg w-[30%] mr-2"
            ></v-img>

            <div class="px-2 class">
              <div class="font-medium">Hengchun</div>

              <div class="text-sm font-light">房東 / 體驗達人：Chiang</div>

              <div class="text-sm font-light">
                2021年12月11日~2021年12月12日
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'trips',

  data() {
    return {
      isHistory: false,
      isCancel: false,

      bookingRooms: [],
    }
  },
  async asyncData({ $axios, $auth }) {
    const res = await $axios.post('/api/bookingRooms/v1', {
      username: $auth.user.user.username,
    })
    return { bookingRooms: res.data }
  },
}
</script>
