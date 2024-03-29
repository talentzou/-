import { defineStore } from "pinia"
import { LoginResponse } from "@/api/LOGIN/login"
import { routesStore } from "./routes"
import router from "@/router"
import { GetUserInfo } from "@/api/User/user"
import { Notification } from "@/utils/notification"
export const userStore = defineStore("user", () => {
  const userMenu = ref([]) //用户菜单数据
  const token = ref(localStorage.getItem("token"))
  const loadingInstance = ref(null) //登录加载页面
  const userInfo = ref({
    userName: "",
    nickname: "",
    avatar: "",
    authority: ""
  }) 
  const authBtn=ref([])
  /* 登录 */
  const userLogin = async (FormData) => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: "登录中，请稍候..."
    })
    try {
      const res = await LoginResponse(FormData)
      if (res.code == 200) {
        userInfo.value = res.data.user
        authBtn.value=res.data?.user?.SysAuthorityBtns
        token.value = res.data.token
        const $routesStore = routesStore()
        // 获取菜单路由
        await $routesStore.getAsyncRoutesMenu(userInfo.value.authorityId)
        console.log("我执行了")
        router.push({ path: "/", replace: true })
      }else {
        Notification(res.code,res.msg)
      }
    } catch (error) {
      loadingInstance.value.close()
    }
    loadingInstance.value.close()
  }

  // 清除token
  const clearStorageToken = async () => {
    token.value = ""
    localStorage.clear()
  }
  // 清除仓库用户数据
  const ClearUserInfo = async () => {
    clearStorageToken()
    userInfo.value = {}
  }
  // 获取用户信息
  const getUserInfo = async () => {
    const res = await GetUserInfo()
    // console.log("获取用户数据9999999999",res);
    userInfo.value = res.data.userInfo
    authBtn.value= userInfo.value.SysAuthorityBtns
    // console.log("用户数据为8888111即可将宁波办黑板报",authBtn.value);
  }

  watch(
    () => token.value,
    () => {
      console.log("我存储token")
      window.localStorage.setItem("token", token.value)
    }
  )
  return {
    token,
    userMenu,
    userInfo,
    authBtn,
    userLogin,
    getUserInfo,
    ClearUserInfo
  }
})
