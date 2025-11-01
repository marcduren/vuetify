<template>
  <div>
    <div v-if="estActive" disabled
      style="position: fixed; left: 0; right: 0; top: 0; bottom: 0; background-color: #000; opacity: 0.2"
      :style="{ 'z-index': zindex }" @click="onClickOut"></div>
    <div v-if="estActive" class="elevation-6" style="position: fixed" :style="{
      'z-index': zindex + 1,
      width: pageWidth,
      height: pageHeight,
      left: left + 'px',
      top: top + 'px',
    }" :id="unique_id" v-bind="$attrs">
      <div style="display: flex; flex-direction: column; height: 100%">
        <v-toolbar class="shrink deplacable" :color="couleurTitre" :light="themeTitre == 'light'"
          :dark="themeTitre == 'dark'" density="compact" @mousedown="handleMouseDown">
          <v-toolbar-title>{{ titre }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="onFermer"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <div style="overflow: auto" class="fill-height">
          <div class="fill-height" :class="[couleur, defaultpadding]">
            <slot></slot>
          </div>
        </div>
        <template v-if="m_btns.valider || m_btns.annuler || m_btns.supprimer">
          <div class="shrink pa-2 d-flex dlg-actions" :class="couleur">
            <v-btn variant="tonal" class="mx-1" rounded color="red" v-if="m_btns.supprimer" @click="onSupprimer"
              :disabled="!m_btns.supprimer.actif"><v-icon>mdi-delete-outline</v-icon>{{ m_btns.supprimer.texte
              }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mx-1" variant="flat" rounded color="grey-lighten-2" v-if="m_btns.annuler" @click="onFermer"
              :disabled="!m_btns.annuler.actif">{{ m_btns.annuler.texte }}</v-btn>
            <v-btn class="mx-1" variant="flat" rounded color="primary" v-if="m_btns.valider" @click="onValider"
              :disabled="!m_btns.valider.actif">{{ m_btns.valider.texte }}</v-btn>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, onMounted, watch, useAttrs, computed } from 'vue'

const estActive = defineModel({ type: Boolean })
defineOptions({
  inheritAttrs: false
})

const pileFenetres = [] as string[]
type Bouton = {
  texte: string
  actif: boolean
}
export type Boutons = {
  valider?: Bouton
  annuler?: Bouton
  supprimer?: Bouton
}

const props = defineProps({
  titre: {
    type: String,
    required: true
  },
  boutons: {
    type: [Object, Array] as PropType<Boutons | string[]>, // ex { valider: { texte: '✔Valider', actif: true }} ou ['valider','annuler']
    default: () => {
      return ['annuler', 'valider']
    }
  },
  width: {
    type: Number,
    default: 900
  },
  height: {
    type: Number,
    default: -1
  },
  couleur: {
    type: String,
    default: 'bg-grey-lighten-4'
  },
  couleurTitre: {
    type: String,
    default: 'primary'
  },
  themeTitre: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark'
  },
  defaultpadding: { type: String, default: 'pa-3' }
})
const emit = defineEmits(['change', 'update:modelValue', 'valider', 'supprimer', 'annuler'])
const attrs = useAttrs()

// ---------data--------------
const zindex = ref(1005)
const pageWidth = computed(() => { return props.width > -1 ? props.width + 'px' : 'auto' })
const pageHeight = computed(() => { return props.height > -1 ? props.height + 'px' : 'auto' })
const left = ref(100)
const top = ref(100)
const unique_id = `${new Date().getTime()}-${Math.random().toString(36).substring(7)}`
let xdown = 0
let ydown = 0
const m_btns = ref<Boutons>({})

//----------methods-----------
function onFermer() {
  estActive.value = false
  emit('annuler')
}
function onValider() {
  emit('valider')
}
function onSupprimer() {
  emit('supprimer')
}
function onClickOut() {
  if ('persistent' in attrs) return
  onFermer()
}
function centrer() {
  const vnode = document.body
  const rect = vnode.getBoundingClientRect()
  left.value = (rect.width - Number(props.width)) / 2
  const fen = document.getElementById(unique_id)
  if (fen) {
    const rectDlg = fen?.getBoundingClientRect()
    top.value = (rect.height - Number(rectDlg?.height)) / 2
  } else {
    top.value = 10
  }
}
function handleMouseMove(e: MouseEvent) {
  left.value = e.screenX - xdown
  top.value = e.screenY - ydown
  if (top.value < 0) top.value = 0
  if (top.value + 100 > window.innerHeight) top.value = window.innerHeight - 100
  if (left.value < 0) left.value = 0
  if (left.value + props.width > window.innerWidth) left.value = window.innerWidth - props.width
}
function handleMouseUp() {
  window.removeEventListener('mousemove', handleMouseMove, false)
  window.removeEventListener('mouseup', handleMouseUp, false)
}
function handleMouseDown(e: MouseEvent) {
  // To prevent selection while moving cursor
  e.preventDefault()

  xdown = e.screenX - left.value
  ydown = e.screenY - top.value
  window.addEventListener('mousemove', handleMouseMove, false)
  window.addEventListener('mouseup', handleMouseUp, false)
}
function onKeydown(e: KeyboardEvent) {
  const i = pileFenetres.length
  if (e.code == 'Escape' && i > 0 && pileFenetres[i - 1] == unique_id) {
    // touche Escape et dialogue topmost
    onFermer()
    e.stopPropagation()
  }
}
function majBtns(boutons: Boutons | string[]) {
  if (Array.isArray(boutons)) {
    const btns = {} as Boutons
    if (boutons.includes('valider')) btns['valider'] = { texte: '✔Valider', actif: true }
    if (boutons.includes('annuler')) btns['annuler'] = { texte: '✘Annuler', actif: true }
    if (boutons.includes('supprimer')) btns['supprimer'] = { texte: 'Supprimer', actif: true }
    m_btns.value = { ...btns }
  } else {
    m_btns.value = { ...boutons }
  }
}
//-------------mounted----------------

onMounted(() => {
  majBtns(props.boutons)
  centrer()
})

//-------------watch-----------
watch(estActive, () => {
  if (estActive.value) {
    window.addEventListener('keydown', onKeydown)
    pileFenetres.push(unique_id)
    zindex.value = 1005 + pileFenetres.length * 2
    window.focus()
  } else {
    window.removeEventListener('keydown', onKeydown)
    pileFenetres.pop()
  }
})
watch(
  () => props.boutons,
  (boutons) => majBtns(boutons),
)
</script>
<style scoped>
.deplacable {
  cursor: grab;
}

.v-application .dlg-actions {
  border-top: 1px solid #d0d0d0 !important;
}
</style>
