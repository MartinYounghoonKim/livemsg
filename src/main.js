import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
