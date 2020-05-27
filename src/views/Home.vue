<template>
  <div class="open-mail">
    <div class="open-content" @click="openAction">
      <h3 class="title">致 Souler 一封信</h3>
      <p class="desc">轻启</p>
      <canvas ref="mail" class="canvas-mail" />
    </div>
  </div>
</template>

<script>
import { mailCanvas } from '@/utils/canvas'

export default {
  name: 'Home',
  components: {},
  mounted() {
    mailCanvas(this.$refs.mail)
  },
  methods: {
    openAction() {
      console.log('打开信封')
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
