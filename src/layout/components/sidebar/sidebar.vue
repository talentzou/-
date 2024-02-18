<script setup>
import logo from "../logo/logo.vue"
import sidebarItem from "./sidebarItem.vue"
import { userStore } from "@/stores/user"
import { useRoute } from "vue-router"
const $userStore = userStore()
const $route=useRoute()
const userMenu = computed(() => $userStore.userMenu)
const handleClose = () => {}
const handleOpen = () => {}
</script>
<template>
  <div class="sideBar_wrapper">
    <logo></logo>
    <el-scrollbar class="sidebar_scrollbar_wrapper">
      <el-menu
        :default-active="$route.path"
        background-color="#152e54"
        class="el-menu-vertical-demo"
        router
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">
        <!-- 菜单栏 -->
        <sidebar-item
          v-for="(route, index) in userMenu"
          :key="route.path"
          :item="route"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style scoped>
:deep(.el-menu) {
  border-right: 0;
}
.sideBar_wrapper {
  height: 100%;
  background-color: #152e54;
  color: #fff;
}
.sidebar_scrollbar_wrapper {
  height: calc(100% - 50px);
}
</style>
