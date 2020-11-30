<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <div class="px-3 py-1">
        <v-text-field v-model="localeValue" :label="label" placeholder=" "></v-text-field>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click.native="cancel">Annuler</v-btn>
        <v-btn color="primary" depressed @click.native="agree">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
/********************************
 Vuetify inputdialog component
*******************************

 Insert component where you want to use it:
  <inputdialog ref="inputdialog"></inputdialog>

 import component:
  import inputdialog from '@/components/Inputdialog.vue'
 ...
 declare it:
  components: { inputdialog },

 Call it:
  this.$refs.inputdialog.open('title','label', 'initialValue').then((value) => {})
 Or use await:
  let returnval = await this.$refs.inputdialog.open('title','label', 'initialValue')

 -----TypeScript EXAMPLE in App.vue -----
  <script lang="ts">
  import Vue from 'vue'
  import inputdialog from '@/components/Inputdialog.vue'
  interface Inputdialog extends Vue {
    openinputdialog(title: string, message: string, initialValue: string): Promise<string> | Promise<boolean>
  }
  declare module 'vue/types/vue' {
    interface Vue {
      $inputdialog: (title: string, message: string, initialValue: string) => Promise<string> | Promise<boolean>
    }
  }
  export default Vue.extend({
    name: 'App',
    components: { inputdialog },
    mounted() {
      this.$root.$inputdialog = (title: string, message: string, initialValue: string) => (this.$refs.inputdialog as Inputdialog).openinputdialog(title, message, initialValue)
    }
  }

  in your .vue file:
    let returnval = await this.$root.$inputdialog('Save', 'filename', this.filename)
 */
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    dialog: false,
    resolve: null as any,
    reject: null as any,
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
    open(title: string, label: string, initialValue: string): Promise<string> | Promise<boolean> {
      this.dialog = true
      this.title = title
      this.label = label
      this.initialValue = initialValue
      this.localeValue = initialValue
      return new Promise<string>((resolve, reject) => {
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
})
</script>
