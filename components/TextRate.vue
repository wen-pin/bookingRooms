<template>
  <div class="flex items-center mr-3" :class="maxWidth">
    <v-icon color="black" :size="size">mdi-star</v-icon>

    <div v-if="isVisible">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'textRate',

  props: {
    value: {
      type: Number,
    },
    size: {
      type: Number,
      default: 14,
    },
    maxWidth: {
      type: String,
      default: '!max-w-[150px]',
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
