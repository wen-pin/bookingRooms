<template>
  <DivideBlock>
    <div class="my-5">
      <div class="my-1">
        在這間大自然包圍的浪漫房源中欣賞四周美景。 日出、日落、滿天星星
        ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
        謝絕訪客，無法配合者，請勿下訂，謝謝 其他注意事項
        #可提供幫忙準備烤肉爐+瓦斯：400元/次 #寵物需先徵詢房東同意
        #包棟、寵物押金：3000元，再請貴賓入住當天另外準備，並於退房後無誤後退回
        ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
        謝絕訪客，無法配合者，請勿下訂，謝謝
      </div>

      <div class="!max-w-[115px] flex" @click="dialog = true">
        <TextBtnDialog :title="'顯示更多內容'" />

        <v-icon class="cursor-pointer" small color="black">
          mdi-greater-than
        </v-icon>
      </div>

      <CardDialog :dialog="dialog" @update="updateDialog">
        <v-card-title class="text-2xl">空間介紹</v-card-title>

        <v-card-text>
          在這間大自然包圍的浪漫房源中欣賞四周美景。 日出、日落、滿天星星
          ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
          謝絕訪客，無法配合者，請勿下訂，謝謝 其他注意事項
          #可提供幫忙準備烤肉爐+瓦斯：400元/次 #寵物需先徵詢房東同意
          #包棟、寵物押金：3000元，再請貴賓入住當天另外準備，並於退房後無誤後退回
          ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
          謝絕訪客，無法配合者，請勿下訂，謝謝
        </v-card-text>
      </CardDialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomIntroduce',

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
