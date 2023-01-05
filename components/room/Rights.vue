<template>
  <DivideBlock>
    <div class="my-5">
      <div class="my-1">
        針對房東取消預訂、房源描述不實和入住困難等其他問題，我們會為每筆預訂提供免費保障。
      </div>

      <div class="!max-w-[70px]" @click="dialog = true">
        <TextBtnDialog :title="'了解詳情'" />
      </div>

      <CardDialog :dialog="dialog" @update="updateDialog">
        <DivideBlock class="mx-5">
          <div class="my-5">
            <div class="text-h5">Privacy Policy</div>
            <div>AirCover 將為每筆預訂免費提供全面保障。</div>
          </div>
        </DivideBlock>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
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
    }
  },
  methods: {
    updateDialog(val) {
      this.dialog = val
    },
  },
}
</script>
