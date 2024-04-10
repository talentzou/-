<script setup>
import {
  getFloorsInfoRequest,
  deleteFloorsInfoRequest,
  updateFloorsInfoRequest,
  addFloorsInfoRequest
} from "@/api/Dorm/floors"

import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
const { operate_auth, table_auth } = authFields("floor")
const expDialog = ref(false)
const refTable = ref(null)
const isOperate = ref(true)
//初始页数数量
let pageAndSizeParams = reactive({
  PageSize: 10,
  Page: 1
})
//搜索表单
const floorsSearchForm = reactive({
  floorsName: "",
  floorsType: ""
})
//对话框
const floorsVisible = ref(false)
//宿舍楼参数
let floorsParams = ref({
  floorsName: "",
  floors: "",
  floorsType: "",
  dormAmount: ""
})

//导出数据
const fields = {
  amount: "宿舍总数",
  floors: "楼层数",
  floorsName: "宿舍楼名",
  floorsType: "宿舍楼类型"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}

function tagState(row) {
  let type = row.floorsType === "男生宿舍" ? "success" : "danger"
  return type
}
/* 接口api */
//获取楼层信息
//表格数据
const tableData = ref([])
const total = ref(0)
async function getFloors(PageAndSize) {
  if (PageAndSize !== undefined) {
    pageAndSizeParams = PageAndSize
  }
  const { code, data } = await getFloorsInfoRequest(
    floorsSearchForm,
    pageAndSizeParams
  )
  if (code == 200) {
    tableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateFloors() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateFloorsInfoRequest(floorsParams.value)
    floorsVisible.value = false
    const status = Notification(code, msg)
    status ? getFloors() : ""
  }
}
// 删除
async function deleteFloors(list) {
  console.log("LIST", list)
  const { code, msg } = await deleteFloorsInfoRequest(list)
  const status = Notification(code, msg)
  status ? getFloors() : ""
}
// 添加
async function createFloors() {
  const valid = await submitForm(Form.value)
  console.log("949555", floorsParams.value)
  if (valid) {
    const { code, msg } = await addFloorsInfoRequest([floorsParams.value])
    floorsVisible.value = false
    const status = Notification(code, msg)
    status ? getFloors() : ""
  }
}
//搜索栏
async function SearchFloor() {
  const query = floorsSearchForm
  let params = Object.fromEntries(
    Object.entries(query).filter(([key]) => query[key])
  )
  // console.log("对象",params,Object.keys(params).length);
  if (!Object.keys(params).length) {
    console.log("控制")
    ElMessage({
      message: "搜索输入不能为空",
      type: "error"
    })
    return
  }
  const valid = await submitForm(floorsRef.value)
  if (valid) {
    getFloors()
  }
}
onMounted(() => {
  getFloors()
})

const floorsRef = ref(null)
const Form = ref(null)
function floorsName(rule, value, callback) {
  let reg = /^[A-Z]\d$/
  const isVal = reg.test(value)
  if (!isVal && value !== "") {
    callback(new Error("请输入正确格式,如Ax,x是数字"))
  } else {
    callback()
  }
}
const searchRules = {
  floorsName: [
    {
      validator: floorsName,
      trigger: "blur"
    }
  ]
}
const paramsRules = useRules(floorsParams.value)
</script>
<template>
  <div>
    <!-- 搜索 -->
    <el-form
      ref="floorsRef"
      :model="floorsSearchForm"
      :rules="searchRules"
      style="line-height: 50px"
      inline>
      <el-form-item
        style="width: 180px"
        prop="floorsName">
        <el-input
          placeholder="请输入宿舍楼名称"
          v-model="floorsSearchForm.floorsName" />
      </el-form-item>
      <el-form-item>
        <el-select
          style="width: 180px"
          clearable
          v-model="floorsSearchForm.floorsType"
          placeholder="请选择宿舍类型">
          <el-option
            label="男生宿舍"
            value="男生宿舍" />
          <el-option
            label="女生宿舍"
            value="女生宿舍" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchFloor"
          >搜索</el-button
        >
        <el-button @click="resetForm(floorsRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      @excel="expDialog = true"
      v-model="floorsVisible" />
    <!-- 表格数据 -->
    <el-table
      id="table"
      :data="tableData"
      border
      ref="refTable"
      style="width: 100%"
      :max-height="525"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      :row-key="(row) => row.id">
      <el-table-column
        type="selection"
        fixed
        width="55"
        reserve-selection />
      <el-table-column
        width="55"
        type="index"
        label="#" />
      <el-table-column
        prop="floorsName"
        label="宿舍楼名"
        width="180"
        align="center" />
      <el-table-column
        prop="floors"
        label="楼层数"
        width="180"
        align="center" />
      <el-table-column
        prop="floorsType"
        label="类型"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag :type="tagState(row)">{{ row.floorsType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="dormAmount"
        label="宿舍总数"
        width="150"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center"
        fixed="right">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @merge="floorsVisible = true"
            @delete="deleteFloors"
            v-model="floorsParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="getFloors"
      @getPageSizes="getFloors" />
    <!-- 对话框 -->
    <FormDialog
      v-model="floorsVisible"
      v-model:params="floorsParams"
      @close="Form.resetFields()"
      :title="floorsParams.id ? `编辑宿舍楼信息` : `添加宿舍楼信息`">
      <el-form
        ref="Form"
        :rules="paramsRules"
        :model="floorsParams"
        label-width="auto">
        <el-form-item
          label="宿舍楼名称"
          prop="floorsName">
          <el-input
            :disabled="Boolean(floorsParams.id)"
            v-model="floorsParams.floorsName"
            placeholder="请输入宿舍楼名称" />
        </el-form-item>
        <el-form-item
          label="楼层数"
          prop="floors">
          <el-input
            v-model.number="floorsParams.floors"
            placeholder="请输入楼层数" />
        </el-form-item>
        <el-form-item
          label="宿舍楼类型"
          prop="floorsType">
          <el-select
            v-model="floorsParams.floorsType"
            placeholder="请选择宿舍类型">
            <el-option
              label="男生宿舍"
              value="男生宿舍" />
            <el-option
              label="女生宿舍"
              value="女生宿舍" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="宿舍总数量"
          prop="dormAmount">
          <el-input
            v-model.number="floorsParams.dormAmount"
            placeholder="请输入宿舍总数" />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="floorsParams.id ? updateFloors() : createFloors()"
            type="success"
            >{{ floorsParams.id ? "更新" : "添加" }}</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </FormDialog>
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>
@/server/MG/stay/floors/floors @/rules/dormRules
