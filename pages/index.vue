<template>
  <v-container>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id" cols="3">
        <v-card elevation="0" nuxt :to="`/rooms/${room.id}`">
          <v-img
            height="250"
            :src="require(`~/assets/img/rooms/room${room.id}/bg_1.jpg`)"
            class="rounded-lg"
          ></v-img>

          <v-card-text class="px-0 black--text">
            <div class="flex font-bold">
              <div>位於{{ room.location.address }}的{{ room.rentalType }}</div>
              <v-spacer></v-spacer>

              <span>
                <TextRate :value="room.averageRating" :size="14" />
              </span>

              <span>({{ room.allMessages.length }})</span>
            </div>

            <span class="line-clamp-1 w-[215px]">
              {{ room.title }}
            </span>

            <div>{{ $t('房東') }}: {{ room.landlord }}</div>
            <div>1月9日至14日</div>
            <div class="font-bold">
              {{ $n(room.price.weekday, 'currency', 'zh-tw') }} 晚 起
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  auth: false,

  data() {
    return {
      // rooms: [
      //   {
      //     id: 1,
      //     // 房東
      //     landlord: 'Chiang',
      //     // 房間類型
      //     rentalType: '農場住宿',
      //     // 房間標題
      //     title:
      //       '*墾丁沛那海<雙人獨棟包棟泳池Villa>蜜月-結婚週年-特殊紀念日-可烤肉.可烹煮.浴缸+家庭劇院',
      //     // 國家
      //     country: '臺灣',
      //     location: {
      //       // 地址
      //       address: '恆春鎮',
      //       // 緯度
      //       lat: 22.002449,
      //       // 經度
      //       lng: 120.737683,
      //     },
      //     // 是否接受寵物入住
      //     isAcceptPet: false,
      //     // 入住人數限制
      //     limitPeople: 2,
      //     // 房間價錢
      //     price: {
      //       weekday: 2800,
      //       holiday: 3200,
      //       // 服務費
      //       serviceCharge: 415,
      //       // 清潔費
      //       cleaningFee: 100,
      //       taxCharges: 660,
      //     },
      //     // 房間格局
      //     pattern: {
      //       bedroom: 1,
      //       bed: 1,
      //       bathroom: 1,
      //       // 共用衛浴
      //       sharedBathroom: null,
      //     },
      //     // 平均評價
      //     averageRating: 4.6,
      //     // 評價標準
      //     evaluationStandards: [
      //       { title: '乾淨度', value: 5.0, percentage: null },
      //       { title: '準確性', value: 5.0, percentage: null },
      //       { title: '溝通', value: 4.9, percentage: null },
      //       { title: '位置', value: 2.5, percentage: null },
      //       { title: '入住', value: 4.9, percentage: null },
      //       { title: '性價比', value: 4.5, percentage: null },
      //     ],
      //     // 房間留言
      //     allMessages: [
      //       {
      //         id: 1,
      //         avaterTitle: 'commenter1.jpeg',
      //         commenter: 'Yuan-Ping',
      //         messageTime: '2022年7月',
      //         message: '房東非常親切且熱情，非常感謝房東給予的協助\n',
      //       },
      //       {
      //         id: 2,
      //         avaterTitle: 'commenter2.jpeg',
      //         commenter: 'Chihchia',
      //         messageTime: '2022年7月',
      //         message:
      //           '房間乾淨寬敞明亮，地點較偏僻，需要有車進出較方便\n廚房內有調料與鍋具，可以買東西自己煮，享受美好又與世隔絕的一刻\n\n雖是寵物友善的房源，但房間整理的非常乾淨，房間內提供可以直接連結apple手機的smart TV，音響也很棒，面對農田隱私高，很棒的房源，希望下次還有機會入住',
      //       },
      //       {
      //         id: 3,
      //         avaterTitle: 'commenter3.jpeg',
      //         commenter: 'Elsa',
      //         messageTime: '2022年7月',
      //         message:
      //           '寵物友善，草坪廣闊，房間隱約可看到海景，有冰箱、廚房可供簡單料理使用。',
      //       },
      //       {
      //         id: 4,
      //         avaterTitle: 'commenter4.jpeg',
      //         commenter: 'Po Nan',
      //         messageTime: '2022年7月',
      //         message:
      //           '在國境之南，尋到靜謐溫馨的空間❤\n大自然包圍著民宿Villa\n看山 看海\n日出 日落 滿天星星\n民宿主人分享手沖咖啡\n喜歡安靜度假的首選\n配上良好的影音配備\n連女生最注重的吹風機都有顧及，配上Panasonic 國際牌EH-NA9B奈米水離子吹風機，很棒\n完美慢活❤\n很推薦給喜歡慢活寧靜度假的朋友們\n',
      //       },
      //     ],
      //     img: {
      //       avaterSrc:
      //         'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      //       lazySrc: 'https://picsum.photos/id/11/10/6',
      //       roomQuality: 13,
      //       roomSrc: [
      //         {
      //           id: 1,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 2,
      //           img: 'https://picsum.photos/id/11/500/300',
      //         },
      //         {
      //           id: 3,
      //           img: 'https://picsum.photos/510/300?random',
      //         },
      //         {
      //           id: 4,
      //           img: 'https://picsum.photos/350/165?random',
      //         },
      //         {
      //           id: 5,
      //           img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
      //         },
      //         {
      //           id: 6,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 7,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 8,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 9,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 10,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //       ],
      //     },
      //     alleqptAndServices: [
      //       {
      //         id: 1,
      //         category: '衛浴',
      //         eqptAndServices: [
      //           { id: 1, title: '浴缸', svgTitle: 'tub' },
      //           { id: 2, title: '吹風機', svgTitle: 'hairDryer' },
      //           { id: 3, title: '洗髮露', svgTitle: 'shampoo' },
      //           { id: 4, title: '沐浴乳', svgTitle: 'bodyWash' },
      //           { id: 5, title: '熱水', svgTitle: 'hotWater' },
      //         ],
      //       },
      //       {
      //         id: 2,
      //         category: '臥室和洗衣',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '生活必需品',
      //             subtitle: '毛巾、床單、香皂和衛生紙',
      //             svgTitle: 'toothbrush',
      //           },
      //           { id: 2, title: '衣架', svgTitle: 'coatHanger' },
      //           { id: 3, title: '窗簾', svgTitle: 'curtain' },
      //         ],
      //       },
      //       {
      //         id: 3,
      //         category: '娛樂',
      //         eqptAndServices: [
      //           { id: 1, title: '電視', svgTitle: 'television' },
      //         ],
      //       },
      //       {
      //         id: 4,
      //         category: '親子',
      //         eqptAndServices: [
      //           { id: 1, title: '嬰兒床', svgTitle: 'crib' },
      //           { id: 2, title: '嬰兒浴盆', svgTitle: 'babyTub' },
      //         ],
      //       },
      //       {
      //         id: 5,
      //         category: '暖氣和冷氣',
      //         eqptAndServices: [
      //           { id: 1, title: '空調設備', svgTitle: 'airConditioner' },
      //           { id: 2, title: '移動式電扇', svgTitle: 'fan' },
      //           { id: 3, title: '暖氣', svgTitle: 'heat' },
      //         ],
      //       },
      //       {
      //         id: 6,
      //         category: '網路和辦公',
      //         eqptAndServices: [{ id: 1, title: 'wifi', svgTitle: 'wifi' }],
      //       },
      //       {
      //         id: 7,
      //         category: '廚房和餐飲',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '廚房',
      //             subtitle: '房客可自行烹飪三餐的空間',
      //             svgTitle: 'kitchen',
      //           },
      //           { id: 2, title: '冰箱', svgTitle: 'refrigerator' },
      //           { id: 3, title: '微波爐', svgTitle: 'oven' },
      //           {
      //             id: 4,
      //             title: '盤子和餐具',
      //             subtitle: '碗、筷、盤、杯等',
      //             svgTitle: 'tableware',
      //           },
      //           { id: 5, title: '熱水壺', svgTitle: 'kettle' },
      //           { id: 6, title: '酒杯', svgTitle: 'wineGlass' },
      //         ],
      //       },
      //       {
      //         id: 8,
      //         category: '位置特色',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '獨立入口',
      //             subtitle: '獨立的街道或大樓入口',
      //             svgTitle: 'entrance',
      //           },
      //         ],
      //       },
      //       {
      //         id: 9,
      //         category: '戶外',
      //         eqptAndServices: [
      //           { id: 1, title: '庭院或陽台', svgTitle: 'balcony' },
      //           {
      //             id: 2,
      //             title: '後院',
      //             subtitle: '房源中有綠地覆蓋的開放空間',
      //             svgTitle: 'patio',
      //           },
      //         ],
      //       },
      //       {
      //         id: 10,
      //         category: '停車位和設施',
      //         eqptAndServices: [
      //           { id: 1, title: '建築物內免費停車', svgTitle: 'car' },
      //           { id: 2, title: '游泳池', svgTitle: 'swimmingPool' },
      //           { id: 3, title: '獨立房屋', svgTitle: 'house' },
      //         ],
      //       },
      //       {
      //         id: 11,
      //         category: '服務',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '可長期住宿',
      //             subtitle: '可住宿28晚以上',
      //             svgTitle: 'calendar',
      //           },
      //           { id: 2, title: '房東將會迎接您', svgTitle: 'key' },
      //         ],
      //       },
      //       {
      //         id: 12,
      //         category: '不提供',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '房源內的監視錄影器',
      //             svgTitle: 'video',
      //             isSupply: false,
      //           },
      //           {
      //             id: 2,
      //             title: '洗衣機',
      //             svgTitle: 'washingMachine',
      //             isSupply: false,
      //           },
      //           {
      //             id: 3,
      //             title: '煙霧警報器',
      //             subtitle:
      //               '此房源可能沒有安裝煙霧偵測器。如有任何問題，請聯絡房東。',
      //             svgTitle: 'siren',
      //             isSupply: false,
      //           },
      //           {
      //             id: 4,
      //             title: '一氧化碳警報器',
      //             subtitle:
      //               '此房源可能沒有安裝一氧化碳偵測器。如有任何問題，請聯絡房東。',
      //             svgTitle: 'alarmSiren',
      //             isSupply: false,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     // 房東
      //     landlord: 'Chiang',
      //     // 房間類型
      //     rentalType: '獨立房間',
      //     // 房間標題
      //     title:
      //       '(4-8人房)台灣最南端甜點店B&B「墾，點心背包客棧」 近墾丁最美沙灘砂島',
      //     // 國家
      //     country: '臺灣',
      //     location: {
      //       // 地址
      //       address: 'Hengchun',
      //       // 緯度
      //       lat: 22.002449,
      //       // 經度
      //       lng: 120.737683,
      //     },
      //     // 是否接受寵物入住
      //     isAcceptPet: false,
      //     // 入住人數限制
      //     limitPeople: 2,
      //     // 房間價錢
      //     price: {
      //       weekday: 3000,
      //       holiday: 3400,
      //       // 服務費
      //       serviceCharge: 415,
      //       // 清潔費
      //       cleaningFee: 100,
      //       taxCharges: 660,
      //     },
      //     // 房間格局
      //     pattern: {
      //       bedroom: 1,
      //       bed: 1,
      //       bathroom: 1,
      //       // 共用衛浴
      //       sharedBathroom: null,
      //     },
      //     // 平均評價
      //     averageRating: 4.9,
      //     // 評價標準
      //     evaluationStandards: [
      //       { title: '乾淨度', value: 5.0, percentage: null },
      //       { title: '準確性', value: 5.0, percentage: null },
      //       { title: '溝通', value: 4.9, percentage: null },
      //       { title: '位置', value: 2.5, percentage: null },
      //       { title: '入住', value: 4.9, percentage: null },
      //       { title: '性價比', value: 4.5, percentage: null },
      //     ],
      //     // 房間留言
      //     allMessages: [
      //       {
      //         id: 1,
      //         avaterTitle: 'commenter1.jpeg',
      //         commenter: 'Yuan-Ping',
      //         messageTime: '2022年7月',
      //         message: '房東非常親切且熱情，非常感謝房東給予的協助\n',
      //       },
      //       {
      //         id: 2,
      //         avaterTitle: 'commenter2.jpeg',
      //         commenter: 'Chihchia',
      //         messageTime: '2022年7月',
      //         message:
      //           '房間乾淨寬敞明亮，地點較偏僻，需要有車進出較方便\n廚房內有調料與鍋具，可以買東西自己煮，享受美好又與世隔絕的一刻\n\n雖是寵物友善的房源，但房間整理的非常乾淨，房間內提供可以直接連結apple手機的smart TV，音響也很棒，面對農田隱私高，很棒的房源，希望下次還有機會入住',
      //       },
      //       {
      //         id: 3,
      //         avaterTitle: 'commenter3.jpeg',
      //         commenter: 'Elsa',
      //         messageTime: '2022年7月',
      //         message:
      //           '寵物友善，草坪廣闊，房間隱約可看到海景，有冰箱、廚房可供簡單料理使用。',
      //       },
      //       {
      //         id: 4,
      //         avaterTitle: 'commenter4.jpeg',
      //         commenter: 'Po Nan',
      //         messageTime: '2022年7月',
      //         message:
      //           '在國境之南，尋到靜謐溫馨的空間❤\n大自然包圍著民宿Villa\n看山 看海\n日出 日落 滿天星星\n民宿主人分享手沖咖啡\n喜歡安靜度假的首選\n配上良好的影音配備\n連女生最注重的吹風機都有顧及，配上Panasonic 國際牌EH-NA9B奈米水離子吹風機，很棒\n完美慢活❤\n很推薦給喜歡慢活寧靜度假的朋友們\n',
      //       },
      //     ],
      //     img: {
      //       avaterSrc:
      //         'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      //       lazySrc: 'https://picsum.photos/id/11/10/6',
      //       roomQuality: 20,
      //       roomSrc: [
      //         {
      //           id: 1,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 2,
      //           img: 'https://picsum.photos/id/11/500/300',
      //         },
      //         {
      //           id: 3,
      //           img: 'https://picsum.photos/510/300?random',
      //         },
      //         {
      //           id: 4,
      //           img: 'https://picsum.photos/350/165?random',
      //         },
      //         {
      //           id: 5,
      //           img: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
      //         },
      //         {
      //           id: 6,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 7,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 8,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 9,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //         {
      //           id: 10,
      //           img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      //         },
      //       ],
      //     },
      //     alleqptAndServices: [
      //       {
      //         id: 1,
      //         category: '衛浴',
      //         eqptAndServices: [
      //           { id: 1, title: '浴缸', svgTitle: 'tub' },
      //           { id: 2, title: '吹風機', svgTitle: 'hairDryer' },
      //           { id: 3, title: '洗髮露', svgTitle: 'shampoo' },
      //           { id: 4, title: '沐浴乳', svgTitle: 'bodyWash' },
      //           { id: 5, title: '熱水', svgTitle: 'hotWater' },
      //         ],
      //       },
      //       {
      //         id: 2,
      //         category: '臥室和洗衣',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '生活必需品',
      //             subtitle: '毛巾、床單、香皂和衛生紙',
      //             svgTitle: 'toothbrush',
      //           },
      //           { id: 2, title: '衣架', svgTitle: 'coatHanger' },
      //           { id: 3, title: '窗簾', svgTitle: 'curtain' },
      //         ],
      //       },
      //       {
      //         id: 3,
      //         category: '娛樂',
      //         eqptAndServices: [
      //           { id: 1, title: '電視', svgTitle: 'television' },
      //         ],
      //       },
      //       {
      //         id: 4,
      //         category: '親子',
      //         eqptAndServices: [
      //           { id: 1, title: '嬰兒床', svgTitle: 'crib' },
      //           { id: 2, title: '嬰兒浴盆', svgTitle: 'babyTub' },
      //         ],
      //       },
      //       {
      //         id: 5,
      //         category: '暖氣和冷氣',
      //         eqptAndServices: [
      //           { id: 1, title: '空調設備', svgTitle: 'airConditioner' },
      //           { id: 2, title: '移動式電扇', svgTitle: 'fan' },
      //           { id: 3, title: '暖氣', svgTitle: 'heat' },
      //         ],
      //       },
      //       {
      //         id: 6,
      //         category: '網路和辦公',
      //         eqptAndServices: [{ id: 1, title: 'wifi', svgTitle: 'wifi' }],
      //       },
      //       {
      //         id: 7,
      //         category: '廚房和餐飲',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '廚房',
      //             subtitle: '房客可自行烹飪三餐的空間',
      //             svgTitle: 'kitchen',
      //           },
      //           { id: 2, title: '冰箱', svgTitle: 'refrigerator' },
      //           { id: 3, title: '微波爐', svgTitle: 'oven' },
      //           {
      //             id: 4,
      //             title: '盤子和餐具',
      //             subtitle: '碗、筷、盤、杯等',
      //             svgTitle: 'tableware',
      //           },
      //           { id: 5, title: '熱水壺', svgTitle: 'kettle' },
      //           { id: 6, title: '酒杯', svgTitle: 'wineGlass' },
      //         ],
      //       },
      //       {
      //         id: 8,
      //         category: '位置特色',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '獨立入口',
      //             subtitle: '獨立的街道或大樓入口',
      //             svgTitle: 'entrance',
      //           },
      //         ],
      //       },
      //       {
      //         id: 9,
      //         category: '戶外',
      //         eqptAndServices: [
      //           { id: 1, title: '庭院或陽台', svgTitle: 'balcony' },
      //           {
      //             id: 2,
      //             title: '後院',
      //             subtitle: '房源中有綠地覆蓋的開放空間',
      //             svgTitle: 'patio',
      //           },
      //         ],
      //       },
      //       {
      //         id: 10,
      //         category: '停車位和設施',
      //         eqptAndServices: [
      //           { id: 1, title: '建築物內免費停車', svgTitle: 'car' },
      //           { id: 2, title: '游泳池', svgTitle: 'swimmingPool' },
      //           { id: 3, title: '獨立房屋', svgTitle: 'house' },
      //         ],
      //       },
      //       {
      //         id: 11,
      //         category: '服務',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '可長期住宿',
      //             subtitle: '可住宿28晚以上',
      //             svgTitle: 'calendar',
      //           },
      //           { id: 2, title: '房東將會迎接您', svgTitle: 'key' },
      //         ],
      //       },
      //       {
      //         id: 12,
      //         category: '不提供',
      //         eqptAndServices: [
      //           {
      //             id: 1,
      //             title: '房源內的監視錄影器',
      //             svgTitle: 'video',
      //             isSupply: false,
      //           },
      //           {
      //             id: 2,
      //             title: '洗衣機',
      //             svgTitle: 'washingMachine',
      //             isSupply: false,
      //           },
      //           {
      //             id: 3,
      //             title: '煙霧警報器',
      //             subtitle:
      //               '此房源可能沒有安裝煙霧偵測器。如有任何問題，請聯絡房東。',
      //             svgTitle: 'siren',
      //             isSupply: false,
      //           },
      //           {
      //             id: 4,
      //             title: '一氧化碳警報器',
      //             subtitle:
      //               '此房源可能沒有安裝一氧化碳偵測器。如有任何問題，請聯絡房東。',
      //             svgTitle: 'alarmSiren',
      //             isSupply: false,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      rooms: [],
      users: [],
    }
  },
  async fetch() {
    // const { data } = await $axios.get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.$get(`/articles/index?pageIndex=1\`)
    // const  data  = await $axios.get(`/articles/index?pageIndex=1\`).data

    const res = await this.$axios.get('/api/rooms')
    this.rooms = res.data
    console.log(res.data)
    // const resUsers = await this.$axios.get('/api/users')
    // this.users = resUsers.data
    // console.log(resUsers.data)
  },
}
</script>
