import { Rules } from "../utils/rules"

export function dormNumber(rule, value, callback) {
  let reg = /^\d{3}$/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如:101"))
  } else {
    callback()
  }
}
export function floorsName(rule, value, callback) {
  let reg = /^[A-Z]$/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如A"))
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
export const floorDorm=(rule, value, callback)=>{
  let reg = /^[A-G]-\d{3}$/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如:A-101"))
  } else {
    callback()
  }
}
const FormRules = {
  floorsName: [
    { required: true, message: "宿舍楼不能为空", trigger: "blur" },
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  floorId:[ { required: true, message: "宿舍楼不能为空", trigger: "blur" },],
  floorsType: [
    { required: true, message: "宿舍楼类型不能为空", trigger: "blur" }
  ],
  dormAmount: [
    { required: true, message: "请输入宿舍数量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  floors: [
    { required: true, message: "请输入楼层数", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  img: [{ required: true, message: "上传照片不能为空", trigger: "blur" }],
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
  rateDate: [
    {
      required: true,
      message: "日期不能为空",
      trigger: "blur"
    }
  ],
  rater: [
    {
      required: true,
      message: "人物不能为空",
      trigger: "blur"
    },
    { min: 2, max: 5, message: "人物名称至少两个字", trigger: "blur" }
  ],
  evaluation: [
    {
      required: true,
      message: "评价不能为空",
      trigger: "blur"
    }
  ],
  bedRate: [
    {
      required: true,
      message: "床铺评分不能为空",
      trigger: "blur"
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  groundRate: [
    {
      required: true,
      message: "地面评分不能为空",
      trigger: "blur"
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  lavatory: [
    {
      required: true,
      message: "厕所评分不能为空",
      trigger: "blur"
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  goods: [
    {
      required: true,
      message: "物品摆放评分不能为空",
      trigger: "blur"
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
    }
  ],
  totalScore: [
    {
      required: true,
      message: "总分评分不能为空",
      trigger: "blur"
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: ["blur", "change"]
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
  stayTime: [
    {
      required: true,
      message: "日期不能为空",
      trigger: "blur"
    }
  ],
  opinions: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  stayCause: [
    {
      required: true,
      message: "原因不能为空",
      trigger: "blur"
    }
  ],
  Capacity: [
    {
      required: true,
      message: "宿舍容纳量不能为空",
      trigger: "blur"
    }
  ],
  dormId:[
    {
      required: true,
      message: "宿舍不能为空",
      trigger: "blur"
    },
  ]
}
export const searchRule = {
  floorsName: [
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  dormNumber: [
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ]
}

export const floorDormRule={
  floorDorm: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    },
    {
      validator: floorDorm,
      trigger: "blur"
    }
  ]
}
export function useRules(params) {
  return Rules(FormRules, params)
}
