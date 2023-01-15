<template>
  <div>
    <div class="flex items-center">
      <v-avatar size="56px" class="mr-2">
        <img
          alt="Avatar"
          :src="
            require(`~/assets/img/rooms/room1/commenters/${this.avaterTitle}`)
          "
          class="cursor-pointer"
        />
      </v-avatar>

      <div>
        <span>{{ commenter }}</span>
        <div class="text-zinc-400">{{ messageTime }}</div>
      </div>
    </div>

    <div v-html="useLineClamp" class="mt-5"></div>
  </div>
</template>

<script>
export default {
  name: 'messageBlock',

  props: {
    avaterTitle: {
      type: String,
      required: true,
    },
    commenter: {
      type: String,
      required: true,
    },
    // 之後要改type: Date()
    messageTime: {
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
    useLineClamp() {
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
