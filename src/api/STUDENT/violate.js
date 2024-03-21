import request, { filterParams } from "@/utils/axios"
export const getViolateResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/jwt/student/violate/getViolate/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateViolateResponse = (data) => {
  return request({
    method: "put",
    url:"/jwt/student/violate/updateViolate",
    data
  })
}
export const createViolateResponse = (data) => {
  return request({
    method: "post",
    url:"/jwt/student/violate/createViolate",
    data,
  })
}
export const deleteViolateResponse = (data) => {
  return request({
    method: "delete",
    url:"/jwt/student/violate/deleteViolateById",
    data,
  })
}
