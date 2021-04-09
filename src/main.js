import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/sass/index.sass'
import Transitions from 'vue2-transitions'

Vue.use(Transitions)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
