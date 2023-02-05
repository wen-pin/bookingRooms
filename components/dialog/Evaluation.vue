<template>
  <div>
    <span v-if="allMessages">
      <TextBtnDialog
        :title="`${allMessages.length}則評價`"
        @click="isVisible = !isVisible"
      />
    </span>

    <v-dialog
      v-model="isVisible"
      width="1000"
      :fullscreen="$vuetify.breakpoint.xs"
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card :class="$vuetify.breakpoint.xs ? '!rounded-none' : '!rounded-lg'">
        <v-btn icon @click="isVisible = false" class="ml-3 mt-2">
          <v-icon v-if="$vuetify.breakpoint.xs" color="black"
            >mdi-less-than</v-icon
          >
          <v-icon v-else color="black">mdi-window-close</v-icon>
        </v-btn>

        <div v-if="$vuetify.breakpoint.xs" class="px-5">
          <div class="flex mt-3 mb-5">
            <span>
              <TextRate
                :value="averageRating"
                :size="30"
                :max-width="''"
                class="text-3xl"
              />
            </span>

            <span v-if="allMessages">
              <TextBtnDialog
                :title="`${allMessages.length}則評價`"
                :isUnderlineCursorPointer="false"
                class="text-3xl mt-[2px]"
              />
            </span>
          </div>

          <v-text-field
            :placeholder="$t('搜尋評價')"
            filled
            rounded
            clearable
            outlined
            clear-icon="mdi-close-circle"
            prepend-inner-icon="mdi-magnify"
          />
        </div>

        <v-card-text class="p-5 mb-10 black--text">
          <v-row
            class="relative"
            :class="$vuetify.breakpoint.xs ? 'mt-1' : 'mt-10'"
          >
            <v-col v-if="!$vuetify.breakpoint.xs" cols="5">
              <div class="flex">
                <span>
                  <TextRate
                    :value="averageRating"
                    :size="30"
                    :max-width="''"
                    class="text-3xl"
                  />
                </span>

                <span v-if="allMessages">
                  <TextBtnDialog
                    :title="`${allMessages.length}則評價`"
                    :isUnderlineCursorPointer="false"
                    class="text-3xl mt-[2px]"
                  />
                </span>
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

            <v-col :cols="$vuetify.breakpoint.xs ? 12 : 7">
              <div>
                <div v-if="$vuetify.breakpoint.xs">
                  <div
                    v-for="item in evaluationStandards"
                    :key="item.title"
                    class="flex justify-between my-2"
                  >
                    <div class="w-[50px]">{{ $t(item.title) }}</div>

                    <div class="flex items-center !max-w-[130px]">
                      <v-progress-linear
                        :value="convertPercentage(item.value)"
                        class="max-w-[100px] mr-3"
                      />

                      <div>{{ item.value }}</div>
                    </div>
                  </div>
                </div>

                <v-text-field
                  v-else
                  :placeholder="$t('搜尋評價')"
                  filled
                  rounded
                  clearable
                  outlined
                  clear-icon="mdi-close-circle"
                  prepend-inner-icon="mdi-magnify"
                />
              </div>

              <div
                v-for="item in allMessages"
                :key="item.id"
                :class="$vuetify.breakpoint.xs ? 'mt-10' : 'mb-10'"
              >
                <MessageBlock
                  :avaterImg="item.avaterImg"
                  :commenterName="item.commenterName"
                  :createdAt="item.createdAt"
                  :message="item.message"
                />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    updateEvaluationDialog(val) {
      this.isVisible = val
    },
    convertPercentage(value) {
      return (value / 5) * 100
    },
  },
}
</script>
