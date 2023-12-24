<template>
  <div :style="{ width: width + 'px' }" :class="{ separateur: separateur }" class="mx-1 mb-3">
    <div class="text-body-2" :class="{ 'font-weight-bold': labelBold }">{{ label }}</div>
    <v-combobox v-bind="$attrs" v-on="$listeners"></v-combobox>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MSelectField',
  props: {
    label: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      required: false,
      default: 200
    },
    labelBold: Boolean,
    separateur: Boolean
  }
})
</script>
