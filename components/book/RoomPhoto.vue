<template>
  <DivideBlock>
    <div class="flex w-full pb-6">
      <v-img
        :src="require(`~/assets/img/rooms/room${roomId}/bg_2.jpg`)"
        :aspect-ratio="1"
        class="rounded-lg w-[30%]"
      ></v-img>

      <div class="w-[70%] px-2">
        <div class="text-sm font-extralight">
          {{ rentalType }}
        </div>

        <div class="line-clamp-3">{{ title }}</div>

        <div class="flex mt-3">
          <span>
            <TextRate :value="averageRating" :size="15" class="text-sm" />
          </span>

          <span v-if="allMessages">
            <TextBtnDialog
              :title="`${allMessages.length}則評價`"
              :isUnderlineCursorPointer="false"
              class="text-sm"
            />
          </span>
        </div>
      </div>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'bookRoomPhoto',

  props: {
    rentalType: {
      types: String,
      required: true,
    },
    title: {
      types: String,
      required: true,
    },
    averageRating: {
      types: Number,
      required: true,
    },
    allMessages: {
      types: Array,
    },
    roomId: {
      types: Number,
    },
  },
}
</script>
