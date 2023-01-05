<template>
  <DivideBlock>
    <div class="my-5 flex justify-between">
      <div>
        <div class="text-2xl font-bold">{{ landlord }} 出租的農場住宿</div>

        <span v-if="limitPeople">{{ limitPeople }}位 </span>
        <span v-if="bedroom">{{ bedroom }}間臥室 </span>
        <span v-if="bed">{{ bed }}張床</span>
        <span v-if="bathroom">{{ bathroom }}間衛浴 </span>
        <span v-if="sharedBathroom"> {{ sharedBathroom }}間共用衛浴 </span>
      </div>

      <v-avatar size="56px" @click="$vuetify.goTo(target, options)">
        <img alt="Avatar" :src="avaterSrc" class="cursor-pointer" />
      </v-avatar>
    </div>
  </DivideBlock>
</template>

<script>
export default {
  name: 'roomInfoTitle',

  props: {
    landlord: {
      types: String,
      required: true,
    },
    limitPeople: {
      types: Number,
      required: true,
    },
    bedroom: {
      types: Number,
      required: true,
    },
    bed: {
      types: Number,
      required: true,
    },
    bathroom: {
      types: Number,
      required: true,
    },
    sharedBathroom: {
      default: null,
    },
    avaterSrc: {
      types: String,
      required: true,
    },
  },

  data() {
    return {}
  },
}
</script>
