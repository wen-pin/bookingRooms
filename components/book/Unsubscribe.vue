<template>
  <div>
    <div v-if="$vuetify.breakpoint.xs">
      <div class="pb-3">
        <div class="text-2xl font-medium">退訂政策</div>
        <div class="flex mt-5">
          <div>這筆預訂不可退款。</div>
          <TextBtnDialog
            :title="'了解詳情'"
            @click="unsubscribeDialog = !unsubscribeDialog"
          />
        </div>
      </div>
    </div>

    <DivideBlock v-else>
      <div class="pb-6">
        <div class="text-2xl font-medium">退訂政策</div>
        <div class="flex mt-5">
          <div>這筆預訂不可退款。</div>
          <TextBtnDialog
            :title="'了解詳情'"
            @click="unsubscribeDialog = !unsubscribeDialog"
          />
        </div>
      </div>
    </DivideBlock>

    <CardDialog
      :dialog="unsubscribeDialog"
      :fullscreen="$vuetify.breakpoint.xs"
      :title="'《退訂政策》'"
      @update="updateUnsubscribeDialog"
    >
      <div class="mt-8">
        <div class="text-xl font-medium">取消截止時間</div>

        <DivideBlock>
          <div class="flex my-6">
            <div class="mr-[80px]">
              <div class="font-medium">{{ datesQueue[0] }}</div>
              <div class="text-sm">下午4:00</div>
              <div class="text-sm">（入住）</div>
            </div>
            <div>無法退款</div>
          </div>
        </DivideBlock>

        <TextBtnDialog
          :title="'了解更多有關《退訂政策》的事宜'"
          class="mt-5 mb-[20px]"
        >
        </TextBtnDialog>
      </div>
    </CardDialog>
  </div>
</template>

<script>
export default {
  name: 'bookUnsubscribe',

  data() {
    return {
      unsubscribeDialog: false,
    }
  },
  computed: {
    // 時間排列
    datesQueue() {
      return this.$store.getters.datesQueue
    },
  },
  methods: {
    updateUnsubscribeDialog(val) {
      this.unsubscribeDialog = val
    },
  },
}
</script>
