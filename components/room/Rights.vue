<template>
  <DivideBlock>
    <div class="my-6">
      <div class="text-3xl font-extrabold">theroomscover</div>

      <div class="mt-2 mb-3">
        針對房東取消預訂、房源描述不實和入住困難等其他問題，我們會為每筆預訂提供免費保障。
      </div>

      <div class="!max-w-[70px]" @click="dialog = true">
        <TextBtnDialog :title="'了解詳情'" />
      </div>

      <CardDialog
        :width="1000"
        :dialog="dialog"
        :fullscreen="$vuetify.breakpoint.xs"
        :icon="$vuetify.breakpoint.xs ? 'mdi-less-than' : 'mdi-window-close'"
        scrollable
        @update="updateDialog"
      >
        <div class="!text-base mx-2">
          <DivideBlock>
            <div class="my-6">
              <div class="text-4xl font-extrabold">theroomscover</div>

              <div class="mt-3">
                TheRoomsCover 將為每筆預訂免費提供全面保障。
              </div>
            </div>
          </DivideBlock>

          <v-row class="mt-5">
            <v-col
              v-for="right in rights"
              :key="right.title"
              :cols="$vuetify.breakpoint.xs ? 12 : 6"
            >
              <div class="font-semibold mb-2">{{ right.title }}</div>

              <div class="font-light">
                {{ right.content }}
              </div>
            </v-col>
          </v-row>

          <div class="mt-8 mb-2">
            請前往我們的
            <span class="font-semibold underline cursor-pointer">說明中心</span>
            ，全面了解 AirCover 所提供的預訂保障
          </div>
        </div>
      </CardDialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomRights',

  props: {},

  data() {
    return {
      dialog: false,

      rights: [
        {
          title: '房源預訂保障',
          content:
            '如果房東在距離入住日期的 30天內取消預訂，我們會為你尋找類似或更好的房源，或者提供退款。',
        },
        {
          title: '入住保障',
          content:
            '如果你無法入住房源，且房東也無法解決問題，我們會為你的原住宿期間尋找類似或更好的房源，或者提供退款。',
        },
        {
          title: '房源描述保障',
          content:
            '如果在住宿期間發現房源與描述不符（例如：冰箱突然壞掉，而且房東沒辦法馬上修好，或臥室間數少於描述所列數量），你將有三天的檢舉時間，而且我們會為你尋找類似或更好的房源，或者提供退款。',
        },
        {
          title: '24 小時安全專線',
          content:
            '如果你在任何時候感到不安，均可以優先聯絡經過專門培訓的安全團隊專員。',
        },
      ],
    }
  },
  methods: {
    updateDialog(val) {
      this.dialog = val
    },
  },
}
</script>
