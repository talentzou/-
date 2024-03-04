<script setup>
import { userStore } from "@/stores/user"
import config from "@/core/config"
const loginForm = ref(null)
const title = ref(config.systemName)
const introduce = ref(config.state)
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
  captcha: [
    {
      message: "验证码格式不正确",
      trigger: "blur"
    }
  ]
})
const loginFormData = reactive({
  username: "admin",
  password: "123456",
  captcha: "",
  captchaId: "",
  openCaptcha: true
})
// 获取验证码
const loginVerify = () => {
  captcha({}).then(async (ele) => {
    rules.captcha.push({
      max: ele.data.captchaLength,
      min: ele.data.captchaLength,
      message: `请输入${ele.data.captchaLength}位验证码`,
      trigger: "blur"
    })
    picPath.value = ele.data.picPath
    loginFormData.captchaId = ele.data.captchaId
    loginFormData.openCaptcha = ele.data.openCaptcha
  })
}

const login = async () => {
  return await userStore.userLogin(loginFormData)
}
const submitForm = () => {
  loginForm.value.validate(async (v) => {
    if (v) {
      const flag = await login()
      if (!flag) {
        loginVerify()
      }
    } else {
      ElMessage({
        type: "error",
        message: "请正确填写登录信息",
        showClose: true
      })
      loginVerify()
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
          <el-form-item
            v-if="loginFormData.openCaptcha"
            prop="captcha"
            class="mb-6">
            <div class="captcha-container">
              <el-input
                v-model="loginFormData.captcha"
                placeholder="请输入验证码"
                size="large"
                class="captcha-input" />
              <!-- <div class="w-1/3 h-11 bg-[#c3d4f2] rounded">
              <img
                v-if="picPath"
                class="w-full h-full"
                :src="picPath"
                alt="请输入验证码"
                @click="loginVerify()" />
            </div> -->
            </div>
          </el-form-item>
          <el-form-item class="mb-6">
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
