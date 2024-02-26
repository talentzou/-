const FormRules = {
  floorsName: [{ required: true, message: "宿舍楼不能为空", trigger: "blur" }],
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
  ]
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
