<template>
  <div>
    <div class="flex">
      <v-avatar size="56px" class="mr-2">
        <img alt="Avatar" :src="this.imgSrc" class="cursor-pointer" />
      </v-avatar>

      <div>
        <span>{{ commenter }}</span>
        <div class="text-zinc-400">{{ messageTime }}</div>
      </div>
    </div>

    <div class="mt-5">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
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
}
</script>
