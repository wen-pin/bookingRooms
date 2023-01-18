<template>
  <div class="flex items-center" :class="maxWidth">
    <v-rating
      :value="value"
      :size="size"
      color="black"
      length="1"
      dense
      half-increments
      readonly
    />

    <div :class="margin">{{ value }}</div>
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
    margin: {
      type: String,
    },
  },
}
</script>
