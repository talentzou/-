import request from "@/utils/axios"
// 获取角色详细信息
export const GetRoles = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/role/getRoleList"
  })
}
//删除角色
export const DeleteRoles = (data) => {
  console.log("参数为",data);
  return request({
    method: "delete",
    url: "/base/sys_jwt/role/deleteRoles",
    data
  })
}
// 创建角色
export const CreateRoles = (data) => {
  return request({
    method: "post",
    url: "/base/sys_jwt/role/createRoles",
    data,
  })
}
// 获取角色信息
export const GetRolesMsg = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/role/getRoleMessage"
  })
}
