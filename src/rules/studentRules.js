import { Rules } from "../utils/rules"

function dormNumber(rule, value, callback) {
  let reg = /[A-Z]\d-\d{1,2}/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如A1-xx,x是数字"))
  } else {
    callback()
  }
}
function floorsName(rule, value, callback) {
  let reg = /[A-Z]\d/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如Ax,x是数字"))
  } else {
    callback()
  }
}
function studentName(rule, value, callback) {
  if (value.length < 2) {
    callback(new Error("名字长度至少两位"))
  }
  callback()
}
function phone(rule, value, callback) {
  let reg = /^1[3-9]\d{9}$/
  const isTrue = reg.test(value)
  if (!isTrue) {
    callback(new Error("请输入正确格式的手机号码"))
  } else {
    callback()
  }
}

function studentNumber(rule, value, callback) {
  let reg = /^\d{10}$/
  const isNumber = reg.test(value)
  if (!isNumber) {
    callback(new Error("请输入正确格式的10位数字学号"))
  } else {
    callback()
  }
}

const studentRules = {
  floorsName: [
    { required: true, message: "宿舍楼不能为空", trigger: "blur" },
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  dormNumber: [
    {
      required: true,
      message: "宿舍不能为空",
      trigger: "blur"
    },
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ],
  studentNumber: [
    {
      required: true,
      message: "学号不能为空",
      trigger: "blur"
    },
    {
      validator: studentNumber,
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
  major: [
    {
      required: true,
      message: "专业不能为空",
      trigger: "blur"
    }
  ],
  sex: [
    {
      required: true,
      message: "性别不能为空",
      trigger: "blur"
    }
  ],
  studentName: [
    {
      required: true,
      message: "名字不能为空",
      trigger: "blur"
    },
    {
      validator: studentName,
      trigger: "blur"
    }
  ],
  violate: [
    {
      required: true,
      message: "名字不能为空",
      trigger: "blur"
    }
  ],
  recordDate: [
    {
      required: true,
      message: "日期不能为空",
      trigger: "blur"
    }
  ],
  resolve: [{ required: true, message: "处理措施不能为空", trigger: "blur" }]
}

export const searchRule = {
  dormNumber: [
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ]
}
export function useRules(params) {
  return Rules(studentRules, params)
}
