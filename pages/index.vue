<template>
  <v-container>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id" cols="3">
        <v-card nuxt :to="`/rooms/${room.id}`">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>
            <v-row>
              {{ room.name }}

              <v-spacer></v-spacer>

              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>
          </v-card-title>

          <v-card-text>
            <span>{{ room.price }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div>
      {{ users }}
    </div>
    <div>
      {{ users }}
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          url: 'asdasd',
          name: '彰化',
          price: '1000',
        },
        {
          id: 2,
          url: 'asdasd',
          name: '台中',
          price: '1000',
        },
        {
          id: 3,
          url: 'asdasd',
          name: '南投',
          price: '1000',
        },
        {
          id: 4,
          url: 'asdasd',
          name: '雲林',
          price: '1000',
        },
        {
          id: 5,
          url: 'asdasd',
          name: '桃園',
          price: '1000',
        },
      ],
      users: [],
    }
  },
  async fetch() {
    const res = await this.$axios.get(
      'https://booking-rooms-server.vercel.app/api/users',
    )
    this.users = res.data
    console.log(res.data)
  },
}
</script>
