<template>
  <div
    class="!max-w-[320px] flex justify-between border-gray-300 border border-solid rounded-lg cursor-pointer"
  >
    <div
      :class="
        datesQueue[0] == null
          ? 'w-[50%] px-3 py-2 border-2 border-solid border-black rounded-lg '
          : 'w-[50%] px-3 py-2'
      "
    >
      <div class="font-semibold text-sm">入住</div>
      <div v-if="datesQueue[0] != null">
        {{ this.$dayjs(datesQueue[0]).format('YYYY/M/DD') }}
      </div>
      <div v-else class="text-neutral-500">選取日期</div>
    </div>

    <v-divider vertical />

    <div
      :class="
        datesQueue[0] != null
          ? 'w-[50%] py-2 pl-3 border-2 border-solid border-black rounded-lg'
          : 'w-[50%] py-2 pl-3'
      "
    >
      <div class="font-semibold text-sm">退房</div>
      <div v-if="datesQueue[1] != null">
        {{ this.$dayjs(datesQueue[1]).format('YYYY/M/DD') }}
      </div>
      <div v-else class="text-neutral-500">選取日期</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dateRangeStyle',

  props: {},

  data() {
    return {}
  },
  computed: {
    datesQueue() {
      return this.$store.getters.datesQueue
    },
  },
}
</script>
