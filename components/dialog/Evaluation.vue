<template>
  <div>
    <TextBtnDialog
      :title="`${allMessages.length}則評價`"
      @click="EvaluationDialog = !EvaluationDialog"
    />

    <CardDialog
      :dialog="EvaluationDialog"
      :width="1000"
      @update="updateEvaluationDialog"
    >
      <v-row class="mt-10 px-3 relative">
        <v-col cols="5">
          <div class="flex">
            <span>
              <TextRate
                :value="averageRating"
                :size="30"
                :max-width="''"
                :margin-top="'mt-[2px]'"
                class="text-3xl"
              />
            </span>

            <TextBtnDialog
              :title="`${allMessages.length}則評價`"
              :isUnderlineCursorPointer="false"
              class="text-3xl mt-[2px]"
            />
          </div>

          <div class="mt-[50px]">
            <v-row v-for="item in evaluationStandards" :key="item.title">
              <v-col cols="4" class="w-[50px]">{{ $t(item.title) }}</v-col>

              <v-col cols="5" class="flex items-center">
                <v-progress-linear
                  :value="convertPercentage(item.value)"
                  class="max-w-[200px]"
                />
              </v-col>

              <v-col cols="3">{{ item.value }}</v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="7">
          <v-text-field
            :placeholder="$t('搜尋評價')"
            filled
            rounded
            clearable
            outlined
            clear-icon="mdi-close-circle"
            prepend-inner-icon="mdi-magnify"
          />

          <div v-for="item in allMessages" :key="item.id" class="mb-10">
            <messageBlock
              :imgSrc="item.imgSrc"
              :commenter="item.commenter"
              :messageTime="item.messageTime"
              :message="item.message"
            />
          </div>
        </v-col>
      </v-row>
    </CardDialog>
  </div>
</template>

<script>
export default {
  name: 'dialogEvaluation',

  props: {
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
    },
    evaluationStandards: {
      types: Array,
    },
  },

  data() {
    return {
      EvaluationDialog: false,
    }
  },
  methods: {
    updateEvaluationDialog(val) {
      this.EvaluationDialog = val
    },
    convertPercentage(value) {
      return (value / 5) * 100
    },
  },
}
</script>
