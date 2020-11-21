import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 给事件总线赋值一个vue实例
Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast);

//解决移动端300ms延迟
// FastClick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
