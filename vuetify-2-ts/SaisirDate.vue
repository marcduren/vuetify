<template>
  <div :style="{ width: width + 'px' }" :class="{ separateur: separateur }">
    <v-menu v-model="pickerVisible" :close-on-content-click="false" :nudge-right="5" transition="none" offset-y :max-width="pickerWidth" :min-width="pickerWidth">
      <template v-slot:activator="{}">
        <v-text-field v-bind="$attrs" v-model="dateInterne" v-on="listeners" @click:append="afficherPicker" append-icon="mdi-calendar" @change="validerDateTexte"></v-text-field>
      </template>
      <v-date-picker v-model="dateISO" locale="fr" first-day-of-week="1" show-adjacent-months>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="pickerVisible = false"> Annuler </v-btn>
        <v-btn text color="primary" @click="validerDate"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SaisirDate',
  inheritAttrs: false,
  props: {
    width: {
      type: [Number, String],
      required: false,
      default: 150
    },
    pickerWidth: {
      type: [Number, String],
      required: false,
      default: 290
    },
    labelBold: Boolean,
    separateur: Boolean,
    value: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: 'mdi-calendar-edit'
    }
  },
  data: () => ({
    pickerVisible: false,
    dateInterne: '', // date jj/mm/aaaa
    dateISO: '', // yyy-mm-dd
    erreur: false
  }),
  watch: {
    value() {
      if (typeof this.value === 'string' && this.value.includes('-')) {
        const [year, month, day] = this.value.split('-').map((item) => parseInt(item))
        if (day > 0 && month > 0 && year > 0) {
          this.dateInterne = `${day}/${month}/${year}`
          this.defDateISO(this.dateInterne || '', true)
        }
      } else {
        this.dateInterne = this.value || ''
        this.defDateISO(this.dateInterne, true)
      }
    },
    dateInterne() {
      const datep = this.dateISO
      this.defDateISO(this.dateInterne || '', true)
      if (datep != this.dateISO) {
        this.$emit('input', this.dateISO)
      }
    }
  },
  computed: {
    listeners() {
      // répond aux évènements du parent , supprime @change et @input
      const l = { ...this.$listeners }
      delete l.input
      delete l.change
      return l
    }
  },
  methods: {
    afficherPicker() {
      if (!this.$attrs.readonly) {
        this.defDateISO(this.dateInterne || '', true)
        this.pickerVisible = true
      }
    },
    validerDate() {
      this.pickerVisible = false
      this.$emit('input', this.dateISO)
      this.$emit('change', this.dateISO)
      const [year, month, day] = this.dateISO.split('-')
      this.dateInterne = `${day}/${month}/${year}`
    },
    validerDateTexte() {
      this.defDateISO(this.dateInterne || '', true)
      this.$emit('change', this.dateISO)
    },
    effacerDate() {
      this.dateInterne = ''
      this.dateISO = ''
      this.$emit('input', this.dateISO)
    },
    defDateISO(dte: string, formatStrict: boolean) {
      if (dte == '' || dte === null) {
        this.dateISO = ''
        return ''
      }
      const [day, month, year] = dte.split('/').map((item) => parseInt(item))
      if (day > 0 && month > 0 && year > 0) {
        if (formatStrict) {
          const mm = (month < 10 ? '0' : '') + month
          const dd = (day < 10 ? '0' : '') + day
          this.dateISO = `${year}-${mm}-${dd}`
        } else {
          this.dateISO = `${year}-${month}-${day}`
        }
      }
    },
    majDates() {
      if (typeof this.value === 'string') {
        const [year, month, day] = this.value.split('-').map((item) => parseInt(item))
        if (day > 0 && month > 0 && year > 0) {
          this.dateISO = `${year}-${month}-${day}`
          this.dateInterne = `${day}/${month}/${year}`
        }
      }
      if (this.value === null) {
        this.dateISO = ''
        this.dateInterne = ''
      }
    }
  },
  mounted() {
    this.majDates()
  }
})
</script>
