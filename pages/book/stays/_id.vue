<template>
  <v-container>
    <div class="flex my-10">
      <v-btn icon class="mr-6" @click="$router.go(-1)">
        <v-icon> mdi-less-than </v-icon>
      </v-btn>
      <div class="text-4xl font-semibold">申請預訂</div>
    </div>

    <v-row>
      <v-col cols="6">
        <DivideBlock>
          <div class="mb-10">
            <div class="text-2xl font-medium">你的旅程</div>

            <div class="mt-5">
              <div class="flex justify-between">
                <div class="text-xl font-medium">日期</div>
                <TextBtnDialog :title="'編輯'" class="text-xl" />
              </div>
              <div class="mt-2">1月11日至13日</div>
            </div>

            <div class="mt-5">
              <div class="flex justify-between">
                <div class="text-xl font-medium">房客人數</div>
                <TextBtnDialog :title="'編輯'" class="text-xl" />
              </div>
              <div class="mt-2">2位房客、1名嬰幼兒</div>
            </div>
          </div>
        </DivideBlock>

        <div class="mt-10">
          <div class="text-2xl font-medium">登入或註冊即可預訂</div>
        </div>
      </v-col>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'scheduleRoom',

  data() {
    return {}
  },
}
</script>
