import { defineStore } from "pinia"
import { routes } from "../router/routes"
export const userStore = defineStore("user", () => {
  const userMenu = ref(routes)
  const token = ref("")
  const userInfo = reactive({
    nickname: "暂时没有名字",
    avatar: "./src/assets/imgs/avatar.jpg"
  })
  async function userLogin() {
    console.log(5555)
  }
  async function userLogout() {
    console.log(5555)
  }
  async function clearStorage() {
    token.value = ""
    localStorage.clear()
  }
  watch(() => token.value, () => {
   window.localStorage.setItem('token', token.value)
 })
  return { userMenu, userInfo, userLogin, userLogout, token }
})
