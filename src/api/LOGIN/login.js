import request from "@/utils/axios"
// 登录
export const LoginResponse = (data) => {
  return request({
    method: "post",
    url: "/base/login",
    data,
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: 'jwt/user/getUserInfo',
    method: 'get'
  })
}
