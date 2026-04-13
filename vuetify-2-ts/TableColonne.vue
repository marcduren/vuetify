<template>
  <th :width="colonneModale.lg" style="padding: 4px 0">
    <div class="d-flex">
      <div :style="{ width: colonneModale.lg - 9 + 'px', overflow: 'hidden' }">
        <v-btn text tile style="flex-grow: 1" @click.stop="trier(numero, colonneModale.triable)" :class="colClass()" class="text-none">
          <span v-html="colonneModale.texte"></span>
          <v-icon v-if="colonneModale.triable" class="icontrier" :class="{ visible: colonneModale.sel }">mdi-menu-down</v-icon>
        </v-btn>
        <slot name="extra"></slot>
      </div>
      <div class="sep" @mousedown="mouseDown($event)"></div>
    </div>
  </th>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineComponent, watch } from 'vue'
import type { PropType } from 'vue'
import type { Colonne } from './TableEntete'

defineComponent({
  name: 'TableColonne',
  inheritAttrs: true
})
const props = defineProps({
  value: {
    type: Object as PropType<Colonne>
  },
  numero: {
    type: Number,
    required: true
  },
  sticky: { type: Boolean, default: false }
})
let colonneModale = ref<Colonne>(props.value!)

const emit = defineEmits(['trier'])
let largeurColonne = 0
let xEcran = 0 // position écran lors du click

function trier(l: number, triable?: boolean) {
  if (triable) {
    emit('trier', l)
  }
}
function colClass(): string {
  let cl = ''
  if (colonneModale.value.classe) cl += colonneModale.value.classe
  if (props.sticky) cl += ' sticky'
  if (colonneModale.value.sel) cl += ' font-weight-bold'
  return cl
}
function mouseDown(e: MouseEvent) {
  e.preventDefault()
  largeurColonne = colonneModale.value.lg
  xEcran = e.screenX
  window.addEventListener('mousemove', mouseMove, false)
  window.addEventListener('mouseup', mouseUp, false)
}
function mouseMove(e: MouseEvent) {
  const n = e.screenX - xEcran
  colonneModale.value.lg = Math.max(largeurColonne + n, 32)
}
function mouseUp() {
  window.removeEventListener('mousemove', mouseMove, false)
  window.removeEventListener('mouseup', mouseUp, false)
}

watch(
  () => props.value,
  () => {
    colonneModale.value = props.value!
  }
)
</script>
<style scoped>
div.sep {
  width: 8px;
  cursor: col-resize;
  border-right: 1px solid #aaa;
}
div.sep:hover {
  border-right: 3px solid #aaf;
}
.icontrier {
  opacity: 0;
}
th:hover .icontrier,
.icontrier.visible {
  opacity: 1;
}
</style>
