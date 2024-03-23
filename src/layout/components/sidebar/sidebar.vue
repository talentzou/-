<script setup>
import { computed } from "vue";
import logo from "../logo/logo.vue"
import sidebarItem from "./sidebarItem.vue"
import { userStore } from "@/stores/user"
import { useRoute } from "vue-router"
import { layoutStore } from "@/stores/layout"
const useLayoutStore = layoutStore()

const $userStore = userStore()
const $route = useRoute()
const userMenu = computed(() => $userStore.userMenu)
// console.log("计算前",userMenu);
// console.log("$userStore.userMenu",$userStore.userMenu);
const handleClose = () => {}
const handleOpen = () => {}
const isCollapse = computed(()=>useLayoutStore.isFold )
</script>
<template>
  <div>
    <logo class="logo"></logo>
    <el-scrollbar class="scrollbar_wrapper">
      <el-menu
        :default-active="$route.path"
        background-color="#152e54"
        router
        :collapse="isCollapse"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">
        <sidebar-item
          v-for="(route, index) in userMenu"
          :key="route.path"
          :item="route"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" >
.logo {
  vertical-align: middle;
}
.scrollbar_wrapper {
  height: 100%;
  .el-menu {
    border: none;
    height: 100%;
  }
  .svg-icon {
    margin-right: 12px;
  }
}
</style>
