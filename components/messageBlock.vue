<template>
  <div>
    <div class="flex items-center">
      <v-avatar size="56px" class="mr-2">
        <img
          alt="Avatar"
          :src="
            require(`~/assets/img/rooms/room1/commenters/${this.avaterImg}`)
          "
          class="cursor-pointer"
        />
      </v-avatar>

      <div>
        <span>{{ commenterName }}</span>
        <div class="text-zinc-400">{{ createdAt }}</div>
      </div>
    </div>

    <div v-html="convertTobr" class="mt-5"></div>
  </div>
</template>

<script>
export default {
  name: 'messageBlock',

  props: {
    avaterImg: {
      type: String,
      required: true,
    },
    commenterName: {
      type: String,
      required: true,
    },
    // 之後要改type: Date()
    createdAt: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      width: '',
      height: '',
    }
  },
  computed: {
    convertTobr() {
      let arr = this.message.split('')
      return arr
        .map((item) => {
          return item === '\n' ? '<br />' : item
        })
        .join('')
    },
  },
}
</script>
