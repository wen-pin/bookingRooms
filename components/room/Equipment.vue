<template>
  <DivideBlock>
    <div class="my-10">
      <div class="text-2xl font-bold">
        {{ $t('有提供的設備與服務') }}
      </div>

      <v-row class="w-[80%] mt-2">
        <v-col
          v-for="item in fetchEqptAndServices(eqptAndServices)"
          :key="item.id"
          cols="6"
          class="flex pb-0"
        >
          <SvgIcon :iconClass="item.svgTitle" class="mr-2" />
          <div>
            {{ item.title }}
          </div>
        </v-col>
      </v-row>

      <v-btn outlined class="mt-10" height="55px" @click="dialog = true">
        <span class="text-lg">
          顯示全部{{ eqptAndServices.length }}項設備與服務
        </span>
      </v-btn>

      <v-dialog v-model="dialog" scrollable width="700">
        <v-card class="rounded-lg p-5">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>

          <v-card-text class="!p-0 my-10 black--text">
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
  methods: {
    fetchEqptAndServices(eqptAndServices) {
      return eqptAndServices.slice(0, 10)
    },
  },
}
</script>
