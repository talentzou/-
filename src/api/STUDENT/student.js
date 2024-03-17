import request, { filterParams } from "@/utils/axios"
export const getStudentResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/student/Std/getStudent/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateStudentResponse = (data) => {
  return request({
    method: "put",
    url:"/student/Std/putStudent",
    data
  })
}
export const createStudentResponse = (data) => {
  return request({
    method: "post",
    url:"/student/Std/createStudent",
    data,
  })
}
export const deleteStudentResponse = (data) => {
  return request({
    method: "delete",
    url:"/student/Std/deleteById",
    data,
  })
}
