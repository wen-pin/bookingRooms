<template>
  <v-card :elevation="elevation" class="py-5 rounded-lg">
    <div
      v-for="(tenant, idx) in tenants"
      :key="tenant.id"
      class="flex mx-5 mb-5"
    >
      <div>
        <div class="font-semibold">{{ tenant.ageGroup }}</div>
        <TextBtnDialog
          v-if="tenant.ageGroup == '寵物'"
          :title="tenant.ageRange"
          class="text-sm"
        />

        <div v-else class="text-sm">{{ tenant.ageRange }}</div>
      </div>

      <v-card-actions class="flex justify-end">
        <v-btn
          :disabled="isReduceBtnDisable(idx)"
          icon
          small
          outlined
          @click="reduceTenant(idx)"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <div class="mx-4">
          {{ tenant.quantity }}
        </div>

        <v-btn
          :disabled="isAddBtnDisable(idx)"
          icon
          small
          outlined
          @click="addTenant(idx)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <div class="mx-5 mb-8 text-xs">
      <span v-if="limitPeople">
        此房源最多可供
        {{ limitPeople }}
        人入住（不包括嬰幼兒）。
      </span>
      <span v-if="isAcceptPet">
        如果會攜帶超過 2 隻寵物，請事先通知房東。
      </span>

      <span v-else> 不接受寵物入住。 </span>
    </div>

    <div @click="tenantCard_visible = false">
      <TextBtnDialog :title="'關閉'" class="mx-5 flex justify-end" />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'roomCardTenant',

  props: {
    limitPeople: {
      types: Number,
      required: true,
    },
    isAcceptPet: {
      types: Boolean,
      required: true,
    },
    elevation: {
      types: Number,
    },
  },

  data() {
    return {}
  },
  computed: {
    tenants() {
      return this.$store.state.tenants
    },
    tenantCard_visible: {
      get() {
        return this.$store.state.tenantCard_visible
      },
      set(v) {
        this.$store.commit('toggleTenantCardBtn', v)
      },
    },
  },
  methods: {
    addTenant(idx) {
      this.$store.commit('addTenant', idx)
    },
    reduceTenant(idx) {
      this.$store.commit('reduceTenant', idx)
    },
    isAddBtnDisable(idx) {
      if (idx === 2) {
        if (this.tenants[idx].quantity > 4) return true
      } else if (idx === 3) {
        if (this.isAcceptPet) {
          if (this.tenants[idx].quantity > 4) return true
        } else {
          return true
        }
      } else {
        if (
          this.tenants[0].quantity + this.tenants[1].quantity >
          this.limitPeople - 1
        )
          return true
      }
    },
    isReduceBtnDisable(idx) {
      if (idx == 0) {
        if (this.tenants[idx].quantity < 2) return true
      } else if (idx != 0) {
        if (this.tenants[idx].quantity < 1) return true
      }
    },
  },
}
</script>
