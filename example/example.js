import Vue from 'vue'
import vueISroll from '../app'
import App from './app.vue'

Vue.use(vueISroll)

new Vue({
  el: '#app',
  render: h => h(App)
})