<template>
  <div class="flex !max-w-[150px]">
    <v-rating
      :value="value"
      color="amber"
      dense
      half-increments
      readonly
      size="14"
    ></v-rating>

    <div class="mr-4">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
}
</script>
