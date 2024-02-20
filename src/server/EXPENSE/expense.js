import request from "@/utils/axios"
export const getExpenseInfoRequest = (params) => {
    console.log("params",params);
  return request({
    method: "get",
    url: "/expense"
  })
}
export const updateExpenseInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addExpenseInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteExpenseInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
