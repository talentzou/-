import request from "@/utils/axios"
export const getStudentInfoRequest = (params) => {
    // console.log("params",params);
  return request({
    method: "get",
    url: "/student"
  })
}
export const updateStudentInfoRequest=()=>{
  // return request({
  //   method: "patch",
  // })
}

export const addStudentInfoRequest=()=>{
  // return request({
  //   method: "post",
  // })
}
export const deleteStudentInfoRequest=(data)=>{
  console.log("888");
  console.log("data",data);
  // return request({
  //   method: "delete",
  // })
}
