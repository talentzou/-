import request, { filterParams } from "@/utils/axios"
export const getExpenseResponse= (query,pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/jwt/expense/Exp/getExpense/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateExpenseResponse= (data) => {
  return request({
    method: "put",
    url:"/jwt/expense/Exp/putExpense",
    data,
  })
}

export const createExpenseResponse= (data) => {
  console.log("餐数为",data);
  return request({
    method: "post",
    url:"/jwt/expense/Exp/createExpense",
    data,
  })
}
export const deleteExpenseResponse= (data) => {
  return request({
    method: "delete",
    url:"/jwt/expense/Exp/deleteById",
    data,
  })
}
