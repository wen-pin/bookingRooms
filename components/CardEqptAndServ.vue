<template>
  <div class="divide-solid divide-y divide-slate-200 mt-5 ml-2 mr-7">
    <div class="flex items-center mb-5">
      <SvgIcon :iconClass="svgTitle" :className="'size3'" class="mr-3" />

      <div>
        <div
          class="text-body-1 black--text text-base"
          :class="isSupply ? '' : 'line-through'"
        >
          {{ title }}
        </div>
        <div class="grey--text text--darken-1 text-sm">
          {{ subtitle }}
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: 'cardEqptAndServ',

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    svgTitle: {
      type: String,
      required: true,
    },
    isSupply: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
