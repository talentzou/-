<script setup>
import {
  getFloorsInfoRequest,
  deleteFloorsInfoRequest,
  updateFloorsInfoRequest,
  addFloorsInfoRequest
} from "@/server/MG/floors/floors"
import { exportExcel } from "@/utils/excel"
import { useRules } from "@/utils/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
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
  floorsName: "",
  floorsType: ""
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

//导出数据
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
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
  if (pageOrSize !== undefined) {
    pageAndSizeParams = pageOrSize
  }
  const { code, data } = await getFloorsInfoRequest(pageAndSizeParams)
  tableData.value = data
}
function createForm() {}
onMounted(() => {
  getFloorsInfo()
})

const floorsRef = ref(null)
const Form = ref(null)
const searchRules = useRules(floorsSearchForm)
const paramsRules = useRules(floorsParams)
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
          v-model="floorsSearchForm.floorName" />
      </el-form-item>
      <el-form-item>
        <el-select
          style="width: 180px"
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
          @click="submitForm(floorsRef)"
          >搜索</el-button
        >
        <el-button @click="resetForm(floorsRef)">重置</el-button>
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
      @close="Form.resetFields()"
      title="宿舍信息">
      <el-form
        ref="Form"
        :rules="paramsRules"
        :model="floorsParams"
        label-width="auto">
        <el-form-item
          label="宿舍楼名称"
          prop="floorsName">
          <el-input
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
          prop="amount">
          <el-input
            v-model="floorsParams.amount"
            placeholder="请输入宿舍总数" />
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
      </el-form>
    </FormDialog>
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>
@/server/MG/stay/floors/floors
