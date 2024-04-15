import request, { filterParams } from "@/utils/axios"
export const getRateResponse = (query, pages) => {
  const params = filterParams(query)
  console.log("参数为99",params);
  return request({
    method: "get",
    url: `/jwt/Dormitory/Rate/getRate/${pages.Page}/${pages.PageSize}`,
    params
  })
}
export const updateRateResponse = (data) => {
  return request({
    method: "put",
    url: "/jwt/Dormitory/Rate/putRate",
    data
  })
}

export const createRateResponse = (data) => {
  return request({
    method: "post",
    url: "/jwt/Dormitory/Rate/createRate",
    data
  })
}
export const deleteRateResponse = (data) => {
  return request({
    url: "/jwt/Dormitory/Rate/deleteRateById",
    method: "delete",
    data
  })
}
