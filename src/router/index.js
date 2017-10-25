import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      path: '/homePage',
      name: '主页面',
      component: () => import('@/pages/homePage'),
      children:[
        {
          path: 'index',
          name: '首页',
          component: () => import('@/pages/index'),
        }
      ]
    }
  ]
})
