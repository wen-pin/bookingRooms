<template>
  <v-container>
    <div class="text-3xl mt-5">{{ room.title }}</div>

    <div class="my-2 flex">
      <div class="flex">
        <span class="my-auto">
          <TextRate :value="room.averageRating" />
        </span>

        <DialogEvaluation
          :averageRating="room.averageRating"
          :allMessages="room.allMessages"
          :evaluationStandards="room.evaluationStandards"
          class="mr-4 my-auto"
        />

        <span
          class="flex items-center"
          @click="googleMapsDialog = !googleMapsDialog"
        >
          <TextBtnDialog
            :title="room.location.address"
            :subTitle="room.country"
          />
        </span>

        <v-spacer />

        <DialogShare />

        <DialogFavorites />
      </div>
    </div>

    <RoomPhotos
      :lazySrc="room.img.lazySrc"
      :roomSrc="room.img.roomSrc"
      class="my-5"
    />

    <div
      class="flex border-solid border-t-0 border-r-0 border-b-1 border-l-0 border-slate-200"
    >
      <div class="w-[60%]">
        <RoomInfoTitle
          id="scrollTargetId"
          :landlord="room.landlord"
          :rentalType="room.rentalType"
          :limitPeople="room.limitPeople"
          :pattern="room.pattern"
          :avaterSrc="room.img.avaterSrc"
          target-element="#landlord"
        />

        <RoomRights />

        <RoomIntroduce />

        <RoomBeds :bedroom="room.pattern.bedroom" />

        <RoomEquipment
          :alleqptAndServices="room.alleqptAndServices"
          :eqptAndServices="room.alleqptAndServices[0].eqptAndServices"
        />
        <div class="my-10">
          <DateRange :location="room.location" />

          <v-row class="mt-10">
            <DatePicker />
          </v-row>

          <div class="mt-5 flex justify-end" @click="dates = []">
            <TextBtnDialog :title="'清除日期'" />
          </div>
        </div>
      </div>

      <!-- 要在這邊加上z-10，這樣打開的卡片才能覆蓋底層 -->
      <div class="w-[40%] flex justify-center relative z-10">
        <RoomCardBook
          :averageRating="room.averageRating"
          :allMessages="room.allMessages"
          :location="room.location"
          :price="room.price"
          :limitPeople="room.limitPeople"
          :isAcceptPet="room.isAcceptPet"
          class="!sticky top-[80px] mt-5 !mb-[90px]"
        />
      </div>
    </div>

    <RoomEvaluation
      :averageRating="room.averageRating"
      :allMessages="room.allMessages"
      :evaluationStandards="room.evaluationStandards"
    />

    <RoomLocation :location="room.location" :country="room.country" />

    <RoomInfoLandlord
      id="landlord"
      :landlord="room.landlord"
      :averageRating="room.averageRating"
      :allMessages="room.allMessages"
    />

    <RoomNotes />
  </v-container>
</template>

<script>
export default {
  name: 'singleRoom',
  layout: 'singleRoom',

  data() {
    return {
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
          // 服務費
          serviceCharge: 415,
          // 清潔費
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
    dates: {
      get() {
        return this.$store.state.dates
      },
      set(v) {
        this.$store.commit('fetchDates', v)
      },
    },

    // target() {
    //   return this.$refs.landlord
    // },
    // options() {
    //   return {
    //     duration: 2000,
    //     offset: 40,
    //     easing: 'easeOutQuart',
    //   }
    // },
    googleMapsDialog: {
      get() {
        return this.$store.state.googleMapsDialog_visible
      },
      set(v) {
        this.$store.commit('toggleGoogleMapsBtn', v)
      },
    },
  },
  methods: {},
}
</script>
