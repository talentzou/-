import request from "@/utils/axios"
export const getRepairInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/repair"
  })
}
export const updateRepairInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addRepairInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteRepairInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
