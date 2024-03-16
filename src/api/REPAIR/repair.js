import request, { filterParams } from "@/utils/axios"
export const getRepairResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/Repair/getRepair/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateRepairResponse = (data) => {
  return request({
    method: "put",
    url: "/Repair/putRepair",
    data,
  })
}

export const createRepairResponse = (data) => {
  return request({
    method: "post",
    url:"/Repair/createRepair",
    data,
  })
}
export const deleteRepairResponse = (data) => {
  return request({
    method: "delete",
    url:"/Repair/deleteById",
    data,
  })
}
