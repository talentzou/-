<script setup>
import { layoutStore } from "@/stores/layout"
const useLayoutStore = layoutStore()
const switchVal = ref(false)
//主题颜色
const color = ref("rgba(255, 69, 0, 0.68)")
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577"
])
function btnFullScreen() {
  //dom对象属性，判断是否全屏,返回真假值
  let full = document.fullscreenElement
  if (!full) {
    //利用文档根节点requestFullscreen方法实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
//暗黑模式
function DarkMode() {
  //获取html根节点
  let html = document.documentElement
  //判断是否有类名
  html.classList.toggle("dark")
}
function refresh() {
  useLayoutStore.isRefresh = !useLayoutStore.isRefresh
  nextTick(() => {
    useLayoutStore.isRefresh = !useLayoutStore.isRefresh
  })
}
</script>
<template>
  <div class="button-nav">
    <el-button
      circle
      @click="refresh">
      <template #icon>
        <svg-icon
          name="refresh"
          color="black"></svg-icon>
      </template>
    </el-button>
    <el-button
      circle
      @click="btnFullScreen">
      <template #icon>
        <svg-icon
          name="fullScreen"
          color="#eee"></svg-icon>
      </template>
    </el-button>
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="200"
      trigger="click">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="switchVal"
            size="small"
            @change="DarkMode" />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button circle>
          <template #icon>
            <svg-icon
              name="setting"
              color="#eee"></svg-icon>
          </template>
        </el-button>
      </template>
    </el-popover>
    <el-dropdown trigger="click">
      <span class="avatar-wrapper">
        <img
          src="@/assets/imgs/avatar.jpg"
          alt=""
          class="avatar-img" />
        <svg-icon
          name="arrow_down"
          color="black"></svg-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>登录</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped>
.button-nav {
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: 12px;
  .avatar-img {
    height: 40px;
    display: inline-block;
    width: 40px;
    border-radius: 5px;
    margin-right: 5px;
  }
}
</style>
