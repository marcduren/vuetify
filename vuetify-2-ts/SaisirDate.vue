<template>
  <!--
  <Saisirdate label="Du" v-model="jour"></Saisirdate>
  -->
  <div class="d-flex">
    <v-text-field v-bind:value="datefr" v-on:input="onDate($event)" @click:append="menu = true" v-bind="$attrs" append-icon="mdi-calendar"></v-text-field>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="5" transition="none" offset-x :max-width="width" :min-width="width">
      <template v-slot:activator="{ on }">
        <div v-on="on"></div>
      </template>
      <v-date-picker v-model="sdate" locale="fr" first-day-of-week="1" @click:append="menu = true" show-adjacent-months>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Annuler </v-btn>
        <v-btn text color="primary" @click="onPicker"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Sizeable from '../../node_modules/vuetify/src/mixins/sizeable'

export default Vue.extend({
  name: 'SaisirDate',
  mixins: [Sizeable],
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
      this.datefr = `${day}/${month}/${year}`
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
    width: {
      type: Number,
      default: 290
    },
    icon: {
      type: String,
      default: 'mdi-calendar-edit'
    }
  },
  methods: {
    toFrench() {
      if (this.sdate == null) {
        return ''
      }
      const [year, month, day] = this.sdate.split('-')
      this.datefr = `${day}/${month}/${year}`
    },
    onDate(dte: string) {
      if (dte > '') {
        const [day, month, year] = dte.split('/')
        var s = `${year}-${month}-${day}`
        var d = Date.parse(s)
        if (!isNaN(d)) {
          if (s != this.sdate) {
            this.$emit('input', s)
          }
          this.sdate = s
          this.datefr = dte
          this.erreur = false
        } else {
          this.erreur = true
        }
      } else {
        if (this.sdate != '') {
          this.$emit('input', '')
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
