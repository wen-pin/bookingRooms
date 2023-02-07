<template>
  <DivideBlock>
    <div class="my-8">
      <div class="mb-3 line-clamp-6" v-html="convertTobr"></div>

      <div class="!max-w-[115px] flex" @click="dialog = true">
        <TextBtnDialog :title="'顯示更多內容'" />

        <v-icon class="cursor-pointer" small color="black">
          mdi-greater-than
        </v-icon>
      </div>

      <CardDialog
        :width="800"
        :dialog="dialog"
        :title="'空間介紹'"
        :fullscreen="$vuetify.breakpoint.xs"
        :icon="$vuetify.breakpoint.xs ? 'mdi-less-than' : 'mdi-window-close'"
        @update="updateDialog"
      >
        <div class="!text-base mt-5" v-html="convertTobr"></div>
      </CardDialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomIntroduce',

  props: {
    spaceInfo: {
      types: String,
    },
  },

  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    convertTobr() {
      let arr = this.spaceInfo.split('')
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
