<template>
  <TextBtnDialog :title="'清除日期'" class="mr-5" @click="dates = []" />
</template>

<script>
export default {
  name: 'dateClearBtn',

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
