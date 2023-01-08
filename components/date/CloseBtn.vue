<template>
  <v-btn v-on="$listeners" dark color="black">
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'dateCloseBtn',

  props: {
    text: {
      types: String,
      required: true,
    },
  },
}
</script>
