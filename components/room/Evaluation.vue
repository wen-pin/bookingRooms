<template>
  <DivideBlock>
    <div class="my-10">
      <div class="flex">
        <span>
          <TextRate
            :value="averageRating"
            :size="25"
            :max-width="''"
            :margin-top="'mt-[2px]'"
            class="text-2xl"
          />
        </span>

        <TextBtnDialog
          :title="`${allMessages.length}則評價`"
          :isUnderlineCursorPointer="false"
          class="text-2xl mt-[2px]"
        />
      </div>

      <v-row class="mt-5">
        <v-col v-for="item in evaluationStandards" :key="item.title" cols="6">
          <v-row>
            <v-col cols="4" class="w-[50px]">{{ $t(item.title) }}</v-col>

            <v-col cols="5" class="flex items-center">
              <v-progress-linear
                :value="convertPercentage(item.value)"
                class="max-w-[200px]"
              />
            </v-col>

            <v-col cols="3">{{ item.value }}</v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col
          v-for="item in allMessages"
          :key="item.id"
          cols="6"
          class="mb-10"
        >
          <messageBlock
            :imgSrc="item.imgSrc"
            :commenter="item.commenter"
            :messageTime="item.messageTime"
            :message="item.message"
          />
        </v-col>
      </v-row>

      <v-btn outlined height="55px" @click="isVisible = true">
        <span span class="text-lg">
          顯示全部{{ allMessages.length }}則評價
        </span>
      </v-btn>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomEvaluation',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
      required: true,
    },
    evaluationStandards: {
      types: Array,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    isVisible: {
      get() {
        return this.$store.state.evaluationDialog_visible
      },
      set(v) {
        this.$store.commit('toggleEvaluationBtn', v)
      },
    },
  },
  methods: {
    convertPercentage(value) {
      return (value / 5) * 100
    },
  },
}
</script>
