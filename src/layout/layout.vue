<script setup>
import navbar from "./components/navbar/navbar.vue"
import sidebar from "./components/sidebar/sidebar.vue"
import appMain from "./components/main/main.vue"
import { layoutStore } from "@/stores/layout"
const useLayoutStore = layoutStore()
</script>
<template>
  <div class="layout_app_container">
    <!-- 侧边导航栏 -->
    <sidebar
      class="sidebar_container"
      :class="{ fold: useLayoutStore.isFold ? true : false }"></sidebar>
    <!-- 内容区 -->
    <div class="main_container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout_app_container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.sidebar_container {
  width: 200px;
  height: 100%;
  background-color: hsl(216, 60%, 21%);
  color: #fff;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: all 0.3s;
  &.fold {
    width: 50px;
  }
}
.main_container {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
