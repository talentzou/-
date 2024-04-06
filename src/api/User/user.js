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
  return request({
    method: "post",
    url: "/base/sys_jwt/user/setUserInfo",
    data
  })
}
// 获取用户列表
export const getUserList = (data) => {
  return request({
    url: '/base/sys_jwt/user/getUserList',
    method: 'post',
    data: data
  })
}
//删除用户
export const deleteUser = (data) => {
  return request({
    url: '/base/sys_jwt/user/deleteUser',
    method: 'delete',
    data: data
  })
}
//注册用户admin_register
export const CreateUser = (data) => {
  return request({
    method: "post",
    url: "/base/sys_jwt/user/admin_register",
    data
  })
}

