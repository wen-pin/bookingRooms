<template>
  <v-date-picker
    v-model="dates"
    range
    no-title
    full-width
    :min="$dayjs().format('YYYY-MM-DD')"
    year-icon="mdi-calendar-blank"
  ></v-date-picker>
</template>

<script>
export default {
  data() {
    return {}
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
  },
}
</script>
