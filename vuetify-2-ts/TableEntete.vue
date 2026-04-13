<template inheritsAttr="false">
  <tr class="table-entete" v-bind="$attrs">
    <table-colonne v-for="(col, l) in colonnes" :key="l" @trier="trier" v-model="colonnes[l]" :numero="l" class="grey lighten-3" :class="colClass(col)"> </table-colonne>
  </tr>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, defineComponent, watch } from 'vue'
import type { PropType } from 'vue'
import type { Colonne } from './TableEntete'
import TableColonne from './TableColonne.vue'

defineComponent({
  name: 'TableEntete',
  inheritAttrs: false
})
const props = defineProps({
  value: {
    type: Array as PropType<Colonne[]>,
    default: () => {
      return []
    }
  },
  sticky: { type: Boolean, default: false }
})
const emit = defineEmits(['trier', 'selectionnerTout', 'largeurColonne', 'update'])
let colonnes = ref<Colonne[]>(props.value)

/*--------Data-----------*/
let colonneATrier = -1
let ordreCroissant = ref(true)
let selectionnerToutInterne = ref(false)

/*--------Methods-----------*/
function trier(col: number) {
  if (colonneATrier == col) {
    ordreCroissant.value = !ordreCroissant.value
  } else {
    ordreCroissant.value = true
  }
  if (colonneATrier > -1) {
    colonnes.value[colonneATrier].sel = false
  }
  colonneATrier = col
  colonnes.value[colonneATrier].sel = true
  emit('update', colonnes)
  emit('trier', col, ordreCroissant.value, colonnes.value)
}
function colClass(c: Colonne): string {
  let cl = ''
  if (c.classe) cl += c.classe
  if (props.sticky) cl += ' sticky'
  return cl
}

watch(
  () => props.value,
  () => {
    colonnes.value = props.value
  }
)
</script>

<style scoped>
.table-entete th {
  padding: 4px 0px;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 5;
}

</style>
<!--
  ** usage **

<template>
  <TableEntete v-model="colonnes" sticky v-on:trier="onTrierColonne" v-on:selectionnerTout="selectionner"></TableEntete>
</template>
<script lang="ts" setup>
import TableEntete from '../components/TableEntete.vue'
import { Colonne, comparerColonnes } from '../components/TableEntete'

let lignes: ref([{coulee_date:'2023-12-02','coulee_num':'123456'},{...}])
let colonnes = [
  {texte:'Date de coulée',lg:200,valeur:'coulee_date',type:'date',triable:true},
  {texte:'Numéro coulée',lg:100,valeur:'coulee_num',type:'number',triable:true},
  {...}
]
function onTrierColonne(ncol: number,croissant:boolean): void {
  this.lignes.value.sort((a: any, b: any) => {
    return comparerColonnes(colonnes, ncol, croissant, a, b)
  })
}

</script>
-->
