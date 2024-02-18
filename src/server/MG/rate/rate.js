import request from "@/utils/axios"
export const getRateInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/rate"
  })
}
export const updateRateInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addRateInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteRateInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
