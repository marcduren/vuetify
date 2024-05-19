<template>
  <thead>
    <tr class="table-entete" v-bind="$attrs">
      <th v-for="(h, l) in headers" :key="l" :width="h.width" class="curseur" :class="colClass(h)" :style="{ 'text-align': h.type == 'number' ? 'right' : 'left' }" @click.stop="trier(l, h.sortable)">
        <span v-html="h.title" />
        <v-icon v-if="h.sortable" class="icontrier" :class="{ visible: colonneATrier == l, 'mdi-flip-v': !ordreCroissant }">mdi-menu-down</v-icon>
      </th>
    </tr>
  </thead>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
export type Colonne = { title: string; value: string; type?: string; width: number; sortable?: boolean; selectAll?: boolean; color?: string }
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  headers: {
    type: Array as PropType<Colonne[]>,
    default: () => {
      return []
    }
  },
  sticky: { type: Boolean, default: false }
})
const emit = defineEmits(['trier'])

/*--------Data-----------*/
let colonneATrier = ref(-1)
let ordreCroissant = true

/*--------Methods-----------*/
function trier(col: number, sortable: boolean | undefined) {
  if (sortable) {
    if (colonneATrier.value == col) {
      ordreCroissant = !ordreCroissant
    } else {
      ordreCroissant = true
    }
    colonneATrier.value = col
    emit('trier', col, ordreCroissant, props.headers)
  }
}
function colClass(c: Colonne): string {
  let cl = ''
  if (c.color) cl += c.color
  if (props.sticky) cl += ' sticky'
  return cl
}
function reset() {
  colonneATrier.value = -1
}
</script>

<script lang="ts">
/* fonction utile pour trier des colonnes récursivement
exemple :
  lignes.sort((a: any, b: any) => {
    return comparerColonnes(colonnes, ncol, true, a, b)
  })
*/
export function comparerColonnes(colonnes: Colonne[], ncol: number, croissant: boolean, a: any, b: any): number {
  // fonction récursive
  if (ncol >= colonnes.length) return -1
  const prop = colonnes[ncol].value //propriété des éléments a et b; comparer a[prop] et b[prop]
  const type = colonnes[ncol].type

  let valeurA = a[prop]
  let valeurB = b[prop]
  if (type == 'date') {
    if (a[prop] > '') {
      const [j1, m1, a1] = a[prop].split('/')
      valeurA = a1 + '-' + m1 + '-' + j1
    } else {
      valeurA = '9999-99-99'
    }
    if (b[prop] > '') {
      const [j2, m2, a2] = b[prop].split('/')
      valeurB = a2 + '-' + m2 + '-' + j2
    } else {
      valeurB = '9999-99-99'
    }
  }
  if (type == 'number') {
    valeurA = parseFloat(a[prop])
    valeurB = parseFloat(b[prop])
  } else {
    valeurA = String(valeurA).toUpperCase()
    valeurB = String(valeurB).toUpperCase()
  }
  if (valeurA > valeurB) {
    return croissant ? 1 : -1
  }
  if (valeurA < valeurB) {
    return croissant ? -1 : 1
  }
  return comparerColonnes(colonnes, ncol + 1, croissant, a, b)
}
</script>
<style scoped>
.table-entete th {
  padding: 6px 4px;
}
.curseur {
  cursor: pointer;
}
.icontrier {
  opacity: 0;
}
th:hover .icontrier,
.icontrier.visible {
  opacity: 1;
}
.sticky {
  position: sticky;
  top: 0;
  background-color: #f8f8f8;
  z-index: 5;
}
</style>
<!--
  ** usage **

<template>
  <TableEntete :headers="colonnes" sticky v-on:trier="onTrierColonne" v-on:selectionnerTout="selectionner"></TableEntete>
</template>
<script lang="ts">
  import TableEntete, { Colonne } from '../components/TableEntete.vue'

  data(){
    lignes: [{coulee_date:'2023-12-02','coulee_num':'123456'},{...}]
    colonnes = [
      {title:'Date de coulée',width:200,value:'coulee_date',type:'date',sortable:true},
      {title:'Numéro coulée',width:100,value:'coulee_num',type:'number',sortable:true},
      {...}
    ]
  }
  methods: {
    onTrierColonne(ncol: number,croissant:boolean): void {
      this.lignes.sort((a: any, b: any) => {
        return comparerColonnes(this.colonnes, ncol, croissant, a, b)
      })
    }
  }
</script>
-->
