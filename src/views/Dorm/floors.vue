<script setup>
import {
  getFloorsInfoRequest,
  deleteFloorsInfoRequest,
  updateFloorsInfoRequest,
  addFloorsInfoRequest
} from "@/server/MG/floors/floors"
import { exportExcel } from "@/utils/excel"
const expDialog = ref(false)
const refTable = ref(null)
const isOperate = ref(true)
//初始页数数量
let pageAndSizeParams = reactive({
  pageSizes: 10,
  currentPages: 1
})
//搜索表单
const floorsSearchForm = reactive({
  floorName: "",
  type: ""
})
//对话框
const floorsVisible = ref(false)
//宿舍楼参数
let floorsParams = reactive({
  floorsName: "",
  floors: "",
  floorsType: "",
  amount: "",
  id: ""
})

const selectShow = computed(() => {
  return floorsSearchForm.floorName ? false : true
})
//导出数据
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
}
//重置
function reset() {
  pageAndSizeParams = Object.assign(pageAndSizeParams, {
    pageSizes: 10,
    currentPages: 1
  })
  getFloorsInfo(pageAndSizeParams)
}
//搜索
function searchFloors() {
  let temp = {}
  pageAndSizeParams = Object.assign(pageAndSizeParams, {
    pageSizes: 10,
    currentPages: 1
  })
  temp = Object.assign(pageAndSizeParams, floorsSearchForm)
  console.log(temp)
  // getFloorsInfo(temp)
}


function tagState(row) {
  let type = row.floorsType === "男生宿舍" ? "success" : "danger"
  return type
}
/* 接口api */
//获取楼层信息
//表格数据
const tableData = ref([])
async function getFloorsInfo(pageOrSize) {
  // console.log("pageOrSize", pageOrSize)
  if (pageOrSize !== undefined) {
    pageAndSizeParams = pageOrSize
  }
  const { code, data } = await getFloorsInfoRequest(pageAndSizeParams)
  tableData.value = data
  // console.log(tableData.value.length)
}

onMounted(() => {
  getFloorsInfo()
})
function test(ee) {
  console.log(ee)
}
</script>
<template>
  <!-- 搜索 -->
  <el-form
    :model="floorsSearchForm"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop="floorName">
      <el-input
        v-model="floorsSearchForm.floorName"
        placeholder="请输入宿舍楼名"
        clearable
        style="width: 240px" />
    </el-form-item>
    <el-form-item prop="type">
      <el-select
        style="width: 240px"
        :disabled="selectShow"
        v-model="floorsSearchForm.type"
        placeholder="请选择宿舍类型">
        <el-option
          label="男生宿舍"
          value="男生宿舍" />
        <el-option
          label="女生宿舍"
          value="女生宿舍" />
      </el-select>
    </el-form-item>
    <el-form-item prop="type">
      <el-row :gutter="20">
        <el-col :span="12"
          ><el-button
            type="primary"
            @click="searchFloors"
            >搜索</el-button
          ></el-col
        >
        <el-col :span="12"><el-button @click="reset">重置</el-button></el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <!-- 操作 -->
  <OperateButton
    :isOperate="isOperate"
    @excel="expDialog = true"
    v-model="floorsVisible" />
  <!-- 表格数据 -->
  <el-table
    id="table"
    :data="tableData"
    border
    ref="refTable"
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
      label="序号" />
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
      prop="amount"
      label="宿舍总数"
      width="150"
      align="center" />
    <el-table-column
      prop="操作"
      label="操作"
      align="center">
      <template #default="{ row, column, $index }">
        <TableButton
          :row="row"
          @merge="floorsVisible = true"
          v-model="floorsParams" />
      </template>
    </el-table-column>
  </el-table>
  <Pagination
    :total="tableData.length"
    @getCurrentPage="getFloorsInfo"
    @getPageSizes="getFloorsInfo" />
  <!-- 对话框 -->
  <FormDialog
    v-model="floorsVisible"
    v-model:params="floorsParams"
    title="宿舍信息">
    <el-form
      :model="floorsParams"
      label-width="auto">
      <el-form-item label="宿舍楼名称">
        <el-input v-model="floorsParams.floorsName" />
      </el-form-item>
      <el-form-item label="楼层数">
        <el-input v-model="floorsParams.floors" />
      </el-form-item>
      <el-form-item label="宿舍楼类型">
        <el-select
          style="width: 120px"
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
      <el-form-item label="宿舍总数量">
        <el-input v-model="floorsParams.amount" />
      </el-form-item>
    </el-form>
  </FormDialog>
  <ExportDialog
    v-model="expDialog"
    @select="exportTable" />
</template>
@/server/MG/stay/floors/floors
