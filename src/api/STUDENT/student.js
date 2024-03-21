import request, { filterParams } from "@/utils/axios"
export const getStudentResponse = (query, pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/jwt/student/Std/getStudent/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateStudentResponse = (data) => {
  return request({
    method: "put",
    url:"/jwt/student/Std/putStudent",
    data
  })
}
export const createStudentResponse = (data) => {
  return request({
    method: "post",
    url:"/jwt/student/Std/createStudent",
    data,
  })
}
export const deleteStudentResponse = (data) => {
  return request({
    method: "delete",
    url:"/jwt/student/Std/deleteById",
    data,
  })
}
