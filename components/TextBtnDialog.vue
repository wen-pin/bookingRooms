<template>
  <div
    class="font-bold my-auto"
    :class="
      isUnderlineCursorPointer ? 'underline cursor-pointer' : 'no-underline'
    "
    v-on="$listeners"
  >
    <span v-if="title">
      {{ $t(title) }}
    </span>
    <span v-if="subTitle">、</span>
    {{ subTitle }}
  </div>
</template>

<script>
export default {
  name: 'textBtnDialog',

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
