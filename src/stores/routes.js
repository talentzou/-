import { defineStore } from "pinia"
import router from "@/router"
import { GetMenuResponse, GetSelfMenu } from "@/api/Menu/menu"
import { asyncRoutes } from "@/router/authority/index"
import { cloneDeep } from "lodash"
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
  const asyncRouterFlag = ref(false)
  const Routes = ref([])
  const getAsyncRoutesMenu = async () => {
    asyncRouterFlag.value = true
    // const $userStore = userStore()
    // // console.log(
    // //   "$userStore.userInfo?.authorityId",
    // //   $userStore.userInfo?.authorityId
    // // )
    // const res = await GetMenuResponse($userStore.userInfo?.authorityId)

    // // console.log("路由获取数据")
    // const localRoutes = filterAsyncRoutes(
    //   res.data?.menu,
    //   cloneDeep(asyncRoutes)
    // )
    // // console.log("resultRoutes555555555", localRoutes)
    // // 添加路由
    // localRoutes.forEach((item) => {
    //   router.addRoute(item)
    // })
    // // 添加错误路由
    // router.addRoute(anyRoute)
    // // console.log("添加完有")
    // // 路由添加
    // Routes.value = localRoutes
    // //菜单
    // const resultRoutes = [...constantRoutes, ...localRoutes]
    // $userStore.userMenu = resultRoutes
    //  await test()--------------------------------------------------------------------

    const $userStore = userStore()
    const res = await GetSelfMenu()
    // console.log("获取的路由数据为",res);
    const localRoutes = filterAsyncRoutes(
      res.data?.menus,
      cloneDeep(asyncRoutes)
    )
    // console.log("resultRoutes555555555", localRoutes)
    // 添加路由
    localRoutes.forEach((item) => {
      router.addRoute(item)
    })
    console.log("我是路由仓库做操添加路由完成")
    console.log(router.getRoutes())
    //菜单
    const resultRoutes = [...constantRoutes, ...localRoutes]
    $userStore.userMenu = resultRoutes
    Routes.value = resultRoutes
  }

  return {
    getAsyncRoutesMenu,
    Routes,
    asyncRouterFlag
  }
})
