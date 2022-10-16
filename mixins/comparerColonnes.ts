interface Colonne {
  text: string
  value: string
  type?: string
  width?: string | number
  sortable?: boolean
  selectAll?: boolean
}
import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    colonnes: Colonne[]
    triCroissant: boolean
    triColonne: null | number
    trierColonne(ncol: number, lignes: any[]): void
  }
}

export default Vue.extend({
  data() {
    return {
      colonnes: [] as Colonne[],
      triCroissant: true,
      triColonne: null as null | number
    }
  },
  methods: {
    comparerColonnes(ncol: number, croissant: boolean, a: any, b: any): number {
      // fonction récursive
      if (ncol >= this.colonnes.length) return -1
      const colonne = this.colonnes[ncol].value
      const type = this.colonnes[ncol].type

      let colA = a[colonne]
      let colB = b[colonne]
      if (type == 'date') {
        if (a[colonne] > '') {
          const [j1, m1, a1] = a[colonne].split('/')
          colA = a1 + '-' + m1 + '-' + j1
        } else {
          colA = '9999-99-99'
        }
        if (b[colonne] > '') {
          const [j2, m2, a2] = b[colonne].split('/')
          colB = a2 + '-' + m2 + '-' + j2
        } else {
          colB = '9999-99-99'
        }
      }
      if (type == 'number') {
        colA = parseFloat(a[colonne])
        colB = parseFloat(b[colonne])
      } else {
        colA = String(colA).toUpperCase()
        colB = String(colB).toUpperCase()
      }
      if (colA > colB) {
        return croissant ? 1 : -1
      }
      if (colA < colB) {
        return croissant ? -1 : 1
      }
      return this.comparerColonnes(ncol + 1, croissant, a, b)
    },
    trierColonne(ncol: number, lignes: any[]): void {
      if (this.triColonne == ncol) {
        this.triCroissant = !this.triCroissant
      } else {
        this.triCroissant = true
      }
      this.triColonne = ncol
      lignes.sort((a: any, b: any) => {
        return this.comparerColonnes(ncol, this.triCroissant, a, b)
      })
    }
  }
})
