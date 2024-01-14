<script setup>
import logo from "../logo/logo.vue"
const handleClose=()=>{

}
const handleOpen=()=>{}
</script>
<template>
  <div class="sideBar_wrapper">
    <logo></logo>
    <el-scrollbar class="sidebar_scrollbar_wrapper">
      <el-menu
        background-color="#152e54"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon :size="20">
              <ep-Edit />
            </el-icon>
            <el-icon><ep-location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
         
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><ep-menu/></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style>
.sideBar_wrapper {
  height: 100%;
  background-color: #152e54;
  color: #fff;
}
.sidebar_scrollbar_wrapper {
  height: calc(100% - 50px);
}
</style>
