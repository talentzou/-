function dormNumber(rule, value, callback) {
  let reg = /[A-Z]-\d{1,2}/
  const isVal = reg.test(value)

  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如A-xx,x是数字"))
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

const FormRules = {
  floorsName: [
    { required: true, message: "宿舍楼不能为空", trigger: "blur" },
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  floorsType: [
    { required: true, message: "宿舍楼类型不能为空", trigger: "blur" }
  ],
  amount: [
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
  dormType: [
    {
      required: true,
      message: "宿舍类型不能为空",
      trigger: "blur"
    }
  ],
  dormStatus: [
    {
      required: true,
      message: "宿舍状态不能为空",
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
  Rater: [
    {
      required: true,
      message: "人物不能为空",
      trigger: "blur"
    },
    { min: 2, max: 5, message: "人物名称至少两个字", trigger: "blur" }
  ],
  evaluation: [ {
    required: true,
    message: "评价不能为空",
    trigger: "blur"
  },],
  bedRate:[{
    required: true,
    message: "床铺评分不能为空",
    trigger: "blur"
  },{
    type:"number",
    message:"请输入数字",
    trigger: ["blur", "change"]
  }],
  groundRate:[{
    required: true,
    message: "地面评分不能为空",
    trigger: "blur"
  },{
    type:"number",
    message:"请输入数字",
    trigger: ["blur", "change"]
  }],
  lavatory:[{
    required: true,
    message: "厕所评分不能为空",
    trigger: "blur"
  },{
    type:"number",
    message:"请输入数字",
    trigger: ["blur", "change"]
  }],
  goods:[{
    required: true,
    message: "物品摆放评分不能为空",
    trigger: "blur"
  },{
    type:"number",
    message:"请输入数字",
    trigger: ["blur", "change"]
  }],
  totalScore:[{
    required: true,
    message: "总分评分不能为空",
    trigger: "blur"
  },{
    type:"number",
    message:"请输入数字",
    trigger: ["blur", "change"]
  }],

}
export function useRules(params) {
  let rules = {}
  Object.keys(FormRules).filter((key) => {
    if (Reflect.has(params, key)) {
      rules[key] = FormRules[key]
    }
  })
  return rules
}
export async function submitForm(formEl) {
  console.log(formEl)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(valid, "submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}

export function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
