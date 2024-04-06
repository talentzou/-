<script setup>
import { userStore } from "@/stores/user"
import config from "@/core/config"
const UseUserStore = userStore()
const loginForm = ref(null)
const title = ref(config.systemName)
const introduce = ref(config.state)
const $router = useRouter()
const $route = useRoute()
const redirect = $route.query.redirect
const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error("请输入正确的用户名"))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error("请输入正确的密码"))
  } else {
    callback()
  }
}
// 规则
const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
  authority: [{ required: true, message: "请选择角色", trigger: "blur" }]
})
const loginFormData = reactive({
  username: "admin",
  password: "123456",
  authority: ""
})
const login = async () => {
  try {
    await UseUserStore.userLogin(loginFormData)
  } catch (error) {
    console.log("99999999999999999");
    ElMessage({
      type: "error",
      message: "登录失败",
      showClose: true
    })
  }
  return
}
const submitForm = () => {
  loginForm.value.validate(async (v) => {
    if (v) {
      await login()
    } else {
      ElMessage({
        type: "error",
        message: "请正确填写登录信息",
        showClose: true
      })
      return false
    }
  })
}
</script>

<template>
  <div class="login-view">
    <div class="login">
      <div class="login-form">
        <div class="img-container">
          <img
            class="appLogo"
            src="@/assets/imgs/logo.jpg"
            alt />
        </div>
        <div class="title">
          <p class="system-name">
            {{ title }}
          </p>
          <p class="system-introduce">
            {{ introduce }}
          </p>
        </div>
        <el-form
          ref="loginForm"
          :model="loginFormData"
          :rules="rules"
          :validate-on-rule-change="false"
          @keyup.enter="submitForm">
          <el-form-item prop="username">
            <el-input
              v-model="loginFormData.username"
              size="large"
              placeholder="请输入用户名"
              suffix-icon="user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              show-password
              size="large"
              type="password"
              placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="authority">
            <el-radio-group v-model="loginFormData.authority">
              <el-radio :label="1">管理人员</el-radio>
              <el-radio :label="2">宿管</el-radio>
              <el-radio :label="3">学生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              size="large"
              @click="submitForm"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-text"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/login.scss";
</style>
