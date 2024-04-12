import request from "@/utils/axios"
// 获取用户信息
export const GetUserSelfBtn = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/btn/getSelfBtn"
  })
}
// 获取按钮树
export const GetBtnTree = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/btn/getBtnTree"
  })
}
// 删除关联
export const DeleteRelationBtn = (data) => {
  return request({
    method: "delete",
    url: "/base/sys_jwt/btn/deleteRelateRoleAndBtn",
    data,
  })
}
// 添加关联
export const AddRelationBtn = (data) => {
  return request({
    method: "post",
    url: "/base/sys_jwt/btn/addRelateRoleAndBtn",
    data
  })
}