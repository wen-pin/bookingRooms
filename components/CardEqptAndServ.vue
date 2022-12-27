<template>
  <div>
    <div>{{ title }}</div>
    <div class="divide-solid divide-y divide-slate-200">
      <SvgIcon :iconClass="svgTitle" class="mr-2" />
      <div>
        {{ subtitle }}
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    svgTitle: {
      type: String,
      required: true,
    },
  },
}
</script>
