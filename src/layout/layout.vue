<script setup>
import sidebar from "./components/sidebar/sidebar.vue"
</script>
<template>
  <div class="layout_app_container">
    <!-- 侧边导航栏 -->
    <div class="sidebar_container">
      <sidebar></sidebar>
    </div>
    <!-- 内容区 -->
    <div class="main_container">
      666
      <!-- <el-icon :size="20">
        <ep-CaretBottom />
      </el-icon> -->
      <ep-Edit />
     <svg-icon name="home" height="60" width="90"></svg-icon>
    </div>
  </div>
</template>
<style scoped>
.layout_app_container {
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: bisque; */
  overflow: hidden;
}
.sidebar_container {
  width: 200px;
  height: 100%;
}
.main_container {
  flex-grow: 1;
  height: 100%;
  /* background-color: rgb(203, 163, 43); */
}
.hh{
  fill: currentColor;
  background-color: aqua;
}
</style>
