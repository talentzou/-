import request from "@/utils/axios"
// 登录
export const LoginResponse = (data) => {
  return request({
    method: "post",
    url: "/base/login",
    data,
  })
}
