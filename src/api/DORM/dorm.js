import request, { filterParams } from "@/utils/axios"
/**
 *
 * @param {*} params
 * @body  {*}
 * @returns
 */
export const getDormResponse = (query,pages) => {
  const params = filterParams(query)
  console.log(params,pages);
  return request({
    method: "get",
    url: `/Dormitory/dorm/getDorm/${pages.Page}/${pages.PageSize}`,
    params
  })
}
export const updateDormResponse = (data) => {
  return request({
    method: "put",
    url: "/Dormitory/dorm/putDorm",
    data
  })
}

export const createDormResponse = (data) => {
  return request({
    method: "post",
    url: "/Dormitory/dorm/createDorm",
    data
  })
}
export const deleteDormResponse = (data) => {
  return request({
    method: "delete",
    url: "/Dormitory/dorm/deleteDorm_ById",
    data
  })
}
