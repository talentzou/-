import request, { filterParams } from "@/utils/axios"
export const getRepairResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/jwt/Repair/getRepair/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateRepairResponse = (data) => {
  return request({
    method: "put",
    url: "/jwt/Repair/putRepair",
    data,
  })
}

export const createRepairResponse = (data) => {
  return request({
    method: "post",
    url:"/jwt/Repair/createRepair",
    data,
  })
}
export const deleteRepairResponse = (data) => {
  return request({
    method: "delete",
    url:"/jwt/Repair/deleteById",
    data,
  })
}
