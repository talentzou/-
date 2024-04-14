import { Rules } from "../utils/rules"
// function dormNumber(rule, value, callback) {
//   let reg = /^\d{3}$/
//   const isVal = reg.test(value)
//   if (!isVal && value !== "") {
//     callback(new Error("请输入正确格式,如:101"))
//   } else {
//     callback()
//   }
// }
// function floorsName(rule, value, callback) {
//   let reg = /^[A-Z]$/
//   const isVal = reg.test(value)
//   if (!isVal && value !== "") {
//     callback(new Error("请输入正确格式,如:A"))
//   } else {
//     callback()
//   }
// }
function phone(rule, value, callback) {
  let reg = /^1[3-9]\d{9}$/
  const isTrue = reg.test(value)
  console.log(isTrue, 111)
  if (!isTrue) {
    callback(new Error("请输入正确格式的手机号码"))
  } else {
    callback()
  }
}

const maintenanceRules = {
  // floorsName: [
  //   { required: true, message: "宿舍楼不能为空", trigger: "blur" },
  //   {
  //     validator: floorsName,
  //     trigger: "blur"
  //   }
  // ],
  // dormNumber: [
  //   {
  //     required: true,
  //     message: "宿舍不能为空",
  //     trigger: "blur"
  //   },
  //   {
  //     validator: dormNumber,
  //     trigger: "blur"
  //   }
  // ],
  dormId:[
    {
      required: true,
      message: "宿舍不能为空",
      trigger: "blur"
    },
  ],
  submitDate: [
    {
      required: true,
      message: "提交日期不能为空",
      trigger: "blur"
    }
  ],
  repairStatus: [
    {
      required: true,
      message: "维修状态不能为空",
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
  ],
  reportMan: [
    {
      required: true,
      message: "提交人不能为空",
      trigger: "blur"
    }
  ],
  repairer: [
    {
      required: true,
      message: "维修人员不能为空",
      trigger: "blur"
    }
  ],
  problems: [
    {
      required: true,
      message: "故障原因不能为空",
      trigger: "blur"
    }
  ]
}

export function useRules(params) {
  return Rules(maintenanceRules, params)
}
