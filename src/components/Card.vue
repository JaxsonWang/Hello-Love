<template>
  <div class="card-content">
    <div
      v-for="(item, index) in content"
      v-if="currentPage === index"
      :key="index"
      class="card-item"
    >
      <wired-card elevation="5">
        <vue-typed-js
          :strings="[item]"
          :show-cursor="false"
        >
          <p class="typing" />
        </vue-typed-js>
      </wired-card>
    </div>
    <div class="card-pagination">
      <div
        v-if="currentPage !== 0"
        class="card-btn card-prev"
        @click="prev"
      >
        <wired-button elevation="3">
          上一页
        </wired-button>
      </div>
      <div
        v-if="currentPage !== content.length - 1"
        class="card-btn card-next"
        @click="next"
      >
        <wired-button elevation="3">
          下一页
        </wired-button>
      </div>
    </div>
  </div>
</template>

<script>
import WiredButton from 'wired-button'
import WiredCard from 'wired-card'
import wrapTextNumber from '@/utils/text'

export default {
  name: 'Card',
  components: {
    WiredButton,
    WiredCard
  },
  data() {
    return {
      currentPage: 0,
      content: []
    }
  },
  created() {
    this.initContent()
  },
  methods: {
    initContent() {
      this.content = wrapTextNumber(process.env.VUE_APP_CONTENT, 253)
    },
    /**
     * 下一页
     */
    prev() {
      this.currentPage--
    },
    /**
     * 下一页
     */
    next() {
      this.currentPage++
    }
  }
}
</script>

<style lang="scss">
.card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card-item {
    width: 90%;
    font-size: 2rem;
    line-height: 2.5rem;
    background-color: rgba(255, 255, 255, 0.8);

    .wired-rendered,
    .typed-element {
      height: 60vh;
      display: flex;
      align-items: flex-start;
    }
  }

  .card-pagination {
    width: 90%;
    display: flex;
    margin-top: 3rem;
    padding: 1rem;
    justify-content: space-around;
  }
}
</style>
