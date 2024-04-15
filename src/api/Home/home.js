import request from "@/utils/axios"
export const GetHomeMessage = () => {
  return request({
    method: "get",
    url: `/jwt/Home/getHomeMessage`
  })
}
