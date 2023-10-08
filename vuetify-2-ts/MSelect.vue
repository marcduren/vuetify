<script lang="ts">
import { VSelect } from 'vuetify/lib/components'
const optionsMenu = {
  closeOnClick: false,
  closeOnContentClick: false,
  disableKeys: true,
  openOnClick: false,
  maxHeight: 400,
  offsetY: true
}

const MSelect = {
  name: 'MSelect',
  extends: VSelect,
  data() {
    return { lastItem: 300 }
  },
  props: {
    hauteur: {
      type: Number,
      default: 400
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => optionsMenu
    }
  }
}
export default MSelect
</script>
