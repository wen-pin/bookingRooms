<template>
  <DivideBlock>
    <div class="my-10">
      <div class="text-2xl font-bold">
        {{ $t('住宿地點') }}
      </div>

      <v-card outlined width="200px" height="140px" class="p-5 mt-5">
        <div v-if="pattern">
          <SvgIcon
            v-for="i in pattern.bed"
            :key="i"
            :iconClass="'doubleBed'"
            class="mr-2"
          />
        </div>
        <div class="mt-5 mb-1">{{ $t('臥室') }}</div>
        <div v-if="pattern">{{ pattern.bed }}張 雙人床</div>
      </v-card>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomBeds',

  props: {
    pattern: {
      types: Object,
      required: true,
    },
  },

  data() {
    return {}
  },
}
</script>
