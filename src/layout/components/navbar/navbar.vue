<script setup>
import scrollPane from "./scrollPane.vue"
import topNavbar from "./topNavbar.vue"
import { layoutStore } from "@/stores/layout"
const $route = useRoute()
// console.log($route)
const useLayoutStore = layoutStore()
// console.log(useLayoutStore.isFold)
// console.log($route)
let breadcrumbItem = ref([])
function breadcrumb() {
  let matched = [{ path: "/", meta: { title: "首页" } }]
  if ($route.matched[0].path === matched[0].path) {
    return (breadcrumbItem.value = matched)
  } else {
    $route.matched.map((el) => {
      matched.push(el)
    })
    breadcrumbItem.value = matched
    // breadcrumbItem.value
  }
}
watchEffect(() => {
  breadcrumb()
})
</script>
<template>
  <div class="navbar-wrapper">
    <div class="navbar-content">
      <div
        class="expand"
        @click="useLayoutStore.isFold = !useLayoutStore.isFold">
        <svg-icon
          name="expand"
          width="20"
          height="20"
          color="black"></svg-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumbItem"
          :key="item.path"
          ><span class="breadcrumb-span">{{
            item.meta.title
          }}</span></el-breadcrumb-item
        >
      </el-breadcrumb>
      <top-navbar></top-navbar>
    </div>
    <scroll-pane></scroll-pane>
  </div>
</template>

<style scoped lang="scss">
.navbar-wrapper {
  height: 84px;
  box-shadow: 0 1px 1px #eee;
}
.navbar-content {
  display: flex;
  height: 50px;
  line-height: 50px;
  position: relative;
  .expand {
    height: 100%;
    padding: 5px 15px;
    box-sizing: border-box;
  }
  .el-breadcrumb {
    line-height: 50px;
  }
  .breadcrumb-span {
    font-size: 16px;
  }
  .el-breadcrumb {
    flex: 1;
  }
 
}
</style>
