import request from "@/utils/axios"
// // 登录
// export const GetMenuResponse = (id) => {
//   return request({
//     method: "get",
//     url: `/base/sys_jwt/getMenu/${id}`,
//   })
// }


// 获取用户个人菜单
export const GetSelfMenu = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/menu/getSelfMenu"
  })
}
// 获取菜单树
export const GetAllMenus = () => {
  return request({
    method: "get",
    url: "/base/sys_jwt/menu/getAllMenu"
  })
}

// 删除关联
export const DeleteRelationMenu = (data) => {
  return request({
    method: "delete",
    url: "/base/sys_jwt/menu/deleteRelateRoleAndMenu",
    data,
  })
}
// 添加关联
export const AddRelationMenu = (data) => {
  return request({
    method: "post",
    url: "/base/sys_jwt/menu/addRelateRoleAndMenu",
    data
  })
}