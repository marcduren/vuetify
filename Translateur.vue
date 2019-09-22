<template>
  <div class="grey lighten-2" style="height:32px;position:relative;" :style="{ width: width + 'px' }">
    <v-btn
      class="grey darken-2"
      dark
      style="height:30px;position:absolute;cursor:pointer;"
      :style="{ width: curseur_width + 'px', left: position + 'px' }"
      @mousedown="startDrag"
      @mousemove="doDrag"
      v-bind:value="value"
    >
      <slot></slot>
    </v-btn>
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
      curseur_width: 100
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
      if (newPos > this.width - this.curseur_width) newPos = this.width - this.curseur_width
      if (newPos < 0) newPos = 0
      if (this.position !== newPos) {
        this.position = newPos
        this.$emit('change', Math.floor((this.position / (this.width - this.curseur_width)) * this.max))
        this.$emit('input', Math.floor((this.position / (this.width - this.curseur_width)) * this.max))
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