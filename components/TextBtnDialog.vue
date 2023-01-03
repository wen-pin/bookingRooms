<template>
  <div
    class="font-medium my-auto"
    :class="
      isUnderlineCursorPointer ? 'underline cursor-pointer' : 'no-underline'
    "
  >
    {{ $t(this.title) }}
    <span v-if="subTitle">、</span>
    {{ subTitle }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    isUnderlineCursorPointer: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
