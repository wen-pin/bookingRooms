<template>
  <v-dialog
    v-model="tenantCard_visible"
    transition="dialog-bottom-transition"
    width="370px"
  >
    <v-card class="rounded-lg">
      <v-btn icon @click="tenantCard_visible = false" class="ml-3 mt-2">
        <v-icon color="black">mdi-window-close</v-icon>
      </v-btn>

      <v-card-text class="black--text !p-0">
        <div class="text-2xl font-semibold mt-5 mx-5">房客人數</div>

        <RoomCardTenant
          :limitPeople="limitPeople"
          :isAcceptPet="isAcceptPet"
          :elevation="0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogBookTenant',

  props: {
    limitPeople: {
      types: Number,
      required: true,
    },
    isAcceptPet: {
      types: Boolean,
      required: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    // 房客選擇卡片
    tenantCard_visible: {
      get() {
        return this.$store.state.tenantCard_visible
      },
      set(v) {
        this.$store.commit('toggleTenantCardBtn', v)
      },
    },
  },
}
</script>
