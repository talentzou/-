import request, { filterParams } from "@/utils/axios"
export const getBedResponse = (query) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: "/Dormitory/Bed/getBed",
    params
  })
}
export const updateBedResponse = (data) => {
  return request({
    method: "put",
    url: "/Dormitory/Bed/putBed",
    data
  })
}

export const createBedResponse = (data) => {
  return request({
    url: "/Dormitory/Bed/createBed",
    method: "post",
    data
  })
}
export const deleteBedResponse = (data) => {
  return request({
    url: "/Dormitory/Bed/deleteBedById",
    method: "delete",
    data
  })
}
