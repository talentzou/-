import router from "@/router"
import { userStore } from "@/stores/user"
import { routesStore } from "@/stores/routes"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import { anyRoute } from "./router/routes"
Nprogress.configure({ showSpinner: false })

const whiteList = ["login"]

// 添加路由，获取用户信息
const getAddRoutes = async () => {
  const $routesStore = routesStore()
  const $userStore = userStore()
  await $userStore.getUserInfo()
  await $routesStore.getAsyncRoutesMenu()
  // console.log("asyncRoute", $routesStore.Routes)
  const routes = toRaw($routesStore.Routes)
  // console.log("获取的路由", routes)
  // console.log("获取的路由", $userStore.userMenu)
  routes &&
    routes.forEach((item) => {
      router.addRoute(item)
    })
    router.addRoute(anyRoute)
  // console.log("getAddRoutes", router.getRoutes())
}

// 前置钩子
// let asyncRouterFlag = true
let count = 1
router.beforeEach(async (to, from) => {
  Nprogress.start()
  const $userStore = userStore()
  const $routesStore = routesStore()
  const token = $userStore.token

  // 没有登录
  if (!token) {
    if (to.path === "/login") {
      return true
    } else {
      return { name: "login", replace: true }
    }
  } else {
    //
    console.log(
      `第${count}次!$routesStore.asyncRouterFlag`,
      $routesStore.asyncRouterFlag
    )
    // console.log("我是路由鉴权", to)
    count = count + 1
    if (!$routesStore.asyncRouterFlag) {
      await getAddRoutes()
      // console.log(
      //   `-------------------------${count,to.name}----------------------------`
      // )
      return { ...to, replace: true }
    } else {
      if (to.name === "login") {
        // console.log("token33333")
        return { path: "/home" }
      }
      return true
    }
  }
})
// 全局后置钩子
router.afterEach((to) => {
  Nprogress.done()
  document.title = to.meta.title
})
