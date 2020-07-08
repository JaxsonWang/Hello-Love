<template>
  <div class="card-content">
    <div
      v-for="(item, index) in content"
      v-if="currentPage === index"
      :key="index"
      class="card-item"
    >
      <wired-card elevation="5">
        {{ item }}
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
import wrapTextNumber from '@/utils/text'

export default {
  name: 'Card',
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
      this.content = wrapTextNumber(process.env.VUE_APP_CONTENT, 250)
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
  text-align: center;
  .card-item {
    width: 90%;
    font-size: 2rem;
    line-height: 2.5rem;
    background-color: rgba(255, 255, 255, 0.8);
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
