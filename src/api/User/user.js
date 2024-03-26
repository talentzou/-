import request from "@/utils/axios"
// 获取用户信息
export const GetUserInfo = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/user/getUserInfo"
  })
}
//更新用户信息
export const SetUserInfo = (data) => {
  console.log("参数999",data);
  return request({
    method: "post",
    url: "/base/sys_jwt/user/setUserInfo",
    data
  })
}
