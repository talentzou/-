import axios from "axios"
import { userStore } from "@/stores/user"
import router from "@/router"
const request = axios.create({
  baseURL: import.meta.env.DORM_PROXY_PREFIX_API,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" }
})
request.interceptors.request.use(
  function (config) {
    const useUserStore = userStore()
    if (useUserStore.token) {
      config.headers["x-token"] = useUserStore.token
      // console.log(config.headers)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    const $userStore=userStore()
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("response", response)
    // return response.data
    if (response.data.data?.reload) {
      $userStore.token=""
      localStorage.clear()
      router.replace({ name: "login", replace: true })
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let message = ""
    const status = error.response&&error.response.status
    switch (status) {
      case 401:
        message = "token过期"
        break
      case 403:
        message = "无权访问"
        break
      case 404:
        message = "请求地址错误"
        break
      case 500:
        message = "服务器出错"
        break
      default:
        message = "无网络"
    }
    //提示错误信息
    ElMessage({
      type: "error",
      message
    })
    return Promise.reject(error)
  }
)
export default request

export const filterParams = (query) =>
  Object.fromEntries(Object.entries(query).filter(([key]) => query[key]))
