/**
 * 
 * @param {*} rules 规则约束
 * @param {*} params 约束参数
 * @returns 返回参数规则
 */
export function Rules(rules, params) {
  let formRules = {}
  Object.keys(rules).filter((key) => {
    if (Reflect.has(params, key)) {
      formRules[key] = rules[key]
    }
  })
  return formRules
}
/**
 * 
 * @param {*} formEl 表单组件实例
 * @returns 
 */
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
/**
 * 
 * @param {*} formEl 表单组件实例
 * @returns 
 */
export function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
