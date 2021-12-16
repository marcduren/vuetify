<template>
  <!--
  <Saisirdate label="Du" v-model="jour"></Saisirdate>
  -->
  <v-text-field
    :label="label"
    v-bind:value="datefr"
    v-on:input="onDate($event)"
    :error="erreur"
    :solo="solo"
    :flat="flat"
    :outlined="outlined"
    :dense="dense"
    :clearable="clearable"
    @click:clear="clearDate"
  >
    <template v-slot:append>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="none" offset-y :max-width="width" :min-width="width">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"
            ><v-icon>{{ icon }}</v-icon></v-btn
          >
        </template>
        <v-date-picker v-model="sdate" show-adjacent-months locale="fr" first-day-of-week="1" @input="onPicker"> </v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SaisirDate',
  data: () => ({
    menu: false,
    sdate: '',
    datefr: '',
    erreur: false
  }),
  created() {
    this.sdate = this.value
    if (this.value) {
      const [year, month, day] = this.value.split('-')
      if (year && month && day) {
        this.datefr = `${day}/${month}/${year}`
      }
    } else {
      this.datefr = ''
    }
  },
  watch: {
    value() {
      this.sdate = this.value
      this.toFrench()
    }
  },
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 290
    },
    icon: {
      type: String,
      default: 'mdi-calendar-edit'
    },
    solo: Boolean,
    flat: Boolean,
    outlined: Boolean,
    clearable: Boolean,
    dense: Boolean
  },
  methods: {
    toFrench() {
      if (this.sdate == null) {
        return ''
      }
      const [year, month, day] = this.sdate.split('-')
      if (year && month && day) {
        this.datefr = `${day}/${month}/${year}`
      }
    },
    onDate(dte: string) {
      if (!dte) {
        this.sdate = ''
        return
      }
      const [day, month, year] = dte.split('/')
      if (year && month && day) {
        const s = `${year}-${month}-${day}`
        const d = Date.parse(s)
        if (!isNaN(d)) {
          this.sdate = s
          this.datefr = dte
          this.$emit('input', this.sdate)
          this.erreur = false
        } else {
          this.erreur = true
        }
      }
    },
    onPicker() {
      this.menu = false
      this.toFrench()
      this.$emit('input', this.sdate)
    },
    clearDate() {
      this.sdate = ''
      this.$emit('input', this.sdate)
    }
  }
})
</script>
