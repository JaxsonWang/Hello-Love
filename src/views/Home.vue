<template>
  <div class="open-mail">
    <div v-if="open" class="open-content" @click="openAction">
      <h3 class="title">致 Souler 一封信</h3>
      <p class="desc">轻启</p>
      <canvas ref="mail" class="canvas-mail" />
    </div>
    <card v-else />
  </div>
</template>

<script>
import Card from '@/components/Card'
import { mailCanvas } from '@/utils/canvas'

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      open: true
    }
  },
  mounted() {
    if (this.$refs.mail) mailCanvas(this.$refs.mail)
  },
  methods: {
    /**
     * 打开信封
     */
    openAction() {
      this.open = false
    }
  }
}
</script>
<style lang="scss">
.open-mail {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .open-content {
    position: relative;
    text-align: center;
    width: 40rem;
    height: 26rem;
    cursor: pointer;

    .title {
      font-size: 4rem;
      font-weight: bold;
      margin-top: 8rem;
    }

    .desc {
      font-size: 3rem;
    }

    .canvas-mail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
