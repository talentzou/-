<script setup>
import {
  getUserList,
  deleteUser,
  SetUserInfo,
  CreateUser,
  QueryUser
} from "@/api/User/user"
import { GetFloorWithDormList } from "@/api/Dorm/floors"
import { GetRolesMsg } from "@/api/Role/role"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
import { formRules } from "@/rules/userRules"
import {FormatTime} from "@/utils/time"
const Form = ref(null)
const searchRef = ref(null)
const userListSearch = reactive({
  username: ""
})
const searchRule = {
  username: [
    {
      required: true,
      message: `输入不能为空`,
      trigger: `blur`
    }
  ]
}
const drawerVisible = ref(false)
const tableData = ref([])
const handleDeleteUser = (id) => {
  ElMessageBox.confirm("确定要删除吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  }).then(() => {
    console.log("9999999999999999999")
    deleteSysUser(id)
  })
}
const handleEditUser = (row) => {
  console.log(row)
  userEditParams.value = {
    ID: row.ID,
    userName: row.userName,
    roleId: row.roleId,
    sex: row.sex,
    remark: row.remark,
    dormId:row.dormId,
  }
  drawerVisible.value = true
  // console.log("row55", userEditParams.value)
}
const handlerReset = () => {
  Form.value.resetFields()
  userEditParams.value = {
    userName: "",
    nickname: "",
    sex: "",
    telephone: "",
    remark: ""
  }
}
const userEditParams = ref({
  userName: "",
  roleId: "",
  sex: "",
  dormId: "",
  remark: ""
})

/* 接口 */
// 添加用户
const createSysUser = async () => {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await CreateUser(userEditParams.value)
    drawerVisible.value = false
    const status = Notification(code, msg)
    status ? getSysUserList() : ""
  }
}
// 删除用户
const deleteSysUser = async (id) => {
  console.log("我是id")
  const { code, msg } = await deleteUser({ id })
  const status = Notification(code, msg)
  status ? getSysUserList() : ""
}
// 获取用户列表
let Pages = ref({
  PageSize: 10,
  Page: 1
})
const total = ref(0)
const getSysUserList = async () => {
  const { code, data } = await getUserList(Pages.value)
  if (code === 200) {
    tableData.value = data.list
    total.value = data.total
  }
}
// 编辑用户信息
const editSysUserInfo = async () => {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await SetUserInfo(userEditParams.value)
    drawerVisible.value = false
    const status = Notification(code, msg)
    status ? getSysUserList() : ""
  }
}
//搜索用户
const queryUserInfo = async () => {
  // console.log("搜索");
  const { code, data, msg } = await QueryUser(Pages.value, {
    userName: userListSearch.username
  })
  // console.log(msg,data);
  if (code === 200) {
    tableData.value = data.list
    total.value = data.total
  } else {
    const status = Notification(code, msg)
  }
}
const roleList = ref([])
const getRoleMsg = async () => {
  const { code, data } = await GetRolesMsg()
  // console.log("角色数据+++++", data)
  if (code == 200) {
    roleList.value = data
  }
}
onMounted(() => {
  getRoleMsg()
  getSysUserList()
  getFloorWithDorm()
})
//获取宿舍楼和宿舍信息
const options = ref([])
const getFloorWithDorm = async () => {
  const { code, data } = await GetFloorWithDormList()
  // console.log("ppp", data)
  if (code == 200) {
    options.value = data.list
  }
}
//页码数发生改变
const HandlePageChange = async (page) => {
  Pages.value = page
  // console.log("页数和页码发生改变99999")
  const { code, data } = await getUserList(Pages.value)
  console.log("hhhh", data)
  if (code === 200) {
    tableData.value = data.list
  }
}
</script>
<template>
  <div>
    <el-form
      :rules="searchRule"
      :model="userListSearch"
      ref="searchRef"
      inline>
      <el-form-item
        style="width: 180px"
        prop="username">
        <el-input
          clearable
          placeholder="请输入用户名"
          v-model="userListSearch.username" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="queryUserInfo"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin: 10px 0">
      <el-button
        type="success"
        @click="drawerVisible = true"
        >添加用户</el-button
      >
    </el-row>

    <el-table
      size="large"
      :data="tableData"
      stripe
      :max-height="500">
      <el-table-column
        prop="avatar"
        label="头像"
        width="100">
        <template #default="{ row }">
          <img
            :src="row.avatar"
            alt=""
            style="width: 30px; height: 30px; border-radius: 5px"
        /></template>
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色ID"
        width="180" />
      <el-table-column
        prop="userName"
        label="用户名" />
      <el-table-column
        prop="CreatedAt"
        label="创建时间">
      <template #default="{row}">
         {{ FormatTime(row.CreatedAt) }}
      </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template #default="{ row }">
          <el-button
            link
            type="danger"
            size="small"
            @click="handleDeleteUser(row.ID)"
            ><el-icon><ep-Delete /></el-icon>删除</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEditUser(row)"
            ><el-icon><ep-Edit /></el-icon>编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
    <el-drawer
      @close="handlerReset"
      v-model="drawerVisible"
      :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4
          :id="titleId"
          :class="titleClass">
          用户
        </h4>
        <el-button @click="close">
          <el-icon class="el-icon--left"><ep-CircleCloseFilled /></el-icon>
          取消
        </el-button>
        <el-button
          type="primary"
          @click="userEditParams.ID ? editSysUserInfo() : createSysUser()">
          确定
        </el-button>
      </template>
      <el-form
        inline
        ref="Form"
        :model="userEditParams"
        :rules="formRules"
        label-width="auto">
        <el-form-item
          prop="userName"
          label="用户名">
          <el-input
            v-model="userEditParams.userName"
            style="width: 200px"
            :disabled="Boolean(userEditParams.ID)"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="roleId"
          label="角色id">
          <el-select
            v-model="userEditParams.roleId"
            style="width: 200px"
            placeholder="please select your role">
            <el-option
              v-for="item in roleList"
              :key="item.ID"
              :label="item.roleName"
              :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="宿舍"
          v-if="userEditParams.roleId === 3"
          prop="dormId">
          <el-select
            v-model="userEditParams.dormId"
            placeholder="请选择宿舍"
            style="width: 200px">
            <el-option-group
              v-for="group in options"
              :key="group.floorsName"
              :label="group.floorsName">
              <el-option
                v-for="item in group.dormList"
                :key="item.id"
                :label="group.floorsName + `-` + item.dormNumber"
                :value="item.id" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="sex"
          label="性别">
          <el-select
            v-model="userEditParams.sex"
            style="width: 200px"
            placeholder="please select your sex">
            <el-option
              label="男"
              value="男" />
            <el-option
              label="女"
              value="女" />
          </el-select>
        </el-form-item>

        <el-form-item
          prop="remark"
          label="备注">
          <el-input
            type="textarea"
            v-model="userEditParams.remark"
            style="width: 350px"
            placeholder="Please input" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
