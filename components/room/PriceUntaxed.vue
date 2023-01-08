<template>
  <DivideBlock>
    <div class="mb-5">
      <div class="flex justify-between mt-5">
        <TextBtnDialog
          :title="`${$n(
            this.averageRentalCost,
            'currency',
          )}x${calculateDays} 晚`"
        />
        {{ $n(this.calculateRentalCost, 'currency') }}
      </div>

      <div class="flex justify-between mt-2">
        <TextBtnDialog :title="'服務費'" />
        {{ $n(this.calculateServiceCharge, 'currency') }}
      </div>

      <div v-if="calculateCleaningFee !== 0" class="flex justify-between mt-2">
        <TextBtnDialog :title="'清潔費'" />
        {{ $n(this.calculateCleaningFee, 'currency') }}
      </div>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomPriceUntaxed',

  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
