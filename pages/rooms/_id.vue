<template>
  <v-container>
    <div class="text-3xl mt-5">{{ room.title }}</div>

    <div class="my-2 flex">
      <div class="flex">
        <span class="my-auto">
          <TextRate :value="room.averageRating" :margin="'mr-4'" />
        </span>

        <DialogEvaluation
          :averageRating="room.averageRating"
          :allMessages="room.allMessages"
          :evaluationStandards="room.evaluationStandards"
          class="mr-4 my-auto"
        />

        <span
          v-if="room.location"
          class="flex items-center"
          @click="googleMapsDialog = !googleMapsDialog"
        >
          <TextBtnDialog
            :title="room.location.address"
            :subTitle="room.country"
          />
        </span>

        <v-spacer />

        <DialogShare />

        <DialogFavorites />
      </div>
    </div>

    <div v-if="room.img">
      <RoomPhotos :roomQuality="room.img.roomQuality" class="my-5" />
    </div>

    <div
      class="flex border-solid border-t-0 border-r-0 border-b-1 border-l-0 border-slate-200"
    >
      <div class="w-[60%]">
        <RoomInfoTitle
          id="scrollTargetId"
          :landlord="room.landlord"
          :rentalType="room.rentalType"
          :limitPeople="room.limitPeople"
          :pattern="room.pattern"
          target-element="#landlord"
        />

        <RoomRights />

        <RoomIntroduce />

        <RoomBeds :pattern="room.pattern" />

        <div v-if="room.alleqptAndServices">
          <RoomEquipment
            :alleqptAndServices="room.alleqptAndServices"
            :eqptAndServices="room.alleqptAndServices[0].eqptAndServices"
          />
        </div>

        <div class="my-10">
          <DateRange :location="room.location" />

          <v-row class="mt-10">
            <DatePicker />
          </v-row>

          <div class="mt-5 flex justify-end" @click="dates = []">
            <TextBtnDialog :title="'清除日期'" />
          </div>
        </div>
      </div>

      <!-- 要在這邊加上z-10，打開的卡片才能覆蓋底層 -->
      <div class="w-[40%] flex justify-center relative z-10">
        <RoomCardBook
          :averageRating="room.averageRating"
          :allMessages="room.allMessages"
          :location="room.location"
          :price="room.price"
          :limitPeople="room.limitPeople"
          :isAcceptPet="room.isAcceptPet"
          class="!sticky top-[80px] mt-5 !mb-[90px]"
        />
      </div>
    </div>

    <RoomEvaluation
      :averageRating="room.averageRating"
      :allMessages="room.allMessages"
      :evaluationStandards="room.evaluationStandards"
    />

    <RoomLocation :location="room.location" :country="room.country" />

    <RoomInfoLandlord
      id="landlord"
      :landlord="room.landlord"
      :averageRating="room.averageRating"
      :allMessages="room.allMessages"
    />

    <RoomNotes />
  </v-container>
</template>

<script>
export default {
  name: 'singleRoom',
  layout: 'singleRoom',

  data() {
    return {
      room: {},
    }
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.get(`/api/rooms/${params.id}`)
    return { room: res.data }
  },
  computed: {
    dates: {
      get() {
        return this.$store.state.dates
      },
      set(v) {
        this.$store.commit('fetchDates', v)
      },
    },
    // target() {
    //   return this.$refs.landlord
    // },
    // options() {
    //   return {
    //     duration: 2000,
    //     offset: 40,
    //     easing: 'easeOutQuart',
    //   }
    // },
    googleMapsDialog: {
      get() {
        return this.$store.state.googleMapsDialog_visible
      },
      set(v) {
        this.$store.commit('toggleGoogleMapsBtn', v)
      },
    },
  },
  methods: {},
}
</script>
