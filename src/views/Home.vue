<template>
  <div ref="rough-canvas" class="home">
  </div>
</template>

<script>
import { initCanvas } from '@/utils/canvas'

export default {
  name: 'Home',
  components: {
  },
  mounted() {
  	initCanvas(this.$refs['rough-canvas'])
  }
}
</script>
<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
}
</style>
