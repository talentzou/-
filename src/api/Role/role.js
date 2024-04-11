import request from "@/utils/axios"
// 获取用户信息
export const GetRoles = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/role/getRoleList"
  })
}