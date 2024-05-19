<template>
  <div class="btn-split">
    <v-btn v-bind="$attrs" @click.stop.prevent="clickButton" :class="btnClass" style="margin-right: 0; border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important"><slot></slot></v-btn>
    <v-btn v-bind="$attrs" :class="btnClass" style="margin-left: 1px; min-width: 32px; border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; padding-left: 6px; padding-right: 8px">
      <v-icon>mdi-chevron-down</v-icon>
      <v-menu v-model="afficherMenu" activator="parent" location="bottom end">
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="handleItemClick(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
import type { PropType } from 'vue'
import { ref } from 'vue'

defineProps({
  items: {
    type: Array as PropType<{ title: string; value: string | number; icon: null | string; icon_color: null | string }[]>,
    required: true
  },
  btnClass: {
    type: [Object, String]
  }
})
const emit = defineEmits(['click:item', 'click:button'])
let afficherMenu = ref(false)

// fonctions
function clickButton() {
  emit('click:button')
}
function handleItemClick(item: { title: string; value: string | number }) {
  emit('click:item', item.value)
}
</script>
