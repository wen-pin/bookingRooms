<template>
  <div
    class="font-medium my-auto"
    :class="
      isUnderlineCursorPointer ? 'underline cursor-pointer' : 'no-underline'
    "
  >
    {{ $t(this.title) }}
  </div>
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
