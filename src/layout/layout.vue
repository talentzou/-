<script setup>
import navbar from "./components/navbar/navbar.vue"
import sidebar from "./components/sidebar/sidebar.vue"
import appMain from "./components/main/main.vue"
</script>
<template>
  <div class="layout_app_container">
    <!-- 侧边导航栏 -->
    <div class="sidebar_container">
      <sidebar></sidebar>
    </div>
    <!-- 内容区 -->
    <div class="main_container">
      <navbar></navbar>
      <app-main></app-main>
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
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 3px 1px rgb(205, 203, 203) inset;
}

</style>
