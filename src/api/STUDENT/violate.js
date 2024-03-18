import request, { filterParams } from "@/utils/axios"
export const getViolateResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/student/violate/getViolate/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateViolateResponse = (data) => {
  return request({
    method: "put",
    url:"/student/violate/updateViolate",
    data
  })
}
export const createViolateResponse = (data) => {
  return request({
    method: "post",
    url:"/student/violate/createViolate",
    data,
  })
}
export const deleteViolateResponse = (data) => {
  return request({
    method: "delete",
    url:"/student/violate/deleteViolateById",
    data,
  })
}
