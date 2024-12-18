<template>
  <div class="d-flex" style="min-width: 150px">
    <v-text-field v-model="dateInterne" readonly v-bind="$attrs" append-inner-icon="mdi-calendar" @click:clear="effacerDate">
      <v-menu v-model="menu" :close-on-content-click="false" transition="none" activator="parent" location="bottom start" min-width="290px">
        <v-date-picker v-model="dateISO" locale="fr" first-day-of-week="1" show-adjacent-months :title="props.title" @update:model-value="msgUpdate"> </v-date-picker>
      </v-menu>
    </v-text-field>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
import { ref, watch, onMounted } from 'vue'
const props = defineProps({
  modelValue: {
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
  },
  title: { type: String, default: '' }
})

let menu = ref(false)
let dateISO = ref<Date>(new Date())
let dateInterne = ref('')

const emit = defineEmits(['update:modelValue'])

/*-----life cycle----- */
watch(
  () => props.modelValue,
  () => {
    majDates()
  }
)

// fonctions
function msgUpdate() {
  menu.value = false
  emit('update:modelValue', `${dateISO.value.getFullYear()}-${dateISO.value.getMonth() + 1}-${dateISO.value.getDate()}`)
}
function majDates() {
  if (typeof props.modelValue === 'string') {
    const [year, month, day] = props.modelValue.split('-').map((item) => parseInt(item))
    if (day > 0 && month > 0 && year > 0) {
      dateInterne.value = `${day}/${month}/${year}`
      dateISO.value = new Date(year, month - 1, day, 12)
    }
  }
  if (props.modelValue === null) {
    dateInterne.value = ''
  }
}
function effacerDate() {
  dateInterne.value = ''
  emit('update:modelValue', dateInterne.value)
}
onMounted(() => {
  majDates()
})
</script>
<!--
  usage
  <Saisirdate label="Du" v-model="jour"></Saisirdate>
-->
