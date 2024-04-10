import request from "@/utils/axios"
// 获取用户信息
export const GetUserSelfBtn = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/btn/getSelfBtn"
  })
}