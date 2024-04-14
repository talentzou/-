<script setup>
import { GetAllMenus } from "@/api/Menu/menu"
import { GetBtnTree } from "@/api/Btn/btns"
import { GetRoles, DeleteRoles, CreateRoles} from "@/api/Role/role"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
const drawerVisible = ref(false)
const dialogVisible = ref(false)
const Form = ref(null)
const editRoleParams = ref({
  roleName: ""
})
const formRules = {
  roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
}
const RoleTableData = ref([
  {
    ID: "2016-05-03",
    roleName: "Tom",
    CreatedAt: "No. 189, Grove St, Los Angeles"
  }
])
// 删除角色回调
const handleDeleteRole = (row) => {
  ElMessageBox.confirm("确定要删除吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  }).then(() => {
    deleteRoles(row)
  })
}
// 默认选中的菜单节点
const listM = ref([])
// 默认选中按钮节点
const listB = ref([])
// 处理选中节点
const RoleId = ref(0)
const handleMenuAndBtnIdList = (row) => {
  RoleId.value = row.ID
  drawerVisible.value = true
  const list = []
  // console.log(row.Menu)
  row.Menu.forEach((element, index) => {
    if (element.parent_id !== 0) {
      list.push(element.id)
    }
  })
  // console.log("菜单id", list)
  listM.value = list
  const btns = []
  row.sysBtns.forEach((el) => {
    btns.push(el.id)
  })
  listB.value = btns
}

// 处理按钮树
// const btnList = []
const handleBtnTree = (data) => {
  const btnList = []
  data.forEach((el, index) => {
    if (el.btns && el.btns.length > 0) {
      btnList.push({
        id: el.id * 1000,
        title: el.title,
        children: el.btns
      })
    }
  })
  console.log("菜单按钮", btnList)
  return btnList
}
const setAuthority = async () => {}
/* 接口数据 */
// 获取角色列表
const getRoleList = async () => {
  const { code, data } = await GetRoles()
  if (code == 200) {
    RoleTableData.value = data
    handleBtnTree(data)
  }
}

// 菜单树
const Menus = ref([])
const getAllMenus = async () => {
  const { code, data } = await GetAllMenus()
  if (code == 200) {
    Menus.value = data.menus
    // console.log("所有菜单为", data)
  }
}
//按钮树
const btnTreeList = ref([])
const getAllBtnTree = async () => {
  const { code, data } = await GetBtnTree()
  if (code == 200) {
    console.log("按钮树", data)
    btnTreeList.value = handleBtnTree(data.btnTree)
  }
}
// 添加角色
const createRoles = async () => {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await CreateRoles(editRoleParams.value)
    dialogVisible.value = false
    const status = Notification(code, msg)
    status ? getRoleList() : ""
  }
}
// 删除角色
const deleteRoles = async (row) => {
  const { code, msg } = await DeleteRoles(toRaw(row))
  const status = Notification(code, msg)
  status ? getRoleList() : ""
}

onMounted(() => {
  getAllMenus()
  getAllBtnTree()
  getRoleList()
})
</script>
<template>
  <div class="viewport">
    <el-row style="margin: 10px 0">
      <el-button
        type="success"
        @click="dialogVisible = true"
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
            @click="handleMenuAndBtnIdList(row)"
            ><el-icon><ep-Setting /></el-icon>设置权限</el-button
          >
          <!-- <el-button
            text
            type="primary"
            ><el-icon><ep-Edit /></el-icon>编辑</el-button
          > -->
          <el-button
            text
            type="danger"
            @click="handleDeleteRole(row)"
            ><el-icon><ep-Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="drawerVisible"
      title="设置权限"
      :show-close="false">
      <el-tabs
        type="border-card"
        class="title-drawer">
        <el-tab-pane label="菜单权限">
          <template #default>
            <Tree
              v-if="drawerVisible"
              :data="Menus"
              :roleId="RoleId"
              tab="menu"
              :list="listM"
              @change="getRoleList" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="按钮权限">
          <template #default>
            <Tree
              v-if="drawerVisible"
              :data="btnTreeList"
              :roleId="RoleId"
              tab="btn"
              :list="listB"
              @change="getRoleList" /> </template
        ></el-tab-pane>
      </el-tabs>
    </el-drawer>
    <el-dialog
      v-model="dialogVisible"
      title="添加角色"
      width="500"
      @close="Form.resetFields()">
      <el-form
        ref="Form"
        :rules="formRules"
        :model="editRoleParams"
        label-width="auto">
        <el-form-item
          label="角色名称"
          prop="roleName">
          <el-input v-model="editRoleParams.roleName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="createRoles">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
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
