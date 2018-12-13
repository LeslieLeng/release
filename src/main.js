import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import $ from 'jquery'
import echarts from 'echarts'
Vue.prototype.$echarts=echarts

import store from './router/store'
axios.defaults.baseURL = 'http://172.16.3.79:8000/myapp'
import axios from 'axios'
Vue.prototype.axios=axios
import '../static/icon/iconfont.css'
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'
//Vue.use(Viewer) 默认配置写法
// Vue.use(Viewer, {
//   defaultOptions: {
//     zIndex: 9999
//   }
// })




// import { Tabbar, TabItem } from 'mint-ui';

// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);


//二级路由

Vue.use(VueResource)
Vue.use(ElementUI)

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode:"history"
})
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  
})
