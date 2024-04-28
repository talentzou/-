<script setup>
import { layoutStore } from "@/stores/layout"
import { userStore } from "@/stores/user"

const router = useRouter()
const useLayoutStore = layoutStore()
const useUserStore = userStore()
const switchVal = ref(false)

//主题颜色
const color = ref("rgba(255, 69, 0, 0.68)")
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
async function Logout() {
  await useUserStore.ClearUserInfo()
  router.push({ name: "login", replace: true })
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
          :src="useUserStore.userInfo?.avatar"
          alt=""
          class="avatar-img" />
        <span>{{ useUserStore.userInfo?.nickname }}</span>
        <svg-icon
          name="arrow_down"
          color="black"></svg-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped>
.button-nav {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 5px;
}

.avatar-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: 12px;
  .avatar-img {
    height: 30px;
    display: inline-block;
    width: 30px;
    border-radius: 5px;
    margin-right: 5px;
  }
  span {
    padding: 0 5px;
    min-width: 40px;
    text-align: center;
  }
}
</style>
