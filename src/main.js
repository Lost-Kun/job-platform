// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'; // 兼容ie下的promise对象
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from 'element-ui'
import fullpage from 'fullpage.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.use(elementUi)

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
