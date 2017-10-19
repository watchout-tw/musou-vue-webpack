// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.config.mode = process.env.PROD_MODE
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: 'main',
  store,
  router,
  template: '<App/>',
  components: { App }
})
