import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style
import { getToken, getFirstPath } from '@/utils'
import router from '@/router'
import store from '@/store'
// NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/tmg/login']// no redirect whitelist
const toFisrtPage = ['/tmg/login', '/', '']
router.beforeEach(async (to, from, next) => {
  if (getToken().token) {
    if (!store.state.user.name) {
      try {
        const userInfo = await store.dispatch('getUserInfo')
        if (!userInfo.official_account_id && userInfo.bind_official_account) {
          next('/tmg/auth')
          return
        } else if (!userInfo.tenant_id || !userInfo.official_account_id) {
          next(`/tmg/login?redirect=${to.path}`) // 否则全部重定向到登录页
          return
        }
        const res = await Promise.all([store.dispatch('generateRoutes'), store.dispatch('getStyle')]) // 获取用户对应的路由表和自定义样式信息
        if (res.some(item => !item)) {
          throw new Error({ message: 'init router error' })
        }
        router.addRoutes(store.state.permission.addRouters) // 动态添加可访问路由表
        console.log(getFirstPath())
        if (toFisrtPage.includes(to.path)) {
          next({ path: getFirstPath() })
          // NProgress.done()
        } else {
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }
      } catch (err) {
        await store.dispatch('fedLogOut')
        Message.error(err)
        console.error(err)
        // next({ path: '/tmg/login' })
      }
    } else {
      next()
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/tmg/login?redirect=${to.path}`) // 否则全部重定向到登录页
      // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})
