export function Rules(rules, params) {
  let formRules = {}
  Object.keys(rules).filter((key) => {
    if (Reflect.has(params, key)) {
      formRules[key] = rules[key]
    }
  })
  return formRules
}

export async function submitForm(formEl) {
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
