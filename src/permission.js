import router from "@/router"
import { userStore } from "@/stores/user"
import { routesStore } from "@/stores/routes"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import { anyRoute } from "./router/routes"
Nprogress.configure({ showSpinner: false })

const whiteList=["404","login"]

// 添加路由
const getAddRoutes = async () => {
  const $routesStore = routesStore()
  const $userStore = userStore()
  await $userStore.getUserInfo()
  await $routesStore.getAsyncRoutesMenu()

  // console.log("asyncRoute", $routesStore.Routes)
  const routes = toRaw($routesStore.Routes)
  // console.log("原生路由", routes)
  routes.forEach((item) => {
    router.addRoute(item)
  })
  router.addRoute(anyRoute)
  console.log("已添加路由", router.getRoutes())
}

// 前置钩子
const asyncRouterFlag = ref(false)
router.beforeEach(async (to, from) => {
  console.log("我是路由鉴权")
  Nprogress.start()
  const $userStore = userStore()
  const $routesStore = routesStore()
  const token = $userStore.token
  // 没有登录
  if (!token) {
    if (to.path === "/login") {
      return true
    } else {
      // console.log("not22222")
      return { name: "login", replace: true }
    }
  } else {
    //  console.log("$routesStore.asyncRouterFlag555555555", $routesStore.asyncRouterFlag);
    if ( !$routesStore.asyncRouterFlag&&whiteList.indexOf(to.name)<0) {
      // console.log("我进来了");
      await getAddRoutes()
      asyncRouterFlag.value=false
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
router.afterEach((to, from) => {
  Nprogress.done()
  document.title = to.meta.title
})
