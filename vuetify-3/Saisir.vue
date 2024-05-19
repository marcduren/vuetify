<template>
  <div :style="{ width: width + 'px' }" :class="{ separateur: separateur }" class="mx-1">
    <div class="text-body-2" :class="{ 'font-weight-bold': labelBold }">{{ label }}</div>
    <slot></slot>
    <v-combobox v-bind="$attrs" v-if="control == 'combobox'"></v-combobox>
    <v-text-field v-bind="$attrs" v-if="control == 'textfield'"></v-text-field>
    <v-select v-bind="$attrs" v-if="control == 'select'"></v-select>
    <v-textarea v-bind="$attrs" v-if="control == 'textarea'"></v-textarea>
    <Saisirdate v-bind="$attrs" v-if="control == 'date'"></Saisirdate>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
import Saisirdate from '@/components/SaisirDate.vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  width: {
    type: [Number, String],
    required: false,
    default: 200
  },
  control: String,
  labelBold: { type: Boolean, default: false },
  separateur: { type: Boolean, default: false }
})
</script>
<style scoped>
.separateur {
  border-top: 2px solid #ccc;
  padding-top: 2px;
}
</style>
