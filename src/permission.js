import router from "@/router"
import { userStore } from "@/stores/user"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
Nprogress.configure({ showSpinner: false })
// 前置钩子
router.beforeEach(async (to, from) => {
  Nprogress.start()
  const UseUserStore = userStore()
  const token = UseUserStore.token
  if (!token) {
    if (to.path === "/login") {
      return { name: to.name, replace: true }
    } else {
      return { name: "login", replace: true }
    }
  } else {
    if (!router.hasRoute(to.name)) {
      return { name: "404" } // 如果不存在，则重定向到错误页面
    }
    if (UseUserStore.userInfo.nickname && UseUserStore.userInfo.avatar) {
      // console.log("我是同过的路由")
      return { name: to.name }
    } else {
      try {
        await UseUserStore.getUserInfo()
        return true
      } catch (error) {
        await UseUserStore.ClearUserInfo()
        return { name: "login", replace: true }
      }
    }
  }
})
// 全局后置钩子
router.afterEach((to, from) => {
  Nprogress.done()
  document.title = to.meta.title
})
