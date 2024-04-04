<script setup>
import {
  getRepairResponse,
  updateRepairResponse,
  createRepairResponse,
  deleteRepairResponse
} from "@/api/REPAIR/repair"
import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/maintenanceRules"
import { resetForm, submitForm } from "@/utils/rules"
import { floorsName, dormNumber } from "@/rules/dormRules"
import { Notification } from "@/utils/notification"
import { authFields} from "@/utils/authFields"
const {operate_auth, table_auth}=authFields("repair")
const refTable = ref(null)
const Form = ref(null)
const searchRef = ref(null)
let maintenanceSearchParams = reactive({
  searchMessage: "",
  floorsName: "",
  repairStatus: ""
})
//导出对话框
const expDialog = ref(false)
let isOperate = ref(true)
let repairVisible = ref(false)
let maintenanceEditParams = ref({
  id: "",
  floorsName: "",
  dormNumber: "",
  problems: "",
  submitDate: "",
  repairStatus: "",
  reportMan: "",
  phone: "",
  repairer: "",
  remark: ""
})
const searchRules = {
  floorsName: [
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  dormNumber: [
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ]
}
const formRules = useRules(maintenanceEditParams.value)
//导出表格
const fields = {
  floorsName: "宿舍楼",
  dormNumber: "宿舍",
  problems: "故障问题",
  submitDate: "提交日期",
  repairStatus: "维修状态",
  reportMan: "上报人",
  phone: "联系电话",
  repairer: "维修者",
  remark: "备注"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}

/* 接口 */
let repairTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getRepairs(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  console.log("发起请求")
  const { code, data } = await getRepairResponse(maintenanceSearchParams, Pages)
  if (code == 200) {
    repairTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateRepairs() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateRepairResponse(
      maintenanceEditParams.value
    )
    repairVisible.value = false
    const status = Notification(code, msg)
    status ? getRepairs() : ""
  }
}
// 删除
async function deleteRepairs(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteRepairResponse(list)
  const status = Notification(code, msg)
  status ? getRepairs() : ""
}
// 添加
async function createRepairs() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const list = toRaw(maintenanceEditParams.value)
    console.log("list", list)
    const { code, msg } = await createRepairResponse([list])
    repairVisible.value = false
    const status = Notification(code, msg)
    status ? getRepairs() : ""
  }
}
//搜索栏
async function SearchRepairs() {
  const query = maintenanceSearchParams
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
  const valid = await submitForm(searchRef.value)
  if (valid) {
    getRepairs()
  }
}

onMounted(() => {
  getRepairs()
})
</script>

<template>
  <div>
    <!-- 搜索 -->
    <el-form
      ref="searchRef"
      :model="maintenanceSearchParams"
      :rules="searchRules"
      style="line-height: 50px"
      inline>
      <el-form-item prop="floorsName">
        <el-input
          style="width: 160px"
          v-model="maintenanceSearchParams.floorsName"
          placeholder="请输入宿舍楼名称" />
      </el-form-item>
      <el-form-item prop="dormNumber">
        <el-input
          style="width: 160px"
          v-model="maintenanceSearchParams.dormNumber"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item>
        <el-select
          style="width: 160px"
          clearable
          v-model="maintenanceSearchParams.repairStatus"
          placeholder="维修状态">
          <el-option
            label="未完成"
            value="未完成" />
          <el-option
            label="已完成"
            value="已完成" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchRepairs"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      v-model="repairVisible"
      @delete="deleteRepairs"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="repairTableData"
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
        label="#" />
      <el-table-column
        prop="floorsName"
        label="宿舍楼"
        width="70"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="70"
        align="center" />
      <el-table-column
        prop="problems"
        label="问题描述"
        width="250"
        align="center">
        <template #default="{ row, column, $index }"> </template>
      </el-table-column>
      <el-table-column
        prop="submitDate"
        label="报修时间"
        width="120"
        align="center" />
      <el-table-column
        prop="repairStatus"
        label="维修状态"
        width="100"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag
            :type="row.repairStatus === `已完成` ? `success` : `danger`"
            >{{ row.repairStatus }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="reportMan"
        label="报修人"
        width="80"
        align="center" />
      <el-table-column
        prop="phone"
        label="联系方式"
        width="120"
        align="center" />
      <el-table-column
        prop="repairer"
        label="维修人"
        width="80"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @delete="deleteRepairs"
            @merge="repairVisible = true"
            v-model="maintenanceEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      @getCurrentPage="getRepairs"
      @getPageSizes="getRepairs" />
    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      :width="50"
      v-model="repairVisible"
      v-model:params="maintenanceEditParams"
      :title="maintenanceEditParams.id ? `修改维修信息` : `添加维修信息`">
      <el-form
        ref="Form"
        inline
        :rules="formRules"
        :model="maintenanceEditParams"
        label-width="auto">
        <el-form-item
          label="上报时间"
          prop="submitDate">
          <el-date-picker
            v-model="maintenanceEditParams.submitDate"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date"
             />
        </el-form-item>
        <el-form-item
          label="宿舍楼"
          prop="floorsName">
          <el-input
            v-model="maintenanceEditParams.floorsName"
            placeholder="请选择宿舍楼" />
        </el-form-item>
        <el-form-item
          label="宿舍编号"
          prop="dormNumber">
          <el-input
            v-model="maintenanceEditParams.dormNumber"
            placeholder="请选择宿舍" />
        </el-form-item>

        <el-form-item
          label="维修状态"
          prop="repairStatus">
          <el-select
            style="width: 195px"
            v-model="maintenanceEditParams.repairStatus"
            placeholder="请选择维修状态">
            <el-option
              label="未完成"
              value="未完成" />
            <el-option
              label="已完成"
              value="已完成" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="上报人"
          prop="reportMan">
          <el-input
            v-model="maintenanceEditParams.reportMan"
            placeholder="请输入上报人" />
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="phone">
          <el-input
            v-model="maintenanceEditParams.phone"
            placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item
          label="维修人员"
          prop="repairer">
          <el-input
            v-model="maintenanceEditParams.repairer"
            placeholder="请输入维修人员" />
        </el-form-item>
        <el-form-item
          style="width: 100%"
          label="故障问题描述"
          prop="problems">
          <el-input
            v-model="maintenanceEditParams.problems"
            placeholder="请输入内容"
            type="textarea" />
        </el-form-item>
        <el-form-item
          label="备注"
          style="width: 100%">
          <el-input
            v-model="maintenanceEditParams.remark"
            placeholder="请输入备注"
            type="textarea" />
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            @click="
              maintenanceEditParams.id ? updateRepairs() : createRepairs()
            "
            type="success"
            >{{ maintenanceEditParams.id ? "更新" : "添加" }}</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item></el-form
      ></FormDialog
    >
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>

<style lang="scss" scoped></style>
@/rules/maintenanceRules
