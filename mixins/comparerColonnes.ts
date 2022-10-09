interface Colonne {
  value: string
  type: string
}
import Vue from 'vue'

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
          colA = a1 + '.' + m1 + '.' + j1
        }
        if (b[colonne] > '') {
          const [j2, m2, a2] = b[colonne].split('/')
          colB = a2 + '.' + m2 + '.' + j2
        }
      }
      if (type == 'number') {
        colA = parseFloat(a[colonne])
        colB = parseFloat(b[colonne])
      }
      colA = String(colA).toUpperCase()
      colB = String(colB).toUpperCase()
      if (colA > colB) {
        return croissant ? 1 : -1
      }
      if (colA < colB) {
        return croissant ? -1 : 1
      }
      return this.comparerColonnes(ncol + 1, croissant, a, b)
    },
    trierColonne(ncol: number, lignes: []): void {
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
