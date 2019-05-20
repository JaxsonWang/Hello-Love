import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasBGM: true,
  },
  mutations: {
    changeBGM(state) {
      state.hasBGM = !state.hasBGM;
    }
  },
  actions: {}
});
