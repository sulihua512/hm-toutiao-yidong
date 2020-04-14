import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload, Tabbar, TabbarItem } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'
import { relativeTime } from '@/utils/data-time.js'

// 挂载事件总线
Vue.prototype.$eventBus = new Vue()
Vue.use(Lazyload)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.filter('relativeTime', relativeTime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
