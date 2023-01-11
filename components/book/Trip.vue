<template>
  <DivideBlock>
    <div class="mb-10">
      <div class="text-2xl font-medium">你的旅程</div>

      <div class="mt-5">
        <div class="flex justify-between">
          <div>
            <div class="text-xl font-medium">日期</div>
            <DateRange class="mt-2" />
          </div>

          <TextBtnDialog
            :title="'編輯'"
            class="text-xl"
            @click="editDialog = !editDialog"
          />
        </div>

        <CardDialog :dialog="editDialog" @update="updateEditDialog()">
          <div class="flex justify-between items-center px-7">
            <div class="flex flex-col justify-center text-2xl font-bold">
              {{ calculateDays }} 晚
              <DateRange />
            </div>

            <DateRangeStyle />
          </div>

          <DatePicker />

          <div class="flex justify-end mx-8 mb-10">
            <DateClearBtn />

            <DateCloseBtn :text="'關閉'" @click="editDialog = false" />
          </div>
        </CardDialog>
      </div>

      <div class="mt-5">
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

          <CardDialog
            :dialog="tenantCard_visible"
            :title="'房客人數'"
            @update="updateTenantCard_visible"
          >
            <div>
              <RoomCardTenant
                :limitPeople="limitPeople"
                :isAcceptPet="isAcceptPet"
                :elevation="0"
              />
            </div>
          </CardDialog>
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
    updateTenantCard_visible() {
      this.tenantCard_visible = false
    },
  },
}
</script>
