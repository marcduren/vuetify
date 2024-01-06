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
      {text:'Date de coulée',width:200,value:'coulee_date',type:'date',sortable:true},
      {text:'Numéro coulée',width:100,value:'coulee_num',type:'number',sortable:true},
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

<template>
  <thead>
    <tr class="table-entete" v-bind="$attrs">
      <th v-for="(h, l) in headers" :key="l" :width="h.width" class="curseur" :class="colClass(h)" :style="{ 'text-align': h.type == 'number' ? 'right' : 'left' }" @click.stop="trier(l, h.sortable)">
        <span v-html="h.text" />
        <v-icon v-if="h.sortable" class="icontrier" :class="{ visible: colonneATrier == l, 'mdi-flip-v': !ordreCroissant }">mdi-menu-down</v-icon>
        <v-simple-checkbox style="float: right" v-if="h.selectAll" v-model="selectionnerToutInterne" @input="selectionnerTout"></v-simple-checkbox>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Ripple } from 'vuetify/lib/directives'

export type Colonne = { text: string; value: string; type?: string; width: number; sortable?: boolean; selectAll?: boolean; color?: string }

export default Vue.extend({
  name: 'TableEntete',
  props: {
    headers: {
      type: Array as PropType<Colonne[]>,
      default: () => [] as Colonne[]
    },
    sticky: { type: Boolean, default: false }
  },
  directives: { Ripple },
  data() {
    return {
      colonneATrier: -1,
      ordreCroissant: true,
      selectionnerToutInterne: false
    }
  },
  methods: {
    trier(col: number, sortable: boolean | undefined) {
      if (sortable) {
        if (this.colonneATrier == col) {
          this.ordreCroissant = !this.ordreCroissant
        } else {
          this.ordreCroissant = true
        }
        this.colonneATrier = col
        this.$emit('trier', col, this.ordreCroissant, this.headers)
      }
    },
    selectionnerTout() {
      this.$emit('selectionnerTout', this.selectionnerToutInterne)
    },
    reset() {
      this.colonneATrier = -1
    },
    colClass(c: Colonne) {
      let cl = ''
      if (c.color) cl += c.color
      if (this.sticky) cl += ' sticky'
      return cl
    }
  }
})
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
