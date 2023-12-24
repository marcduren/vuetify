<template>
  <div :style="{ width: width + 'px' }" :class="{ separateur: separateur }" class="mx-1 mb-3">
    <div class="text-body-2" :class="{ 'font-weight-bold': labelBold }">{{ label }}</div>
    <v-menu v-model="pickerVisible" :close-on-content-click="false" :nudge-right="5" transition="none" offset-y :max-width="pickerWidth" :min-width="pickerWidth">
      <template v-slot:activator="{}">
        <v-text-field v-bind="$attrs" v-bind:value="dateInterne" v-on:change="dateInterne = $event" v-on="listeners" @click:append="afficherPicker" append-icon="mdi-calendar"></v-text-field>
        <!-- <div v-on="on"></div> -->
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
  name: 'MDateField',
  props: {
    label: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      required: false,
      default: 200
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
      if (this.value.includes('-')) {
        this.dateISO = this.value
        const [year, month, day] = this.value.split('-')
        this.dateInterne = `${day}/${month}/${year}`
      } else {
        this.dateInterne = this.value
        this.defDateISO(this.value, false)
        this.$emit('input', this.dateISO)
      }
    },
    dateInterne() {
      this.defDateISO(this.dateInterne, false)
      this.$emit('input', this.dateISO)
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
      this.defDateISO(this.dateInterne, true)
      this.pickerVisible = true
    },
    validerDate() {
      this.pickerVisible = false
      this.$emit('input', this.dateISO)
      const [year, month, day] = this.dateISO.split('-')
      this.dateInterne = `${day}/${month}/${year}`
    },
    clearDate() {
      this.dateInterne = ''
      this.dateISO = ''
      this.$emit('input', this.dateISO)
    },
    defDateISO(dte: string, formatStrict: boolean) {
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
    }
  },
  mounted() {
    this.dateISO = this.value
    const [year, month, day] = this.dateISO.split('-')
    this.dateInterne = `${day}/${month}/${year}`
  }
})
</script>
