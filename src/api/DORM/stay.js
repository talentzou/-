import request, { filterParams } from "@/utils/axios"
export const getStayResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/jwt/Dormitory/Stay/getStay/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateStayResponse = (data) => {
  return request({
    method: "put",
    url: "/jwt/Dormitory/Stay/putStay",
    data
  })
}

export const createStayResponse = (data) => {
  return request({
    method: "post",
    url:"/jwt/Dormitory/Stay/createStay",
    data,
  })
}
export const deleteStayResponse = (data) => {
  return request({
    method: "delete",
    url:"/jwt/Dormitory/Stay/deleteStayById",
    data,
  })
}
