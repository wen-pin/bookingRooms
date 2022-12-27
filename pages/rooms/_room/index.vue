<template>
  <v-container>
    <div class="text-3xl mt-5">{{ room.title }}</div>
    <div class="my-2 flex">
      <div class="flex">
        <span class="my-auto">
          <TextRate :value="room.averageRating" />
        </span>

        <span class="mr-4 my-auto" @click="EvaluationDialog = true">
          <TextBtnDialog :title="`${room.evaluations}則評價`" />
        </span>

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
                    :value="4.5"
                    :size="30"
                    :max-width="''"
                    :margin-top="'mt-[2px]'"
                    class="text-3xl"
                  />
                </span>

                <TextBtnDialog
                  :title="`${room.evaluations}則評價`"
                  :isUnderlineCursorPointer="false"
                  class="text-3xl mt-[2px]"
                />
              </div>

              <div class="mt-[50px]">
                <v-row
                  v-for="item in this.room.evaluationStandards"
                  :key="item.title"
                >
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

        <TextBtnDialog :title="room.address" />

        <v-spacer />

        <v-btn text>
          <v-icon small class="cursor-pointer" color="black">
            mdi-export-variant
          </v-icon>
          <TextBtnDialog :title="'分享'" />
        </v-btn>

        <v-btn text>
          <v-icon small class="cursor-pointer" color="black">
            mdi-cards-heart-outline
          </v-icon>
          <TextBtnDialog :title="'儲存'" />
        </v-btn>
      </div>
    </div>

    <div class="flex pr-8 my-5">
      <v-img
        :lazy-src="room.img.lazySrc"
        :src="room.img.roomSrc[0].img"
        class="w-[50%] mr-2 rounded-l-lg"
      ></v-img>

      <div class="w-[25%] mx-2 flex flex-col">
        <v-img
          :lazy-src="room.img.lazySrc"
          :src="room.img.roomSrc[1].img"
          class="mb-2"
        ></v-img>

        <v-img
          :lazy-src="room.img.lazySrc"
          :src="room.img.roomSrc[2].img"
          class="mt-2"
        ></v-img>
      </div>

      <div class="w-[25%] ml-2 flex flex-col !relative">
        <v-img
          :lazy-src="room.img.lazySrc"
          :src="room.img.roomSrc[3].img"
          class="rounded-tr-lg mb-2"
        ></v-img>

        <v-img
          :lazy-src="room.img.lazySrc"
          :src="room.img.roomSrc[4].img"
          class="rounded-br-lg mt-2"
        ></v-img>

        <v-btn
          max-width="120px"
          max-height="60px"
          class="!absolute right-[20px] bottom-[20px] !text-xs"
          @click="fullscreenDialog = true"
        >
          <v-icon>mdi-apps</v-icon>
          {{ $t('顯示全部相片') }}
        </v-btn>

        <v-dialog
          v-model="fullscreenDialog"
          fullscreen
          hide-overlay
          scrollable
          transition="dialog-bottom-transition"
        >
          <v-card>
            <div class="flex pt-5 pl-2">
              <v-btn icon @click="fullscreenDialog = false">
                <v-icon class="cursor-pointer" color="black">
                  mdi-less-than
                </v-icon>
              </v-btn>

              <v-spacer />

              <v-btn text>
                <v-icon small class="cursor-pointer" color="black">
                  mdi-export-variant
                </v-icon>
                <TextBtnDialog :title="'分享'" />
              </v-btn>

              <v-btn text>
                <v-icon small class="cursor-pointer" color="black">
                  mdi-cards-heart-outline
                </v-icon>
                <TextBtnDialog :title="'儲存'" />
              </v-btn>
            </div>

            <v-card-text class="flex justify-center">
              <v-row class="max-w-[800px] mt-10">
                <v-col v-for="item in room.img.roomSrc" :key="item.id" cols="6">
                  <v-img :src="item.img" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="flex">
      <div class="w-[60%]">
        <DivideBlock>
          <div class="my-5 flex justify-between">
            <div>
              <div class="text-2xl font-bold">
                {{ room.landlord }} 出租的農場住宿
              </div>

              <div>{{ room.simpleInformation }}</div>
            </div>

            <v-avatar size="56px">
              <img
                alt="Avatar"
                :src="room.img.avaterSrc"
                class="cursor-pointer"
              />
            </v-avatar>
          </div>
        </DivideBlock>

        <DivideBlock>
          <div class="my-5">
            <div class="my-1">
              針對房東取消預訂、房源描述不實和入住困難等其他問題，我們會為每筆預訂提供免費保障。
            </div>

            <span @click="detailDialog = true">
              <TextBtnDialog :title="'了解詳情'" />
            </span>

            <CardDialog :dialog="detailDialog" @update="updateDetailDialog">
              <DivideBlock class="mx-5">
                <div class="my-5">
                  <div class="text-h5">Privacy Policy</div>
                  <div>AirCover 將為每筆預訂免費提供全面保障。</div>
                </div>
              </DivideBlock>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="detailDialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </CardDialog>
          </div>
        </DivideBlock>

        <DivideBlock>
          <div class="my-5">
            <div class="my-1">
              在這間大自然包圍的浪漫房源中欣賞四周美景。 日出、日落、滿天星星
              ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
              謝絕訪客，無法配合者，請勿下訂，謝謝 其他注意事項
              #可提供幫忙準備烤肉爐+瓦斯：400元/次 #寵物需先徵詢房東同意
              #包棟、寵物押金：3000元，再請貴賓入住當天另外準備，並於退房後無誤後退回
              ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
              謝絕訪客，無法配合者，請勿下訂，謝謝
            </div>

            <div class="!max-w-[115px] flex" @click="detailDialog2 = true">
              <TextBtnDialog :title="'顯示更多內容'" />

              <v-icon class="cursor-pointer" small color="black">
                mdi-greater-than
              </v-icon>
            </div>

            <CardDialog :dialog="detailDialog2" @update="updateDetailDialog2">
              <v-card-title class="text-2xl">空間介紹</v-card-title>

              <v-card-text>
                在這間大自然包圍的浪漫房源中欣賞四周美景。 日出、日落、滿天星星
                ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
                謝絕訪客，無法配合者，請勿下訂，謝謝 其他注意事項
                #可提供幫忙準備烤肉爐+瓦斯：400元/次 #寵物需先徵詢房東同意
                #包棟、寵物押金：3000元，再請貴賓入住當天另外準備，並於退房後無誤後退回
                ##嚴禁訪客## 為提供來入住的房客，都能享有私人空間隱私
                謝絕訪客，無法配合者，請勿下訂，謝謝
              </v-card-text>
            </CardDialog>
          </div>
        </DivideBlock>

        <DivideBlock>
          <div class="my-10">
            <div class="text-2xl font-bold">
              {{ $t('住宿地點') }}
            </div>

            <v-card width="200px" height="120px" class="p-5 mt-5">
              <div>
                <SvgIcon
                  v-for="i in 4"
                  :key="i"
                  :iconClass="'doubleBed'"
                  class="mr-2"
                />
              </div>
              <div>{{ $t('臥室') }}</div>
              <div>4 張 1.4 米寬雙人床</div>
            </v-card>
          </div>
        </DivideBlock>

        <DivideBlock>
          <div class="my-10">
            <div class="text-2xl font-bold">
              {{ $t('有提供的設備與服務') }}
            </div>

            <v-row class="w-[80%] mt-2">
              <v-col
                v-for="item in fetchEquipmentAndServices(
                  room.equipmentAndServices,
                )"
                :key="item.id"
                cols="6"
                class="flex pb-0"
              >
                <SvgIcon :iconClass="item.svgTitle" class="mr-2" />
                <div>
                  {{ item.title }}
                </div>
              </v-col>
            </v-row>

            <v-btn outlined class="mt-10" @click="eqptAndservDialog = true">
              顯示全部{{ room.equipmentAndServices.length }}項設備與服務
            </v-btn>

            <v-dialog v-model="eqptAndservDialog">
              <v-card class="rounded-lg p-5">
                <v-btn icon @click="eqptAndservDialog = false">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>

                <v-card-text class="!p-0 my-10">
                  <div class="text-2xl font-bold">有提供的設備與服務</div>

                  <CardEqptAndServ
                    :title="'衛浴'"
                    :subtitle="'浴缸'"
                    :svgTitle="'doubleBed'"
                  />
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </DivideBlock>
      </div>

      <div class="w-[40%] flex justify-center">
        <v-card width="80%" height="300px" elevation="3" class="rounded-lg">
          <v-card-title class="justify-between">
            {{ $n(room.price.weekday, 'currency') }} 晚

            <v-spacer />

            <span>
              <TextRate :value="room.averageRating" class="text-sm" />
            </span>

            <span @click="EvaluationDialog = true">
              <TextBtnDialog
                :title="`${room.evaluations}則評價`"
                class="text-sm"
              />
            </span>
          </v-card-title>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import CardEqptAndServ from '../../../components/CardEqptAndServ.vue'
