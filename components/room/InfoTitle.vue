<template>
  <DivideBlock>
    <div
      class="flex justify-between"
      :class="$vuetify.breakpoint.xs ? 'my-6' : 'my-8'"
    >
      <div>
        <div class="text-2xl font-bold">
          <div v-if="$vuetify.breakpoint.xs">
            <div>
              {{ rentalType }}
            </div>
            <div>房東：{{ landlord }}</div>
          </div>

          <div v-else>{{ landlord }}出租的{{ rentalType }}</div>
        </div>

        <span>{{ limitPeople }}位 </span>
        <span v-if="pattern.bedroom > 0">{{ pattern.bedroom }}間臥室 </span>
        <span v-if="pattern.bed > 0">{{ pattern.bed }}張床</span>
        <span v-if="pattern.bathroom > 0">{{ pattern.bathroom }}間衛浴 </span>
        <span v-if="pattern.sharedBathroom > 0">
          {{ pattern.sharedBathroom }}間共用衛浴
        </span>
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
