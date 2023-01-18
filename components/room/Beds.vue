<template>
  <DivideBlock>
    <div class="my-10">
      <div class="text-2xl font-bold">
        {{ $t('住宿地點') }}
      </div>

      <v-card outlined width="200px" height="120px" class="p-5 mt-5">
        <div>
          <SvgIcon :iconClass="'doubleBed'" class="mr-2" />
        </div>
        <div>{{ $t('臥室') }}</div>
        <div v-if="pattern">{{ pattern.bedroom }}張 1.4 米寬雙人床</div>
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
