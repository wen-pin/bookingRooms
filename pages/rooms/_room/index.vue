<template>
  <v-container>
    <div class="text-3xl mt-5">{{ room.title }}</div>

    <div class="my-2 flex">
      <div class="flex">
        <span class="my-auto">
          <TextRate :value="room.averageRating" />
        </span>

        <span class="mr-4 my-auto" @click="EvaluationDialog = true">
          <TextBtnDialog :title="`${room.allMessages.length}則評價`" />
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
                    :value="room.averageRating"
                    :size="30"
                    :max-width="''"
                    :margin-top="'mt-[2px]'"
                    class="text-3xl"
                  />
                </span>

                <TextBtnDialog
                  :title="`${room.allMessages.length}則評價`"
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

              <div
                v-for="item in room.allMessages"
                :key="item.id"
                class="mb-10"
              >
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

        <TextBtnDialog :title="room.address" :subTitle="room.country" />

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

    <div
      class="flex border-solid border-t-0 border-r-0 border-b-1 border-l-0 border-slate-200"
    >
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

            <div class="!max-w-[70px]" @click="detailDialog = true">
              <TextBtnDialog :title="'了解詳情'" />
            </div>

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

            <v-card outlined width="200px" height="120px" class="p-5 mt-5">
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
                v-for="item in fetchEqptAndServices(
                  room.alleqptAndServices[0].eqptAndServices,
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
              顯示全部{{
                room.alleqptAndServices[0].eqptAndServices.length
              }}項設備與服務
            </v-btn>

            <v-dialog v-model="eqptAndservDialog" scrollable width="700">
              <v-card class="rounded-lg p-5">
                <v-btn icon @click="eqptAndservDialog = false">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>

                <v-card-text class="!p-0 my-10 black--text">
                  <div class="text-2xl font-bold">有提供的設備與服務</div>

                  <div
                    v-for="items in this.room.alleqptAndServices"
                    :key="items.id"
                  >
                    <div class="text-xl font-bold my-8">
                      {{ items.category }}
                    </div>

                    <CardEqptAndServ
                      v-for="item in items.eqptAndServices"
                      :key="item.id"
                      :title="item.title"
                      :subtitle="item.subtitle"
                      :svgTitle="item.svgTitle"
                      :isSupply="item.isSupply"
                    />
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </DivideBlock>

        <div class="my-10">
          <div class="text-2xl font-bold">
            <div v-if="datesQueue.length == 0">選擇入住日期</div>
            <div v-else-if="datesQueue.length == 1">選擇退房日期</div>
            <div v-else>
              {{ $t('在') }}{{ room.address }}住{{ calculateDays }}晚
            </div>
          </div>

          <div class="text-sm text-neutral-500">
            <div v-if="datesQueue.length < 2">新增旅行日期，查看確切價格</div>
            <div v-else>
              {{ dateRangeText }}
            </div>
          </div>

          <v-row class="mt-10">
            <v-date-picker
              v-model="dates"
              range
              no-title
              full-width
              :min="$dayjs().format('YYYY-MM-DD')"
              year-icon="mdi-calendar-blank"
            ></v-date-picker>
          </v-row>

          <div class="mt-5 flex justify-end" @click="dates = []">
            <TextBtnDialog :title="'清除日期'" />
          </div>
        </div>
      </div>

      <!-- 要在這邊加上z-10，這樣打開的卡片才能覆蓋底層 -->
      <div class="w-[40%] flex justify-center relative z-10">
        <v-card
          width="80%"
          :height="datesQueue.length === 2 ? '460px' : '285px'"
          elevation="7"
          class="rounded-lg !sticky top-[80px] mt-5 !mb-[90px]"
        >
          <v-card-title class="justify-between">
            <div>
              <div v-if="datesQueue.length === 2" class="flex items-center">
                {{ $n(this.averageRentalCost, 'currency') }}
                <div class="font-normal text-base ml-1">晚</div>
              </div>
              <div v-else class="flex items-center">
                {{ $n(0, 'currency') }}
                <div class="font-normal text-base ml-1">晚</div>
              </div>
            </div>

            <v-spacer />

            <span>
              <TextRate :value="room.averageRating" class="text-sm" />
            </span>

            <span @click="EvaluationDialog = true">
              <TextBtnDialog
                :title="`${room.allMessages.length}則評價`"
                class="text-sm"
              />
            </span>
          </v-card-title>

          <v-row class="justify-center">
            <v-col cols="11">
              <div
                class="px-3 flex justify-between border-gray-300 border-l border-t border-r border-b-0 border-solid rounded-tl-lg rounded-tr-lg cursor-pointer"
                @click="openDateCard()"
              >
                <div class="w-[50%] my-2">
                  <div class="font-semibold text-sm">入住</div>
                  <div v-if="datesQueue[0] != null">{{ datesQueue[0] }}</div>
                  <div v-else class="text-neutral-500">選取日期</div>
                </div>

                <v-divider vertical />

                <div class="w-[50%] my-2 pl-3">
                  <div class="font-semibold text-sm">退房</div>
                  <div v-if="datesQueue[1] != null">{{ datesQueue[1] }}</div>
                  <div v-else class="text-neutral-500">選取日期</div>
                </div>
              </div>

              <v-card
                v-if="isVisible"
                max-width="200%"
                width="1000px"
                class="!absolute top-[65px] left-[-355px] z-10 rounded-lg"
              >
                <div class="my-5">
                  <div class="flex justify-between mx-8">
                    <div class="flex flex-col justify-center">
                      <div class="text-2xl font-bold">
                        <div v-if="datesQueue.length == 0">選擇入住日期</div>
                        <div v-else-if="datesQueue.length == 1">
                          選擇退房日期
                        </div>
                        <div v-else>
                          {{ $t('在') }}{{ room.address }}住{{
                            calculateDays
                          }}晚
                        </div>
                      </div>

                      <div class="text-sm text-neutral-500">
                        <div v-if="datesQueue.length < 2">
                          新增旅行日期，查看確切價格
                        </div>
                        <div v-else>
                          {{ dateRangeText }}
                        </div>
                      </div>
                    </div>

                    <div
                      class="!max-w-[320px] flex justify-between border-gray-300 border border-solid rounded-lg cursor-pointer"
                    >
                      <div
                        :class="
                          datesQueue[0] == null
                            ? 'w-[50%] px-3 py-2 border-2 border-solid border-black rounded-lg '
                            : 'w-[50%] px-3 py-2'
                        "
                      >
                        <div class="font-semibold text-sm">入住</div>
                        <div v-if="datesQueue[0] != null">
                          {{ datesQueue[0] }}
                        </div>
                        <div v-else class="text-neutral-500">選取日期</div>
                      </div>

                      <v-divider vertical />

                      <div
                        :class="
                          datesQueue[0] != null
                            ? 'w-[50%] py-2 pl-3 border-2 border-solid border-black rounded-lg'
                            : 'w-[50%] py-2 pl-3'
                        "
                      >
                        <div class="font-semibold text-sm">退房</div>
                        <div v-if="datesQueue[1] != null">
                          {{ datesQueue[1] }}
                        </div>
                        <div v-else class="text-neutral-500">選取日期</div>
                      </div>
                    </div>
                  </div>

                  <v-date-picker
                    v-model="dates"
                    no-title
                    range
                    full-width
                    :min="$dayjs().format('YYYY-MM-DD')"
                    year-icon="mdi-calendar-blank"
                    class="mt-5"
                  />

                  <div class="flex justify-end mx-8" @click="dates = []">
                    <TextBtnDialog :title="'清除日期'" class="mr-5" />

                    <v-btn dark color="black" @click="isVisible = false"
                      >關閉</v-btn
                    >
                  </div>
                </div>
              </v-card>

              <div class="relative">
                <div
                  class="h-[65px] flex justify-between border-gray-300 border-[1px] border-solid rounded-bl-lg rounded-br-lg px-3 cursor-pointer"
                  :class="isVisible2 ? 'border-black border-[2px]' : ''"
                  @click="isVisible2 = !isVisible2"
                >
                  <div class="my-2">
                    <div class="font-semibold">房客</div>
                    <div class="flex">
                      <div>{{ allTenants }}</div>
                      <div v-if="babyQuantity > 0">
                        , {{ babyQuantity }}名嬰幼兒
                      </div>
                    </div>
                  </div>

                  <v-icon v-if="isVisible2">mdi-chevron-up</v-icon>
                  <v-icon v-else>mdi-chevron-down</v-icon>
                </div>

                <v-card
                  v-if="isVisible2"
                  class="!absolute top-[65px] left-0 py-5 z-10 rounded-lg"
                >
                  <div
                    v-for="(tenant, idx) in tenants"
                    :key="tenant.id"
                    class="flex mx-5 mb-5"
                  >
                    <div>
                      <div class="font-semibold">{{ tenant.ageGroup }}</div>
                      <TextBtnDialog
                        v-if="tenant.ageGroup == '寵物'"
                        :title="tenant.ageRange"
                        class="text-sm"
                      />

                      <div v-else class="text-sm">{{ tenant.ageRange }}</div>
                    </div>

                    <v-card-actions class="flex justify-end">
                      <v-btn
                        :disabled="isDisable(idx)"
                        icon
                        small
                        outlined
                        @click="reduceTenant(idx)"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <div class="mx-4">
                        {{ tenant.quantity }}
                      </div>

                      <v-btn icon small outlined @click="addTenant(idx)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <div class="mx-5 mb-8 text-xs">
                    此房源最多可供 4 人入住（不包括嬰幼兒）。不接受寵物入住。
                  </div>

                  <div @click="isVisible2 = false">
                    <TextBtnDialog
                      :title="'關閉'"
                      class="mx-5 flex justify-end"
                    />
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <div class="mt-4 px-4">
            <div v-if="datesQueue.length === 2">
              <v-btn height="50px" dark block color="#EC407A">
                <span class="text-base font-semibold"> 預定 </span>
              </v-btn>

              <div class="flex justify-center mt-4">你暫時不會被收費</div>

              <DivideBlock>
                <div class="mb-5">
                  <div class="flex justify-between mt-5">
                    <TextBtnDialog
                      :title="`${$n(
                        this.averageRentalCost,
                        'currency',
                      )}x${calculateDays} 晚`"
                    />
                    {{ $n(this.calculateRentalCost, 'currency') }}
                  </div>

                  <div class="flex justify-between mt-2">
                    <TextBtnDialog :title="'服務費'" />
                    {{ $n(this.calculateServiceCharge, 'currency') }}
                  </div>
                </div>
              </DivideBlock>

              <div class="flex justify-between mt-5 font-semibold">
                <span>稅前總價</span>

                {{ $n(this.allRentalCost, 'currency') }}
              </div>
            </div>

            <v-btn v-else height="50px" dark block color="#EC407A">
              <span class="text-base font-semibold"> 查看可訂日期 </span>
            </v-btn>
          </div>

          <div
            class="flex absolute left-[50%]"
            :class="datesQueue.length === 2 ? 'top-[500px]' : 'top-[325px]'"
            style="transform: translate(-50%, -50%)"
          >
            <v-icon class="mr-3">mdi-flag</v-icon>
            <TextBtnDialog :title="'檢舉此房源'" class="text-gray-600" />
          </div>
        </v-card>
      </div>
    </div>

    <DivideBlock>
      <div class="my-10">
        <div class="flex">
          <span>
            <TextRate
              :value="room.averageRating"
              :size="25"
              :max-width="''"
              :margin-top="'mt-[2px]'"
              class="text-2xl"
            />
          </span>

          <TextBtnDialog
            :title="`${room.allMessages.length}則評價`"
            :isUnderlineCursorPointer="false"
            class="text-2xl mt-[2px]"
          />
        </div>

        <v-row class="mt-5">
          <v-col
            v-for="item in this.room.evaluationStandards"
            :key="item.title"
            cols="6"
          >
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

        <v-row class="mt-5">
          <v-col
            v-for="item in room.allMessages"
            :key="item.id"
            cols="6"
            class="mb-10"
          >
            <messageBlock
              :imgSrc="item.imgSrc"
              :commenter="item.commenter"
              :messageTime="item.messageTime"
              :message="item.message"
            />
          </v-col>
        </v-row>

        <v-btn outlined @click="EvaluationDialog = true">
          顯示全部{{ room.allMessages.length }}則評價
        </v-btn>
      </div>
    </DivideBlock>

    <DivideBlock>
      <div class="my-10">
        <div class="text-2xl font-bold">
          {{ $t('住宿地點') }}
        </div>

        <div></div>
      </div>
    </DivideBlock>
  </v-container>
</template>

<script>
export default {
  name: 'singleRoom',
  data() {
    return {
      detailDialog: false,
      detailDialog2: false,
      EvaluationDialog: false,
      fullscreenDialog: false,
      eqptAndservDialog: false,

      isVisible: false,
      isVisible2: false,

      dates: [],

      tenants: [
        {
          id: 1,
          ageGroup: '大人',
          ageRange: '13 歲以上',
          quantity: 1,
        },
        {
          id: 2,
          ageGroup: '兒童',
          ageRange: '2 - 12歲',
          quantity: 0,
        },
        {
          id: 3,
          ageGroup: '嬰幼兒',
          ageRange: '2 歲以下',
          quantity: 0,
        },
        {
          id: 4,
          ageGroup: '寵物',
          ageRange: '會攜帶服務性動物嗎？',
          quantity: 0,
        },
      ],

      room: {
        // 房東
        landlord: 'Chiang',
        // 房間標題
        title:
          '(4-8人房)台灣最南端甜點店B&B「墾，點心背包客棧」 近墾丁最美沙灘砂島',
        // 國家
        country: '臺灣',
        // 地址
        address: '恆春鎮',
        // 房間價錢
        price: {
          weekday: 2800,
          holiday: 3200,
          serviceCharge: 415,
        },
        // 房間簡易資訊
        simpleInformation: '3位1間臥室1 張床1 間獨立浴室',
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
    dateRangeText() {
      return this.datesQueue.join(' ~ ')
    },
    allTenants: {
      get() {
        let total = this.tenants[0].quantity + this.tenants[1].quantity

        return total + '位'
      },
      set(total) {
        console.log(total)
      },
    },
    babyQuantity: {
      get() {
        return this.tenants[2].quantity
      },
    },
    calculateDays() {
      return this.$dayjs(this.datesQueue[1]).diff(this.datesQueue[0], 'day')
    },
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
    averageRentalCost() {
      return this.calculateRentalCost / this.calculateDays
    },
    calculateServiceCharge() {
      return this.calculateDays * this.room.price.serviceCharge
    },
    allRentalCost() {
      return this.calculateRentalCost + this.calculateServiceCharge
    },
    datesQueue() {
      if (this.dates.length === 2) {
        if (this.$dayjs(this.dates[0]).isAfter(this.$dayjs(this.dates[1]))) {
          let temp = this.dates[0]
          let newDates = []
          newDates[0] = this.dates[1]
          newDates[1] = temp
          return newDates
        } else {
          return this.dates
        }
      } else {
        return this.dates
      }
    },
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
    fetchEqptAndServices(eqptAndServices) {
      return eqptAndServices.slice(0, 10)
    },
    addTenant(idx) {
      return this.tenants[idx].quantity++
    },
    reduceTenant(idx) {
      return this.tenants[idx].quantity--
    },
    isDisable(idx) {
      if (idx == 0) {
        if (this.tenants[idx].quantity < 2) return true
      } else if (idx != 0) {
        if (this.tenants[idx].quantity < 1) return true
      }
    },
    openDateCard() {
      this.isVisible2 = false
      this.isVisible = true
    },
  },
}
</script>
