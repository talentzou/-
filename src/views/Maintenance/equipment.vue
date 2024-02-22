<script setup>
import { getRepairInfoRequest } from "@/server/REPAIR/repair"
import { exportExcel } from "@/utils/excel"
const refTable = ref(null)
let maintenanceSearchParams = reactive({
  searchMessage: "",
  floorsName: "",
  repairStatus: ""
})
//导出对话框
const expDialog = ref(false)
let isOperate = ref(true)
let repairVisible = ref(false)
let maintenanceEditParams = reactive({
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
//导出表格
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
}
function selectDatePicker() {}
/* 接口 */
let repairTableData = ref([])
async function getRepairData() {
  const { code, data } = await getRepairInfoRequest()
  repairTableData.value = data
}

onMounted(() => {
  getRepairData()
})
</script>

<template>
  <!-- 搜索 -->
  <el-form
    :model="maintenanceSearchParams"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop="floorsName">
      <el-select
        style="width: 160px"
        v-model="maintenanceSearchParams.floorsName"
        placeholder="请选择宿舍楼">
        <el-option
          label="六人间"
          value="六人间" />
      </el-select>
    </el-form-item>
    <el-form-item prop="dormNumber">
      <el-select
        style="width: 160px"
        v-model="maintenanceSearchParams.dormNumber"
        placeholder="请选择宿舍">
        <el-option
          label="六人间"
          value="六人间" />
      </el-select>
    </el-form-item>
    <el-form-item prop="repairStatus">
      <el-select
        style="width: 160px"
        v-model="maintenanceSearchParams.repairStatus"
        placeholder="维修状态">
        <el-option
          label="未完成"
          value="Not" />
        <el-option
          label="已完成"
          value="Have" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
  <OperateButton
    :isOperate="isOperate"
    v-model="repairVisible" 
    @excel="expDialog = true"/>
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
      label="序号" />
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
        <el-tag :type="row.repairStatus === `已完成` ? `success` : `danger`">{{
          row.repairStatus
        }}</el-tag>
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
          @merge="repairVisible = true"
          v-model="maintenanceEditParams" />
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <Pagination
    :total="100"
    @getCurrentPage="55"
    @getPageSizes="55" />
  <!-- 对话框 -->
  <FormDialog
    v-model="repairVisible"
    v-model:params="maintenanceEditParams"
    title="维修信息">
    <el-form
      :model="maintenanceEditParams"
      label-width="auto">
      <el-form-item label="宿舍楼">
        <el-select
          style="width: 160px"
          placeholder="请选择宿舍楼"
          v-model="maintenanceEditParams.floorsName">
          <el-option
            label="jj"
            value="kk" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍编号">
        <el-select
          style="width: 160px"
          placeholder="请选择宿舍"
          v-model="maintenanceEditParams.dormNumber">
          <el-option
            label="jj"
            value="kk" />
        </el-select>
      </el-form-item>

      <el-form-item label="上报时间">
        <el-date-picker
          @change="selectDatePicker"
          v-model="maintenanceEditParams.submitDate"
          type="date"
          format="YYYY-MM-DD"
          placeholder="Start date"
          value-format="x" />
      </el-form-item>
      <el-form-item label="维修状态">
        <el-select
          style="width: 160px"
          v-model="maintenanceEditParams.repairStatus"
          placeholder="请选择维修状态">
          <el-option
            label="未完成"
            value="Not" />
          <el-option
            label="已完成"
            value="Have" />
        </el-select>
      </el-form-item>
      <el-form-item label="上报人">
        <el-input
          v-model="maintenanceEditParams.reportMan"
          placeholder="请输入上报人" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          v-model="maintenanceEditParams.phone"
          placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="维修人员">
        <el-input
          v-model="maintenanceEditParams.repairer"
          placeholder="请输入维修人员" />
      </el-form-item>
      <el-form-item label="故障问题描述">
        <el-input
          v-model="maintenanceEditParams.problems"
          placeholder="请输入内容"
          type="textarea" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="maintenanceEditParams.remark"
          placeholder="请输入备注"
          type="textarea" />
      </el-form-item> </el-form
  ></FormDialog>
  <ExportDialog
    v-model="expDialog"
    @select="exportTable" />
</template>

<style lang="scss" scoped></style>
