<template>
  <DivideBlock>
    <div class="mb-10">
      <div
        class="text-2xl font-medium"
        :class="
          $vuetify.breakpoint.xs
            ? 'border border-t-8 border-r-0 border-b-0 border-l-0 border-solid border-gray-200'
            : ''
        "
      >
        <div :class="$vuetify.breakpoint.xs ? 'px-6 my-6' : ''">你的旅程</div>
      </div>

      <div class="mt-5" :class="$vuetify.breakpoint.xs ? 'px-6' : ''">
        <div class="flex justify-between">
          <div>
            <div class="text-xl font-medium">日期</div>
            <DateRange class="mt-2" />
          </div>

          <TextBtnDialog
            v-if="$vuetify.breakpoint.xs"
            :title="'編輯'"
            class="text-xl"
            @click="dateDialog_mobile_visible = !dateDialog_mobile_visible"
          />

          <TextBtnDialog
            v-else
            :title="'編輯'"
            class="text-xl"
            @click="editDialog = !editDialog"
          />

          <DialogDateMobile
            :averageRating="averageRating"
            :location="location"
            :price="price"
          />
        </div>

        <CardDialog :dialog="editDialog" @update="updateEditDialog()">
          <div class="flex justify-between items-center my-5">
            <div class="flex flex-col justify-center text-2xl font-bold">
              {{ calculateDays }} 晚
              <DateRange />
            </div>

            <DateRangeStyle />
          </div>

          <DatePicker class="!w-full" />

          <div class="flex justify-end">
            <DateClearBtn />

            <DateCloseBtn :text="'關閉'" @click="editDialog = false" />
          </div>
        </CardDialog>
      </div>

      <div class="mt-5" :class="$vuetify.breakpoint.xs ? 'px-6' : ''">
        <div class="flex justify-between">
          <div>
            <div class="text-xl font-medium">房客人數</div>
            <div class="mt-2">
              <div class="font-semibold">房客</div>
              <div class="flex">
                <div>{{ allTenants }}位</div>
                <div v-if="babyQuantity > 0">, {{ babyQuantity }}名嬰幼兒</div>
                <div v-if="petQuantity > 0">, {{ petQuantity }}隻寵物</div>
              </div>
            </div>
          </div>

          <TextBtnDialog
            :title="'編輯'"
            class="text-xl"
            @click="tenantCard_visible = !tenantCard_visible"
          />

          <DialogBookTenant
            :limitPeople="limitPeople"
            :isAcceptPet="isAcceptPet"
          />
        </div>
      </div>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'bookTrip',

  props: {
    limitPeople: {
      types: Number,
      required: true,
    },
    isAcceptPet: {
      types: Boolean,
      required: true,
    },
    averageRating: {
      types: Number,
      required: true,
    },
    location: {
      types: Object,
      required: true,
    },
    price: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {
      editDialog: false,
    }
  },
  computed: {
    // 房客選擇卡片
    tenantCard_visible: {
      get() {
        return this.$store.state.tenantCard_visible
      },
      set(v) {
        this.$store.commit('toggleTenantCardBtn', v)
      },
    },
    // 手機版日期選擇對話框
    dateDialog_mobile_visible: {
      get() {
        return this.$store.state.dateDialog_mobile_visible
      },
      set(v) {
        this.$store.commit('toggleDateDialog_mobile', v)
      },
    },
    // 計算天數
    calculateDays() {
      return this.$store.getters.calculateDays
    },
    allTenants() {
      return this.$store.getters.allTenants
    },
    babyQuantity() {
      return this.$store.state.tenants[2].quantity
    },
    petQuantity() {
      return this.$store.state.tenants[3].quantity
    },
  },
  methods: {
    updateEditDialog() {
      this.editDialog = false
    },
  },
}
</script>