import SvgIcon from '../../../components/SvgIcon.vue'
export default {
  components: { SvgIcon, CardEqptAndServ },
  data() {
    return {
      detailDialog: false,
      detailDialog2: false,
      EvaluationDialog: false,
      fullscreenDialog: false,
      eqptAndservDialog: false,

      room: {
        // 房東
        landlord: 'Chiang',
        // 房間標題
        title:
          '(4-8人房)台灣最南端甜點店B&B「墾，點心背包客棧」 近墾丁最美沙灘砂島',
        // 地址
        address: '恆春鎮、臺灣',
        // 房間價錢
        price: {
          weekday: 2000,
          holiday: 2500,
        },
        // 房間簡易資訊
        simpleInformation: '3位1間臥室1 張床1 間獨立浴室',
        // 平均評價
        averageRating: 4.6,
        // 評價數量
        evaluations: 5,
        // 評價標準
        evaluationStandards: [
          { title: '乾淨度', value: 5.0, percentage: null },
          { title: '準確性', value: 5.0, percentage: null },
          { title: '溝通', value: 4.9, percentage: null },
          { title: '位置', value: 2.5, percentage: null },
          { title: '入住', value: 4.9, percentage: null },
          { title: '性價比', value: 4.5, percentage: null },
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
        equipmentAndServices: [
          { id: 1, title: '廚房', svgTitle: 'doubleBed' },
          { id: 2, title: '廚房', svgTitle: 'doubleBed' },
          { id: 3, title: '廚房', svgTitle: 'doubleBed' },
          { id: 4, title: '廚房', svgTitle: 'doubleBed' },
          { id: 5, title: '廚房', svgTitle: 'doubleBed' },
          { id: 6, title: '廚房', svgTitle: 'doubleBed' },
          { id: 7, title: '廚房', svgTitle: 'doubleBed' },
          { id: 8, title: '廚房', svgTitle: 'doubleBed' },
          { id: 9, title: '廚房', svgTitle: 'doubleBed' },
          { id: 10, title: '廚房', svgTitle: 'doubleBed' },
          { id: 11, title: '廚房', svgTitle: 'doubleBed' },
          { id: 12, title: '廚房', svgTitle: 'doubleBed' },
        ],
      },

      // 房間留言
      allMessages: [
        {
          id: 1,
          imgSrc: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          commenter: 'Yuan-Ping',
          messageTime: '2022年7月',
          message: '很棒的住宿體驗，尤其是從落地窗看出去的景緻。',
        },
        {
          id: 2,
          imgSrc: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          commenter: 'Chihchia',
          messageTime: '2022年7月',
          message:
            '員工老闆也很親切，公共空間及房間整體非常有歷史感及設計感，保有老宅該有的風味，但位於馬路要道邊，加上窗戶非氣密式，整晚都有嘟嘟車呼嘯而過，早晨卡車卸貨等噪音，房間冷氣也很擾人安靜，有被影響到睡眠，房內有附耳塞，有稍稍緩解噪音感，若對於睡眠品質敏感的人可能要多考慮。',
        },
        {
          id: 3,
          imgSrc: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          commenter: 'Elsa',
          messageTime: '2022年7月',
          message:
            '房間太美了！二樓的公共空間非常舒適，中國城逛累了窩在二樓沙發上發懶聽音樂，覺得很像在自己家裡那樣自在。所有的空間都好拍到不行，隨便拍隨便美，很喜歡獨特的設計和顏色。（也是因為非常挑高，所以樓梯很高很陡要小心走就是了～）主人很親切，也貼心提供推薦店家的名單～很棒的入住體驗^^',
        },
        {
          id: 4,
          imgSrc: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          commenter: 'Po Nan',
          messageTime: '2022年7月',
          message:
            '地理位置佳,房間風格獨特，超好拍照打卡！房東很nice! 因我搭隔天凌晨班機，還特別幫我預訂計程車，讓我可以從容的去機場。可於前晚選擇好明早的早餐類型和用餐時間，2樓的咖啡飲料和小餅乾都可免費自取，不怕半夜嘴饞～1樓的酒吧非常酷，店員態度熱情，推薦我喝的2款調酒都很棒！優點多到說不完，實在太喜歡，本來只住一晚，後來直接取消別的旅店，再多住八號一晚，哈哈！',
        },
      ],
    }
  },
  methods: {
    updateDetailDialog(val) {
      this.detailDialog = val
    },
    updateDetailDialog2(val) {
      this.detailDialog2 = val
    },
    updateEvaluationDialog(val) {
      this.EvaluationDialog = val
    },
    convertPercentage(value) {
      return (value / 5) * 100
    },
    fetchEquipmentAndServices(equipmentAndServices) {
      return equipmentAndServices.slice(0, 10)
    },
  },
}
</script>
