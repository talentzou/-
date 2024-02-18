import request from "@/utils/axios"
export const getFloorsInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/floors"
  })
}
export const updateFloorsInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addFloorsInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteFloorsInfoRequest=(dataList)=>{
  console.log("888");
  console.log("dataList",dataList);
  // return request({
  //   method: "delete",
  // })
}
