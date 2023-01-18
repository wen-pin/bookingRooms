<template>
  <DivideBlock>
    <div class="my-8 flex justify-between">
      <div>
        <div class="text-2xl font-bold">
          {{ landlord }}出租的{{ rentalType }}
        </div>

        <span>{{ limitPeople }}位 </span>
        <span v-if="pattern">{{ pattern.bedroom }}間臥室 </span>
        <span v-if="pattern">{{ pattern.bed }}張床</span>
        <span v-if="pattern">{{ pattern.bathroom }}間衛浴 </span>
        <span v-if="pattern"> {{ pattern.sharedBathroom }}間共用衛浴 </span>
      </div>

      <v-avatar size="56px" @click="goToTarget(targetElement)">
        <img
          alt="Avatar"
          :src="
            require(`~/assets/img/rooms/room${this.$route.params.id}/avater.jpeg`)
          "
          class="cursor-pointer"
        />
      </v-avatar>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomInfoTitle',

  props: {
    landlord: {
      types: String,
      required: true,
    },
    rentalType: {
      types: String,
      required: true,
    },
    limitPeople: {
      types: Number,
      required: true,
    },
    pattern: {
      types: Object,
      required: true,
    },
    targetElement: {
      types: String,
    },
  },

  data() {
    return {}
  },
  methods: {
    goToTarget(target) {
      this.$vuetify.goTo(target, {
        duration: 2000,
        offset: 40,
        easing: 'easeOutQuart',
      })
    },
  },
}
</script>
