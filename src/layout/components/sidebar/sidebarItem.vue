<script setup>
const props = defineProps({
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
const hasOneChild = ref({})
function hasChildren(children = [], parent) {
  if (children.length === 1 && parent.name !== "layout") {
    // console.log("我是学生");
    ;[hasOneChild.value] = [...children]
    return true
  }
  if (children.length > 1) {
    // console.log("我是多个", parent.children)
    return true
  }
  return false
}
function WhetherHome(children = []) {
  ;[hasOneChild.value] = [...children]
  if (hasOneChild.value?.name === "home") {
    // console.log("jjj",hasOneChild.value?.meta.title );
    return true
  }
  return false
}
function completePath(children = []) {
  // console.log("children", children)
  // console.log(props.baseIndex)
  // console.log(props.baseIndex+'/'+children.path);
  return props.baseIndex + "/" + children.path
}
</script>
<template>
  <template  v-if="!item.hidden">
 
    <!-- 有两个以上路由 -->
    <template v-if="hasChildren(item.children, item)">
      <el-sub-menu :index="item.path">
        
        <template #title>
          <svg-icon :name="item.meta.icon"/>
          <span class="menu-title">{{ item.meta.title }}</span>
        </template>
        <sidebar-item
          v-for="(child, index) in item.children"
          :key="child.path"
          :item="child"
          :base-index="item.path"></sidebar-item>
      </el-sub-menu>
    </template>

    <!-- 有一个子路由 Whether -->
    <template v-else>
      <!-- 是主页 -->
      <el-menu-item
        :index="item.path"
        v-if="WhetherHome(item.children)">
        <svg-icon :name="hasOneChild.meta.icon"></svg-icon>
        <template #title>
          <span class="menu-title">{{ hasOneChild.meta.title }}</span></template
        >
      </el-menu-item>
      <!-- 不是主页 -->
      <el-menu-item
        :index="completePath(item)"
        v-else>
        <svg-icon :name="item.meta.icon"/>
        <template #title>
          <span class="menu-title">{{ item.meta.title }}</span></template
        >
      </el-menu-item>
    </template>

</template>
</template>
