<template>
  <DivideBlock>
    <div class="mb-8">
      <div class="flex">
        <div class="text-2xl font-medium">付款方式：</div>
        <div class="flex justify-end">
          <SvgIcon :iconClass="'visa'" :className="'visa'" class="mr-2" />
          <SvgIcon :iconClass="'mastercard'" class="mr-2 my-auto" />
          <SvgIcon :iconClass="'googlePay'" :className="'size'" class="mr-2" />
          <SvgIcon :iconClass="'applePay'" :className="'size'" />
        </div>
      </div>

      <v-select
        v-model="select"
        label="請選擇付款方式"
        :items="payItems"
        item-text="title"
        item-value="iconClass"
        return-object
        :menu-props="{ bottom: true, offsetY: true }"
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

      <TextBtnDialog
        :title="'輸入優惠券代碼'"
        class="mt-5 w-[115px]"
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
            <TextBtnDialog :title="'新增'" />
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

      select: [
        {
          iconClass: 'visaOutlined',
          className: 'size',
          title: '**** 4005',
        },
      ],
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
  computed: {},
  methods: {
    updateCouponsDialog(val) {
      this.couponsDialog = val
    },
  },
}
</script>
