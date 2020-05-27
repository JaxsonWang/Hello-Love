<template>
  <div class="music-btn">
    <wired-button
      :elevation="elevation"
      @click="musicClick"
    >
      {{ musicStatus ? '关闭音乐' : '开启音乐' }}
    </wired-button>
    <audio ref="music-audio" loop autoplay muted>
      <source :src="audio" type="audio/mp3">
      Your browser does not support the <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
import WiredButton from 'wired-button'
import { store } from '@/store'
import musicFile from '../assets/Richard Sanderson - Reality.mp3'

export default {
  name: 'MusicBtn',
  components: {
    WiredButton
  },
  data() {
    return {
      elevation: store.elevation,
      musicStatus: false,
      audio: musicFile
    }
  },
  mounted() {
    this.musicChange()
  },
  methods: {
    /**
     * 音乐切换业务
     */
    musicClick() {
      this.musicStatus = !this.musicStatus
      this.musicChange()
    },
    musicChange() {
      this.musicStatus ? this.$refs['music-audio'].play() : this.$refs['music-audio'].pause()
    }
  }
}
</script>

<style lang="scss">
.music-btn {
  position: absolute;
  top: 5rem;
  right: 5rem;
}
</style>
