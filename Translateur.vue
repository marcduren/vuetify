<template>
  <div class="grey lighten-1" style="height:20px;position:relative;" :max-width="width" :min-width="width">
    <v-btn
      class="grey darken-2"
      style="height:20px;position:absolute;"
      :style="{ width: curseur_width + 'px', left: position + 'px' }"
      @mousedown="startDrag"
      @mousemove="doDrag"
      v-bind:value="value"
    ></v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      app: null,
      position: 0,
      clickpos: 0,
      dragging: false,
      curseur_width: 30
    }
  },
  created() {},
  props: {
    value: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 290
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    startDrag(event) {
      this.dragging = true
      this.clickpos = event.clientX - this.position
      this.app.addEventListener('mousemove', this.doDrag, true)
      this.app.addEventListener('mouseup', this.onSliderMouseUp, true)
    },
    stopDrag(event) {
      this.dragging = false
      this.clickpos = 0
    },
    doDrag(event) {
      if (this.dragging) this.setNewCurrentPosition(event)
    },

    setNewCurrentPosition(e) {
      var newPos = e.clientX - this.clickpos
      if (newPos > this.width) newPos = this.width
      if (newPos < 0) newPos = 0
      if (this.position !== newPos) {
        this.position = newPos
        this.$emit('change', Math.floor((this.position / this.width) * this.max))
        this.$emit('input', Math.floor((this.position / this.width) * this.max))
      }
    },
    onSliderMouseUp(e) {
      e.stopPropagation()
      this.dragging = false
      this.app.removeEventListener('mousemove', this.onMouseMove, true)
      this.app.removeEventListener('mouseup', this.onSliderMouseUp, true)
    }
  },
  mounted() {
    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]')
  }
}
</script>
<style lang="stylus"></style>