import 'normalize.css/normalize.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'wired-elements'

import './styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
