<template>
  <div id="app">
    <div ref="app-container" class="app-container">
      <music-btn class="music-btn" />
      <router-view />
    </div>
    <loading />
  </div>
</template>
<script>
import MusicBtn from '@/components/MusicBtn'
import Loading from '@/components/Loading'
import { initCanvas } from '@/utils/canvas'

export default {
  components: {
    MusicBtn,
    Loading
  },
  mounted() {
    initCanvas(this.$refs['app-container'])
  }
}
</script>
<style lang="scss">
html,
body,
#app,
.app-container {
  width: 100%;
  height: 100%;

  .rough-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
