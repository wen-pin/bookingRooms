<template>
  <DivideBlock>
    <div class="my-8">
      <div class="text-2xl font-bold">
        {{ $t('有提供的設備與服務') }}
      </div>

      <v-row class="mt-2">
        <v-col
          v-for="item in sliceAlleqptAndServices(fetchAlleqptAndServices)"
          :key="item.id"
          :cols="$vuetify.breakpoint.xs ? 12 : 6"
          class="pb-0"
        >
          <div class="flex">
            <SvgIcon
              :iconClass="item.svgTitle"
              :className="'size3'"
              class="mr-3"
            />
            <div>
              {{ item.title }}
            </div>
          </div>
        </v-col>
      </v-row>

      <v-btn outlined class="mt-10" height="55px" @click="dialog = true">
        <span v-if="fetchAlleqptAndServices" class="text-lg">
          顯示全部{{ fetchAlleqptAndServices.length }}項設備與服務
        </span>
      </v-btn>

      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xs"
        transition="dialog-bottom-transition"
        scrollable
        width="700"
      >
        <v-card class="rounded-lg">
          <v-btn icon @click="dialog = false" class="ml-3 mt-2">
            <v-icon v-if="$vuetify.breakpoint.xs" color="black">
              mdi-less-than
            </v-icon>

            <v-icon v-else color="black">mdi-window-close</v-icon>
          </v-btn>

          <v-card-text class="!p-5 mb-10 black--text">
            <div class="text-2xl font-bold">有提供的設備與服務</div>

            <div v-for="items in alleqptAndServices" :key="items.id">
              <div class="text-xl font-bold my-8">
                {{ items.category }}
              </div>

              <CardEqptAndServ
                v-for="item in items.eqptAndServices"
                :key="item.id"
                :title="item.title"
                :subtitle="item.subtitle"
                :svgTitle="item.svgTitle"
                :isSupply="item.isSupply"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomEquipment',

  props: {
    alleqptAndServices: {
      types: Array,
    },
    eqptAndServices: {
      types: Array,
    },
  },

  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    // 不分類別的所有設備及服務
    fetchAlleqptAndServices() {
      const array = []
      this.alleqptAndServices.map((x) =>
        x.eqptAndServices.forEach((element) => array.push(element)),
      )

      return array
    },
  },
  methods: {
    sliceAlleqptAndServices(array) {
      if (this.$vuetify.breakpoint.xs) {
        return array.slice(0, 6)
      } else {
        return array.slice(0, 10)
      }
    },
  },
}
</script>
