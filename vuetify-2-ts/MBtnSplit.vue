<template>
  <div class="btn-split">
    <v-btn v-bind="$attrs" @click="$emit('click', null)" :class="btnClass" style="margin-right: 0; border-top-right-radius: 0; border-bottom-right-radius: 0">
      <slot></slot>
    </v-btn>
    <v-menu offset-y left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" v-bind="$attrs" :class="btnClass" style="margin-left: 1px; min-width: 32px; border-top-left-radius: 0; border-bottom-left-radius: 0; padding-left: 4px; padding-right: 4px">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="handleItemClick(item)">
          <v-icon v-if="item.icon" v-text="item.icon" :color="item.icon_color"></v-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'MBtnSplit',
  props: {
    items: {
      type: Array as PropType<{ text: string; value: string | number; icon: null | string; icon_color: null | string }[]>,
      required: true
    },
    btnClass: {
      type: Object
    }
  },
  methods: {
    handleItemClick(item: { text: string; value: string | number }) {
      this.$emit('click', item.value)
    }
  }
})
</script>

<style scoped></style>
