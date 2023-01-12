<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="IconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },

  computed: {
    IconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return this.className ? 'svg-icon' + this.className : 'svg-icon'
    },
  },
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-iconvisa {
  width: 2em;
  height: 2em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: #1a237e;
  overflow: hidden;
}
.svg-iconsize {
  width: 2em;
  height: 2em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-iconsize2 {
  width: 3em;
  height: 3em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-iconsuccess {
  width: 5em;
  height: 5em;
  font-size: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
