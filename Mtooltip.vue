<!--
<tooltip content="Ceci est un tooltip">
  <button>Survolez-moi</button>
</tooltip>
-->
<template>
  <div class="tooltip-container">
    <slot></slot>
    <div v-if="showTooltip" class="tooltip">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tooltip',
  props: {
    content: String
  },
  data() {
    return {
      showTooltip: false
    }
  },
  methods: {
    show() {
      this.showTooltip = true
    },
    hide() {
      this.showTooltip = false
    }
  },
  mounted() {
    this.$el.addEventListener('mouseenter', this.show)
    this.$el.addEventListener('mouseleave', this.hide)
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseenter', this.show)
    this.$el.removeEventListener('mouseleave', this.hide)
  }
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1000;
}
</style>
