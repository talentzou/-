import { defineStore } from "pinia"
import { routes } from "../router/routes"
import { LoginResponse } from "@/api/LOGIN/login"
export const userStore = defineStore("user", () => {
  const userMenu = ref(routes)
  const token = ref("")
  const loadingInstance = ref(null)
  const userInfo = ref({
    nickname: "", 
    avatar: "" ,
  })
  /* 登录 */
  const userLogin = async (FormData) => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: "登录中，请稍候..."
    })
    try {
      const res = await LoginResponse(FormData)
      userInfo.value = res.data.user
      token.value = res.data.token
    } catch (error) {
      loadingInstance.value.close()
    }
    loadingInstance.value.close()
  }
  //退出登录
  const userLogout = async () => {
    clearStorage()
  }
  // 清除token
  const clearStorage = async () => {
    token.value = ""
    localStorage.clear()
  }
  // 清除仓库用户数据
  const ClearUserInfo = async () => {
    clearStorage()
    const res = await userLogout()
    if (res.code == 200) {
      userInfo = {
        nickname: "",
        avatar: ""
      }
    } else {
      return new Promise.reject(new Error(res.msg))
    }
  }
  const getUserInfo = async () => {}
  watch(
    () => token.value,
    () => {
      console.log("我存储token");
      window.localStorage.setItem("token", token.value)
    }
  )
  return {
    userMenu,
    userInfo,
    userLogin,
    userLogout,
    token,
    getUserInfo,
    ClearUserInfo
  }
})
