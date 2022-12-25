<template>
  <span
    class="font-medium"
    :class="
      isUnderlineCursorPointer ? 'underline cursor-pointer' : 'no-underline'
    "
  >
    {{ $t(this.title) }}
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    isUnderlineCursorPointer: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
