<script setup>
import { GetAllMenus } from "@/api/Menu/menu"
import { GetRoles } from "@/api/Role/role"
const drawerVisible = ref(false)
const RoleTableData = ref([
  {
    ID: "2016-05-03",
    roleName: "Tom",
    CreatedAt: "No. 189, Grove St, Los Angeles"
  }
])
const handleDeleteRole = (id) => {
  ElMessageBox.confirm("确定要删除吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  }).then(() => {
    console.log("9999999999999999999")
  })
}
const listM = ref([])
const handleSetAuthority = (row) => {
  drawerVisible.value = true
  const list = []
  console.log(row.Menu)
  row.Menu.forEach((element, index) => {
    if (element.parent_id !== 0) {
      list.push(element.id)
    }
  })
  // console.log("菜单id", list)
  listM.value = list
}

/* 接口数据 */
const getRoleList = async () => {
  const { code, data } = await GetRoles()
  if (code == 200) {
    RoleTableData.value = data
  }
}
const Menus = ref([])
const getAllMenus = async () => {
  const { code, data } = await GetAllMenus()
  if (code == 200) {
    Menus.value = data.menus
    console.log("所有菜单为", data)
  }
}

onMounted(() => {
  getAllMenus()
  getRoleList()
})
const props = {
  value: "id",
  label: "title",
  children: "children"
}
</script>
<template>
  <div class="viewport">
    <el-row style="margin: 10px 0">
      <el-button
        type="success"
        @click="drawerVisible = true"
        >添加角色</el-button
      >
    </el-row>
    <el-table
      :data="RoleTableData"
      stripe
      size="large"
      style="width: 100%">
      <el-table-column
        prop="ID"
        label="角色Id"
        width="300" />
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300" />
      <!-- <el-table-column
        prop="CreatedAt"
        label="创建时间"
        width="300" /> -->
      <el-table-column
        prop="address"
        label="操作">
        <template #default="{ row }">
          <el-button
            text
            type="primary"
            @click="handleSetAuthority(row)"
            ><el-icon><ep-Setting /></el-icon>设置权限</el-button
          >
          <el-button
            text
            type="primary"
            ><el-icon><ep-Edit /></el-icon>编辑</el-button
          >
          <el-button
            text
            type="danger"
            @click="handleDeleteRole"
            ><el-icon><ep-Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="drawerVisible"
  
      :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">设置权限</h4>
        <el-button type="primary" >
          <el-icon class="el-icon--left"><ep-Setting /></el-icon>
          确定
        </el-button>
      </template>
      <el-tabs
        type="border-card"
        class="title-drawer">
        <el-tab-pane label="菜单权限">
          <template #default>
            <Tree
              v-if="drawerVisible"
              :data="Menus"
              label="title"
              :list="listM" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="按钮权限">
          <template #default> 888888888888888888 </template></el-tab-pane
        >
      </el-tabs>
    </el-drawer>
  </div>
</template>
//
<style scoped>
.viewport {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}
.title-drawer {
  height: 100%;
  box-sizing: border-box;
}
:deep(.el-tree-virtual-list) {
  height: 100% !important;
}
</style>
