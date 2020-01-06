import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

Vue.use(toast)

FastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

//事件总线(图片加载过慢引起的滚动卡顿问题)
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
