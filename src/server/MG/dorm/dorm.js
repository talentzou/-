import request from "@/utils/axios"
export const getDormInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/dorm"
  })
}
export const updateDormInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addDormInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteDormInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
