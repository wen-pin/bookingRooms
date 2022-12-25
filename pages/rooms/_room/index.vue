<template>
  <v-container>
    <div class="text-3xl mt-5">房間標題</div>
    <div class="my-2 flex">
      <div class="flex">
        <span>
          <TextRate :value="4.5" />
        </span>

        <span class="mr-4" @click="EvaluationDialog = true">
          <TextBtnDialog :title="'四則評價'" />
        </span>

        <CardDialog :dialog="EvaluationDialog" @update="updateEvaluationDialog">
          <div>
            <div class="flex">
              <span>
                <TextRate :value="4.5" />
              </span>

              <TextBtnDialog
                :title="'四則評價'"
                :isUnderlineCursorPointer="false"
              />
            </div>
            <div></div>
          </div>
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

        <TextBtnDialog :title="'恆春鎮、臺灣'" />
      </div>
    </div>

    <div class="flex pr-8 my-5">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        class="w-[50%] mr-2 rounded-l-lg"
      ></v-img>

      <div class="w-[25%] mx-2 flex flex-col">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
          class="mb-2"
        ></v-img>

        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
          class="mt-2"
        ></v-img>
      </div>

      <div class="w-[25%] ml-2 flex flex-col !relative">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
          class="rounded-tr-lg mb-2"
        ></v-img>

        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
          class="rounded-br-lg mt-2"
        ></v-img>

        <v-btn
          max-width="120px"
          max-height="60px"
          class="!absolute right-[20px] bottom-[20px] !text-xs"
        >
          <v-icon>mdi-apps</v-icon>
          {{ $t('顯示全部相片') }}
        </v-btn>
      </div>
    </div>

    <div class="flex">
      <div class="w-[60%]">
        <DivideBlock>
          <div class="my-5 flex justify-between">
            <div>
              <div class="text-2xl">貝貝出租的農場住宿</div>

              <div>3位1間臥室1 張床1 間獨立浴室</div>
            </div>

            <v-avatar size="56px">
              <img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
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

              <v-icon class="cursor-pointer" small color="black"
                >mdi-greater-than</v-icon
              >
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
      </div>

      <div class="w-[40%]">
        <v-card>
          <v-card-title class="justify-between">
            $6,693 TWD 晚

            <v-spacer />

            <div>
              <TextRate :value="4.5" class="text-sm" />
            </div>

            <span class="pb-1" @click="EvaluationDialog = true">
              <TextBtnDialog :title="'四則評價'" class="text-sm" />
            </span>
          </v-card-title>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      detailDialog: false,
      detailDialog2: false,
      EvaluationDialog: false,
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
  },
}
</script>
