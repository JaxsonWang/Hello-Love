<template>
  <div class="home">
    <div class="sm-notice sm-hidden" ref="smNoticeRef">
      <wired-card elevation="3">
        {{ noticeItem }}
      </wired-card>
    </div>
    <div v-if="isLoading" class="sm-spinner">
      <div class="spinner-title">正在加载数据中...</div>
      <wired-spinner spinning/>
    </div>
    <div class="container">
      <div class="setting">
        <wired-button elevation="3" class="sm-btn text-center" @click="closeBGM">{{ hasBGM ? "关闭音乐" : "开启音乐" }}</wired-button>
      </div>
      <div v-if="!isTask" class="sm-init animated infinite pulse delay-2s" @click="taskGo">
        <canvas id="mail" ref="mail"></canvas>
        <div class="title">
          <h3 class="text-center">致 Souler 一封信</h3>
          <h4 class="text-center">轻启</h4>
        </div>
      </div>
      <div v-else class="sm-content" ref="smContentRef">
        <wired-card elevation="3" class="sm-card" ref="smCardRef">
          <div class="title">{{currentConent.title}}</div>
          <div id="typed-strings" class="hideContent content">{{currentConent.content}}</div>
          <div id="typed" class="showContent content" ref="typedRef"></div>
        </wired-card>
        <div class="sm-nav text-center">
          <wired-button v-if="currentNum !== 0" elevation="3" class="sm-btn text-center" @click="smPrev" :disabled="smNavBtn">上一封</wired-button>
          <wired-button v-if="currentNum !== totalNum - 1" elevation="3" class="sm-btn text-center" @click="smNext" :disabled="smNavBtn">下一封</wired-button>
        </div>
      </div>
    </div>
    <div id="canvas" class="sm-canvas" ref="canvas"></div>
    <canvas v-show="isTask" id="love" ref="love" @click="showNitice" @touchstart="touchStart" @touchend="clearLoop"></canvas>
    <audio :src="bgmJSON.url" autoplay loop :type="`audio/${bgmJSON.type}`" ref="bgmRef">
      Your browser does not support the <code>audio</code> element.
    </audio>
    <div class="sm-footer">
      <div class="list">本页面所有资源除字体之外，遵循 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="nofollow" target="_blank">CC BY-NC-SA 4.0</a> 许可协议</div>
      <div class="list">字体请参考<a href="http://www.foundertype.com/index.php/About/powerAllowPro.html" target="_blank" rel="nofollow">方正字库个人非商业授权</a></div>
      <div class="list">如有资源侵权请联系我：<a href="mailto:i@iiong.com" target="_blank">i@iiong.com</a></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  import {initCanvas, loveCanvas, mailCanvas} from '@/utils/canvas';
  import WiredCard from 'wired-card';
  import WiredButton from 'wired-button';
  import WiredSpinner from 'wired-spinner';

  import SMConfig from '../../sm.config';

  export default {
    name: "home",
    components: {
      WiredCard,
      WiredButton,
      WiredSpinner,
    },
    data() {
      return {
        bgmJSON: {},
        isTask: false,
        smNavBtn: true,
        smContent: SMConfig.smContent,

        currentNum: 0, // 当前条数
        totalNum: 0, // 总条数
        currentConent: {}, // 当前数据

        typedObj: null,
        isLoading: true,

        noticeList: ['这里没有彩蛋了，放弃吧！', '你点这个心干什么呢？', '好玩吗？', '别点了，真的没啥了！', '好了好了，别皮了！', '好吧，你赢了，真没啥了！0.0'],
        noticeItem: '这里是占位符',

        touchStartLoop: null,
      }
    },
    computed: mapState([
      'hasBGM',
    ]),
    methods: {
      /**
       * 爱心点击
       */
      loveFun() {
        const self = this;
        self.$nextTick(function () {
          self.$refs.smNoticeRef.classList.add('animated', 'slideInDown');
          self.$refs.love.classList.add('sm-pointer-events-none'); // 不可点击
          self.$refs.smNoticeRef.classList.remove('sm-hidden');
          setTimeout(function () {
            self.$refs.smNoticeRef.classList.remove('slideInDown');
            self.$refs.smNoticeRef.classList.add('slideOutUp');
          }, 3000);

          // 移除动画类名
          setTimeout(function () {
            self.$refs.smNoticeRef.classList.remove('animated', 'slideInDown', 'slideOutUp');
            self.$refs.smNoticeRef.classList.add('sm-hidden');
            self.$refs.love.classList.remove('sm-pointer-events-none');
          }, 3500);
        })
      },
      /**
       * 随机获取语句
       */
      mathNotice() {
        const self = this;
        self.noticeItem = self.noticeList[Math.floor(Math.random()*6)]  //可均衡获取0到6的随机整数。
      },
      /**
       * 显示弹窗
       */
      showNitice() {
        const self = this;
        self.mathNotice();
        self.loveFun();
      },
      /**
       * 跳转到设置
       */
      closeBGM() {
        const self = this;
        self.$store.commit('changeBGM');
        // 暂停或者播放音乐
        self.hasBGM ? self.$refs.bgmRef.play() : self.$refs.bgmRef.pause();
      },
      /**
       * 打开信封
       */
      taskGo() {
        const self = this;
        self.isTask = true;
        self.initSMContent();

        // 添加动画
        self.$nextTick(function () {
          self.$refs.smContentRef.classList.add('animated', 'bounceInLeft');
        })
      },
      /**
       * 准备数据渲染
       */
      initSMContent() {
        const self = this;
        const Typed = window.Typed;

        self.currentNum = 0;
        self.totalNum = self.smContent.length;

        self.currentConent = self.smContent[self.currentNum];
        // 打字机效果
        self.$nextTick(function () {
          self.typedObj = new Typed('#typed', {
            strings: [self.smContent[self.currentNum].content],
            typeSpeed: 200,
            loop: false,
            showCursor: false,
            onComplete: () => {
              self.smNavBtn = false;
            },
          });
        })
      },
      /**
       * 上一封
       */
      smPrev() {
        const self = this;
        const Typed = window.Typed;

        // 上一页 下一页按钮禁用
        self.smNavBtn = true;

        self.currentNum--;

        // 销毁打字机函数对象
        self.typedObj = null;
        self.$refs.typedRef.innerText = '';

        self.currentConent = self.smContent[self.currentNum];

        // 添加动画
        self.$nextTick(function () {
          self.$refs.smCardRef.classList.add('animated', 'fadeInRight');
          // 移除动画类名
          self.$refs.smCardRef.addEventListener('animationend', function () {
            self.$refs.smCardRef.classList.remove('animated', 'fadeInRight');
          });

          // 打字机效果
          self.typedObj = new Typed('#typed', {
            strings: [self.smContent[self.currentNum].content],
            typeSpeed: 200,
            loop: false,
            showCursor: false,
            startDelay: 1000,
            onComplete: () => {
              self.smNavBtn = false;
            },
          });
        })
      },
      /**
       * 下一封
       */
      smNext() {
        const self = this;
        const Typed = window.Typed;

        // 上一页 下一页按钮禁用
        self.smNavBtn = true;

        self.currentNum++;

        // 销毁打字机函数对象
        self.typedObj = null;
        self.$refs.typedRef.innerText = '';

        self.currentConent = self.smContent[self.currentNum];

        // 添加动画
        self.$nextTick(function () {
          self.$refs.smCardRef.classList.add('animated', 'fadeInLeft');
          // 移除动画类名
          self.$refs.smCardRef.addEventListener('animationend', function () {
            self.$refs.smCardRef.classList.remove('animated', 'fadeInLeft');
          });

          // 打字机效果
          self.typedObj = new Typed('#typed', {
            strings: [self.smContent[self.currentNum].content],
            typeSpeed: 200,
            loop: false,
            showCursor: false,
            startDelay: 1000,
            onComplete: () => {
              self.smNavBtn = false;
            },
          });
        })
      },
      /**
       * 长按事件
       */
      touchStart() {
        const self = this;
        clearInterval(self.touchStartLoop);//再次清空定时器，防止重复注册定时器
        self.touchStartLoop=setTimeout(function(){
          self.noticeItem = '我喜欢你！';
          self.loveFun();
        },3000);
      },
      /**
       * 清除长按定时器
       */
      clearLoop() {
        const self = this;
        clearInterval(self.touchStartLoop);
      },
    },
    created() {
      const self = this;
      if (typeof fetch === "function") {
        fetch(`https://api.imjad.cn/cloudmusic/?type=song&id=${SMConfig.BGMId}&br=128000`)
          .then(function (response) {
            return response.json();
          }).then(function (myJson) {
          if (myJson.code === 200) {
            self.bgmJSON = myJson.data[0];
          } else {
            alert('数据获取失败，请稍后再重试！')
          }
        });
      } else {
        alert('您所用的浏览器不支持数据获取函数，请更换现代浏览器！')
      }
    },
    mounted() {
      const self = this;
      self.$nextTick(function () {
        initCanvas(self, self.$refs.canvas.offsetWidth, self.$refs.canvas.offsetHeight);
        // 窗口重置
        window.onresize = function () {
          initCanvas(self.$refs.canvas.offsetWidth, self.$refs.canvas.offsetHeight);
        };
        loveCanvas(self);
        mailCanvas(self);
      });

      // 延迟加载
      window.onload = function () {
        self.isLoading = false;
      }
    },
  };
