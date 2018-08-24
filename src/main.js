// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import md5 from 'js-md5'
import echarts from 'echarts'
import VueTouch from 'vue-touch'

Vue.use(VueTouch,{name:'v-touch'})
Vue.prototype.$echarts=echarts
Vue.prototype.$md5 = md5
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,$,
  components: { App },
  template: '<App/>'
})
