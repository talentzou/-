import request, { filterParams } from "@/utils/axios"
export const getRateResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/Dormitory/Rate/getRate/${pages.Page}/${pages.PageSize}`,
    params
  })
}
export const updateRateResponse = (data) => {
  return request({
    method: "put",
    url: "/Dormitory/Rate/putRate",
    data
  })
}

export const createRateResponse = (data) => {
  return request({
    method: "post",
    url: "/Dormitory/Rate/createRate",
    data
  })
}
export const deleteRateResponse = (data) => {
  return request({
    url: "/Dormitory/Rate/deleteRateById",
    method: "delete",
    data
  })
}
