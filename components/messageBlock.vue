<template>
  <div>
    <div class="flex items-center">
      <v-avatar size="56px" class="mr-2">
        <img
          alt="Avatar"
          :src="
            require(`~/assets/img/rooms/room1/commenters/${this.avaterImg}`)
          "
          width="100%"
          height="100%"
          class="cursor-pointer object-cover"
        />
      </v-avatar>

      <div>
        <span>{{ commenterName }}</span>
        <div class="text-zinc-400">
          {{ this.$dayjs(createdAt).format('YYYY[年]M[月]') }}
        </div>
      </div>
    </div>

    <div v-html="convertTobr" class="mt-5" :class="lineclamp"></div>
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
    lineclamp: {
      type: String,
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
      if (this.message) {
        let arr = this.message.split('')
        return arr
          .map((item) => {
            return item === '\n' ? '<br />' : item
          })
          .join('')
      }
    },
  },
}
</script>
