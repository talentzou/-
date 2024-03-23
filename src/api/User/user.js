import request from "@/utils/axios"
export const GetUserInfo = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/user/getUserInfo"
  })
}
