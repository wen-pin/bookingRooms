<template>
  <v-container class="!max-w-[1280px]">
    <div class="flex my-10">
      <v-btn icon class="mr-6" @click="$router.go(-1)">
        <v-icon> mdi-less-than </v-icon>
      </v-btn>
      <div class="text-4xl font-semibold">申請預訂</div>
    </div>

    <v-row class="px-[80px]">
      <v-col cols="6">
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
                      <div v-if="babyQuantity > 0">
                        , {{ babyQuantity }}名嬰幼兒
                      </div>
                      <div v-if="petQuantity > 0">
                        , {{ petQuantity }}隻寵物
                      </div>
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
                      :limitPeople="room.limitPeople"
                      :isAcceptPet="room.isAcceptPet"
                      :elevation="0"
                    />
                  </div>
                </CardDialog>
              </div>
            </div>
          </div>
        </DivideBlock>

        <div v-if="!$auth.loggedIn" class="mt-8">
          <DivideBlock>
            <div class="mb-8">
              <div class="flex">
                <div class="text-2xl font-medium">付款方式：</div>
                <div class="flex justify-end">
                  <SvgIcon
                    :iconClass="'visa'"
                    :className="'visa'"
                    class="mr-2"
                  />
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
                class="mt-5"
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

          <DivideBlock>
            <div class="my-8">
              <div class="text-2xl font-medium">退訂政策</div>
              <div class="flex mt-5">
                <div>這筆預訂不可退款。</div>
                <TextBtnDialog :title="'了解詳情'" />
              </div>
            </div>
          </DivideBlock>

          <div class="my-8 text-xs">
            點選以下按鈕即表示本人同意房東的《房屋守則》、房客基本守則、《重新預訂和退款政策》，且允許
            Airbnb 在我應負責賠償損壞時，可以向我的付款方式扣款。
          </div>

          <v-btn
            width="150px"
            height="50px"
            dark
            color="#EC407A"
            class="rounded-lg"
          >
            <span class="text-lg"> 確認並付款 </span>
          </v-btn>
        </div>

        <div v-else class="mt-10">
          <div class="text-2xl font-medium">登入或註冊即可預訂</div>

          <v-tabs v-model="tab" fixed-tabs>
            <v-tabs-slider color="light-blue darken-4"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="mt-5">
            <v-tab-item>
              <FormLoginBook />
            </v-tab-item>

            <v-tab-item>
              <FormRegister />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="flex justify-end">
          <v-card outlined class="rounded-lg p-6" max-width="480px">
            <DivideBlock>
              <div class="flex w-full mb-7">
                <v-img
                  :src="room.img.roomSrc[1].img"
                  max-width="100px"
                  class="rounded-lg w-[30%]"
                ></v-img>

                <div class="w-[70%] px-2">
                  <div class="text-sm font-extralight">
                    {{ room.rentalType }}
                  </div>

                  <div>{{ room.title }}</div>

                  <div class="flex mt-3">
                    <span>
                      <TextRate
                        :value="room.averageRating"
                        :size="15"
                        :max-width="''"
                        class="text-sm"
                      />
                    </span>

                    <TextBtnDialog
                      :title="`${room.allMessages.length}則評價`"
                      :isUnderlineCursorPointer="false"
                      class="text-sm"
                    />
                  </div>
                </div>
              </div>
            </DivideBlock>

            <div class="text-xl font-semibold mt-5">價格詳情</div>

            <RoomPriceUntaxed :price="room.price" :isVisible="true" />

            <div class="flex justify-between mt-5">
              <div class="font-medium">總價 (TWD)</div>

              <div>{{ $n(this.allRentalCost, 'currency') }}</div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'scheduleRoom',

  data() {
    return {
      editDialog: false,
      couponsDialog: false,

      tab: null,
      items: ['登入', '註冊'],

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

      room: {
        // 房東
        landlord: 'Chiang',
        // 房間類型
        rentalType: '農場住宿',
        // 房間標題
        title:
          '(4-8人房)台灣最南端甜點店B&B「墾，點心背包客棧」 近墾丁最美沙灘砂島',
        // 國家
        country: '臺灣',
        location: {
          // 地址
          address: '恆春鎮',
          // 緯度
          lat: 22.002449,
          // 經度
          lng: 120.737683,
        },
        // 是否接受寵物入住
        isAcceptPet: false,
        // 入住人數限制
        limitPeople: 2,
        // 房間價錢
        price: {
          weekday: 2800,
          holiday: 3200,
          serviceCharge: 415,
          cleaningFee: 100,
          taxCharges: 660,
        },
        // 房間格局
        pattern: {
          bedroom: 1,
          bed: 1,
          bathroom: 1,
          // 共用衛浴
          sharedBathroom: null,
        },
        // 平均評價
        averageRating: 4.6,
        // 評價標準
        evaluationStandards: [
          { title: '乾淨度', value: 5.0, percentage: null },
          { title: '準確性', value: 5.0, percentage: null },
          { title: '溝通', value: 4.9, percentage: null },
          { title: '位置', value: 2.5, percentage: null },
          { title: '入住', value: 4.9, percentage: null },
          { title: '性價比', value: 4.5, percentage: null },
        ],
        // 房間留言
        allMessages: [
          {
            id: 1,
            imgSrc:
              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            commenter: 'Yuan-Ping',
            messageTime: '2022年7月',
            message: '很棒的住宿體驗，尤其是從落地窗看出去的景緻。',
          },
          {
            id: 2,
            imgSrc:
              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            commenter: 'Chihchia',
            messageTime: '2022年7月',
            message:
              '員工老闆也很親切，公共空間及房間整體非常有歷史感及設計感，保有老宅該有的風味，但位於馬路要道邊，加上窗戶非氣密式，整晚都有嘟嘟車呼嘯而過，早晨卡車卸貨等噪音，房間冷氣也很擾人安靜，有被影響到睡眠，房內有附耳塞，有稍稍緩解噪音感，若對於睡眠品質敏感的人可能要多考慮。',
          },
          {
            id: 3,
            imgSrc:
              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            commenter: 'Elsa',
            messageTime: '2022年7月',
            message:
              '房間太美了！二樓的公共空間非常舒適，中國城逛累了窩在二樓沙發上發懶聽音樂，覺得很像在自己家裡那樣自在。所有的空間都好拍到不行，隨便拍隨便美，很喜歡獨特的設計和顏色。（也是因為非常挑高，所以樓梯很高很陡要小心走就是了～）主人很親切，也貼心提供推薦店家的名單～很棒的入住體驗^^',
          },
          {
            id: 4,
            imgSrc:
              'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            commenter: 'Po Nan',
            messageTime: '2022年7月',
            message:
              '地理位置佳,房間風格獨特，超好拍照打卡！房東很nice! 因我搭隔天凌晨班機，還特別幫我預訂計程車，讓我可以從容的去機場。可於前晚選擇好明早的早餐類型和用餐時間，2樓的咖啡飲料和小餅乾都可免費自取，不怕半夜嘴饞～1樓的酒吧非常酷，店員態度熱情，推薦我喝的2款調酒都很棒！優點多到說不完，實在太喜歡，本來只住一晚，後來直接取消別的旅店，再多住八號一晚，哈哈！',
          },
        ],
        img: {
          avaterSrc:
            'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          lazySrc: 'https://picsum.photos/id/11/10/6',
          roomSrc: [
            {
              id: 1,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
            {
              id: 2,
              img: 'https://picsum.photos/id/11/500/300',
            },
            {
              id: 3,
              img: 'https://picsum.photos/510/300?random',
            },
            {
              id: 4,
              img: 'https://picsum.photos/350/165?random',
            },
            {
              id: 5,
              img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
            },
            {
              id: 6,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
            {
              id: 7,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
            {
              id: 8,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
            {
              id: 9,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
            {
              id: 10,
              img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            },
          ],
        },
        alleqptAndServices: [
          {
            id: 1,
            category: '衛浴',
            eqptAndServices: [
              { id: 1, title: '浴缸', svgTitle: 'tub' },
              { id: 2, title: '吹風機', svgTitle: 'hairDryer' },
              { id: 3, title: '洗髮露', svgTitle: 'shampoo' },
              { id: 4, title: '沐浴乳', svgTitle: 'bodyWash' },
              { id: 5, title: '熱水', svgTitle: 'hotWater' },
            ],
          },
          {
            id: 2,
            category: '臥室和洗衣',
            eqptAndServices: [
              {
                id: 1,
                title: '生活必需品',
                subtitle: '毛巾、床單、香皂和衛生紙',
                svgTitle: 'toothbrush',
              },
              { id: 2, title: '衣架', svgTitle: 'coatHanger' },
              { id: 3, title: '窗簾', svgTitle: 'curtain' },
            ],
          },
          {
            id: 3,
            category: '娛樂',
            eqptAndServices: [{ id: 1, title: '電視', svgTitle: 'television' }],
          },
          {
            id: 4,
            category: '親子',
            eqptAndServices: [
              { id: 1, title: '嬰兒床', svgTitle: 'crib' },
              { id: 2, title: '嬰兒浴盆', svgTitle: 'babyTub' },
            ],
          },
          {
            id: 5,
            category: '暖氣和冷氣',
            eqptAndServices: [
              { id: 1, title: '空調設備', svgTitle: 'airConditioner' },
              { id: 2, title: '移動式電扇', svgTitle: 'fan' },
              { id: 3, title: '暖氣', svgTitle: 'heat' },
            ],
          },
          {
            id: 6,
            category: '網路和辦公',
            eqptAndServices: [{ id: 1, title: 'wifi', svgTitle: 'wifi' }],
          },
          {
            id: 7,
            category: '廚房和餐飲',
            eqptAndServices: [
              {
                id: 1,
                title: '廚房',
                subtitle: '房客可自行烹飪三餐的空間',
                svgTitle: 'kitchen',
              },
              { id: 2, title: '冰箱', svgTitle: 'refrigerator' },
              { id: 3, title: '微波爐', svgTitle: 'oven' },
              {
                id: 4,
                title: '盤子和餐具',
                subtitle: '碗、筷、盤、杯等',
                svgTitle: 'tableware',
              },
              { id: 5, title: '熱水壺', svgTitle: 'kettle' },
              { id: 6, title: '酒杯', svgTitle: 'wineGlass' },
            ],
          },
          {
            id: 8,
            category: '位置特色',
            eqptAndServices: [
              {
                id: 1,
                title: '獨立入口',
                subtitle: '獨立的街道或大樓入口',
                svgTitle: 'entrance',
              },
            ],
          },
          {
            id: 9,
            category: '戶外',
            eqptAndServices: [
              { id: 1, title: '庭院或陽台', svgTitle: 'balcony' },
              {
                id: 2,
                title: '後院',
                subtitle: '房源中有綠地覆蓋的開放空間',
                svgTitle: 'patio',
              },
            ],
          },
          {
            id: 10,
            category: '停車位和設施',
            eqptAndServices: [
              { id: 1, title: '建築物內免費停車', svgTitle: 'car' },
              { id: 2, title: '游泳池', svgTitle: 'swimmingPool' },
              { id: 3, title: '獨立房屋', svgTitle: 'house' },
            ],
          },
          {
            id: 11,
            category: '服務',
            eqptAndServices: [
              {
                id: 1,
                title: '可長期住宿',
                subtitle: '可住宿28晚以上',
                svgTitle: 'calendar',
              },
              { id: 2, title: '房東將會迎接您', svgTitle: 'key' },
            ],
          },
          {
            id: 12,
            category: '不提供',
            eqptAndServices: [
              {
                id: 1,
                title: '房源內的監視錄影器',
                svgTitle: 'video',
                isSupply: false,
              },
              {
                id: 2,
                title: '洗衣機',
                svgTitle: 'washingMachine',
                isSupply: false,
              },
              {
                id: 3,
                title: '煙霧警報器',
                subtitle:
                  '此房源可能沒有安裝煙霧偵測器。如有任何問題，請聯絡房東。',
                svgTitle: 'siren',
                isSupply: false,
              },
              {
                id: 4,
                title: '一氧化碳警報器',
                subtitle:
                  '此房源可能沒有安裝一氧化碳偵測器。如有任何問題，請聯絡房東。',
                svgTitle: 'alarmSiren',
                isSupply: false,
              },
            ],
          },
        ],
      },
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
    // 時間排列
    datesQueue() {
      return this.$store.getters.datesQueue
    },
    // 計算天數
    calculateDays() {
      return this.$store.getters.calculateDays
    },
    // 計算全部每晚房價
    calculateRentalCost() {
      let holidayOfDays = 0
      let weekdayOfDays = 0
      let firstDay = this.datesQueue[0]

      for (let i = 0; i < this.calculateDays; i++) {
        let week = parseInt(this.$dayjs(firstDay).add(i, 'day').day())
        if (week === 6) {
          holidayOfDays++
        } else {
          weekdayOfDays++
        }
      }

      return (
        holidayOfDays * this.room.price.holiday +
        weekdayOfDays * this.room.price.weekday
      )
    },
    // 平均每晚房價(不包含服務費)
    averageRentalCost() {
      return this.calculateRentalCost / this.calculateDays
    },
    // 計算全部服務費
    calculateServiceCharge() {
      return this.calculateDays * this.room.price.serviceCharge
    },
    // 計算全部清潔費
    calculateCleaningFee() {
      return this.calculateDays * this.room.price.cleaningFee
    },
    // 計算全部稅費
    calculateTaxCharges() {
      return this.room.price.taxCharges + (this.calculateDays - 1) * 200
    },
    // 稅後總價
    allRentalCost() {
      return (
        this.calculateRentalCost +
        this.calculateServiceCharge +
        this.calculateCleaningFee +
        this.calculateTaxCharges
      )
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
    updateCouponsDialog(val) {
      this.couponsDialog = val
    },
    updateTenantCard_visible() {
      this.tenantCard_visible = false
    },
  },
}
</script>
