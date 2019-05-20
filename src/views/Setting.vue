<template>
  <div class="setting">
    <div class="container">
      <div class="sm-content">
        <wired-button elevation="3" class="sm-btn text-center" @click="gotoHome">查看书信</wired-button>
        <wired-card elevation="3" class="sm-card">
          <div class="setting-content">
            <div class="row">
              <div class="col text-center align-self-center title">
                背景音乐
              </div>
              <div class="col text-center align-self-center">
                <wired-toggle :checked="hasBGM" @click="musicCheckedChange"/>
              </div>
            </div>

          </div>
        </wired-card>
      </div>
    </div>
    <div id="canvas" class="sm-canvas" ref="canvas"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  import WiredCard from 'wired-card';
  import WiredToggle from "wired-toggle"
  import WiredButton from 'wired-button';

  import { initCanvas } from '@/utils/canvas';

  export default {
    name: "setting",
    data() {
      return {}
    },
    components: {
      WiredCard,
      WiredToggle,
      WiredButton,
    },
    computed: mapState([
      'hasBGM',
    ]),
    methods: {
      /**
       * 选项改变触发事件
       */
      musicCheckedChange() {
        const self = this;
        self.$store.commit('changeBGM')
      },
      /**
       * 跳转到首页
       */
      gotoHome() {
        const self = this;
        self.$router.push({
          path: '/'
        })
      }
    },
    mounted() {
      const self = this;
      self.$nextTick(function () {
        initCanvas(self, self.$refs.canvas.offsetWidth, self.$refs.canvas.offsetHeight);
        // 窗口重置
        window.onresize = function() {
          initCanvas(self.$refs.canvas.offsetWidth, self.$refs.canvas.offsetHeight);
        };
      });
    },
    destroyed() {
    }
  }
</script>

<style lang="scss">
  #canvas,
  #canvas canvas{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: -1;
  }

  .setting {
    .sm-content {
      padding-top: 50px;
      .sm-btn {
        margin-bottom: 50px;
      }
      .setting-content {
        .title {
          font-size: 24px;
        }
      }
    }

  }
</style>
