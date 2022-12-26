<template>
  <div class="flex" :class="maxWidth">
    <v-rating
      :value="value"
      :size="size"
      color="black"
      length="1"
      dense
      half-increments
      readonly
    />

    <div class="mr-4" :class="marginTop">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      default: 14,
    },
    maxWidth: {
      type: String,
      default: '!max-w-[150px]',
    },
    marginTop: {
      type: String,
    },
  },
}
</script>
