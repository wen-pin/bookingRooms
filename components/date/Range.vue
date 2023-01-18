<template>
  <div>
    <div v-if="location.address !== undefined" class="text-2xl font-bold">
      <div v-if="datesQueue.length == 0">選擇入住日期</div>
      <div v-else-if="datesQueue.length == 1">選擇退房日期</div>
      <div v-else>
        {{ $t('在') }}{{ location.address }}住{{ calculateDays }}晚
      </div>
    </div>

    <div class="text-sm text-neutral-500">
      <div v-if="datesQueue.length < 2">新增旅行日期，查看確切價格</div>
      <div v-else>
        {{ dateRangeText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dateRange',

  props: {
    location: {
      types: Object,
    },
  },

  data() {
    return {}
  },
  computed: {
    datesQueue() {
      return this.$store.getters.datesQueue
    },
    calculateDays() {
      return this.$store.getters.calculateDays
    },
    dateRangeText() {
      return this.$store.getters.dateRangeText
    },
  },
}
</script>
