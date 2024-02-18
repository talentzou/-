import request from "@/utils/axios"
export const getStayInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/stay"
  })
}
export const updateStayInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addStayInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteStayInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
