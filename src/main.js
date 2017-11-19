// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'; // 兼容ie下的promise对象
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from 'element-ui'
import fullpage from 'fullpage.js'
import Axios from 'axios'
import messageBox from './assets/js/login.js'
import './assets/css/login.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios

Vue.use(elementUi)

Vue.use(messageBox)

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

window.bus = new Vue(); //事件总线

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
