<template>
  <div class="my-10">
    <div class="text-2xl font-bold">
      <div v-if="datesQueue.length == 0">選擇入住日期</div>
      <div v-else-if="datesQueue.length == 1">選擇退房日期</div>
      <div v-else>{{ $t('在') }}{{ address }}住{{ calculateDays }}晚</div>
    </div>

    <div class="text-sm text-neutral-500">
      <div v-if="datesQueue.length < 2">新增旅行日期，查看確切價格</div>
      <div v-else>
        {{ dateRangeText }}
      </div>
    </div>

    <v-row class="mt-10">
      <v-date-picker
        v-model="dates"
        range
        no-title
        full-width
        :min="$dayjs().format('YYYY-MM-DD')"
        year-icon="mdi-calendar-blank"
      ></v-date-picker>
    </v-row>

    <div class="mt-5 flex justify-end" @click="dates = []">
      <TextBtnDialog :title="'清除日期'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'roomDates',

  props: {
    address: {
      types: String,
      required: true,
    },
  },

  data() {
    return {
      dates: [],
    }
  },
  computed: {
    datesQueue() {
      if (this.dates.length === 2) {
        if (this.$dayjs(this.dates[0]).isAfter(this.$dayjs(this.dates[1]))) {
          let temp = this.dates[0]
          let newDates = []
          newDates[0] = this.dates[1]
          newDates[1] = temp
          return newDates
        } else {
          return this.dates
        }
      } else {
        return this.dates
      }
    },
    calculateDays() {
      return this.$dayjs(this.datesQueue[1]).diff(this.datesQueue[0], 'day')
    },
    dateRangeText() {
      return this.datesQueue.join(' ~ ')
    },
  },
  methods: {},
}
</script>
