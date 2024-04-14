import { Rules } from "../utils/rules"

function phone(rule, value, callback) {
  let reg = /^1[3-9]\d{9}$/
  const isTrue = reg.test(value)
  if (!isTrue) {
    callback(new Error("请输入正确格式的手机号码"))
  } else {
    callback()
  }
}
function Charge(rule, value, callback) {
  let reg = /^\d{1,9}\.\d{1,9}|\d{1,9}$/
  const isTrue = reg.test(value)
  if (!isTrue) {
    callback(new Error("请输入数字"))
  } else {
    callback()
  }
}

const expenseRules = {
  paymentTime: [
    {
      required: true,
      message: "缴费时间不能为空",
      trigger: "blur"
    }
  ],
  waterCharge: [
    {
      required: true,
      message: "水费不能为空",
      trigger: "blur"
    },
    {
      validator: Charge,
      trigger: "blur"
    }
  ],

  electricityCharge: [
    {
      required: true,
      message: "电费不能为空",
      trigger: "blur"
    },
    {
      validator: Charge,
      trigger: "blur"
    }
  ],
  dormId:[
    {
      required: true,
      message: "宿舍不能为空",
      trigger: "blur"
    },
  ],
  accountant: [
    {
      required: true,
      message: "结算人不能为空",
      trigger: "blur"
    }
  ],
  phone: [
    {
      required: true,
      message: "手机号码不能为空",
      trigger: "blur"
    },
    {
      validator: phone,
      trigger: "blur"
    }
  ]
}
export const searchRule = {
  paymentTime:[{
    required: true,
    message: "缴费时间不能为空",
    trigger: "blur"
  }]
}
export function useRules(params) {
  return Rules(expenseRules, params)
}
