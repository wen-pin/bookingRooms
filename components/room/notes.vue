<template>
  <div class="my-10">
    <div class="text-2xl font-medium">注意事項</div>

    <v-row class="mt-2">
      <v-col cols="4">
        <div class="font-medium">《房屋守則》</div>

        <div class="h-[100px]">
          <div class="my-2">入住時間：下午3:00</div>
          <div class="my-2">退房時間：上午11:00</div>
          <div class="my-2">最多 8 位房客</div>
        </div>

        <div
          class="!max-w-[115px] flex mt-7"
          @click="houseRulesDialog = !houseRulesDialog"
        >
          <TextBtnDialog :title="'顯示更多內容'" />

          <v-icon class="cursor-pointer" small color="black">
            mdi-greater-than
          </v-icon>
        </div>

        <CardDialog
          :dialog="houseRulesDialog"
          :width="800"
          @update="updateHouseRulesDialog"
        >
          <div class="text-2xl font-semibold">《房屋守則》</div>
        </CardDialog>
      </v-col>

      <v-col cols="4">
        <div class="font-medium">安全與房源</div>

        <div class="h-[100px]">
          <div class="my-2">未安裝一氧化碳警報器</div>
          <div class="my-2">無門鎖的泳池／按摩浴池</div>
          <div class="my-2">附近的湖泊、河流、其他水域</div>
        </div>

        <div
          class="!max-w-[115px] flex mt-7"
          @click="securityDialog = !securityDialog"
        >
          <TextBtnDialog :title="'顯示更多內容'" />

          <v-icon class="cursor-pointer" small color="black">
            mdi-greater-than
          </v-icon>
        </div>

        <CardDialog
          :dialog="securityDialog"
          :width="800"
          @update="updateSecurityDialogDialog"
        >
          <div>安全與房源</div>
        </CardDialog>
      </v-col>

      <v-col cols="4">
        <div class="font-medium">《退訂政策》</div>

        <div class="h-[100px]">
          <div class="my-2">在 1月27日前可以免費取消。</div>
          <div class="my-2">
            請查看房東完整的《退訂政策》；即便是因為感染新冠肺炎而取消，或新冠疫情導致旅程中斷，這些政策依然適用。
          </div>
        </div>

        <div
          class="!max-w-[115px] flex mt-7"
          @click="unsubscribePolicyDialog = !unsubscribePolicyDialog"
        >
          <TextBtnDialog :title="'顯示更多內容'" />

          <v-icon class="cursor-pointer" small color="black">
            mdi-greater-than
          </v-icon>
        </div>

        <CardDialog
          :dialog="unsubscribePolicyDialog"
          :width="800"
          @update="updateUnsubscribePolicyDialog"
        >
          <div>《退訂政策》</div>
        </CardDialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'roomNotes',

  data() {
    return {
      houseRulesDialog: false,
      securityDialog: false,
      unsubscribePolicyDialog: false,
    }
  },
  methods: {
    updateHouseRulesDialog(val) {
      this.houseRulesDialog = val
    },
    updateSecurityDialogDialog(val) {
      this.securityDialog = val
    },
    updateUnsubscribePolicyDialog(val) {
      this.unsubscribePolicyDialog = val
    },
  },
}
</script>
