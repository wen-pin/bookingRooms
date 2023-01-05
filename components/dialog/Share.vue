<template>
  <div>
    <v-btn text @click="isVisible = true">
      <v-icon small class="cursor-pointer" color="black">
        mdi-export-variant
      </v-icon>
      <TextBtnDialog :title="'分享'" />
    </v-btn>

    <v-dialog v-model="isVisible">
      <v-card class="rounded-lg p-5" height="100%">
        <v-btn icon @click="isVisible = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogShare',

  data() {
    return {
      isVisible: false,
    }
  },
}
</script>
