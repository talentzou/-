import request, { filterParams } from "@/utils/axios"
export const getStayResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/Dormitory/Stay/getStay/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateStayResponse = (data) => {
  return request({
    method: "put",
    url: "/Dormitory/Stay/putStay",
    data
  })
}

export const createStayResponse = (data) => {
  return request({
    method: "post",
    url:"/Dormitory/Stay/createStay",
    data,
  })
}
export const deleteStayResponse = (data) => {
  return request({
    method: "delete",
    url:"/Dormitory/Stay/deleteStayById",
    data,
  })
}
