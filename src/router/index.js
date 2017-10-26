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
        },
        {
          path: 'talent',
          name: '浏览人才',
          component: () => import('@/pages/findTalents'),
        },
        {
          path: 'project',
          name: '发现项目',
          component: () => import('@/pages/findProjects'),
        }
      ]
    }
  ]
})
