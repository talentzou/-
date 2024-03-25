<script setup>
 defineProps({
  item: {
    type: Object,
    require: true
  },
  baseIndex: {
    type: String,
    require: true,
    default: ""
  }
})
const childrenRoutes = ref({})
function completePath(parent = {}) {
  // console.log("parent", parent.path)
  childrenRoutes.value =parent.children[0]
  if (parent.path === "/") {
    return "/" + parent.children[0].path
  }
  return parent.path + "/" + parent.children[0].path
}
</script>
<template>
  <template v-if="!item.hidden">
    <!-- 有两个以上children -->
    <template v-if="item.children?.length >= 2">
      <el-sub-menu :index="item.path">
        <template #title>
          <svg-icon :name="item.meta.icon" />
          <span class="menu-title">{{ item.meta.title }}</span>
        </template>
        <sidebar-item
          v-for="(child, index) in item.children"
          :key="child.path"
          :item="child"
          :base-index="item.path"></sidebar-item>
      </el-sub-menu>
    </template>
    <!-- 只有一个children -->
    <template v-else-if="item.children?.length === 1">
      <el-menu-item :index="completePath(item)">
        <svg-icon :name="childrenRoutes.meta?.icon"></svg-icon>
        <template #title>
          <span class="menu-title">{{
            childrenRoutes.meta?.title
          }}</span></template
        >
      </el-menu-item>
    </template>
    <template v-else>
      <!-- 没有孩子 -->
      <el-menu-item :index="baseIndex + `/` + item.path">
        <svg-icon :name="item.meta?.icon"></svg-icon>
        <template #title>
          <span class="menu-title">{{ item.meta?.title }}</span></template
        >
      </el-menu-item>
    </template>
  </template>
</template>
