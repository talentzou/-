<script setup>
import { ref } from "vue"

const searchStudentParams = reactive({
  studentName: "",
  studentNumber: "",
  floorsName: "",
  dormNumber: "",
  major: ""
})
let isOperate = ref(true)
let studentVisible = ref(false)
let expDialog = ref(false)
let refTable = ref(null)
let studentEditParams = reactive({
  studentName: "",
  studentNumber: "",
  sex: "",
  major: "",
  phone: "",
  dormNumber: ""
})
let studentTableData = ref([])
</script>

<template>
  <div>
    <!-- 搜索 -->
    <el-form
      :model="searchStudentParams"
      style="height: 35px; padding: 5px 0"
      inline>
      <el-form-item
        prop="floorsName"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.floorsName"
          placeholder="请输入宿舍楼名称" />
      </el-form-item>
      <el-form-item
        prop="dormNumber"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.dormNumber"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item
        prop="studentNumber"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.studentNumber"
          placeholder="请输入学生姓名"
          clearable />
      </el-form-item>
      <el-form-item
        prop="name"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.studentNumber"
          placeholder="请输入学号"
          clearable />
      </el-form-item>
      <el-form-item
        prop="major"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.bedNumber"
          placeholder="请输入专业"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      v-model="studentVisible"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="studentTableData"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      border
      :max-height="525">
      <el-table-column
        type="selection"
        fixed
        width="50" />
      <el-table-column
        width="55"
        type="index"
        label="序号" />
      <el-table-column
        prop="studentNumber"
        label="学号"
        width="120"
        align="center" />
      <el-table-column
        prop="StudentName"
        label="姓名"
        width="120"
        align="center" />
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
        align="center">
        <template #default="{ row, column, $index }"> </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="120"
        align="center" />
      <el-table-column
        prop="major"
        label="专业"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="120"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="studentVisible = true"
            v-model="studentEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="100"
      @getCurrentPage="55"
      @getPageSizes="55" />
    <FormDialog
      v-model="studentVisible"
      v-model:params="studentEditParams"
      title="学生信息">
    </FormDialog>
  </div>
</template>

<style lang="scss" scoped></style>