</script>
<style lang="scss">
  #love {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
    clip: rect(0px, 60px, 52px, 0);
  }

  .home {
    .sm-init {
      width: 100%;
      position: absolute;
      top: 30%;
      left: 0;
      text-align: center;

      canvas {
        // width: 100%;
        cursor: pointer;
      }

      .title {
        width: 100%;
        position: absolute;
        top: 30%;
        cursor: pointer;

        h3 {
          font-size: 34px;
          font-weight: 600;
        }

        h4 {
          font-size: 20px;
        }
      }
    }

    .sm-content {
      padding-top: 50px;

      .sm-nav {
        margin-top: 20px;

        .sm-btn {
          &:first-child {
            margin-right: 10px;
          }

          &:last-child {
            margin-left: 10px;
          }
        }
      }

      .sm-card {
        .title {
          font-size: 28px;
          font-weight: 600;
          text-align: center;
          border-bottom: 1px dotted #333;
        }

        .content {
          font-size: 20px;
          padding: 10px 15px;
        }

        .showContent {
          position: absolute;
          top: 53px;
          left: 0;
        }

        .hideContent {
          visibility: hidden;
          opacity: 0;
        }
      }
    }

    .setting {
      width: 100%;
      text-align: right;

      .sm-btn {
        margin-top: 50px;
      }
    }

    .sm-spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      z-index: 10;
      background-color: rgba(255, 255, 255, .8);

      .wired-rendered {
        align-self: center;
        margin: 0 auto;
        color: red;
      }

      .spinner-title {
        position: absolute;
        left: 0;
        right: 0;
        top: 20px;
        color: red;
        font-size: 24px;
        font-weight: 600;
      }
    }

    .sm-notice {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      .wired-rendered {
        width: 100%;
      }
    }

    .sm-footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      margin: 0 auto;
      text-align: center;
      .list {
        font-size: 12px;
      }
    }
  }
</style>
