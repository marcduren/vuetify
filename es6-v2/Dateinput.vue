<template>
  <!--
  <Dateinput label="Du" v-model="jour"></Dateinput>
  -->
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    :max-width="width"
    :min-width="width"
  >
    <template v-slot:activator="{ on }">
      <v-text-field :label="label" v-bind:value="dateFR" :prepend-icon="icon" readonly v-on="on" hide-details />
    </template>
    <v-date-picker v-model="sdate" scrollable locale="fr" first-day-of-week="1">
      <v-spacer />
      <v-btn depressed @click="cancelHandler">Annuler</v-btn>
      <v-btn depressed color="primary" @click="okHandler">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      menu: null,
      sdate: null
    }
  },
  created() {
    this.sdate = this.value
  },
  watch: {
    value() {
      this.sdate = this.value
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
      default: 'mdi-calendar'
    }
  },
  computed: {
    dateFR() {
      if (this.sdate === null) return null
      const [year, month, day] = this.sdate.split('-')
      return `${day}/${month}/${year}`
    }
  },
  methods: {
    okHandler() {
      this.menu = false
      this.$emit('input', this.sdate)
    },
    cancelHandler() {
      this.menu = false
      this.sdate = this.value
    }
  }
}
</script>
