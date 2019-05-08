import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/tmg',
    redirect: '/tmg/login'
  },
  {
    path: '/tmg/login',
    component: () => import('../pages/login')
  },
  {
    path: '/tmg/register',
    component: () => import('../pages/register')
  }
]

export const asyncRouterMap = [
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    meta: {
      title: '仪表盘',
      icon: 'computor'
    },
    component: layout,
    children: [{
      path: 'index',
      meta: {
        title: '仪表盘',
        icon: ''
      },
      component: () => import('@/pages/dashboard/index')
    }, {
      path: 'list',
      meta: {
        title: '仪表盘',
        icon: ''
      },
      component: () => import('@/pages/dashboard/list')
    }]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  base: '/',
  routes: constantRouterMap
})
