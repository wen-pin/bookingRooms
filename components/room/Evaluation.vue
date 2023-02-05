<template>
  <DivideBlock>
    <div class="my-8">
      <div class="flex">
        <span>
          <TextRate
            :value="averageRating"
            :size="25"
            :max-width="''"
            :margin="'mt-[2px] mr-4'"
            class="text-2xl"
          />
        </span>

        <span v-if="allMessages">
          <TextBtnDialog
            :title="`${allMessages.length}則評價`"
            :isUnderlineCursorPointer="false"
            class="text-2xl mt-[2px]"
          />
        </span>
      </div>

      <v-row v-if="!$vuetify.breakpoint.xs" class="mt-5">
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

      <v-row v-if="!$vuetify.breakpoint.xs" class="mt-5">
        <v-col
          v-for="item in limitAllMessages"
          :key="item.id"
          cols="6"
          class="mb-10"
        >
          <messageBlock
            :avaterImg="item.avaterImg"
            :commenterName="item.commenterName"
            :createdAt="item.createdAt"
            :message="item.message"
            :lineclamp="'line-clamp-3'"
            class="mr-[100px]"
          />

          <div class="!max-w-[115px] flex mt-2" @click="isVisible = true">
            <TextBtnDialog :title="'顯示更多內容'" />

            <v-icon class="cursor-pointer" small color="black">
              mdi-greater-than
            </v-icon>
          </div>
        </v-col>
      </v-row>

      <v-btn
        :block="$vuetify.breakpoint.xs"
        outlined
        height="55px"
        class="rounded-lg"
        @click="isVisible = true"
      >
        <span v-if="allMessages" class="text-lg">
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
    },
    evaluationStandards: {
      types: Array,
      required: true,
    },
  },

  data() {
    return {
      options: {
        loop: true,
        perPage: 1,
        paginationEnabled: true,
      },
    }
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
    limitAllMessages_three() {
      if (this.allMessages) {
        return this.allMessages.slice(0, 3)
      }
    },
    limitAllMessages() {
      if (this.allMessages) {
        return this.allMessages.slice(0, 6)
      }
    },
  },
  methods: {
    convertPercentage(value) {
      return (value / 5) * 100
    },
  },
}
</script>
