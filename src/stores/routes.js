import { defineStore } from "pinia"
import router from "@/router"
import { GetMenuResponse } from "@/api/Menu/menu"
import { asyncRoutes } from "@/router/authority/index"
import { cloneDeep } from "lodash"
import { anyRoute } from "@/router/routes"
import { constantRoutes } from "@/router/routes"
import { userStore } from "./user"
const filterAsyncRoutes = (AsyncRoutes, local) => {
  return local.filter((item, index) => {
    for (let key in AsyncRoutes) {
      if (AsyncRoutes[key].name == item.name) {
        if (
          item.children?.length > 0 &&
          AsyncRoutes[key].children?.length > 0
        ) {
          console.log()
          item.children = filterAsyncRoutes(
            AsyncRoutes[key].children,
            item.children
          )
        }
        return true
      }
    }
  })
}
export const routesStore = defineStore("route", () => {
  const asyncRouterFlag = ref(0)
  const Routes = ref([])

  const getAsyncRoutesMenu = async () => {
    console.log("获取路由",)
    asyncRouterFlag.value=true
    const $userStore = userStore()
    console.log("$userStore.userInfo?.authorityId",$userStore);
    const res = await GetMenuResponse($userStore.userInfo?.authorityId)
    console.log("路由获取数据");
    const localRoutes = filterAsyncRoutes(res.data?.menu, cloneDeep(asyncRoutes))
    console.log("resultRoutes55555555555555555555555555", res)
    // 添加路由
    localRoutes.forEach((item) => {
      router.addRoute(item)
    })
    // 添加错误路由
    router.addRoute(anyRoute)
    // 路由添加
    Routes.value = localRoutes
    //菜单
    const resultRoutes = [...constantRoutes, ...localRoutes]
    $userStore.userMenu = resultRoutes
  }

  return {
    getAsyncRoutesMenu,
    Routes,
    asyncRouterFlag
  }
})
