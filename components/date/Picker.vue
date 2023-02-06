<template>
  <v-date-picker
    v-model="dates"
    :width="width"
    range
    no-title
    full-width
    :min="$dayjs().format('YYYY-MM-DD')"
    year-icon="mdi-calendar-blank"
  ></v-date-picker>
</template>

<script>
export default {
  name: 'datePicker',

  props: {
    width: {
      types: Number,
    },
  },

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
