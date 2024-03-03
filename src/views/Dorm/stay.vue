<script setup>
import { getStayInfoRequest } from "@/server/MG/stay/stay"
import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
//表格实例
const refTable = ref(null)
const searchRef = ref(null)
const Form = ref(null)
//导出对话框
const expDialog = ref(false)
//搜索参数
let staySearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  studentName: "",
  auditOpinion: ""
})
//编辑参数
let stayEditParams = reactive({
  stayDate: "",
  studentName: "",
  floorsName: "",
  dormNumber: "",
  stayCause: "",
  instructor: ""
})
let isOperate = ref(true)
const searchRules = useRules(staySearchParams)
const formRules = useRules(stayEditParams)
//参数编辑对话框
let stayVisible = ref(false)
function selectDatePicker() {
  console.log(staySearchParams.date)
}
//导出表格
const fields = {
  stayDate: "留宿时间",
  studentName: "学生姓名",
  floorsName: "宿舍楼",
  dormNumber: "宿舍",
  stayCause: "留宿原因",
  instructor: "辅导员",
  auditProgress: "审核意见"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}
//标签颜色
function stateTag(text) {
  switch (text) {
    case "同意":
      return "success"
    case "不同意":
      return "danger"
    case "审核中":
      return "info"
    default:
      return "warning"
  }
}
function getStayPageSize(pageSize) {
  getStayData()
}
function getStayPage(pages) {
  getStayData()
}
/* 接口 */
let stayTableData = ref([])
async function getStayData() {
  const { code, data } = await getStayInfoRequest()
  stayTableData.value = data
}
async function updateStayData() {}
async function deleteStayData() {}
async function increaseStayData() {}
onMounted(() => {
  getStayData()
})
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="searchRules"
      :model="staySearchParams"
      inline>
      <el-form-item
        style="width: 180px"
        prop="floorsName">
        <el-input
          placeholder="请输入宿舍楼名称"
          v-model="staySearchParams.floorsName" />
      </el-form-item>
      <el-form-item
        style="width: 180px"
        prop="dormNumber">
        <el-input
          placeholder="请输入宿舍名称"
          v-model="staySearchParams.dormNumber" />
      </el-form-item>
      <el-form-item style="width: 180px">
        <el-input
          placeholder="请输入留宿学生名"
          v-model="staySearchParams.studentName" />
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(searchRef)"
            >搜索</el-button
          >
          <el-button @click="resetForm(searchRef)">重置</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      v-model="stayVisible"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="stayTableData"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      border
      :max-height="525">
      <el-table-column
        type="selection"
        fixed
        width="55" />
      <el-table-column
        width="55"
        type="index"
        label="序号" />
      <el-table-column
        prop="stayDate"
        label="留宿时间"
        width="200"
        align="center">
        <template #default="{ row, column, $index }">
          <el-text truncated>
            {{ row.stayDate[0] }}~{{ row.stayDate[1] }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="留宿学生"
        width="120"
        align="center" />
      <el-table-column
        prop="stayCause"
        label="留宿原因"
        width="120"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tooltip
            class="box-item"
            effect="light"
            :content="`${row.stayCause}`"
            placement="top">
            <el-text
              type="primary"
              class="w-150px mb-2"
              truncated>
              {{ row.stayCause }}
            </el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="floorsName"
        label="宿舍楼"
        width="120"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        align="center"
        width="120" />
      <el-table-column
        prop="instructor"
        label="辅导员"
        align="center"
        width="120" />
      <el-table-column
        prop="auditProgress"
        label="审核进度"
        align="center"
        width="120">
        <template #default="{ row, column, $index }">
          <el-tag :type="stateTag(row.auditProgress)">{{
            row.auditProgress
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="stayVisible = true"
            v-model="stayEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="stayTableData.length"
      @getCurrentPage="getStayPage"
      @getPageSizes="getStayPageSize" />
    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      v-model="stayVisible"
      v-model:params="stayEditParams"
      :title="stayEditParams.id ? `修改留宿申请` : `添加留宿申请`">
      <el-form
        ref="Form"
        :rules="formRules"
        :model="stayEditParams"
        label-width="auto">
        <el-form-item
          label="留宿时间"
          prop="stayDate">
          <el-date-picker
            @change="selectDatePicker"
            v-model="stayEditParams.stayDate"
            type="daterange"
            format="YYYY-MM-DD"
            start-placeholder="Start date"
            end-placeholder="End date"
            value-format="x" />
        </el-form-item>
        <el-form-item
          label="宿舍楼"
          prop="floorsName">
          <el-input
            placeholder="请选择宿舍楼"
            v-model="stayEditParams.floorsName" />
        </el-form-item>
        <el-form-item
          label="宿舍编号"
          prop="dormNumber">
          <el-input
            placeholder="请选择宿舍"
            v-model="stayEditParams.dormNumber" />
        </el-form-item>
        <el-form-item
          label="留宿学生"
          prop="studentName">
          <el-input v-model="stayEditParams.studentName" />
        </el-form-item>
        <el-form-item
          label="留宿原因"
          prop="stayCause">
          <el-input
            v-model="stayEditParams.stayCause"
            placeholder="请输入内容"
            type="textarea" />
        </el-form-item>
        <el-form-item
          label="辅导员"
          prop="instructor">
          <el-input
            v-model="stayEditParams.instructor"
            placeholder="请输入辅导员" />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submitForm(Form)"
            type="success"
            >创建</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form></FormDialog
    >
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>
@/server/MG/stay/stay @/rules/dormRules
