<template>
  <v-container>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id" cols="3">
        <v-card elevation="0" nuxt :to="`/rooms/${room.id}`">
          <v-img
            height="250"
            :src="require(`~/assets/img/rooms/room${room.id}/bg_1.jpg`)"
            class="rounded-lg"
          ></v-img>

          <v-card-text class="px-0 black--text">
            <div class="flex font-bold">
              <div v-if="room.location">
                位於{{ room.location.address }}的{{ room.rentalType }}
              </div>
              <v-spacer></v-spacer>

              <span>
                <TextRate :value="room.averageRating" :size="14" />
              </span>

              <span v-if="room.allMessages">
                ({{ room.allMessages.length }})
              </span>
            </div>

            <span class="line-clamp-1 w-[215px]">
              {{ room.title }}
            </span>

            <div>{{ $t('房東') }}: {{ room.landlord }}</div>
            <div>1月9日至14日</div>
            <div class="font-bold">
              {{ $n(room.price.weekday, 'currency', 'zh-tw') }} 晚 起
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  auth: false,

  data() {
    return {
      rooms: [],
      users: [],
    }
  },
  async fetch() {
    // const { data } = await $axios.get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.$get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.get(`/articles/index?pageIndex=1\`).data
    const res = await this.$axios.get('/api/rooms')
    this.rooms = res.data
    // const resUsers = await this.$axios.get('/api/users')
    // this.users = resUsers.data
    // console.log(resUsers.data)
  },
  methods: {
    // async EnterRoom(id) {
    //   await this.$store.dispatch('fetchRoom', {
    //     roomId: id,
    //   })
    //   this.$router.push(`/rooms/${id}`)
    // },
  },
}
</script>
