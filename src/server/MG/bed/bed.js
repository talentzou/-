import request from "@/utils/axios"
export const getBedInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/bed"
  })
}
export const updateBedInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addBedInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteBedInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
