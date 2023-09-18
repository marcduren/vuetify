<!--

<TableEntete :headers="colonnes" sticky v-on:trier="trierColonne" v-on:selectionnerTout="selectionner"></TableEntete>
 <script lang=ts>
    comparerColonnes(ncol: number, croissant: boolean, a: any, b: any): number {
      // fonction récursive
      const colonnes = ['coulee_date', 'coulee_nucom', 'coulee_qte_totale', 'coulee_qte_rebut', 'coulee_num', 'desi_simple', 'nuance', 'norme', 'raison']
      const colonnesType = ['date', 'string', 'number', 'number', 'string', 'string', 'string', 'string', 'string']
      const colonne = colonnes[ncol]
      const type = colonnesType[ncol]
      if (ncol >= colonnes.length) return 1

      let colA = a[colonne]
      let colB = b[colonne]
      if (type == 'date') {
        const [j1, m1, a1] = a[colonne].split('/')
        colA = a1 + '.' + m1 + '.' + j1
        const [j2, m2, a2] = b[colonne].split('/')
        colB = a2 + '.' + m2 + '.' + j2
      }
      if (type == 'number') {
        colA = parseFloat(a[colonne])
        colB = parseFloat(b[colonne])
      }
      if (colA > colB) {
        return croissant ? 1 : -1
      }
      if (colA < colB) {
        return croissant ? -1 : 1
      }
      return this.comparerColonnes(ncol+1, croissant, a, b)
    },
    trierColonne(ncol: number, croissant: boolean): void {
      this.coulees.sort((a: any, b: any) => {
        return this.comparerColonnes(ncol, croissant, a, b)
      })
      this.formaterTableHtml()
    }

 </script>
-->
<template>
  <thead>
    <tr class="table-entete">
      <th v-for="(h, l) in headers" :key="l" :width="h.width" class="curseur" :class="{ trier: h.sortable, sticky: sticky }" align="left" @click.stop="trier(l)">
        <span v-html="h.text" />
        <v-icon class="icontrier" :class="{ visible: colonneTri == l, 'mdi-flip-v': !croissant }">mdi-menu-down</v-icon>
        <v-simple-checkbox style="float: right" v-if="h.selectAll" v-model="selectAll" @input="selectionnerTout"></v-simple-checkbox>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue from 'vue'
import { Ripple } from 'vuetify/lib/directives'

interface Colonne {
  text: string
  width?: string | number
  sortable?: boolean
  selectAll?: boolean
}

export default Vue.extend({
  name: 'TableEntete',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    sticky: { type: Boolean, default: false }
  },
  directives: { Ripple },
  data() {
    return {
      colonneTri: null as null | number,
      croissant: true,
      selectAll: false
    }
  },
  methods: {
    trier(col: number) {
      if (this.colonneTri == col) {
        this.croissant = !this.croissant
      } else {
        this.croissant = true
      }
      this.colonneTri = col
      this.$emit('trier', col, this.croissant)
    },
    selectionnerTout() {
      this.$emit('selectionnerTout', this.selectAll)
    }
  }
})
</script>
<style scoped>
.table-entete th {
  padding: 6px 4px;
}
.trier {
  cursor: pointer;
  padding: 4px 2px;
  color: #666;
  font-weight: bold;
}
.trier:hover {
  color: #000;
}
.curseur {
  cursor: pointer;
}
.icontrier {
  opacity: 0;
}
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
