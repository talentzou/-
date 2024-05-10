const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error("请输入正确的用户名"))
  } else {
    callback()
  }
}
const checkDorm = (rule, value, callback) => {
  if (value=== 1) {
    return callback(new Error("请选择宿舍"))
  } else {
    callback()
  }
}
export const formRules = {
  userName: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { validator: checkUsername, trigger: "blur" }
  ],
  roleId: [{ required: true, message: "角色不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
  dormId: [
    {
      required: true,
      message: "宿舍不能为空",
      trigger: "blur"
    },
    { validator: checkDorm, trigger: "blur" }
  ]
}
