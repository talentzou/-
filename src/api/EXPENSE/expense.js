import request, { filterParams } from "@/utils/axios"
export const getExpenseResponse= (query,pages) => {
  const params = filterParams(query)
  return request({
    method: "get",
    url: `/expense/Exp/getExpense/${pages.Page}/${pages.PageSize}`,
    params,
  })
}
export const updateExpenseResponse= (data) => {
  return request({
    method: "put",
    url:"/expense/Exp/putExpense",
    data,
  })
}

export const createExpenseResponse= (data) => {
  return request({
    method: "post",
    url:"/expense/Exp/createExpense",
    data,
  })
}
export const deleteExpenseResponse= (data) => {
  return request({
    method: "delete",
    url:"/expense/Exp/deleteById",
    data,
  })
}
