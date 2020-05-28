<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <div class="px-3 py-1">
        <v-text-field v-model="localeValue" :label="label" placeholder=" "></v-text-field>
      </div>
      <v-card-actions>
        <v-btn text @click.native="cancel">Annuler</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click.native="agree">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
/**
 * Vuetify inputdialog component
 *
 * Insert component where you want to use it:
 *  <inputdialog ref="inputdialog"></inputdialog>
 *
 * import component:
 *  import inputdialog from '@/components/Inputdialog'
 * ...
 * declare it:
 *  components: { inputdialog },
 *
 * Call it:
 *  this.$refs.inputdialog.open('title','label', 'initialValue').then((value) => {})
 * Or use await:
 *  let returnval = await this.$refs.inputdialog.open('title','label', 'initialValue')
 *
 */

export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    title: '',
    label: '',
    initialValue: '',
    localeValue: '',
    options: {
      color: 'primary',
      width: 290,
      zIndex: 200
    }
  }),
  methods: {
    open(title, label, initialValue) {
      this.dialog = true
      this.title = title
      this.label = label
      this.initialValue = initialValue
      this.localeValue = initialValue
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(this.localeValue)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.localeValue = this.initialValue
      this.dialog = false
    }
  }
}
</script>
