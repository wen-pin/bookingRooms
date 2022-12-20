<template>
  <v-container>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id" cols="3">
        <v-card elevation="0" nuxt :to="`/rooms/${room.id}`">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            class="rounded-lg"
          ></v-img>

          <v-card-text class="px-0">
            <div class="flex font-bold">
              {{ room.title }}

              <v-spacer></v-spacer>

              <v-rating
                :value="room.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ room.rating }}</div>
            </div>

            <div>房東: {{ room.landlord }}</div>
            <div>1月9日至14日</div>
            <div class="font-bold">${{ room.weekday_price }} TWD 晚 起</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
      rooms: [
        {
          id: 1,
          landlord: 'John',
          title: 'sadas',
          address: '彰化',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 2,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 3,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 4,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 5,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 6,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 6,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 6,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 6,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
        {
          id: 6,
          landlord: 'John',
          title: '彰化',
          address: '',
          weekday_price: 1000,
          holiday_price: 2000,
          rating: 2.5,
        },
      ],
      apirooms: [],
      users: [],
    }
  },
  async fetch() {
    // const { data } = await $axios.get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.$get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.get(`/articles/index?pageIndex=1\`).data

    // const res = await this.$axios.get('/api/rooms')
    // this.apirooms = res.data
    // console.log(res.data)
    const resUsers = await this.$axios.get('/api/users')
    this.users = resUsers.data
    // console.log(resUsers.data)
  },
}
</script>
