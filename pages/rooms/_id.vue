<template>
  <div>
    <RoomCarousels
      v-if="$vuetify.breakpoint.xs"
      :roomQuality="room.img.roomQuality"
    />

    <v-container>
      <UiAppbar2
        v-if="!$vuetify.breakpoint.xs"
        :averageRating="room.averageRating"
        :allMessages="room.allMessages"
        :price="room.price"
        target-element="#date"
      />

      <div
        :class="
          $vuetify.breakpoint.xs ? 'divide-solid divide-y divide-slate-200' : ''
        "
      >
        <div :class="$vuetify.breakpoint.xs ? 'mb-6' : ''">
          <div class="text-2xl font-bold mt-5">{{ room.title }}</div>

          <div class="my-2 flex">
            <div class="flex">
              <TextRate
                :value="room.averageRating"
                :maxWidth="'!max-w-[40px]'"
              />

              <DialogEvaluation
                :averageRating="room.averageRating"
                :allMessages="room.allMessages"
                :evaluationStandards="room.evaluationStandards"
                class="mr-4 my-auto"
              />

              <div v-if="room.location" class="flex items-center">
                <TextBtnDialog
                  :title="room.location.address"
                  :subTitle="room.country"
                  @click="GmapBtn()"
                />

                <RoomGmapMobile :location="room.location" />
              </div>

              <v-spacer />

              <DialogShare v-if="!$vuetify.breakpoint.xs" />

              <DialogFavorites v-if="!$vuetify.breakpoint.xs" />
            </div>
          </div>
        </div>

        <!-- 底線 -->
        <div></div>
      </div>

      <div v-if="!$vuetify.breakpoint.xs">
        <div v-if="room.img">
          <RoomPhotos
            id="photos"
            :roomQuality="room.img.roomQuality"
            class="my-5"
          />
        </div>
      </div>

      <div
        class="flex border-solid border-t-0 border-r-0 border-b-1 border-l-0 border-slate-200"
      >
        <div :class="$vuetify.breakpoint.xs ? 'w-full' : 'w-[60%]'">
          <RoomInfoTitle
            id="infoTitle"
            :landlord="room.landlord"
            :rentalType="room.rentalType"
            :limitPeople="room.limitPeople"
            :pattern="room.pattern"
            target-element="#landlord"
          />

          <RoomRights />

          <RoomIntroduce :spaceInfo="room.spaceInfo" />

          <RoomBeds :pattern="room.pattern" />

          <div v-if="room.alleqptAndServices">
            <RoomEquipment
              id="equipment"
              :alleqptAndServices="room.alleqptAndServices"
              :eqptAndServices="room.alleqptAndServices[0].eqptAndServices"
            />
          </div>

          <!-- 使用斷點會報錯 -->
          <!-- <RoomLocation
          v-if="$vuetify.breakpoint.xs"
          :location="room.location"
          :country="room.country"
        /> -->

          <div class="my-10" id="date">
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
        <div
          v-if="!$vuetify.breakpoint.xs"
          class="w-[40%] flex justify-end relative z-10"
        >
          <RoomCardBook
            :averageRating="room.averageRating"
            :allMessages="room.allMessages"
            :location="room.location"
            :price="room.price"
            :limitPeople="room.limitPeople"
            :isAcceptPet="room.isAcceptPet"
            class="!sticky top-[120px] mt-5 !mb-[90px]"
          />
        </div>
      </div>

      <RoomEvaluation
        id="evaluation"
        :averageRating="room.averageRating"
        :allMessages="room.allMessages"
        :evaluationStandards="room.evaluationStandards"
      />

      <RoomLocation
        id="location"
        :location="room.location"
        :country="room.country"
      />

      <RoomInfoLandlord
        id="landlord"
        :landlordInfo="room.landlordInfo"
        :averageRating="room.averageRating"
        :allMessages="room.allMessages"
      />

      <RoomNotes
        :notes="room.notes"
        :limitPeople="room.limitPeople"
        :isAcceptPet="room.isAcceptPet"
        target-element="#date"
      />
    </v-container>
  </div>
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
    googleMapsDialog_mobile: {
      get() {
        return this.$store.state.googleMapsDialog_mobile_visible
      },
      set(v) {
        this.$store.commit('toggleGoogleMapsBtn_mobile', v)
      },
    },
  },
  methods: {
    GmapBtn() {
      if (this.$vuetify.breakpoint.xs) {
        this.googleMapsDialog_mobile = !this.googleMapsDialog_mobile
      } else {
        this.googleMapsDialog = !this.googleMapsDialog
      }
    },
  },
}
</script>
