import request, { filterParams } from "@/utils/axios"
/**
 *
 * @param {*} params
 * @body  {*}
 * @returns
 */
export const getDormResponse = (query, pages) => {
  const params = filterParams(query)
  console.log(params, pages)
  return request({
    method: "get",
    url: `/jwt/Dormitory/dorm/getDorm/${pages.Page}/${pages.PageSize}`,
    params
  })
}
export const updateDormResponse = (data) => {
  return request({
    method: "put",
    url: "/jwt/Dormitory/dorm/putDorm",
    data
  })
}

export const createDormResponse = (data) => {
  return request({
    method: "post",
    url: "/jwt/Dormitory/dorm/createDorm",
    data
  })
}
export const deleteDormResponse = (data) => {
  return request({
    method: "delete",
    url: "/jwt/Dormitory/dorm/deleteDorm_ById",
    data
  })
}
// 获取宿舍携带学生
export const GetDormWithStudent = () => {
  return request({
    method: "get",
    url: "/jwt/Dormitory/dorm/getDormWithStudent"
  })
}
