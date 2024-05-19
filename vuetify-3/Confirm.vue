<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel" persistent>
    <v-card>
      <v-card-title class="headline mb-0">{{ title }}</v-card-title>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer />
        <template v-if="options.mode == 'confirm'">
          <v-btn depressed @click="cancel">{{ tr('Non') }}</v-btn>
          <v-btn :color="options.color" dark depressed @click="agree">{{ tr('Oui') }}</v-btn>
        </template>
        <template v-else>
          <v-btn depressed @click="cancel">{{ tr('Fermer') }}</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { ref } from 'vue'
defineOptions({
  inheritAttrs: false
})

let dialog = ref(false)
let fnResolve = (value: boolean | PromiseLike<boolean>) => {}
let message = ref<null | string>('')
let title = ref<null | string>('')
let options = ref({
  color: 'primary',
  width: 290,
  zIndex: 1200,
  mode: 'confirm' // 'info'
})

const appStore = useAppStore()
const tr = appStore.traduire

function agree(): void {
  fnResolve(true)
  dialog.value = false
}
function cancel(): void {
  fnResolve(false)
  dialog.value = false
}

function openDialogConfirm(Title: string, Message: string, Options: object): Promise<boolean> {
  dialog.value = true
  title.value = Title
  message.value = Message
  options.value = Object.assign(options.value, Options)
  return new Promise<boolean>((resolve, reject) => {
    fnResolve = resolve
  })
}
defineExpose({
  openDialogConfirm
})
</script>
