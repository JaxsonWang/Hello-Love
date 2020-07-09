<template>
  <div v-if="loading" class="loading-area">
    <wired-spinner spinning />
    <span class="tips">正在加载数据中...</span>
  </div>
</template>

<script>
import WiredSpinner from 'wired-spinner'

export default {
  name: 'Loading',
  components: {
    WiredSpinner
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    window.onload = event => {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.loading-area {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tips {
    font-size: 2rem;
  }
}
</style>
