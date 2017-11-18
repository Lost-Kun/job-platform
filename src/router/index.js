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
          path: 'talentDetail',
          name: '人才详细',
          component: () => import('@/pages/talentDetail'),
        },
        {
          path: 'project',
          name: '发现项目',
          component: () => import('@/pages/findProjects'),
        },
        {
          path: 'projectDetail',
          name: '项目详细',
          component: () => import('@/pages/projectDetail'),
        },
        {
          path: 'editTalentInfo',
          name: '设计师信息编辑',
          component: () => import('@/pages/editTalentInfo'),
        },
        {
          path: 'editEmployerInfo',
          name: '雇主信息编辑',
          component: () => import('@/pages/editEmployerInfo'),
        },
        {
          path: 'editProjectInfo',
          name: '项目信息编辑',
          component: () => import('@/pages/editProjectInfo'),
        },
        {
          path: 'userInfo',
          name: '个人主页',
          component: () => import('@/pages/userInfo'),
        }
      ]
    }
  ]
})
