<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel" persistent>
    <v-card>
      <v-card-title class="headline mb-0">{{ title }}</v-card-title>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer />
        <template v-if="options.mode != 'info'">
          <v-btn depressed @click.native="cancel">Non</v-btn>
          <v-btn :color="options.color" dark depressed @click.native="agree">Oui</v-btn>
        </template>
        <template v-else>
          <v-btn depressed @click.native="cancel">Fermer</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.openDialogConfirm('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * Or use await:
 * if (await this.$refs.confirm.openDialogConfirm('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.openDialogConfirm
 * }
 *
 * TypeScript
 * interface IConfirmer extends Vue {
 *   openDialogConfirm(title: string, message: string, options: object): Promise<boolean>
 * }
 * declare module 'vue/types/vue' {
 * // 3. Déclarez l'augmentation pour Vue
 * interface Vue {
 *   $Confirmer: (title: string, message: string, options: object) => Promise<boolean>
 * }
 *
 * mounted() {
 *    this.$root.$Confirmer = (title: string, message: string, options: object) =>
 *      (this.$refs.confirm as IConfirmer).openDialogConfirm(title, message, options)
 * }
 *
 * type PromiseResolve<T> = (value?: T | PromiseLike<T>) => boolean
 * type PromiseReject = (error?: any) => void
 *
 * in your .vue file:
    let returnval = await this.$root.$Confirmer('Delete', 'filename will be deleted')
 */

export default Vue.extend({
  name: 'Confirm',
  data: () => ({
    dialog: false,
    resolve: (value: boolean | PromiseLike<boolean>) => {},
    reject: (reason?: any): void => {},
    message: null as null | string,
    title: null as null | string,
    options: {
      color: 'primary',
      width: 290,
      zIndex: 200,
      mode: 'confirm' // 'info'
    }
  }),
  methods: {
    openDialogConfirm(title: string, message: string, options: object): Promise<boolean> {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise<boolean>((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree(): void {
      this.resolve(true)
      this.dialog = false
    },
    cancel(): void {
      this.resolve(false)
      this.dialog = false
    }
  }
})
</script>
