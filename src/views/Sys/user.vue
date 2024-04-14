<script setup>
import {
  getUserList,
  deleteUser,
  SetUserInfo,
  CreateUser,
  QueryUser
} from "@/api/User/user"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
const Form = ref(null)
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
// const handleResetPassword = () => {
//   ElMessageBox.confirm("确定重置密码为:123456?", "提示", {
//     confirmButtonText: "OK",
//     cancelButtonText: "Cancel",
//     type: "warning"
//   })
// }
const handleEditUser = (row) => {
  userEditParams.value = row
  drawerVisible.value = true
  console.log("row55", userEditParams.value)
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
  authorityId: "",
  // nickname: "",
  sex: "",
  // telephone: "",
  remark: ""
})
const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error("请输入正确的用户名"))
  } else {
    callback()
  }
}
// const phone = (rule, value, callback) => {
//   let reg = /^1[3-9]\d{9}$/
//   const isTrue = reg.test(value)
//   if (!isTrue) {
//     callback(new Error("请输入正确格式的手机号码"))
//   } else {
//     callback()
//   }
// }
const formRules = {
  userName: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { validator: checkUsername, trigger: "blur" }
  ],
  // nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "性别不能为空", trigger: "blur" }]
  // telephone: [
  //   { required: true, message: "电话不能为空", trigger: "blur" },
  //   { validator: phone, trigger: "blur" }
  // ]
}
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
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
const total = ref(0)
const getSysUserList = async () => {
  const { code, data } = await getUserList(Pages)
  console.log("发起求情")
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
  console.log("搜索");
  const { code, data,msg } = await QueryUser(Pages, {
    userName: userListSearch.username
  })
  console.log(msg,data);
  if (code === 200) {
    tableData.value = data.list
    total.value = data.total
  }
}
onMounted(() => {
  getSysUserList()
})
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
      style="width: 100%">
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
        prop="authorityId"
        label="角色ID"
        width="180" />
      <el-table-column
        prop="userName"
        label="用户名" />
      <el-table-column
        prop="CreatedAt"
        label="创建时间">
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
      @getCurrentPage="0"
      @getPageSizes="0" />
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
          prop="sex"
          label="角色id">
          <el-select
            v-model="userEditParams.authorityId"
            style="width: 200px"
            :disabled="Boolean(userEditParams.ID)"
            placeholder="please select your role">
            <el-option
              label="学生"
              :value="3" />
            <el-option
              label="宿管"
              :value="2" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          prop="nickname"
          label="昵称">
          <el-input
            v-model="userEditParams.nickname"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item> -->
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
        <!-- <el-form-item
          prop="telephone"
          label="电话">
          <el-input
            v-model="userEditParams.telephone"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item> -->
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
