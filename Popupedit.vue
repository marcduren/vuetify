<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on }">
      <slot></slot><v-icon v-on="on" size="18px" color="grey">edit</v-icon>
    </template>
    <v-card>
      <div class="px-3 py-1">
        <v-text-field v-model="localeValue" :label="label"></v-text-field>
      </div>
      <v-card-actions>
        <v-btn flat @click="annuler">&times; Fermer</v-btn>
        <v-btn color="primary" flat @click="valider">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: ['value', 'label'],
  data: () => ({
    menu: false,
    initialValue: '',
    localeValue: ''
  }),
  watch: {
    menu() {
      if (this.menu) {
        this.initialValue = this.value
        this.localeValue = this.value
      }
    }
  },
  methods: {
    annuler() {
      this.menu = false
      this.localeValue = this.initialValue
      this.$emit('cancel', this.value, this.initialValue)
      this.$emit('input', this.initialValue)
    },
    valider() {
      this.menu = false
      this.$emit('input', this.localeValue)
    }
  }
}
</script>
