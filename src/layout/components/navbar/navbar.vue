<script setup>
import scrollPane from "./scrollPane.vue"
import topNavbar from "./topNavbar.vue"
const $route = useRoute()
// console.log($route)
let breadcrumbItem = ref([])
function breadcrumb() {
  let matched = [{ path: "/", meta: { title: "首页" } }]
  // console.log("jjj", matched)
  // console.log($route.matched)
  if ($route.matched[0].path === matched[0].path) {
    return (breadcrumbItem.value = matched)
  } else {
    $route.matched.map((el) => {
      matched.push(el)
    })
    breadcrumbItem.value = matched
    breadcrumbItem.value
  }
}
watchEffect(() => {
  breadcrumb()
})
</script>
<template>
  <div class="navbar-wrapper">
    <div class="navbar-content">
      <div class="expand">
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

<style scoped>
.navbar-wrapper {
  height: 84px;
  box-shadow: 0 3px 3px #eee;
}
.navbar-content {
  display: flex;
  height: 50px;
  line-height: 50px;
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
}
.el-breadcrumb {
  flex: 1;
}
.button-nav {
  width: 200px;
}
</style>
