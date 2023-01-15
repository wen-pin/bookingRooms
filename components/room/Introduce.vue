<template>
  <DivideBlock>
    <div class="my-8">
      <div class="mb-3 line-clamp-6" v-html="useLineClamp"></div>

      <div class="!max-w-[115px] flex" @click="dialog = true">
        <TextBtnDialog :title="'顯示更多內容'" />

        <v-icon class="cursor-pointer" small color="black">
          mdi-greater-than
        </v-icon>
      </div>

      <CardDialog :dialog="dialog" :title="'空間介紹'" @update="updateDialog">
        <v-card-text class="black--text !text-base mt-5" v-html="useLineClamp">
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

      content:
        '在這間大自然包圍的浪漫房源中欣賞四周美景。\n日出、日落、滿天星星\n\n##嚴禁訪客##\n為提供來入住的房客，都能享有私人空間隱私\n謝絕訪客，無法配合者，請勿下訂，謝謝\n\n其他注意事項\n#可提供幫忙準備烤肉爐+瓦斯：400元/次 #寵物需先徵詢房東同意\n#包棟、寵物押金：3000元，再請貴賓入住當天另外準備，並於退房後無誤後退回<br />\n##嚴禁訪客##\n為提供來入住的房客，都能享有私人空間隱私\n謝絕訪客，無法配合者，請勿下訂，謝謝\n',
    }
  },
  computed: {
    useLineClamp() {
      let arr = this.content.split('')
      return arr
        .map((item) => {
          return item === '\n' ? '<br />' : item
        })
        .join('')
    },
  },
  methods: {
    updateDialog(val) {
      this.dialog = val
    },
  },
}
</script>
