import request from "@/utils/axios"
/**
 *
 * @param {*} params 查寻字符串参数/jwt
 * @param {Object} pages  分页页码，页码数量大小
 * @returns
 */
export const getFloorsInfoRequest = (query, pages) => {
  let params = Object.fromEntries(
    Object.entries(query).filter(([key]) => query[key])
  )
  // console.log("参数",params,pages);
  return request({
    method: "get",
    url: `/jwt/Dormitory/Floor/getFloor/${pages.Page}/${pages.PageSize}`,
    params
  })
}
/**
 *@param {object} 更新参数
 @returns {Promise}
 */
export const updateFloorsInfoRequest = (data) => {
  console.log("更新的数据",data);
  return request({
    url: "/jwt/Dormitory/Floor/putFloor",
    method: "put",
    data
  })
}
/**
 * @param {array} 添加的数据
 */
export const addFloorsInfoRequest = (data) => {
  return request({
    method: "post",
    url: "/jwt/Dormitory/Floor/createFloor",
    data
  })
}
/**
 *
 * @param {Array} data 删除的数据
 */
export const deleteFloorsInfoRequest = (data) => {
  console.log("hh",data);
  return request({
    method: "delete",
    url:"/jwt/Dormitory/Floor/deleteFloorById ",
    data,
  })
}
