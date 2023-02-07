<template>
  <DivideBlock>
    <div>
      <DivideBlock>
        <div>
          <div class="flex">
            <div class="text-2xl font-medium">付款方式：</div>
            <div class="flex justify-end">
              <SvgIcon :iconClass="'visa'" :className="'visa'" class="mr-2" />
              <SvgIcon :iconClass="'mastercard'" class="mr-2 my-auto" />
              <SvgIcon
                :iconClass="'googlePay'"
                :className="'size'"
                class="mr-2"
              />
              <SvgIcon :iconClass="'applePay'" :className="'size'" />
            </div>
          </div>

          <v-select
            v-model="select"
            :items="payItems"
            :menu-props="{ bottom: true, offsetY: true }"
            :rules="[(v) => !!v.title || $t(`不能為空`)]"
            label="請選擇付款方式"
            placeholder="請選擇付款方式"
            autofocus
            item-text="title"
            item-value="iconClass"
            return-object
            outlined
            class="rounded-lg"
          >
            <template #selection="{ item }">
              <SvgIcon
                :iconClass="item.iconClass"
                :className="item.className"
                class="mr-5"
              />
              <div>{{ item.title }}</div>
            </template>
          </v-select>
        </div>
      </DivideBlock>

      <TextBtnDialog
        :title="'輸入優惠券代碼'"
        class="py-6 w-[115px]"
        @click="couponsDialog = !couponsDialog"
      />

      <CardDialog :dialog="couponsDialog" @update="updateCouponsDialog">
        <div class="text-center text-xl font-medium">優惠券</div>

        <div class="font-medium my-5">新增優惠券</div>

        <v-text-field
          color="#000"
          outlined
          autofocus
          label="優惠券代碼"
          class="rounded-lg"
        >
          <template #append>
            <!-- 尚未完成開發 -->
            <!-- <TextBtnDialog :title="'新增'" /> -->

            <!-- 尚未完成開發 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div text v-bind="attrs" v-on="on">
                  <TextBtnDialog :title="'新增'" />
                </div>
              </template>

              <span>此功能開發中</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </CardDialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'bookPayment',

  props: {},

  data() {
    return {
      couponsDialog: false,

      payItems: [
        {
          iconClass: 'visaOutlined',
          className: 'size',
          title: '**** 4005',
        },
        {
          iconClass: 'googlePayOutlined',
          className: 'size',
          title: 'Google Pay',
        },
      ],
    }
  },
  computed: {
    select: {
      get() {
        return this.$store.state.select
      },
      set(v) {
        return this.$store.commit('selectPayment', v)
      },
    },
  },
  methods: {
    updateCouponsDialog(val) {
      this.couponsDialog = val
    },
  },
}
</script>
