import request from "@/utils/axios"
export const getNoticeResponse = (query, pages) => {
  return request({
    method: "get",
    url: `/jwt/Notice/getNotice/${pages.Page}/${pages.PageSize}`,
    params: {
      title: query
    }
  })
}
export const updateNoticeResponse = (data) => {
  return request({
    method: "put",
    url: "/jwt/Notice/putNotice",
    data
  })
}

export const createNoticeResponse = (data) => {
    console.log("whdbdbd99999999");
  return request({
    method: "post",
    url: "/jwt/Notice/createNotice",
    data
  })
}
export const deleteNoticeResponse = (data) => {
  return request({
    method: "delete",
    url: "/jwt/Notice/deleteById",
    data
  })
}
